import React from 'react';
import { ExternalLink } from 'lucide-react';

export default function Projects({ projects, loading }) {
  return (
    <section id="projects" className="py-[120px] bg-[#0d0e0e] border-t-2 border-[#959177]">
      <div className="container max-w-[1280px] mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
          <div>
            <span className="text-xs font-bold text-[#f5e700] mb-2 block uppercase tracking-wider">Showcase</span>
            <h2 className="text-4xl md:text-5xl font-bold">Engineering Showcase</h2>
          </div>
          <p className="text-sm text-[#ccc7aa] max-w-sm border-l border-[#959177] pl-6 mt-4 md:mt-0">
            A selection of applications showcasing performance systems, machine learning utilities, and custom interactive data panels fetched direct from the database cluster.
          </p>
        </div>

        {loading ? (
          <div className="text-center py-12 text-[#f5e700] font-mono animate-pulse">
            Connecting backend pipeline modules...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project) => (
              <div key={project._id} className="group border-2 border-[#959177] bg-[#131314] flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(245,231,0,1)]">
                <div className="h-64 overflow-hidden relative">
                  <img className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-80" alt={project.title} src={project.imageUrl} />
                  <div className="absolute top-4 left-4 bg-[#f5e700] text-[#1f1c00] px-3 py-1 text-xs font-bold tracking-wide uppercase">{project.category}</div>
                </div>
                <div className="p-8 flex flex-col flex-grow">
                  <h3 className="text-xl font-bold mb-4">{project.title}</h3>
                  <p className="text-sm text-[#ccc7aa] mb-6 flex-grow">{project.description}</p>
                  <div className="flex gap-3 flex-wrap">
                    {project.tags.map((tag, idx) => (
                      <span key={idx} className="px-3 py-1 border border-[#959177] font-mono text-[10px] text-[#ccc7aa] rounded-full uppercase">{tag}</span>
                    ))}
                  </div>
                  {project.liveUrl && (
                    <div className="mt-6 pt-4 border-t border-[#959177]/20 flex justify-end">
                      <a 
                        href={project.liveUrl} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="px-4 py-2 bg-[#f5e700] text-[#1f1c00] text-xs font-bold uppercase tracking-wider rounded hover:scale-105 transition-transform flex items-center gap-1.5"
                      >
                        View Project <ExternalLink size={12} />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
