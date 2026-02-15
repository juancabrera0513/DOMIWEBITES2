import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";

const SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID || "YOUR_SERVICE_ID";
const TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || "YOUR_TEMPLATE_ID";
const PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || "YOUR_PUBLIC_KEY";

export default function ContactModal({ open, setOpen }) {
  const { t } = useTranslation(["common", "contact"]);
  const formRef = useRef(null);
  const dialogRef = useRef(null);
  const [status, setStatus] = useState("idle"); 

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, setOpen]);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const onOverlayClick = (e) => {
    if (dialogRef.current && !dialogRef.current.contains(e.target)) {
      setOpen(false);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");

    try {
      await emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY);
      setStatus("success");
      formRef.current?.reset();
      setTimeout(() => setOpen(false), 700);
    } catch (err) {
      console.error("EmailJS error:", err);
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-start md:items-center justify-center p-4"
      onMouseDown={onOverlayClick}
      aria-modal="true"
      role="dialog"
    >
      <div
        ref={dialogRef}
        className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200"
        onMouseDown={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-200">
          <h2 className="text-xl font-extrabold">
            {t("contact:open_form", "Contact form")}
          </h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-slate-200 hover:bg-slate-50"
            aria-label="Close"
          >
            ×
          </button>
        </div>

        <form ref={formRef} onSubmit={onSubmit} className="px-5 py-5">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">
                {t("contact:name", "Name")}
              </label>
              <input
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                type="text"
                name="user_name"
                placeholder={t("contact:name_ph", "Your name")}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                {t("contact:email", "Email")}
              </label>
              <input
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                type="email"
                name="user_email"
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                {t("contact:phone", "Phone")}
              </label>
              <input
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                type="tel"
                name="user_phone"
                placeholder="+1 314..."
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">
                {t("contact:service", "Service")}
              </label>
              <select
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                name="user_service"
                defaultValue=""
                required
              >
                <option value="" disabled>
                  {t("contact:service_ph", "Select")}
                </option>
                <option>Web Design</option>
                <option>Local SEO</option>
                <option>E-commerce</option>
                <option>Care Plan</option>
                <option>Speed Optimization</option>
                <option>Analytics & Tracking</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold mb-1">
                {t("contact:message", "Message")}
              </label>
              <textarea
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300"
                rows="5"
                name="message"
                placeholder={t("contact:message_ph", "Tell us about your project...")}
                required
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col sm:flex-row gap-2 justify-end">
            <button
              type="button"
              className="btn btn-ghost"
              onClick={() => setOpen(false)}
            >
              {t("common:cta.cancel", "Cancel")}
            </button>
            <button
              type="submit"
              className="btn btn-primary btn-shine"
              disabled={status === "sending"}
            >
              {status === "sending"
                ? t("contact:sending", "Sending…")
                : t("contact:send", "Send")}
            </button>
          </div>

          {status === "success" && (
            <p className="mt-3 text-emerald-600 font-semibold">
              {t("contact:sent_ok", "Thanks! We’ll get back to you shortly.")}
            </p>
          )}
          {status === "error" && (
            <p className="mt-3 text-rose-600 font-semibold">
              {t("contact:sent_fail", "Oops, something went wrong. Please try again.")}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
