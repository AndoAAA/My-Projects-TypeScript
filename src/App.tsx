import "./App.css";
import Header from "./components/Header";
import Home from "./pages/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchResults from "./pages/SearchResults";
import Book from "./pages/Book";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/works/:id" element={<Book />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
