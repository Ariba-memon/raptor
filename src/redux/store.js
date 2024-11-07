// // ** Redux Imports
// import rootReducer from './rootReducer'
// import { configureStore } from '@reduxjs/toolkit'

// const store = configureStore({
//   reducer: rootReducer,
//   middleware: getDefaultMiddleware => {
//     return getDefaultMiddleware({
//       serializableCheck: false
//     })
//   }
// })

// export { store }


// redux/store.js
// import { configureStore } from '@reduxjs/toolkit';
// import { persistStore, persistReducer } from 'redux-persist';
// import rootReducer from './rootReducer'
// import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: getDefaultMiddleware => getDefaultMiddleware({
//     serializableCheck: false,
//   }),
// });

// const persistor = persistStore(store);

// export { store, persistor };

// ** Redux Imports
import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from './rootReducer';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist the 'auth' reducer, if you will multiple so you have use like  whitelist: ['auth', user]
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

const persistor = persistStore(store);

export { store, persistor };
