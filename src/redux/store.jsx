import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./UserSlice";

const initialToken = localStorage.getItem("token") ?? null;

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: {
    user: {
      token: initialToken,
      loading: false,
      user: null,
      error: null,
      saved: false,
    },
  },
  devTools: true,
});
