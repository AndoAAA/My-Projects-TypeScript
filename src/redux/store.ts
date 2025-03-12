import { configureStore } from "@reduxjs/toolkit";
import filter from "../redux/filter/filterSlice";
import cart from "../redux/cart/cartSlice";
import pizzas from "../redux/pizza/pizzaSlice";
import { useDispatch } from "react-redux";

export const store = configureStore({
  reducer: {
    filter,
    cart,
    pizzas
  },
});

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();