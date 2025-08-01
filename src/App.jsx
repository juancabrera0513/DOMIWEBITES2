import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Importa los estilos de AOS

import Header from './Header';
import Home from './Home';
import About from './About';
import Services from './Services';
import Pricing from './Pricing';
import Contact from './Contact';
import Footer from './Footer';
import './index.css';

const App = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000, // Animaciones de 1000ms
      once: true,     // Animar solo la primera vez que aparece en pantalla
      easing: 'ease-in-out', // Animación suave
    });
  }, []);

  return (
    <div>
      <Header />
      <Home />
      <About />
      <Services />
      <Pricing />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
 