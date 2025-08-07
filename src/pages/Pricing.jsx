import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import PricingSection from "../sections/PricingSection";

const Pricing = () => (
  <>
    <Helmet>
      <title>Website Pricing | Affordable Web Design | Domi Websites</title>
      <meta
        name="description"
        content="Check our affordable web design pricing plans for small businesses. Choose the right package that fits your goals and budget."
      />
      <link rel="canonical" href="https://domiwebsites.com/pricing" />
    </Helmet>

    <Header />
    <PricingSection />
    <Footer />
  </>
);

export default Pricing;
