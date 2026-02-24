import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function TermsPage() {
  const title = "Terms & Conditions | Domi Websites";
  const description =
    "Read the terms and conditions governing the use of Domi Websites' website and services.";

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
            <p className="text-sm text-white/50 mb-2">Last updated: February 2026</p>

            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-6">
              Terms & Conditions
            </h1>

            <p className="text-white/70">
              These Terms & Conditions (“Terms”) govern your access to and use of
              the Domi Websites website (the “Site”) and any services we provide
              (the “Services”). By using the Site or Services, you agree to these
              Terms.
            </p>

            <Section id="scope" title="1. Scope & Acceptance">
              <p>
                If you use the Services on behalf of a business or organization,
                you represent that you have authority to bind that entity to
                these Terms.
              </p>
            </Section>

            <Section id="services" title="2. Services & Deliverables">
              <p>
                We provide web design, web development, custom software, AI
                chatbots, and automation solutions. The scope, deliverables,
                timeline, pricing, and any ongoing support will be described in
                a proposal, invoice, or written agreement (collectively, the
                “Order”).
              </p>
              <p>
                Timelines depend on the agreed scope and your timely delivery of
                content, feedback, and approvals. Delays caused by missing
                client inputs may shift timelines.
              </p>
            </Section>

            <Section id="client-responsibilities" title="3. Client Responsibilities">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  You are responsible for providing accurate information,
                  content, assets, and approvals needed to complete the project.
                </li>
                <li>
                  You represent you own or have rights to use any content,
                  images, logos, trademarks, or materials you provide.
                </li>
                <li>
                  You are responsible for maintaining access to third-party
                  accounts you choose to use (domain registrar, hosting, email,
                  analytics, ad accounts, etc.).
                </li>
              </ul>
            </Section>

            <Section id="payments" title="4. Payments, Invoices & Refunds">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Deposits may be required before work begins. Unless otherwise
                  stated in the Order, deposits are non-refundable.
                </li>
                <li>
                  Invoices are due upon receipt unless stated otherwise in the
                  Order.
                </li>
                <li>
                  Work completed for approved milestones is non-refundable.
                </li>
                <li>
                  If you cancel a project after work has started, you are
                  responsible for payment for work performed up to the
                  cancellation date.
                </li>
              </ul>
              <p className="text-white/70">
                Payment processing may be handled by third-party providers (for
                example, Stripe). We do not store full payment card details on
                our servers.
              </p>
            </Section>

            <Section id="revisions" title="5. Revisions & Changes">
              <p>
                Reasonable revisions are typically included as described in the
                Order. Requests that materially change the scope may require
                additional fees and timeline adjustments. We will notify you
                before proceeding with out-of-scope work.
              </p>
            </Section>

            <Section id="third-party" title="6. Third-Party Tools & Services">
              <p>
                Your project may rely on third-party services (e.g., hosting,
                domains, analytics, ads platforms, email delivery, payment
                processors, APIs). Third-party services are governed by their
                own terms and privacy policies. We are not responsible for
                outages, changes, fees, or policies of third parties.
              </p>
            </Section>

            <Section id="ip" title="7. Intellectual Property">
              <p>
                Upon full payment, you receive a license to use the final
                deliverables created specifically for you, as outlined in the
                Order.
              </p>
              <p>
                We retain rights to our pre-existing materials, frameworks,
                templates, libraries, processes, and know-how (“Background IP”).
                Background IP may be included in deliverables and remains ours.
              </p>
            </Section>

            <Section id="portfolio" title="8. Portfolio & Publicity">
              <p>
                Unless you request in writing that we do not, you grant us
                permission to display your project (e.g., name, logo, screenshots,
                and a short description) in our portfolio and marketing materials.
                This does not include sharing confidential information.
              </p>
            </Section>

            <Section id="disclaimers" title="9. Warranties & Disclaimers">
              <p>
                The Site and Services are provided on an “as is” and “as
                available” basis. We do not guarantee uninterrupted operation,
                specific rankings, ad performance, lead volume, or revenue
                outcomes, as results depend on many factors outside our control.
              </p>
            </Section>

            <Section id="liability" title="10. Limitation of Liability">
              <p>
                To the maximum extent permitted by law, Domi Websites will not be
                liable for any indirect, incidental, special, consequential, or
                punitive damages. Our total liability for any claim will not
                exceed the fees you paid to us for the Services giving rise to
                the claim in the three (3) months prior to the event.
              </p>
            </Section>

            <Section id="indemnity" title="11. Indemnification">
              <p>
                You agree to defend, indemnify, and hold harmless Domi Websites
                from claims arising out of your content, your use of the Site or
                Services, or your violation of these Terms or third-party rights.
              </p>
            </Section>

            <Section id="privacy" title="12. Privacy">
              <p>
                Our data practices are described in our{" "}
                <a href="/privacy" className="underline text-cyan-300">
                  Privacy Policy
                </a>
                .
              </p>
            </Section>

            <Section id="changes" title="13. Changes to These Terms">
              <p>
                We may update these Terms from time to time. The “Last updated”
                date above indicates the latest revision. Your continued use of
                the Site or Services after changes become effective means you
                accept the updated Terms.
              </p>
            </Section>

            <Section id="law" title="14. Governing Law">
              <p>
                These Terms are governed by the laws of the State of Missouri,
                USA, without regard to conflict of law rules.
              </p>
            </Section>

            <Section id="contact" title="15. Contact">
              <p>
                Questions about these Terms? Contact us at{" "}
                <a
                  href="mailto:admin@domiwebsites.com"
                  className="underline text-cyan-300"
                >
                  admin@domiwebsites.com
                </a>
                .
              </p>
            </Section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}