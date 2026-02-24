import React from "react";
import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function PrivacyPage() {
  const title = "Privacy Policy | Domi Websites";
  const description =
    "Read Domi Websites' privacy policy to understand how we collect, use, and protect your information.";

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
        <link rel="canonical" href="https://domiwebsites.com/privacy" />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Privacy Policy",
            description,
            url: "https://domiwebsites.com/privacy",
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
              Privacy Policy
            </h1>

            <p className="text-white/70">
              Domi Websites (“Domi Websites,” “we,” “us,” “our”) values your
              privacy. This Privacy Policy explains how we collect, use, share,
              and protect information when you visit our website (the “Site”) or
              interact with our services (the “Services”).
            </p>

            <Section id="info-we-collect" title="1. Information We Collect">
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <b>Contact information:</b> name, email, phone number, and
                  details you submit through forms or messages.
                </li>
                <li>
                  <b>Project/service information:</b> business details and
                  requirements you share for a project or quote.
                </li>
                <li>
                  <b>Chat interactions:</b> if you use our chatbot, we may
                  receive the information you enter. Chat messages may be stored
                  in our database to provide support and improve the experience.
                </li>
                <li>
                  <b>Usage and device data:</b> IP address, browser type, pages
                  visited, and approximate location derived from IP for analytics
                  and security.
                </li>
                <li>
                  <b>Payment data:</b> payments are processed by third-party
                  providers (e.g., Stripe). We do not store full payment card
                  numbers on our servers.
                </li>
              </ul>
            </Section>

            <Section id="how-we-use" title="2. How We Use Information">
              <ul className="list-disc pl-6 space-y-2">
                <li>To respond to inquiries, provide quotes, and deliver Services.</li>
                <li>To communicate about projects, support, and updates.</li>
                <li>To operate, secure, and improve the Site and Services.</li>
                <li>
                  To measure traffic and performance using analytics (when
                  permitted by your choices).
                </li>
                <li>
                  To run advertising and measure conversions (when permitted by
                  your choices).
                </li>
              </ul>
            </Section>

            <Section id="cookies" title="3. Cookies & Similar Technologies">
              <p>
                We use cookies and similar technologies for site functionality,
                analytics, and advertising. Cookies may be set by us and by
                third-party partners.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <b>Functional cookies:</b> help the Site work properly and
                  remember basic preferences.
                </li>
                <li>
                  <b>Analytics cookies:</b> help us understand traffic and usage
                  (e.g., Google Analytics).
                </li>
                <li>
                  <b>Advertising cookies:</b> help measure ad performance and
                  conversions (e.g., Google Ads).
                </li>
              </ul>
              <p>
                You can manage cookies through your browser settings. Where
                available, you may also choose to accept or decline non-essential
                cookies via our consent banner.
              </p>
            </Section>

            <Section id="third-parties" title="4. Third-Party Services">
              <p>
                We may use third-party services to operate and improve the Site
                and Services. These providers may collect technical data under
                their own policies.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Google Analytics (site analytics)</li>
                <li>Google Ads (advertising, conversion measurement)</li>
                <li>Stripe (payment processing)</li>
                <li>EmailJS or email delivery tools (contact form delivery)</li>
                <li>Supabase (database and backend services for features like chat)</li>
              </ul>
            </Section>

            <Section id="sharing" title="5. How We Share Information">
              <p>We do not sell your personal information.</p>
              <p>
                We may share information with service providers that help us run
                our business (hosting, analytics, payments, email delivery, etc.).
                We may also share information if required by law or to protect
                rights, safety, and security.
              </p>
            </Section>

            <Section id="data-security" title="6. Data Security">
              <p>
                We use reasonable administrative, technical, and physical
                safeguards designed to protect your information. No method of
                transmission or storage is 100% secure, but we work to protect
                your data using industry-standard practices.
              </p>
            </Section>

            <Section id="retention" title="7. Data Retention">
              <p>
                We keep information as long as needed to provide Services, comply
                with legal obligations, resolve disputes, and enforce agreements.
                We may retain project communications (including chat messages)
                for support and recordkeeping.
              </p>
            </Section>

            <Section id="your-rights" title="8. Your Privacy Choices">
              <p>
                Depending on your location, you may have rights to request
                access, correction, deletion, or information about how your data
                is used. You can contact us to submit a request.
              </p>
              <p>
                You may also control cookies through browser settings and, where
                available, through our consent banner (accept/decline
                non-essential cookies).
              </p>
            </Section>

            <Section id="children" title="9. Children’s Privacy">
              <p>
                Our Site is not directed to children under 13, and we do not
                knowingly collect personal information from children.
              </p>
            </Section>

            <Section id="changes" title="10. Changes to This Policy">
              <p>
                We may update this Privacy Policy from time to time. The “Last
                updated” date above indicates the latest revision.
              </p>
            </Section>

            <Section id="contact" title="11. Contact">
              <p>
                Questions? Email us at{" "}
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