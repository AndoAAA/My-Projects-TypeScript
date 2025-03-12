import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Pizza} from "./types";

export const fetchPizzas = createAsyncThunk<
  Pizza[],
  { category: number; sort: string; searchTerm: string }
>("pizzas/fetchPizzasStatus", async ({ category, sort, searchTerm }) => {
  const isDescending = sort.startsWith("-");
  const sortBy = sort.replace("-", "");
  const order = isDescending ? "desc" : "asc";

  const params = new URLSearchParams();
  if (category > 0) params.append("category", String(category));
  params.append("sortBy", sortBy);
  params.append("order", order);
  if (searchTerm) params.append("search", searchTerm);

  const { data } = await axios.get<Pizza[]>(
    `https://66dc505a47d749b72acb471f.mockapi.io/pizzas?${params.toString()}`
  );
  return data;
});
