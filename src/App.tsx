import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Service from "./pages/Service";
import NotFound from "./pages/NotFound";
import DoctorSinglePage from "./components/DoctorSinglePage";
import ServiceSinglePage from "./components/ServiceSinglePage";
import ScrollToTop from "./components/ScrollToTop";
import PriceList from "./pages/PriceList";
import { useEffect, useState } from "react";
import Loader from "./components/Loader";

const AppRoutes = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [location.pathname]);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<MainLayouts />}>
        <Route index element={<Home />} />
        <Route path="contact" element={<Contact />} />
        <Route path="about" element={<About />} />
        <Route path="about/:id" element={<DoctorSinglePage />} />
        <Route path="service" element={<Service />} />
        <Route path="service/:id" element={<ServiceSinglePage />} />
        <Route path="price" element={<PriceList />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
};

export default App;
