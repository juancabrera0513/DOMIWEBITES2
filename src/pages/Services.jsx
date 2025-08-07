import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ServicesSection from "../sections/ServicesSection";

const Services = () => (
  <>
    <Helmet>
      <title>Website Services | Domi Websites</title>
      <meta
        name="description"
        content="Explore our custom website services for small businesses, including design, SEO, hosting, and maintenance tailored to your needs."
      />
      <link rel="canonical" href="https://domiwebsites.com/services" />
    </Helmet>

    <Header />
    <ServicesSection />
    <Footer />
  </>
);

export default Services;
