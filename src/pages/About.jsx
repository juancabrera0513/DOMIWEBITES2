import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AboutSection from "../sections/AboutSection";

const About = () => (
  <>
    <Helmet>
      <title>About Us | Domi Websites</title>
      <meta
        name="description"
        content="Learn about Domi Websites, a web design agency in St. Louis helping small businesses grow online with custom websites and digital presence."
      />
      <link rel="canonical" href="https://domiwebsites.com/about" />
    </Helmet>

    <Header />
    <AboutSection />
    <Footer />
  </>
);

export default About;
