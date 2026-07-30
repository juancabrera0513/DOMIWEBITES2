import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function NotFoundPage() {
  return (
    <>
      <Header />
      <main id="main-content" className="section">
        <div className="container max-w-3xl text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Page not found
          </h1>
          <p className="mt-5 text-white/60">
            The page may have moved. Explore our services or return to the homepage.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3">
            <Link to="/" className="btn btn-primary">Go home</Link>
            <Link to="/services" className="btn btn-outline">View services</Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
