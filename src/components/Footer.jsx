import React from "react";
import "./footer.css";
import ContactForm from "./ContactForm";
import imgP from "../assets/p.jpg";
import imgR from "../assets/r.jpg";
import imgA from "../assets/a.jpg";
import imgT from "../assets/t.jpg";
import imgH from "../assets/h.jpg";
import imgM from "../assets/m.jpg";
import imgE from "../assets/e.jpg";
import imgS from "../assets/s.jpg";
import imgL from "../assets/l.jpg";
import imgK from "../assets/k.jpg";

const nameLines = ["PRATHAMESH", "SHELKE"];

// Each letter shows one of your photos when hovered
const images = { P: imgP, R: imgR, A: imgA, T: imgT, H: imgH, M: imgM, E: imgE, S: imgS, L: imgL, K: imgK };

const QUICK_LINKS = [
  ["#home", "Home"],
  ["#about", "About Me"],
  ["#skills", "Skills"],
  ["#projects", "Projects"],
  ["#certificates", "Certificates"],
  ["#dsa", "DSA"],
  ["#contact", "Contact"],
];

const SOCIAL = [
  ["https://www.linkedin.com/in/prathamesh-shelke-86829b32a/", "LinkedIn"],
  ["https://github.com/Sparky-2501", "GitHub"],
  ["mailto:prathamesh.shelke@nmiet.edu.in", "Email"],
];

export default function Footer() {
  return (
    <footer id="contact" className="w-full min-h-screen bg-[#030b1a] text-white relative flex flex-col">
      <div className="flex-grow pt-8">
        <div className="w-full px-6 lg:px-12 grid grid-cols-1 lg:grid-cols-[25%,75%] gap-12">
          {/* LEFT - FORM */}
          <div className="flex items-start">
            <ContactForm />
          </div>

          {/* RIGHT SIDE */}
          <div className="flex flex-col gap-16">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">Quick Links</h4>
                <ul className="space-y-1 text-white/70 text-sm">
                  {QUICK_LINKS.map(([href, label]) => (
                    <li key={href}>
                      <a href={href} className="hover:text-[#4fe3ff]">{label}</a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">Social Media</h4>
                <ul className="space-y-1 text-white/70 text-sm">
                  {SOCIAL.map(([href, label]) => (
                    <li key={label}>
                      <a
                        href={href}
                        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                        className="hover:text-[#4fe3ff]"
                      >
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">Address</h4>
                <p className="text-white/70 text-sm">Pune, Maharashtra</p>
              </div>
            </div>

            {/* NAME + ROLE (desktop only) */}
            <div className="hidden lg:block pl-1 mt-2">
              <h2 className="text-9xl font-extrabold leading-[0.90] tracking-wide space-y-2 flex flex-col">
                {nameLines.map((word) => (
                  <div key={word}>
                    {word.split("").map((char, i) => (
                      <span
                        key={i}
                        className="mask-letter"
                        style={{ "--img": images[char] ? `url(${images[char]})` : "none" }}
                      >
                        {char}
                      </span>
                    ))}
                  </div>
                ))}
              </h2>
              <p className="text-white/70 text-2xl mt-3">MERN Stack Developer</p>
              <p className="text-white/50 text-lg italic mt-2 max-w-xl">
                Building digital experiences that make a difference.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-[2px] bg-[#4fe3ff]" />

      <div className="px-6 lg:px-12 py-5 text-sm text-white/60">
        © {new Date().getFullYear()} • Built by Prathamesh Shelke &#128150; &#128171;
      </div>
    </footer>
  );
}
