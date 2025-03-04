import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getCartFromLS } from "../../utils/getCartFromLS";
import { CartItem, CartSliceState } from "./types";
import { calcTotalPrice } from "../../utils/calcTotalPrice";

const initialState: CartSliceState = getCartFromLS();

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart(state, action: PayloadAction<CartItem>) {
      const findItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (findItem) {
        findItem.count++;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    minusItem(state, action: PayloadAction<string>) {
      const findItem = state.items.find((item) => item.id === action.payload);

      if (findItem) {
        findItem.count--;
      }

      state.totalPrice = calcTotalPrice(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    removeItem(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
      state.totalPrice = calcTotalPrice(state.items);
      localStorage.setItem("cartItems", JSON.stringify(state.items));
    },
    clearItems(state) {
      state.items = [];
      state.totalPrice = 0;
      localStorage.setItem("cartItems", JSON.stringify([]));
    },
  },
});

export const { addToCart, minusItem, removeItem, clearItems } =
  cartSlice.actions;

export default cartSlice.reducer;
