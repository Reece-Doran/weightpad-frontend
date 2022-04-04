import { configureStore } from '@reduxjs/toolkit';
import userReducer from "./features/user/userSlice"
import jwtReducer from "./features/jwt/jwtSlice"
import exceptionReducer from "./features/exception/exceptionSlice"
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { combineReducers } from "redux";
import storage from 'redux-persist/lib/storage' 
import { encryptTransform } from 'redux-persist-transform-encrypt';


const persistConfig = { 
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
      onError: function (error) {
        // Handle the error.
      },
    }),
  ],
  key: 'root',
  storage 
}

const reducers = combineReducers({
    user: userReducer,
    jwt: jwtReducer,
    exception: exceptionReducer
});

const persistedReducer = persistReducer(persistConfig, reducers) 

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });

export default store;