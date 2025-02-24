import React, { useState } from "react";

import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";

function App() {
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  return (
    <div className="App">
      <Header totalPrice={totalPrice} cartItems={cartItems} />
      <Home />
    </div>
  );
}

export default App;
