import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";

export default function TermsPage() {
  const Section = ({ id, title, children }) => (
    <section id={id} className="scroll-mt-24">
      <h2 className="text-xl md:text-2xl font-bold">{title}</h2>
      <div className="prose prose-slate max-w-none text-slate-700 mt-3">
        {children}
      </div>
    </section>
  );

  return (
    <>
      <Header />
      <main id="main-content" className="py-10 md:py-16">
        <div className="max-w-6xl mx-auto px-4">
          {/* HERO */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-10 shadow-[0_10px_35px_rgba(2,6,23,0.08)]">
            <p className="text-sm text-slate-500">Last updated: Oct 2025</p>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-1">Terms & Conditions</h1>
            <p className="text-slate-700 mt-3">
              These terms govern your use of our website and services. Please read them carefully.
              If you do not agree, you should not use this site.
            </p>

            {/* ÍNDICE */}
            <nav aria-label="Table of contents" className="mt-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#scope" className="underline hover:text-slate-900">1. Scope & Acceptance</a></li>
                  <li><a href="#services" className="underline hover:text-slate-900">2. Services</a></li>
                  <li><a href="#payments" className="underline hover:text-slate-900">3. Payments & Refunds</a></li>
                  <li><a href="#content" className="underline hover:text-slate-900">4. Client Content & Licenses</a></li>
                  <li><a href="#warranty" className="underline hover:text-slate-900">5. Warranties & Disclaimers</a></li>
                  <li><a href="#liability" className="underline hover:text-slate-900">6. Limitation of Liability</a></li>
                  <li><a href="#privacy" className="underline hover:text-slate-900">7. Privacy</a></li>
                  <li><a href="#general" className="underline hover:text-slate-900">8. General</a></li>
                </ul>
              </div>
            </nav>

            {/* CONTENIDO */}
            <div className="mt-8 space-y-8">
              <Section id="scope" title="1. Scope & Acceptance">
                <p>
                  By accessing or using this site, you agree to these Terms & Conditions. If you’re using the
                  services on behalf of a company, you represent that you have authority to bind that company.
                </p>
              </Section>

              <Section id="services" title="2. Services">
                <p>
                  We provide web design, development, and related services as described on our site or in a
                  written proposal. Any timelines are estimates and depend on client feedback and deliverables.
                </p>
              </Section>

              <Section id="payments" title="3. Payments & Refunds">
                <ul>
                  <li><strong>Deposits:</strong> A deposit may be required before work begins.</li>
                  <li><strong>Invoices:</strong> Payment is due upon receipt unless otherwise agreed.</li>
                  <li><strong>Refunds:</strong> Due to the nature of design work, completed milestones are non-refundable.</li>
                </ul>
              </Section>

              <Section id="content" title="4. Client Content & Licenses">
                <p>
                  You grant us a non-exclusive license to use your content, logos, and brand assets to deliver
                  the project. You confirm you own (or have rights to) the materials you provide.
                </p>
              </Section>

              <Section id="warranty" title="5. Warranties & Disclaimers">
                <p>
                  We deliver work using best practices; however, we do not warrant uninterrupted or error-free
                  operation. To the maximum extent permitted by law, services are provided “as is”.
                </p>
              </Section>

              <Section id="liability" title="6. Limitation of Liability">
                <p>
                  In no event will we be liable for indirect, incidental, or consequential damages. Our total
                  liability shall not exceed the fees paid by you for the applicable services in the 3 months prior
                  to the claim.
                </p>
              </Section>

              <Section id="privacy" title="7. Privacy">
                <p>
                  Our use of personal data is described in our <a className="underline" href="/privacy">Privacy Policy</a>.
                </p>
              </Section>

              <Section id="general" title="8. General">
                <ul>
                  <li><strong>Governing law:</strong> Missouri, USA (or according to your jurisdiction if specified in the proposal).</li>
                  <li><strong>Changes:</strong> We may update these terms; material changes will be announced on this page.</li>
                  <li><strong>Contact:</strong> For questions, email <a className="underline" href="mailto:hello@domiwebsites.com">hello@domiwebsites.com</a>.</li>
                </ul>
              </Section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <StickyCTA />
    </>
  );
}
