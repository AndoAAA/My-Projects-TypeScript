import { createContext } from "react";

type SearchContextType = {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  totalPrice: number;
  cartItems: number;
};

export const SearchContext = createContext<SearchContextType | null>(null);
