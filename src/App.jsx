import React from 'react';
import Header from './Header';
import Home from './Home';
import About from './About';
import Services from './Services';
import Pricing from './Pricing';
import Contact from './Contact';
import Footer from './Footer';
import './index.css';

const App = () => {
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
