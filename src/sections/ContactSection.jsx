import React, { useEffect, useMemo, useRef, useState } from "react";

const MIN_NAME = 2;
const MIN_MSG = 10;

const CALENDLY = "https://calendly.com/domiwebsites/30min";
const WHATSAPP = "https://wa.me/13143769667";
const EMAIL_TO = "admin@domiwebsites.com";
const PHONE_TEL = "tel:13143769667";

function cx(...a) {
  return a.filter(Boolean).join(" ");
}

export default function ContactSection() {
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
      next.phone = "Please enter a valid phone (digits, spaces, +, (), -).";
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
        k: "book",
        title: "Free consultation",
        desc: "15–30 min call. Clear next steps, no pressure.",
        href: CALENDLY,
        accent: "from-cyan-400/20 to-indigo-400/10",
        btn: "btn btn-primary w-full",
        label: "Book on Calendly",
        icon: "📅",
        onClick: () => window.gtag && window.gtag("event", "click_calendly", { place: "contact_section" }),
      },
      {
        k: "whats",
        title: "WhatsApp",
        desc: "Fast questions? Send a message anytime.",
        href: WHATSAPP,
        accent: "from-emerald-400/18 to-cyan-400/10",
        btn: "btn btn-outline w-full",
        label: "Message on WhatsApp",
        icon: "💬",
        onClick: () => window.gtag && window.gtag("event", "click_whatsapp", { place: "contact_section" }),
      },
    ],
    []
  );

  return (
    <section id="contact" className="section relative overflow-hidden nexus-bg hero-grid">
      <div className="hero-vignette" />

      <div ref={rootRef} className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto reveal">
          <p className="text-[11px] tracking-[0.25em] uppercase text-cyan-300/90 mb-2">
            Let’s talk
          </p>

          <h2 id="contact-heading" className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
            Tell me about your <span className="grad-text">project</span>
          </h2>

          <p className="mt-3 text-sm md:text-base text-white/60">
            Short message is fine. We typically reply within{" "}
            <span className="text-white/80 font-medium">one business day</span>.
          </p>
        </div>

        <div className="mt-10 grid lg:grid-cols-[0.9fr,1.1fr] gap-6 lg:gap-8 items-start">
          <aside className="reveal space-y-4">
            {quickCards.map((c, i) => (
              <a
                key={c.k}
                href={c.href}
                target="_blank"
                rel="noreferrer"
                onClick={c.onClick}
                className={cx(
                  "block glass rounded-2xl border border-white/10 p-5",
                  "transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,.55)]",
                  "relative overflow-hidden"
                )}
                style={{ animationDelay: `${i * 70}ms` }}
              >
                <div className={cx("absolute inset-0 opacity-70 bg-gradient-to-br", c.accent)} />
                <div className="relative">
                  <div className="flex items-start gap-3">
                    <div className="h-11 w-11 rounded-2xl grid place-items-center bg-white/7 border border-white/10">
                      <span className="text-lg">{c.icon}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-white font-semibold">{c.title}</div>
                      <div className="mt-1 text-sm text-white/60">{c.desc}</div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div
                      className={cx(
                        c.btn,
                        "transition-all duration-300 hover:-translate-y-0.5",
                        c.k === "book"
                          ? "hover:shadow-[0_18px_55px_rgba(34,211,238,.22)]"
                          : "hover:shadow-[0_18px_55px_rgba(34,211,238,.12)]"
                      )}
                    >
                      {c.label}
                    </div>
                  </div>
                </div>
              </a>
            ))}

            <div
              className="glass rounded-2xl border border-white/10 p-5 reveal"
              style={{ animationDelay: "160ms" }}
            >
              <div className="text-white font-semibold">Direct contact</div>

              <div className="mt-3 space-y-2 text-sm text-white/65">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/50">Phone</span>
                  <a
                    href={PHONE_TEL}
                    className="text-white/80 hover:text-white underline decoration-white/20 hover:decoration-white/40 transition"
                    onClick={() => window.gtag && window.gtag("event", "click_call", { place: "contact_section" })}
                  >
                    (314) 376-9667
                  </a>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <span className="text-white/50">Email</span>
                  <a
                    href={`mailto:${EMAIL_TO}`}
                    className="text-white/80 hover:text-white underline decoration-white/20 hover:decoration-white/40 transition truncate"
                  >
                    {EMAIL_TO}
                  </a>
                </div>

                <div className="pt-2 text-xs text-white/45">
                  St. Louis, MO • Remote projects welcome
                </div>
              </div>
            </div>
          </aside>

          <div className="reveal" style={{ animationDelay: "80ms" }}>
            <form
              ref={formRef}
              onSubmit={sendEmail}
              className="glass rounded-3xl border border-white/10 p-6 sm:p-7 shadow-[0_30px_90px_rgba(0,0,0,.55)]"
              aria-label="Contact form"
              noValidate
            >
              <input type="text" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

              <div className="grid sm:grid-cols-2 gap-4">
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
                  <label className="text-xs text-white/55">Phone (optional)</label>
                  <input
                    ref={phoneRef}
                    type="tel"
                    name="phone"
                    placeholder="+1 (___) ___-____"
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

              <div className={cx("mt-4", fieldWrap)}>
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

              <div className="mt-5 flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
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
                  {isSubmitting ? "Sending..." : "Send message"}
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
