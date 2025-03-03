import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { SearchContext } from "./components/SearchContext";

function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <>
      <SearchContext.Provider
        value={{ searchTerm, setSearchTerm, totalPrice, cartItems }}
      >
        <Header />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SearchContext.Provider>
    </>
  );
}

export default App;
