import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";
import StickyCTA from "../components/StickyCTA";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Domi Websites | Custom Software & Web Development</title>
        <meta
          name="description"
          content="Learn how Domi Websites builds high-performing websites and custom software systems — including CRMs, automation platforms, and AI-powered tools — engineered to scale with your business."
        />
        <link rel="canonical" href="https://domiwebsites.com/about" />
      </Helmet>

      <Header />

      <main id="main-content" className="nexus-bg hero-grid relative overflow-hidden">
        <div className="hero-vignette pointer-events-none absolute inset-0 z-0" />

        <section className="section relative z-10">
          <div className="container max-w-5xl">

            <div className="text-center">
              <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-200/70 mb-3">
                ABOUT DOMI WEBSITES
              </p>

              <h1 className="font-extrabold tracking-tight leading-[1.05]">
                <span className="block text-[40px] sm:text-[56px] md:text-[72px] text-white">
                  We build more than websites.
                </span>
                <span className="block text-[48px] sm:text-[64px] md:text-[82px] grad-text">
                  We build systems.
                </span>
              </h1>

              <p className="mt-8 text-[15px] sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
                Domi Websites is a digital & software studio focused on building
                high-performing websites and custom software solutions that help
                small and growing businesses operate smarter and scale faster.
              </p>
            </div>

            <div className="mt-20 grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Our Mission
                </h2>
                <p className="text-white/60 mt-4 leading-relaxed">
                  To empower small and local businesses with technology that was
                  once only available to large companies — including CRMs,
                  automation tools, AI-powered chatbots, internal dashboards,
                  and scalable web platforms.
                </p>
                <p className="text-white/60 mt-4 leading-relaxed">
                  We believe software should simplify operations, increase
                  revenue, and create leverage — not complexity.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  What Makes Us Different
                </h2>
                <ul className="mt-4 space-y-3 text-white/60">
                  <li>• We focus on performance and conversion — not just design.</li>
                  <li>• We build scalable systems, not static pages.</li>
                  <li>• We integrate automation and AI from day one.</li>
                  <li>• We think long-term growth, not short-term fixes.</li>
                </ul>
              </div>
            </div>

            <div className="mt-24">
              <div className="glass rounded-2xl p-8 md:p-12 border border-white/10">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Meet the Founder
                </h2>

                <p className="text-white/60 mt-4 leading-relaxed">
                  Domi Websites was founded by Juan Cabrera, a developer focused
                  on combining modern web technologies with scalable software
                  architecture.
                </p>

                <p className="text-white/60 mt-4 leading-relaxed">
                  With experience building custom systems, internal platforms,
                  and performance-driven websites, Juan approaches each project
                  with a long-term mindset: build once, scale properly.
                </p>

                <p className="text-white/60 mt-4 leading-relaxed">
                  Every project is engineered with growth, automation, and
                  future expansion in mind.
                </p>
              </div>
            </div>

            <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Performance First",
                  text: "Speed, structure, and clean architecture are non-negotiable."
                },
                {
                  title: "Scalable by Design",
                  text: "Everything is built to grow with your business."
                },
                {
                  title: "Automation-Ready",
                  text: "We integrate systems that reduce manual work."
                }
              ].map((item) => (
                <div
                  key={item.title}
                  className="glass rounded-2xl p-6 border border-white/10"
                >
                  <h3 className="text-white font-semibold text-lg">
                    {item.title}
                  </h3>
                  <p className="text-white/60 mt-3 text-sm leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-28 text-center">
              <h3 className="text-2xl md:text-3xl font-bold text-white">
                Ready to build something scalable?
              </h3>

              <p className="text-white/60 mt-4">
                Let’s design and develop the right system for your business.
              </p>

              <div className="mt-8">
                <a
                  href="/contact"
                  className="btn btn-primary"
                >
                  Start a Project →
                </a>
              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
      <StickyCTA />
    </>
  );
}
