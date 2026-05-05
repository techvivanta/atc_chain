import { useEffect, useState } from "react";
import "./App.css";
// import "./temp.css"
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AboutUs from "./pages/about/AboutUs";
import News from "./pages/news/News";
import BlogDetails from "./pages/blog/details/BlogDetails";
import Career from "./pages/career/Career";
import ContactUs from "./pages/Contact/ContactUs";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Industries from "./pages/Industries/Industries";
import OurProduct from "./pages/product/OurProduct";
import Error from "./pages/error/Error";
import WhatsappIcon from "./components/common/WhatsappIcon";
import { handleDisplayScaling } from "./utils/handleDisplayScaling";
import { useLocation } from "react-router-dom";

function PageViewTracker() {
  const location = useLocation();

  useEffect(() => {
    if (typeof window.gtag === "function") {
      window.gtag("config", "G-GB4DNYD3W6", {
        page_path: `${location.pathname}${location.search}${location.hash}`,
      });
    }
  }, [location]);

  return null;
}

function App() {
  useEffect(() => {
    // const cleanup = handleDisplayScaling(1536, 864);
    // return cleanup;
  }, []);

  return (
    <>
      <BrowserRouter>
        <PageViewTracker />
        <ScrollToTop />
        <WhatsappIcon />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<OurProduct />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/news" element={<News />} />
          <Route path="/news/details/:slug" element={<BlogDetails />} />
          <Route path="/jobs" element={<Career />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/industries" element={<Industries />} />
          <Route path="/downloads" element={<Industries />} />
          <Route path="*" element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
