import React, { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { EMAILJS } from "../config";

const fieldClass =
  "w-full text-xs p-3 rounded bg-white/10 border border-white/20 focus:border-[#4fe3ff] outline-none transition";

export default function ContactForm() {
  const formRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      await emailjs.sendForm(EMAILJS.serviceId, EMAILJS.templateId, formRef.current, EMAILJS.publicKey);
      setStatus("sent");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error(err);
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white/10 backdrop-blur-xl border border-[#4fe3ff20] hover:border-[#4fe3ff70] transition-all duration-300 p-5 rounded-xl w-full shadow-[0_0_12px_#4fe3ff10]"
    >
      <h3 className="text-xl font-semibold mb-2">Let's work together on a project!!</h3>
      <p className="text-white/60 mb-3 text-sm">Feel free to send a message anytime.</p>

      <form ref={formRef} onSubmit={submit} className="space-y-3">
        <input required name="name" value={form.name} onChange={update("name")} placeholder="Your Name" className={fieldClass} />
        <input required name="email" type="email" value={form.email} onChange={update("email")} placeholder="Your Email" className={fieldClass} />
        <textarea required name="message" value={form.message} onChange={update("message")} placeholder="Your Message" className={`${fieldClass} h-24`} />

        <button type="submit" disabled={status === "sending"} className="btn-fill btn-fill--solid !py-2 !px-6 !text-sm">
          {status === "sending" ? "Sending..." : "Send Message"}
        </button>

        <p role="status" className={`text-xs min-h-[1rem] ${status === "error" ? "text-red-400" : "text-emerald-400"}`}>
          {status === "sent" && "Message sent ✓ - I'll get back to you soon."}
          {status === "error" && "Something went wrong. Please email me directly."}
        </p>
      </form>
    </motion.div>
  );
}
