import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Service from "./pages/Service";
import Header from "./components/Header";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route path="home" element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="service" element={<Service />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
