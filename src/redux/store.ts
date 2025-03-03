import { configureStore } from "@reduxjs/toolkit";
import filter from "../redux/filter/filterSlice";

export const store = configureStore({
  reducer: {
    filter,
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
