import axios from "axios";

const request = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
});

//** */ Add an interceptor to include the token in requests
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    console.log("token", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const client = {
  get: (url, options = {}) => request.get(url, { ...options }),
  post: (url, data, options = {}) => request.post(url, data, { ...options }),
  patch: (url, data, options = {}) => request.patch(url, data, { ...options }),
  put: (url, data, options = {}) => request.put(url, data, { ...options }),
  delete: (url, options = {}) => request.delete(url, { ...options }),
};

export { client };
