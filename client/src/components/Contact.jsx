import React from 'react';
import { Mail, Eye } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="bg-[#f5e700] text-[#1f1c00] py-24 text-center overflow-hidden relative">
      <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
        <span className="text-[120px] md:text-[300px] font-black select-none leading-none">BUILD</span>
      </div>
      <div className="container max-w-[1280px] mx-auto px-6 relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-8 uppercase tracking-tight">Let's Build Something Exceptional Together!</h2>
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <a className="bg-[#1f1c00] text-[#f5e700] px-10 py-4 text-xs font-bold tracking-wider uppercase rounded-full hover:scale-105 transition-transform flex items-center justify-center gap-2" href="mailto:[EMAIL_ADDRESS]">
            <Mail size={16} /> START A CONVERSATION
          </a>
          <a href="/SunnyRohitGattu.pdf" target="_blank" rel="noopener noreferrer" className="border-2 border-[#1f1c00] text-[#1f1c00] px-10 py-4 text-xs font-bold tracking-wider uppercase rounded-full hover:bg-[#1f1c00] hover:text-[#f5e700] transition-all flex items-center justify-center gap-2">
            <Eye size={16} /> VIEW RESUME
          </a>
        </div>
      </div>
    </section>
  );
}
