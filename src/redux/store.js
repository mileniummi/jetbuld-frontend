import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/userReducer";
import { companyReducer } from "./reducers/companyReducer";
import { appReducer } from "./reducers/appReducer";
import { projectReducer } from "./reducers/projectReducer";
import { pointReducer } from "./reducers/pointReducer";
import { photoReducer } from "./reducers/photoReducer";
import { authApi } from "../rservices/authService";

export const getStore = () => {
  const preloadedState = localStorage.getItem("reduxState") ? JSON.parse(localStorage.getItem("reduxState")) : {};

  const store = configureStore({
    reducer: {
      app: appReducer,
      users: userReducer,
      companies: companyReducer,
      projects: projectReducer,
      points: pointReducer,
      photos: photoReducer,
      [authApi.reducerPath]: authApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware),
    preloadedState,
  });

  store.subscribe(() => {
    localStorage.setItem("reduxState", JSON.stringify(store.getState()));
  });

  return store;
};
