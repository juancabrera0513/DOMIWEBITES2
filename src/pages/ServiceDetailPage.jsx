import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SeoJsonLd from "../components/SeoJsonLd";
import { JsonLd } from "../lib/jsonld";

const SITE_URL = "https://domiwebsites.com";

export const SERVICE_PAGES = {
  "/web-design-st-louis": {
    name: "Web Design in St. Louis",
    title: "A professional website that helps St. Louis customers choose your business",
    intro:
      "Your website should make a strong first impression, explain what you do, and give people an easy reason to contact you. We build clear, modern websites for local businesses that want more calls, messages, appointments, and quote requests.",
    outcome: "Look established online and turn more visitors into real inquiries.",
    benefits: [
      "A custom design that matches your business",
      "Clear service pages written for real customers",
      "Fast loading on phones and computers",
      "Contact, quote, or appointment request forms",
      "A strong foundation for local Google searches",
      "Personal support before and after launch",
    ],
    problems: [
      "Your current website looks outdated or does not reflect your quality",
      "Customers regularly ask questions the website should answer",
      "The site is difficult to use on a phone",
      "People visit but rarely call, message, or request a quote",
    ],
    steps: [
      ["Learn your business", "We discuss your services, customers, goals, and what makes your company different."],
      ["Plan the pages", "We organize the information so visitors quickly understand what you offer and what to do next."],
      ["Design and build", "You receive a polished website that works smoothly on every common device."],
      ["Review and launch", "You approve the website before it goes live, and we help with the complete launch."],
    ],
    faqs: [
      ["How much does a business website cost?", "Professional website packages start at $1,500. You receive a clear final price before work begins."],
      ["How long does it take?", "Most small business websites take between two and four weeks after we receive the necessary content and feedback."],
      ["Will I own my website?", "Yes. Your written project scope explains ownership, hosting, and ongoing support clearly."],
    ],
  },
  "/small-business-websites": {
    name: "Small Business Websites",
    title: "A small business website that earns trust and makes contacting you simple",
    intro:
      "Small businesses do not need a complicated website. They need a professional place where customers can understand the offer, see proof, and take the next step without confusion.",
    outcome: "Give customers confidence before they call, visit, book, or buy.",
    benefits: [
      "Simple language focused on your customers",
      "Services, photos, reviews, and contact details in the right places",
      "A design that feels professional without feeling corporate",
      "Easy updates as your business changes",
      "Connection to forms, WhatsApp, or online booking",
      "Guidance from a local business that explains everything clearly",
    ],
    problems: [
      "You rely only on social media or word of mouth",
      "Your information is spread across several different platforms",
      "Customers cannot quickly find services, hours, or contact details",
      "Competitors appear more established online",
    ],
    steps: [
      ["Choose the goal", "We identify the most important action you want customers to take."],
      ["Gather the essentials", "We organize your logo, services, photos, reviews, and business information."],
      ["Build the website", "We create the pages and show you the complete experience before launch."],
      ["Help you go live", "We connect the website and make sure customers can reach you correctly."],
    ],
    faqs: [
      ["Can you help if I do not have content?", "Yes. We help organize your information and guide you on the photos and details needed."],
      ["Can customers contact me from the website?", "Yes. We can add calls, forms, WhatsApp, booking, or quote requests based on your business."],
      ["Can the website grow later?", "Yes. Additional pages and business tools can be added when you need them."],
    ],
  },
  "/website-redesign-st-louis": {
    name: "Website Redesign in St. Louis",
    title: "Turn an outdated website into a stronger reason to trust your business",
    intro:
      "A redesign is not only about changing colors. We improve the message, page order, mobile experience, speed, and contact path so the website supports the business more effectively.",
    outcome: "Keep what works, fix what causes confusion, and present your company at its best.",
    benefits: [
      "A more modern and credible appearance",
      "Clearer explanations of your services",
      "Better placement of reviews and proof",
      "Faster and easier use on mobile devices",
      "Stronger contact and quote request paths",
      "A careful launch that protects important existing pages",
    ],
    problems: [
      "The design no longer represents the quality of your work",
      "Important information is difficult to find",
      "The website is slow or frustrating on phones",
      "You are embarrassed to send customers to the site",
    ],
    steps: [
      ["Review the current site", "We identify what should stay, what should change, and where customers may be getting lost."],
      ["Improve the message", "We simplify the content and make your strongest reasons to choose the business easy to see."],
      ["Create the new experience", "We redesign and rebuild the pages while preserving useful content."],
      ["Launch carefully", "We test links, forms, mobile layouts, and important Google settings before going live."],
    ],
    faqs: [
      ["Will my current website stay online during the redesign?", "In most cases, yes. The new version is prepared separately and replaces the old site when approved."],
      ["Can you keep my existing content?", "Yes. We can reuse strong content and improve anything that is unclear or outdated."],
      ["Will a redesign help Google visibility?", "A redesign can improve speed, page structure, mobile usability, and content, but no company can guarantee a specific ranking."],
    ],
  },
  "/local-seo-st-louis": {
    name: "Local SEO in St. Louis",
    title: "Help more nearby customers find your business on Google",
    intro:
      "Local visibility starts with clear service pages, accurate business information, a strong Google Business Profile, useful content, and consistent proof that your company serves the area.",
    outcome: "Make it easier for Google and local customers to understand what you offer and where you work.",
    benefits: [
      "A review of your website and local search presence",
      "Service pages focused on real customer searches",
      "Consistent business name, phone, and service information",
      "Google Business Profile recommendations",
      "Better page titles, descriptions, links, and site structure",
      "A practical plan for reviews and local authority",
    ],
    problems: [
      "Competitors appear above you for local searches",
      "Your Google profile and website show different information",
      "You have few pages explaining individual services",
      "Your website receives traffic but not enough local inquiries",
    ],
    steps: [
      ["Review your visibility", "We examine the website, business information, important searches, and local competitors."],
      ["Fix the foundation", "We improve page structure, business details, and important technical settings."],
      ["Build useful pages", "We create content that genuinely answers what local customers need to know."],
      ["Measure and improve", "We use real search and inquiry data to decide what deserves attention next."],
    ],
    faqs: [
      ["Can you guarantee first place on Google?", "No. Google rankings depend on many factors. We focus on proven improvements and transparent reporting."],
      ["Do I need a Google Business Profile?", "For most businesses serving local customers, a complete and verified profile is an important part of local visibility."],
      ["How long does local visibility take to improve?", "Some corrections can help quickly, while competitive searches usually require consistent work over several months."],
    ],
  },
  "/customer-follow-up-tools": {
    name: "Customer Follow-Up Tools",
    title: "Respond faster and keep every new customer opportunity organized",
    intro:
      "New inquiries can arrive through forms, calls, text messages, email, and booking tools. We create a simpler follow-up process so fewer opportunities are forgotten and customers receive a timely response.",
    outcome: "Spend less time chasing information and more time serving customers.",
    benefits: [
      "One organized place for new inquiries",
      "Automatic confirmation messages",
      "Reminders for your team and customers",
      "Online booking when it fits the business",
      "Simple progress stages everyone understands",
      "A setup based on your current process",
    ],
    problems: [
      "Inquiries are scattered across email, text messages, and paper notes",
      "Customers wait too long for a first response",
      "Team members are unsure who should follow up",
      "Appointments or estimates are occasionally forgotten",
    ],
    steps: [
      ["Map the current process", "We learn how inquiries arrive and what happens from the first message to a completed job."],
      ["Remove unnecessary steps", "We simplify the process before adding any new technology."],
      ["Build the follow-up flow", "We connect forms, messages, reminders, booking, and an organized customer list."],
      ["Train and adjust", "Your team learns the new process and we refine it based on real daily use."],
    ],
    faqs: [
      ["Do I have to replace all my current tools?", "No. We first look for ways to connect or improve the tools you already use."],
      ["Can customers receive text reminders?", "Yes, when appropriate and properly configured with the necessary consent."],
      ["Is this only for large companies?", "No. Small teams often benefit the most because missed follow-up directly affects revenue."],
    ],
  },
  "/custom-business-tools": {
    name: "Custom Business Tools",
    title: "A private business tool built around the way your team actually works",
    intro:
      "When spreadsheets and generic apps create more work than they solve, a custom tool can bring customers, jobs, documents, updates, and responsibilities into one clear place.",
    outcome: "Give your team one dependable workspace instead of forcing the business into a generic system.",
    benefits: [
      "A private workspace for employees or customers",
      "Customer, job, and project information in one place",
      "Different access for owners, staff, and clients",
      "Connections to the tools you already depend on",
      "Reports built around decisions you actually make",
      "Training, documentation, and launch support",
    ],
    problems: [
      "Important information lives in several spreadsheets",
      "The same details are entered in multiple places",
      "Generic software does not match your process",
      "Customers or employees constantly ask for status updates",
    ],
    steps: [
      ["Understand the work", "We observe the steps, people, information, and decisions involved in your current process."],
      ["Define the first version", "We choose the smallest useful version that solves the most important problem."],
      ["Build and review", "You test real working versions throughout the project instead of waiting until the end."],
      ["Launch and expand", "We train your team, support the launch, and add capabilities only when they are useful."],
    ],
    faqs: [
      ["How much does a custom business tool cost?", "Projects start at $7,500. The final price depends on the number of users, features, and connections required."],
      ["Can it work with my current website?", "Yes. A business tool can connect to an existing website or operate as a separate private workspace."],
      ["Do you provide support after launch?", "Yes. Support and future improvement options are explained in the written project scope."],
    ],
  },
};

