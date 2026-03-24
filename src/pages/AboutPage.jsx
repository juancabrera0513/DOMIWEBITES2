import { Helmet } from "react-helmet-async";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>About Domi Websites | Web Development & Business Systems</title>
        <meta
          name="description"
          content="Domi Websites helps small businesses grow with high-performing websites, automation, and custom business systems built to scale."
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
                  We build business systems.
                </span>
              </h1>

              <p className="mt-8 text-[15px] sm:text-lg text-white/60 max-w-3xl mx-auto leading-relaxed">
                Most businesses don’t just need a website. They need a system.
                A system that brings leads, saves time, and helps the business grow.
                That’s what we build at Domi Websites.
              </p>
            </div>

            <div className="mt-20 grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Our Mission
                </h2>
                <p className="text-white/60 mt-4 leading-relaxed">
                  Our mission is simple. Help small and local businesses use technology
                  the same way big companies do.
                </p>
                <p className="text-white/60 mt-4 leading-relaxed">
                  That means websites that generate leads, systems that automate work,
                  and software that helps you run your business more efficiently.
                  Technology should make your business easier to run, not more complicated.
                </p>
              </div>

              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  What Makes Us Different
                </h2>
                <ul className="mt-4 space-y-3 text-white/60">
                  <li>• We don’t just build websites. We build tools that help businesses grow.</li>
                  <li>• We focus on results, leads, and automation.</li>
                  <li>• We think like business owners, not just developers.</li>
                  <li>• We build for long-term growth, not just to launch a site.</li>
                </ul>
              </div>
            </div>

            <div className="mt-24">
              <div className="glass rounded-2xl p-8 md:p-12 border border-white/10">
                <h2 className="text-2xl md:text-3xl font-bold text-white">
                  Meet the Founder
                </h2>

                <p className="text-white/60 mt-4 leading-relaxed">
                  Domi Websites was founded by Juan Cabrera, a developer focused on building
                  websites and custom business software for small and growing companies.
                </p>

                <p className="text-white/60 mt-4 leading-relaxed">
                  After working with different businesses, one thing became clear.
                  Most companies don’t just need a website. They need better systems.
                  They need automation, better lead tracking, better internal tools,
                  and technology that actually helps the business grow.
                </p>

                <p className="text-white/60 mt-4 leading-relaxed">
                  That’s why Domi Websites focuses not only on design, but on building
                  the technology behind the business. Websites, internal tools, automation,
                  and custom systems built to scale as the business grows.
                </p>
              </div>
            </div>

            <div className="mt-24 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "Built for Growth",
                  text: "Everything is designed to help your business grow, not just look good."
                },
                {
                  title: "Automation Focused",
                  text: "We build systems that save time and reduce manual work."
                },
                {
                  title: "Long-Term Thinking",
                  text: "We build things the right way so they can scale with your business."
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
                Ready to build something that actually helps your business grow?
              </h3>

              <p className="text-white/60 mt-4">
                Let’s talk and see what we can build for you.
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
    </>
  );
}