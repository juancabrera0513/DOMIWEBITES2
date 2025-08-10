import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

import HomePage from "./pages/HomePage";
import About from "./pages/About";
import Services from "./pages/Services";
import Pricing from "./pages/Pricing";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import ThankYou from "./pages/ThankYou";

const App = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({ duration: 850, offset: 200, once: true, easing: "ease-out-cubic" });
  }, []);

  useEffect(() => {
    const id = setTimeout(() => AOS.refresh(), 0);
    return () => clearTimeout(id);
  }, [location.pathname]);

  return (
    <>
      {/* <DeferredStickyBar /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>
    </>
  );
};

export default App;
