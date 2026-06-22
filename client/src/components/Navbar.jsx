import React from 'react';

export default function Navbar() {
  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 rounded-full border-2 border-[#959177] bg-[#131314]/95 backdrop-blur-md flex justify-between items-center w-[calc(100%-2rem)] max-w-fit px-6 md:px-8 py-3 z-50 shadow-[4px_4px_0px_0px_rgba(245,231,0,1)]">
      <div className="flex items-center gap-8">
        <div className="hidden md:flex gap-6">
          <a className="text-[#f5e700] font-bold border-b-2 border-[#f5e700] pb-1" href="#home">Home</a>
          <a className="text-[#ccc7aa] hover:text-[#f5e700] transition-colors" href="#about">About</a>
          <a className="text-[#ccc7aa] hover:text-[#f5e700] transition-colors" href="#experience">Experience</a>
          <a className="text-[#ccc7aa] hover:text-[#f5e700] transition-colors" href="#projects">Projects</a>
        </div>
      </div>
      <a className="hidden md:block ml-8 px-5 py-1.5 bg-[#f5e700] text-[#1f1c00] text-xs font-bold uppercase tracking-wider rounded-full hover:scale-105 transition-transform" href="#contact">Contact</a>
    </nav>
  );
}
