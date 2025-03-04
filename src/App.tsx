import React, { createContext, useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";
import Cart from "./pages/Cart";
import NotFound from "./pages/NotFound";
import { SearchContext } from "./components/SearchContext";

function App() {
 
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
