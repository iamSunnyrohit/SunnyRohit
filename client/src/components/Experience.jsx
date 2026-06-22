import React from 'react';

export default function Experience() {
  return (
    <section id="experience" className="py-[120px] bg-[#131314] border-t-2 border-[#959177]/20">
      <div className="container max-w-[1280px] mx-auto px-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs font-bold text-[#f5e700] mb-2 block uppercase tracking-wider">Academics</span>
            <h2 className="text-4xl md:text-5xl font-bold">Education History</h2>
          </div>
          <p className="text-sm text-[#ccc7aa] max-w-sm border-l border-[#959177] pl-6 mt-4 md:mt-0">
            A history of computer science academic foundations, specialized coursework, and core programming disciplines.
          </p>
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Pace University */}
          <div className="group border-2 border-[#959177] bg-[#0d0e0e] p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(245,231,0,1)]">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-[#e4e2e2]">Pace University</h3>
                  <p className="text-[#f5e700] font-mono text-sm">Master's in Computer Science</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-[#131314] text-[#ccc7aa] border border-[#959177] rounded-full uppercase tracking-wider font-mono">
                  2023 - 2025
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#959177]">CGPA:</span>
                  <span className="text-base font-bold text-[#e4e2e2]">3.82 / 4.0</span>
                </div>
                <p className="text-sm text-[#ccc7aa] leading-relaxed">
                  Focusing on advanced computing paradigms, artificial intelligence systems, and mobile/web development telemetry.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#f5e700] mb-3 uppercase tracking-wider font-mono">Relevant Coursework</h4>
              <div className="flex flex-wrap gap-2">
                {["Artificial Intelligence", "Deep Learning", "Python Programming", "Mobile Web Development"].map((course, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-[#131314] border border-[#959177]/40 text-xs text-[#ccc7aa] rounded-full">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Vignans Institute of Information Technology */}
          <div className="group border-2 border-[#959177] bg-[#0d0e0e] p-8 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(245,231,0,1)]">
            <div>
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold mb-1 text-[#e4e2e2]">Vignans Institute</h3>
                  <p className="text-[#f5e700] font-mono text-sm">Bachelor of Science in CS</p>
                </div>
                <span className="text-xs font-bold px-3 py-1 bg-[#131314] text-[#ccc7aa] border border-[#959177] rounded-full uppercase tracking-wider font-mono">
                  2018 - 2022
                </span>
              </div>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs text-[#959177]">CGPA:</span>
                  <span className="text-base font-bold text-[#e4e2e2]">7.44 / 10</span>
                </div>
                <p className="text-sm text-[#ccc7aa] leading-relaxed">
                  Established robust foundations in computer logic, object-oriented systems, and machine learning pipelines.
                </p>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-bold text-[#f5e700] mb-3 uppercase tracking-wider font-mono">Relevant Coursework</h4>
              <div className="flex flex-wrap gap-2">
                {["C/Java/Python", "Machine Learning", "Block Chain Technology", "Fundamentals of Software"].map((course, idx) => (
                  <span key={idx} className="px-2.5 py-1 bg-[#131314] border border-[#959177]/40 text-xs text-[#ccc7aa] rounded-full">
                    {course}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
