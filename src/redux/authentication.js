// // ** Redux Imports
// import { createSlice } from '@reduxjs/toolkit'

// // ** UseJWT import to get config
// import useJwt from '@src/auth/jwt/useJwt'

// const config = useJwt.jwtConfig

// const initialUser = () => {
//   const item = window.localStorage.getItem('userData')
//   //** Parse stored json or if none return initialValue
//   return item ? JSON.parse(item) : {}
// }

// export const authSlice = createSlice({
//   name: 'authentication',
//   initialState: {
//     userData: initialUser(),
//     loginResData: []
//   },
//   reducers: {
//     handleLogin: (state, action) => {
//       state.userData = action.payload
//       state[config.storageTokenKeyName] = action.payload[config.storageTokenKeyName]
//       state[config.storageRefreshTokenKeyName] = action.payload[config.storageRefreshTokenKeyName]
//       localStorage.setItem('userData', JSON.stringify(action.payload))
//       localStorage.setItem(config.storageTokenKeyName, JSON.stringify(action.payload.accessToken))
//       localStorage.setItem(config.storageRefreshTokenKeyName, JSON.stringify(action.payload.refreshToken))
//     },
//     afterLoginData: (state, action) => {
//       state.loginResData = action.payload
//       localStorage.setItem('userLogedInData', JSON.stringify(action.payload))
//     },
//     handleLogout: state => {
//       state.userData = {}
//       state[config.storageTokenKeyName] = null
//       state[config.storageRefreshTokenKeyName] = null
//       // ** Remove user, accessToken & refreshToken from localStorage
//       localStorage.removeItem('userData')
//       localStorage.removeItem('userLogedInData')
//       localStorage.removeItem(config.storageTokenKeyName)
//       localStorage.removeItem(config.storageRefreshTokenKeyName)
//     }
//   }
// })

// export const { handleLogin, handleLogout, afterLoginData } = authSlice.actions

// export default authSlice.reducer

// **
// import { createSlice } from '@reduxjs/toolkit';

// const initialUser = () => {
//   const item = window.localStorage.getItem('userData');
//   return item ? JSON.parse(item) : {};
// };

// export const authSlice = createSlice({
//   name: 'authentication',
//   initialState: {
//     userData: initialUser(),
//     token: null,
//     refreshToken: null,
//   },
//   reducers: {
//     handleLogin: (state, action) => {
//       state.userData = action.payload;
//       localStorage.setItem('userData', JSON.stringify(action.payload));
//       localStorage.setItem('accessToken', action.payload.accessToken);
//       localStorage.setItem('refreshToken', action.payload.refreshToken);
//     },
//     handleLogout: (state) => {
//       state.userData = {};
//       localStorage.removeItem('userData');
//       localStorage.removeItem('userLogedInData');
//       localStorage.removeItem('accessToken');
//       localStorage.removeItem('refreshToken');
//       localStorage.removeItem('user');
//     }
//   }
// });

// export const { handleLogin, handleLogout } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialUser = () => {
  const item = window.localStorage.getItem("userData");
  return item ? JSON.parse(item) : {};
};

const initialToken = () => {
  return window.localStorage.getItem("accessToken") || null;
};

const initialRefreshToken = () => {
  return window.localStorage.getItem("refreshToken") || null;
};

export const authSlice = createSlice({
  name: "authentication",
  initialState: {
    userData: initialUser(),
    token: initialToken(),
    refreshToken: initialRefreshToken(),
  },
  reducers: {
    handleLogin: (state, action) => {
      state.userData = action.payload;
      state.token = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      localStorage.setItem("userData", JSON.stringify(action.payload));
      // localStorage.setItem('accessToken', action.payload.accessToken);
      // localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    handleLogout: (state) => {
      state.userData = {};
      state.token = null;
      state.refreshToken = null;
      localStorage.removeItem("userData");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
    setToken: (state, action) => {
      console.log("action.payload", action.payload);
      state.token = action.payload;
      localStorage.setItem("accessToken", action.payload);
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
      localStorage.setItem("refreshToken", action.payload);
    },
  },
});

export const { handleLogin, handleLogout, setToken, setRefreshToken } =
  authSlice.actions;

export default authSlice.reducer;