export default function ServiceDetailPage() {
  const { pathname } = useLocation();
  const service = SERVICE_PAGES[pathname];
  if (!service) return null;

  const url = `${SITE_URL}${pathname}`;
  const servesStLouis = pathname.endsWith("-st-louis");
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.intro,
    url,
    provider: { "@id": `${SITE_URL}#business` },
    areaServed: servesStLouis
      ? { "@type": "City", name: "St. Louis" }
      : { "@type": "Country", name: "United States" },
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <>
      <SeoJsonLd />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <Header />
      <main id="main-content">
        <section className="relative overflow-hidden nexus-bg hero-grid py-20 md:py-28">
          <div className="hero-vignette" />
          <div className="container relative z-10 max-w-5xl text-center">
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
              {service.name}
            </p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold leading-[1.04] text-white">
              {service.title}
            </h1>
            <p className="mt-7 max-w-3xl mx-auto text-base md:text-xl leading-8 text-white/65">
              {service.intro}
            </p>
            <div className="mt-9 flex flex-col sm:flex-row justify-center gap-3">
              <Link to="/contact" className="btn btn-primary">
                Talk about my business <ArrowRight size={17} className="ml-2" />
              </Link>
              <Link to="/work" className="btn btn-outline">See our work</Link>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container grid lg:grid-cols-[.8fr_1.2fr] gap-10 lg:gap-16 items-start">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white">What this can do for your business</h2>
              <p className="mt-5 text-lg leading-8 text-cyan-100/80">{service.outcome}</p>
              <Link to="/pricing" className="inline-flex items-center mt-7 text-cyan-300 font-semibold hover:underline">
                View starting prices <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {service.benefits.map((benefit) => (
                <div key={benefit} className="glass rounded-2xl p-5 flex gap-3 text-white/80 leading-7">
                  <span className="mt-1 h-6 w-6 rounded-full bg-cyan-300/10 border border-cyan-300/20 text-cyan-300 grid place-items-center shrink-0">
                    <Check size={14} strokeWidth={3} />
                  </span>
                  {benefit}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white/[.025] border-y border-white/5">
          <div className="container">
            <div className="max-w-3xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white">This may be right for you if</h2>
            </div>
            <div className="mt-9 grid md:grid-cols-2 gap-4">
              {service.problems.map((problem) => (
                <div key={problem} className="rounded-2xl border border-white/10 bg-black/20 p-6 text-lg text-white/70">
                  {problem}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-white">What working together looks like</h2>
            <div className="mt-10 grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {service.steps.map(([title, text], index) => (
                <article key={title} className="glass rounded-3xl p-6">
                  <div className="h-9 w-9 rounded-full bg-cyan-300/10 text-cyan-300 grid place-items-center font-bold">
                    {index + 1}
                  </div>
                  <h3 className="mt-5 text-xl font-bold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-7 text-white/60">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section bg-white/[.025] border-y border-white/5">
          <div className="container max-w-4xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center">Common questions</h2>
            <div className="mt-9 space-y-4">
              {service.faqs.map(([question, answer]) => (
                <details key={question} className="glass rounded-2xl p-6 group">
                  <summary className="cursor-pointer list-none flex justify-between gap-6 text-lg font-semibold text-white">
                    {question}<span className="text-cyan-300 group-open:rotate-45 transition">+</span>
                  </summary>
                  <p className="mt-4 leading-7 text-white/60">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container max-w-4xl text-center glass rounded-[2rem] p-8 md:p-12">
            <MessageCircle className="mx-auto text-cyan-300" size={30} />
            <h2 className="mt-5 text-3xl md:text-4xl font-bold text-white">Not sure what your business needs?</h2>
            <p className="mt-4 text-white/60 max-w-2xl mx-auto leading-7">
              Tell us what is slowing you down or what you want to improve. We will explain the simplest useful option in plain language.
            </p>
            <Link to="/contact" className="btn btn-primary mt-7">Send us a message</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
