import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";

function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  return (
    <>
      <Header
        totalPrice={totalPrice}
        cartItems={cartItems}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
