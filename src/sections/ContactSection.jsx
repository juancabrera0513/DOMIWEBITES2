import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  CalendarDays,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Send,
  Smartphone,
} from "lucide-react";

const MIN_NAME = 2;
const MIN_MSG = 10;

const CALENDLY = "https://calendly.com/domiwebsites/website-consultation";
const WHATSAPP =
  "https://wa.me/13143769667?text=Hi%20Domi%20Websites.%20I%20would%20like%20to%20talk%20about%20a%20project.";
const SMS =
  "sms:+13143769667?body=Hi%20Domi%20Websites.%20I%20would%20like%20to%20talk%20about%20a%20project.";
const EMAIL_TO = "hello@domiwebsites.com";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function ContactSection({ standalone = false }) {
  const rootRef = useRef(null);
  const formRef = useRef(null);
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const phoneRef = useRef(null);
  const subjectRef = useRef(null);
  const msgRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [subjectValue, setSubjectValue] = useState("");
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "service_ywkf6l7";
  const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "template_68t4i9b";
  const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "QomFGcKltdQDXhSSp";

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let s = params.get("subject");
    if (!s && window.location.hash.includes("?")) {
      const hashQuery = new URLSearchParams(window.location.hash.split("?")[1]);
      s = hashQuery.get("subject");
    }
    if (s) {
      setSubjectValue(s);
      setForm((f) => ({ ...f, subject: s }));
    }
  }, []);

  useEffect(() => {
    const els = rootRef.current?.querySelectorAll(".reveal");
    if (!els?.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add("in");
        });
      },
      { threshold: 0.18 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
    if (name === "subject") setSubjectValue(value);
    if (errors[name]) setErrors((er) => ({ ...er, [name]: undefined }));
  };

  const validate = () => {
    const trimmed = {
      fullName: form.fullName.trim(),
      email: form.email.trim(),
      phone: form.phone.trim(),
      subject: form.subject.trim(),
      message: form.message.trim(),
    };

    const next = {};
    if (trimmed.fullName.length < MIN_NAME) next.fullName = `Please enter at least ${MIN_NAME} characters.`;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(trimmed.email);
    if (!emailOk) next.email = "Please enter a valid email.";
    if (trimmed.phone && !/^[\d\s()+-]{7,}$/.test(trimmed.phone)) {
      next.phone = "Please enter a valid mobile number.";
    }
    if (!trimmed.subject) next.subject = "Please add a subject.";
    if (trimmed.message.length < MIN_MSG) next.message = `Message must be at least ${MIN_MSG} characters.`;

    return { next, trimmed };
  };

  const focusFirstError = (errs) => {
    if (errs.fullName) return nameRef.current?.focus();
    if (errs.email) return emailRef.current?.focus();
    if (errs.phone) return phoneRef.current?.focus();
    if (errs.subject) return subjectRef.current?.focus();
    if (errs.message) return msgRef.current?.focus();
  };

  const sendEmail = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (formRef.current?.elements?.botcheck?.value) return;

    const { next, trimmed } = validate();
    if (Object.values(next).some(Boolean)) {
      setErrors(next);
      focusFirstError(next);
      return;
    }

    setIsSubmitting(true);

    try {
      const emailjs = (await import("@emailjs/browser")).default;

      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          fullName: trimmed.fullName,
          email: trimmed.email,
          phone: trimmed.phone,
          subject: trimmed.subject,
          message: trimmed.message,
          reply_to: trimmed.email,
        },
        PUBLIC_KEY
      );

      if (window.gtag) {
        window.gtag("event", "generate_lead", {
          form_location: "contact_section",
          method: "emailjs",
        });
      }
      if (typeof window.gtag_report_conversion === "function") {
        window.gtag_report_conversion();
      }

      setForm({ fullName: "", email: "", phone: "", subject: "", message: "" });
      setSubjectValue("");
      setErrors({});
      window.location.href = "/thank-you";
    } catch {
      setIsSubmitting(false);
      setFeedback({ type: "error", msg: "Failed to send message. Please try again." });
      nameRef.current?.focus();
    }
  };

  const inputBase =
    "w-full rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/35 outline-none transition " +
    "bg-white/5 border border-white/10 focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-300/20 " +
    "hover:border-white/20";

  const fieldWrap = "space-y-1";
  const errText = "text-xs text-rose-300";

  const quickCards = useMemo(
    () => [
      {
        k: "whats",
        title: "Message on WhatsApp",
        desc: "The fastest way to start. Send a short message and we will reply as soon as possible.",
        href: WHATSAPP,
        accent: "from-emerald-400/20 via-cyan-400/10 to-transparent",
        label: "Open WhatsApp",
        icon: MessageCircle,
        external: true,
        onClick: () => window.gtag && window.gtag("event", "click_whatsapp", { place: "contact_section" }),
      },
      {
        k: "text",
        title: "Send a text",
        desc: "Prefer regular text messages? Send one directly from your phone.",
        href: SMS,
        accent: "from-cyan-400/18 via-blue-400/10 to-transparent",
        label: "Start a text",
        icon: Smartphone,
        external: false,
        onClick: () => window.gtag && window.gtag("event", "click_text", { place: "contact_section" }),
      },
      {
        k: "book",
        title: "Book a consultation",
        desc: "Choose a convenient time when your project needs a focused conversation.",
        href: CALENDLY,
        accent: "from-violet-400/18 via-indigo-400/10 to-transparent",
        label: "View available times",
        icon: CalendarDays,
        external: true,
        onClick: () => window.gtag && window.gtag("event", "click_calendly", { place: "contact_section" }),
      },
    ],
    []
  );

  const HeadingTag = standalone ? "h1" : "h2";

  return (
    <section
      id="contact"
      className={cx(
        "relative overflow-hidden nexus-bg hero-grid",
        standalone ? "pt-36 pb-24 md:pt-44 md:pb-28" : "section"
      )}
    >
      <div className="hero-vignette" />
      <div
        className="pointer-events-none absolute left-[-12rem] top-40 h-96 w-96 rounded-full bg-cyan-400/10 blur-[110px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute right-[-10rem] top-24 h-[30rem] w-[30rem] rounded-full bg-violet-500/10 blur-[130px]"
        aria-hidden="true"
      />

      <div ref={rootRef} className="container relative z-10">
        <div className="text-center max-w-4xl mx-auto reveal">
          <HeadingTag
            id="contact-heading"
            className={cx(
              "font-extrabold text-white tracking-tight",
              standalone
                ? "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
                : "text-3xl md:text-5xl"
            )}
          >
            Start with a <span className="grad-text">message</span>
          </HeadingTag>

          <p className="mt-5 text-base md:text-lg leading-relaxed text-white/65 max-w-2xl mx-auto">
            Tell us what you are working on. WhatsApp and text are the fastest
            ways to reach us, and a short message is completely fine.
          </p>
        </div>

        <div className="mt-12 md:mt-14 grid lg:grid-cols-[0.82fr,1.18fr] gap-7 lg:gap-10 items-start">
          <aside className="reveal space-y-4">
            {quickCards.map((c, i) => (
              <a
                key={c.k}
                href={c.href}
                target={c.external ? "_blank" : undefined}
                rel={c.external ? "noreferrer" : undefined}
                onClick={c.onClick}
                className={cx(
                  "group block glass rounded-3xl border p-6",
                  "transition-all duration-300 hover:-translate-y-1",
                  "relative overflow-hidden",
                  c.k === "whats"
                    ? "border-emerald-300/25 shadow-[0_24px_80px_rgba(16,185,129,.10)] hover:border-emerald-300/40 hover:shadow-[0_28px_90px_rgba(16,185,129,.16)]"
                    : "border-white/10 hover:border-white/20 hover:shadow-[0_28px_80px_rgba(0,0,0,.45)]"
                )}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className={cx("absolute inset-0 opacity-80 bg-gradient-to-br", c.accent)} />
                <div className="relative">
                  <div className="flex items-start gap-3">
                    <div
                      className={cx(
                        "h-12 w-12 shrink-0 rounded-2xl grid place-items-center border",
                        c.k === "whats"
                          ? "bg-emerald-300/10 border-emerald-200/20 text-emerald-200"
                          : "bg-white/[.06] border-white/10 text-cyan-200"
                      )}
                    >
                      <c.icon size={22} strokeWidth={1.8} />
                    </div>
                    <div className="min-w-0">
                      <div className="text-white text-lg font-semibold">{c.title}</div>
                      <div className="mt-1.5 text-sm leading-6 text-white/55">{c.desc}</div>
                    </div>
                  </div>

                  <div
                    className={cx(
                      "mt-5 flex items-center justify-between rounded-2xl border px-4 py-3 text-sm font-semibold transition",
                      c.k === "whats"
                        ? "border-emerald-200/20 bg-emerald-300/10 text-emerald-100 group-hover:bg-emerald-300/15"
                        : "border-white/10 bg-white/[.04] text-white/80 group-hover:bg-white/[.08]"
                    )}
                  >
                    <span>{c.label}</span>
                    <span aria-hidden="true">→</span>
                  </div>
                </div>
              </a>
            ))}

            <div
              className="glass rounded-3xl border border-white/10 p-6 reveal"
              style={{ animationDelay: "210ms" }}
            >
              <div className="space-y-4 text-sm text-white/60">
                <div className="flex items-center gap-3">
                  <Clock3 size={18} className="text-cyan-300" />
                  <span>Replies usually arrive within one business day.</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={18} className="text-cyan-300" />
                  <a
                    href={`mailto:${EMAIL_TO}`}
                    className="text-white/80 hover:text-white transition"
                  >
                    {EMAIL_TO}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin size={18} className="text-cyan-300" />
                  <span>St. Louis, MO. Remote projects welcome.</span>
                </div>
              </div>
            </div>
          </aside>

          <div className="reveal" style={{ animationDelay: "80ms" }}>
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="glass relative overflow-hidden rounded-[2rem] border border-white/10 p-6 sm:p-8 shadow-[0_35px_110px_rgba(0,0,0,.55)]"
              aria-label="Contact form"
              noValidate
            >
              <div
                className="pointer-events-none absolute right-[-8rem] top-[-8rem] h-64 w-64 rounded-full bg-cyan-400/10 blur-[90px]"
                aria-hidden="true"
              />
              <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div className="relative mb-7 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-white">Send project details</h3>
                  <p className="mt-2 text-sm leading-6 text-white/50">
                    Share only what you know. We can help with the rest.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-xs text-white/45">
                  <Clock3 size={15} />
                  One business day
                </div>
              </div>

              <div className="relative grid sm:grid-cols-2 gap-5">
                <div className={fieldWrap}>
                  <label className="text-xs text-white/55">Full name *</label>
                  <input
                    ref={nameRef}
                    type="text"
                    name="fullName"
                    placeholder="Your name"
                    className={cx(inputBase, errors.fullName && "border-rose-400/70 focus:border-rose-300/70 focus:ring-rose-300/15")}
                    autoComplete="name"
                    aria-invalid={!!errors.fullName}
                    value={form.fullName}
                    onChange={onChange}
                    disabled={isSubmitting}
                    maxLength={80}
                  />
                  {errors.fullName && <p className={errText}>{errors.fullName}</p>}
                </div>

                <div className={fieldWrap}>
                  <label className="text-xs text-white/55">Email *</label>
                  <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    placeholder="you@company.com"
                    className={cx(inputBase, errors.email && "border-rose-400/70 focus:border-rose-300/70 focus:ring-rose-300/15")}
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    value={form.email}
                    onChange={onChange}
                    disabled={isSubmitting}
                    maxLength={120}
                  />
                  {errors.email && <p className={errText}>{errors.email}</p>}
                </div>

                <div className={fieldWrap}>
                  <label className="text-xs text-white/55">
                    Mobile number for text replies
                  </label>
                  <input
                    ref={phoneRef}
                    type="tel"
                    name="phone"
                    placeholder="+1 (___) ___-____ (optional)"
                    className={cx(inputBase, errors.phone && "border-rose-400/70 focus:border-rose-300/70 focus:ring-rose-300/15")}
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    value={form.phone}
                    onChange={onChange}
                    disabled={isSubmitting}
                    maxLength={30}
                  />
                  {errors.phone && <p className={errText}>{errors.phone}</p>}
                </div>

                <div className={fieldWrap}>
                  <label className="text-xs text-white/55">Subject *</label>
                  <input
                    ref={subjectRef}
                    type="text"
                    name="subject"
                    placeholder="Website redesign, SEO, automation…"
                    className={cx(inputBase, errors.subject && "border-rose-400/70 focus:border-rose-300/70 focus:ring-rose-300/15")}
                    aria-invalid={!!errors.subject}
                    value={subjectValue}
                    onChange={onChange}
                    disabled={isSubmitting}
                    maxLength={120}
                  />
                  {errors.subject && <p className={errText}>{errors.subject}</p>}
                </div>
              </div>

              <div className={cx("relative mt-5", fieldWrap)}>
                <label className="text-xs text-white/55">Message *</label>
                <textarea
                  ref={msgRef}
                  name="message"
                  placeholder="What are you trying to achieve? Any links or deadlines?"
                  className={cx(
                    inputBase,
                    "min-h-[140px] resize-y",
                    errors.message && "border-rose-400/70 focus:border-rose-300/70 focus:ring-rose-300/15"
                  )}
                  aria-invalid={!!errors.message}
                  value={form.message}
                  onChange={onChange}
                  disabled={isSubmitting}
                  maxLength={2000}
                />
                {errors.message && <p className={errText}>{errors.message}</p>}
              </div>

              {feedback?.type === "error" ? (
                <div className="mt-4 rounded-xl border border-rose-400/25 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
                  {feedback.msg}
                </div>
              ) : null}

              <div className="relative mt-6 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={cx(
                    "btn btn-primary w-full sm:w-auto",
                    "transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]",
                    isSubmitting && "opacity-60 cursor-not-allowed hover:translate-y-0 hover:shadow-none"
                  )}
                  aria-busy={isSubmitting}
                >
                  <Send size={17} />
                  {isSubmitting ? "Sending..." : "Send my message"}
                </button>

                <div className="text-xs text-white/45 text-center sm:text-right">
                  By submitting, you agree to our{" "}
                  <a href="/privacy" className="underline decoration-white/20 hover:decoration-white/40 text-white/70 hover:text-white transition">
                    Privacy Policy
                  </a>
                  .
                </div>
              </div>
            </form>
          </div>
        </div>

        <style>{`
          .reveal { opacity: 0; transform: translateY(10px); transition: opacity .6s ease, transform .6s ease; }
          .reveal.in { opacity: 1; transform: translateY(0); }
          @media (prefers-reduced-motion: reduce) {
            .reveal, .reveal.in { transition: none; transform: none; opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
}
