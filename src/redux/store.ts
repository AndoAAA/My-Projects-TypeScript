import { configureStore } from "@reduxjs/toolkit";
import filter from "../redux/filter/filterSlice";
import cart from "../redux/cart/cartSlice"

export const store = configureStore({
  reducer: {
    filter,
    cart
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
