import React, { useRef } from 'react';

export default function Hero() {
  const sectionRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    sectionRef.current.style.setProperty('--mouse-x', `${x}px`);
    sectionRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  return (
    <section
      id="home"
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative min-h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#131314] transition-colors duration-300"
      style={{
        backgroundImage: `radial-gradient(circle 450px at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(245, 231, 0, 0.07), transparent 80%)`
      }}
    >
      <div className="container max-w-[1280px] mx-auto px-6 text-left relative z-10">
        <h3 className="text-sm md:text-[20px] font-bold uppercase tracking-tighter leading-none mb-2 font-serif">I'm</h3>
        <h1 className="text-4xl md:text-[140px] font-bold uppercase tracking-tighter leading-none mb-2 font-serif">
          Sunny<span className="text-[#f5e700] font-light"> Rohit</span>
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end text-left border-t-2 border-[#959177] pt-8">
          <div>
            <p className="text-2xl font-semibold text-[#f5e700] mb-4">Full-Stack Software Engineer</p>
            <p className="text-lg text-[#e4e2e2] max-w-xl">
              Hello, I'm Sunny Rohit, a Full-Stack Software Engineer specializing in responsive application architecture, production performance, and intuitive data layouts.
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end mt-6 md:mt-0">
            <p className="text-xs font-bold text-[#ccc7aa] mb-4 uppercase tracking-[0.2em]">Core Value Proposition</p>
            <p className="text-sm text-left md:text-right max-w-md text-[#ccc7aa]">
              Developing high-performance web spaces, robust API layers, and fluid software integrations that convert engineering metrics into outstanding user experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
