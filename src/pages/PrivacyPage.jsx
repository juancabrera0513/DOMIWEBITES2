import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";

export default function PrivacyPage() {
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
          <div className="rounded-2xl border border-slate-200 bg-white p-6 md:p-10 shadow-[0_10px_35px_rgba(2,6,23,0.08)]">
            <p className="text-sm text-slate-500">Last updated: Oct 2025</p>
            <h1 className="text-3xl md:text-4xl font-extrabold mt-1">Privacy Policy</h1>
            <p className="text-slate-700 mt-3">
              This policy explains what information we collect, how we use it, and your choices.
            </p>

            <nav aria-label="Table of contents" className="mt-6">
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <ul className="grid md:grid-cols-2 gap-2 text-sm">
                  <li><a href="#info" className="underline hover:text-slate-900">1. Information We Collect</a></li>
                  <li><a href="#use" className="underline hover:text-slate-900">2. How We Use Information</a></li>
                  <li><a href="#share" className="underline hover:text-slate-900">3. Sharing</a></li>
                  <li><a href="#security" className="underline hover:text-slate-900">4. Security</a></li>
                  <li><a href="#choices" className="underline hover:text-slate-900">5. Your Choices</a></li>
                  <li><a href="#contact" className="underline hover:text-slate-900">6. Contact</a></li>
                </ul>
              </div>
            </nav>

            <div className="mt-8 space-y-8">
              <Section id="info" title="1. Information We Collect">
                <ul>
                  <li>Contact details you provide (e.g., name, email, phone).</li>
                  <li>Project details you submit via forms or WhatsApp.</li>
                  <li>Analytics and usage data (cookies, device info).</li>
                </ul>
              </Section>

              <Section id="use" title="2. How We Use Information">
                <ul>
                  <li>To respond to inquiries and deliver services.</li>
                  <li>To improve performance, UX, and security of the site.</li>
                  <li>To communicate important updates.</li>
                </ul>
              </Section>

              <Section id="share" title="3. Sharing">
                <p>
                  We do not sell personal data. We may share with service providers (e.g., hosting, analytics) under strict confidentiality.
                </p>
              </Section>

              <Section id="security" title="4. Security">
                <p>
                  We use reasonable technical and organizational measures to protect your data. No method is 100% secure.
                </p>
              </Section>

              <Section id="choices" title="5. Your Choices">
                <ul>
                  <li>Opt-out of non-essential cookies via your browser settings.</li>
                  <li>Request access or deletion by emailing <a className="underline" href="mailto:hello@domiwebsites.com">hello@domiwebsites.com</a>.</li>
                </ul>
              </Section>

              <Section id="contact" title="6. Contact">
                <p>For questions about this policy, email <a className="underline" href="mailto:hello@domiwebsites.com">hello@domiwebsites.com</a>.</p>
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
