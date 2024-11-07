import axios from "axios";
import jwtDefaultConfig from "./jwtDefaultConfig";
import toast from "react-hot-toast";
import { jwtDecode } from "jwt-decode";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

export default class JwtService {
  jwtConfig = { ...jwtDefaultConfig };
  isAlreadyFetchingAccessToken = false;
  subscribers = [];

  constructor(jwtOverrideConfig) {
    this.jwtConfig = { ...this.jwtConfig, ...jwtOverrideConfig };

    request.interceptors.request.use(
      (config) => {
        const accessToken = this.getToken();
        if (accessToken) {
          config.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    request.interceptors.response.use(
      (response) => response,
      (error) => {
        const { config, response } = error;
        const originalRequest = config;

        if (response && response.status === 401) {
          toast.error(response?.data?.message, {
            className: "bg-warning text-white",
          });

          if (!this.isAlreadyFetchingAccessToken) {
            this.isAlreadyFetchingAccessToken = true;

            return this.refreshToken().then(
              (r) => {
                this.isAlreadyFetchingAccessToken = false;
                this.setToken(r.data.accessToken);
                this.setRefreshToken(r.data.refreshToken);
                this.onAccessTokenFetched(r.data.accessToken);
                originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${r.data.accessToken}`;
                return request(originalRequest);
              },
              (refreshError) => {
                this.handleLogout();
                toast.error("Session expired. Please login again.", {
                  className: "bg-warning text-white",
                });
                window.location.href = "/login";
                return Promise.reject(refreshError);
              }
            );
          }

          const retryOriginalRequest = new Promise((resolve) => {
            this.addSubscriber((accessToken) => {
              originalRequest.headers.Authorization = `${this.jwtConfig.tokenType} ${accessToken}`;
              resolve(request(originalRequest));
            });
          });
          return retryOriginalRequest;
        }
        return Promise.reject(error);
      }
    );
  }

  onAccessTokenFetched(accessToken) {
    this.subscribers = this.subscribers.filter((callback) => callback(accessToken));
  }

  addSubscriber(callback) {
    this.subscribers.push(callback);
  }

  getToken() {
    return localStorage.getItem(this.jwtConfig.storageTokenKeyName);
  }

  getRefreshToken() {
    return localStorage.getItem(this.jwtConfig.storageRefreshTokenKeyName);
  }

  setToken(value) {
    localStorage.setItem(this.jwtConfig.storageTokenKeyName, value);
  }

  setRefreshToken(value) {
    localStorage.setItem(this.jwtConfig.storageRefreshTokenKeyName, value);
  }

  handleLogout() {
    localStorage.removeItem(this.jwtConfig.storageTokenKeyName);
    localStorage.removeItem(this.jwtConfig.storageRefreshTokenKeyName);
    localStorage.removeItem("userData");
  }

  login(...args) {
    return request.post(this.jwtConfig.loginEndpoint, ...args);
  }

  register(...args) {
    return request.post(this.jwtConfig.registerEndpoint, ...args);
  }

  refreshToken() {
    return request.post(this.jwtConfig.refreshEndpoint, {
      refreshToken: this.getRefreshToken(),
    });
  }

  expireToken() {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decodedToken = jwtDecode(token);
      const expTimeInMilliseconds = decodedToken.exp * 1000;
      const currentDate = new Date().getTime();

      if (currentDate > expTimeInMilliseconds) {
        this.handleLogout();
        return true;
      }
    } catch (error) {
      console.error("Invalid token:", error);
      this.handleLogout();
      return true;
    }

    return false;
  }
}
