import { Routes, Route } from "react-router-dom";
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
  useEffect(() => {
    AOS.init({
      duration: 1000,   // tiempo total de la animación
      offset: 100,      // retrasa el inicio hasta que haya más desplazamiento
      once: true,       // se anima solo una vez
      easing: "ease-in-out",
    });
      }, []);

  
  return (
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
  );
};

export default App;
