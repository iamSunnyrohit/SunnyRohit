import React from 'react';
import { Mail, ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#131314] text-[#ccc7aa] py-12 border-t-2 border-[#959177]/20">
      <div className="container max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

        {/* Left Side: Name and Copyright */}
        <div className="text-center md:text-left">
          <span className="text-xl font-bold tracking-tighter text-[#e4e2e2] block mb-2">Sunny Rohit Gattu</span>
          <p className="text-xs text-[#959177]">
            © {new Date().getFullYear()} All rights reserved. Built with MERN Stack.
          </p>
        </div>

        {/* Middle: Navigation shortcuts */}
        <div className="flex gap-6 text-sm font-semibold">
          <a href="#home" className="hover:text-[#f5e700] transition-colors">Home</a>
          <a href="#about" className="hover:text-[#f5e700] transition-colors">About</a>
          <a href="#projects" className="hover:text-[#f5e700] transition-colors">Projects</a>
          <a href="#contact" className="hover:text-[#f5e700] transition-colors">Contact</a>
        </div>

        {/* Right Side: Social Media Icons & Scroll to Top */}
        <div className="flex items-center gap-6">
          <div className="flex gap-4">
            {/* GitHub Inline SVG */}
            <a
              href="https://github.com/iamSunnyrohit"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-[#959177]/40 text-[#ccc7aa] hover:text-[#1f1c00] hover:bg-[#f5e700] hover:border-[#f5e700] transition-all duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="GitHub Profile"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/in/sunny-rohit/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-full border border-[#959177]/40 text-[#ccc7aa] hover:text-[#1f1c00] hover:bg-[#f5e700] hover:border-[#f5e700] transition-all duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="LinkedIn Profile"
            >
              <svg className="w-[18px] h-[18px] fill-current" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>

            <a
              href="mailto:sunnyrohit2023@gmail.com"
              className="p-2.5 rounded-full border border-[#959177]/40 text-[#ccc7aa] hover:text-[#1f1c00] hover:bg-[#f5e700] hover:border-[#f5e700] transition-all duration-300 hover:scale-110 flex items-center justify-center"
              aria-label="Email Me"
            >
              <Mail size={18} />
            </a>
          </div>

          <button
            onClick={scrollToTop}
            className="p-2.5 rounded-full bg-[#292a2a] border border-[#959177]/40 text-[#e4e2e2] hover:bg-[#f5e700] hover:text-[#1f1c00] hover:border-[#f5e700] transition-all duration-300 hover:scale-110 flex items-center justify-center"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </button>
        </div>

      </div>
    </footer>
  );
}
