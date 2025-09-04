// import { combineReducers, configureStore } from "@reduxjs/toolkit";
// import { baseApi } from "../api/baseApi";
// import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authReducer from "../fetures/auth/authSlice"; // এখানে সঠিক path দিন
// import cartReducer from '../../redux/fetures/shipping/shippingSlice'

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["auth", "cart"], // শুধু এগুলো persist হবে
// };


// const rootReducer = combineReducers({
//   [baseApi.reducerPath]: baseApi.reducer,
//   auth: authReducer,
//   cart: cartReducer,
// });


// const persistedReducer = persistReducer(persistConfig, rootReducer);

// export const store = configureStore({
//   reducer: {
//     [baseApi.reducerPath]: baseApi.reducer,
//     auth: persistedReducer,

//   },
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
//       },
//     }).concat(baseApi.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;

// export const persistor = persistStore(store);


import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { baseApi } from "../api/baseApi";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import authReducer from "../fetures/auth/authSlice";
import cartReducer from "../fetures/card/shippingSlice";

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "cart"], // শুধু এগুলো persist হবে , 
};

// combine reducers
const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
  cart: cartReducer,
});

// persist reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
  reducer: persistedReducer, // ✅ শুধু persistedReducer ব্যবহার করবে
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }).concat(baseApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
