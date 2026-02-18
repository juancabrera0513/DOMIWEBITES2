import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPage() {
  const title = "Terms & Conditions | Domi Websites";
  const description =
    "Read the terms and conditions governing the use of Domi Websites services.";

  const Section = ({ id, title, children }) => (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-semibold text-white mt-10">
        {title}
      </h2>
      <div className="mt-3 text-white/70 leading-relaxed space-y-3">
        {children}
      </div>
    </section>
  );

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href="https://domiwebsites.com/terms" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Terms & Conditions",
            description,
            url: "https://domiwebsites.com/terms",
          })}
        </script>
      </Helmet>

      <Header />

      <main className="section relative overflow-hidden nexus-bg hero-grid">
        <div className="hero-vignette" />

        <div className="container relative z-10 max-w-4xl">
          <div className="glass rounded-2xl p-8 md:p-12 border border-white/10">
            <p className="text-sm text-white/50 mb-2">Last updated: October 2025</p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Terms & Conditions
            </h1>

            <p className="text-white/70">
              These terms govern your use of our website and services. By
              accessing this site, you agree to these terms.
            </p>

            <Section id="scope" title="1. Scope & Acceptance">
              <p>
                By using our services, you agree to comply with these terms. If
                you act on behalf of a company, you confirm you have authority.
              </p>
            </Section>

            <Section id="services" title="2. Services">
              <p>
                We provide web design, development, and custom software
                solutions. Timelines depend on project scope and client feedback.
              </p>
            </Section>

            <Section id="payments" title="3. Payments & Refunds">
              <ul className="list-disc pl-6 space-y-2">
                <li>Deposits may be required before work begins.</li>
                <li>Invoices are due upon receipt unless otherwise agreed.</li>
                <li>Completed milestones are non-refundable.</li>
              </ul>
            </Section>

            <Section id="content" title="4. Client Content">
              <p>
                You grant us permission to use provided assets for project
                completion and confirm ownership rights.
              </p>
            </Section>

            <Section id="warranty" title="5. Warranties & Disclaimers">
              <p>
                Services are provided “as is” without guarantees of uninterrupted
                operation.
              </p>
            </Section>

            <Section id="liability" title="6. Limitation of Liability">
              <p>
                Liability shall not exceed fees paid in the previous three
                months prior to any claim.
              </p>
            </Section>

            <Section id="privacy" title="7. Privacy">
              <p>
                Our data practices are described in our{" "}
                <a href="/privacy" className="underline text-cyan-300">
                  Privacy Policy
                </a>.
              </p>
            </Section>

            <Section id="general" title="8. General">
              <ul className="list-disc pl-6 space-y-2">
                <li>Governing Law: Missouri, USA.</li>
                <li>We may update these terms periodically.</li>
                <li>
                  Contact:{" "}
                  <a
                    href="mailto:hello@domiwebsites.com"
                    className="underline text-cyan-300"
                  >
                    hello@domiwebsites.com
                  </a>
                </li>
              </ul>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
