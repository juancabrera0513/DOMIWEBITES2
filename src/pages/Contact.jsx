import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ContactSection from "../sections/ContactSection";

const Contact = () => (
  <>
    <Helmet>
      <title>Contact Us | Domi Websites | St. Louis Web Design</title>
      <meta
        name="description"
        content="Get in touch with Domi Websites for a free web design consultation. We serve small businesses in St. Louis and across the U.S."
      />
      <link rel="canonical" href="https://domiwebsites.com/contact" />
    </Helmet>

    <Header />
    <ContactSection />
    <Footer />
  </>
);

export default Contact;
