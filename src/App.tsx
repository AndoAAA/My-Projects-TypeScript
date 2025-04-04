import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainLayouts from "./layouts/MainLayouts";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Service from "./pages/Service";
import NotFound from "./pages/NotFound";
import DoctorSinglePage from "./components/DoctorSinglePage";
import ServiceSinglePage from "./components/ServiceSinglePage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayouts />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="about" element={<About />} />
          <Route path="about/:id" element={<DoctorSinglePage />} />
          <Route path="service" element={<Service />} />
          <Route path="service/:id" element={<ServiceSinglePage />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
