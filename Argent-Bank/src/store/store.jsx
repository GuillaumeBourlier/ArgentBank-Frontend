import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import { initializeAuth } from "./authSlice";

// Configure le store Redux avec le slice d'authentification
const store = configureStore({
  reducer: {
    auth: authReducer,
  },
  devTools: import.meta.env.MODE === "development",
});

store.dispatch(initializeAuth());

export default store;
