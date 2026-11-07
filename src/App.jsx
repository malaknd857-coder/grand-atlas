
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Units from "./pages/Units";
import UnitDetails from "./pages/UnitDetails";
import Zones from "./pages/Zones";
import Developers from "./pages/Developers";
import ContactUs from "./pages/ContactUs";

import "./App.css";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

const Layout = () => {
  return (
    <>
      <ScrollToTop />
      <Navbar />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/units" element={<Units />} />
          <Route path="/units/:id" element={<UnitDetails />} />
          <Route path="/zones" element={<Zones />} />
          <Route path="/developers" element={<Developers />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route
            path="*"
            element={
              <div className="not-found container">
                <h1>404</h1>
                <h2>Page Not Found</h2>
                <a href="/" className="btn btn-primary">Back Home</a>
              </div>
            }
          />
        </Routes>
      </main>

      <Footer />
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
};

export default App;
