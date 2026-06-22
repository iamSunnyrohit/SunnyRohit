import React from 'react';
import img from '../assets/sunny1.jpg';

export default function About() {
  return (
    <section id="about" className="py-[120px] bg-[#0d0e0e]">
      <div className="container max-w-[1280px] mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          <div className="md:col-span-5">
            <div className="aspect-square bg-[#292a2a] border-2 border-[#959177] relative overflow-hidden">
              <img className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Sunny Portrait" src={img} />
              <div className="absolute bottom-0 right-0 bg-[#f5e700] text-[#1f1c00] p-6 font-bold text-2xl">SR</div>
            </div>
          </div>
          <div className="md:col-span-7 mt-8 md:mt-0">
            <span className="text-xs font-bold text-[#f5e700] mb-4 block tracking-wider">EXECUTIVE SUMMARY</span>
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">A Deep Dive into High-Performance Engineering & Responsive Architecture</h2>
            <div className="space-y-6">
              <p className="text-lg text-[#e4e2e2]">
                My development expertise lies at the precise intersection of robust backend logic and complex, fluid client operations.
              </p>
              <p className="text-base text-[#ccc7aa] leading-relaxed">
                With a deep foundation in Computer Science, I focus heavily on application lifecycle scalability, optimized data workflows, and intuitive design standards, ensuring that every layer of an application serves a definitive, strategic performance target.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-8">
                <div className="border-l-4 border-[#f5e700] pl-4">
                  <span className="block text-2xl md:text-3xl font-bold">MERN</span>
                  <span className="text-[10px] text-[#ccc7aa] uppercase font-bold tracking-wider">Core Architecture</span>
                </div>
                <div className="border-l-4 border-[#f5e700] pl-4">
                  <span className="block text-2xl md:text-3xl font-bold">4+</span>
                  <span className="text-[10px] text-[#ccc7aa] uppercase font-bold tracking-wider">Production Systems</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
