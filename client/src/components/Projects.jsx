import React, { useState, useEffect, useRef } from 'react';
import { ExternalLink, ChevronLeft, ChevronRight, RotateCw, Grid, Layers, Sparkles, X } from 'lucide-react';

export default function Projects({ projects, loading }) {
  const [activeView, setActiveView] = useState('3d'); // '3d' or 'grid'
  const [isHovered, setIsHovered] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [targetOffset, setTargetOffset] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = right, -1 = left
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [archWidth, setArchWidth] = useState(480);
  const [archHeight, setArchHeight] = useState(120);

  // Selected Project for Modal Popup
  const [selectedProject, setSelectedProject] = useState(null);

  const animRef = useRef(null);
  const totalProjects = Array.isArray(projects) ? projects.length : 0;

  // Body scroll lock when modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  // Responsive arch dimensions for mobile to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setArchWidth(260);
        setArchHeight(70);
      } else if (window.innerWidth < 1024) {
        setArchWidth(380);
        setArchHeight(100);
      } else {
        setArchWidth(500);
        setArchHeight(130);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth continuous rotation/sweep & hover-center spring transition along Rainbow Arch
  useEffect(() => {
    if (activeView !== '3d' || totalProjects === 0 || selectedProject) return;

    let lastTime = performance.now();
    const animateRainbowArch = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (isHovered && !isDragging) {
        // Smoothly interpolate currentOffset towards targetOffset (center of rainbow)
        setCurrentOffset((prev) => {
          const diff = targetOffset - prev;
          if (Math.abs(diff) < 0.1) return targetOffset;
          return prev + diff * 0.12;
        });
      } else if (!isDragging) {
        // Continuous auto-sweep along rainbow arch
        setCurrentOffset((prev) => {
          const maxSweep = Math.max(0, (totalProjects - 1) * 45);
          let next = prev + direction * (delta * 0.018);

          if (next >= maxSweep + 10) {
            setDirection(-1);
            return maxSweep + 10;
          } else if (next <= -10) {
            setDirection(1);
            return -10;
          }
          return next;
        });
      }
      animRef.current = requestAnimationFrame(animateRainbowArch);
    };

    animRef.current = requestAnimationFrame(animateRainbowArch);
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isHovered, isDragging, activeView, totalProjects, direction, targetOffset, selectedProject]);

  // Card Hover Handler -> Glides hovered card to center top of rainbow arch
  const handleCardHover = (idx) => {
    setIsHovered(true);
    setTargetOffset(idx * 45);
  };

  const handleMouseLeaveStage = () => {
    setIsHovered(false);
    setIsDragging(false);
  };

  // Drag handlers
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX;
    setCurrentOffset((prev) => {
      const next = prev - deltaX * 0.35;
      setTargetOffset(next);
      return next;
    });
    setDragStartX(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.touches[0].clientX - dragStartX;
    setCurrentOffset((prev) => {
      const next = prev - deltaX * 0.35;
      setTargetOffset(next);
      return next;
    });
    setDragStartX(e.touches[0].clientX);
  };

  const handleNext = () => {
    const maxSweep = Math.max(0, (totalProjects - 1) * 45);
    const nextVal = Math.min(maxSweep, currentOffset + 45);
    setTargetOffset(nextVal);
    setCurrentOffset(nextVal);
  };

  const handlePrev = () => {
    const prevVal = Math.max(0, currentOffset - 45);
    setTargetOffset(prevVal);
    setCurrentOffset(prevVal);
  };

  const activeSlotIndex = Math.min(
    totalProjects - 1,
    Math.max(0, Math.round(currentOffset / 45))
  );

  return (
    <section id="projects" className="py-[120px] bg-[#0d0e0e] border-t-2 border-[#959177] overflow-hidden select-none relative">
      <div className="container max-w-[1280px] mx-auto px-6">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
          <div>
            <span className="text-xs font-bold text-[#f5e700] mb-2 uppercase tracking-wider flex items-center gap-2">
              <Sparkles size={14} className="text-[#f5e700] animate-spin" />
              Projects Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Engineering Showcase
            </h2>
          </div>

          <div className="flex items-center gap-4 flex-wrap">
            {/* View Mode Selector */}
            <div className="flex items-center bg-[#131314] border-2 border-[#959177] p-1 rounded-lg">
              <button
                onClick={() => setActiveView('3d')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase transition-all rounded ${
                  activeView === '3d'
                    ? 'bg-[#f5e700] text-[#1f1c00] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]'
                    : 'text-[#ccc7aa] hover:text-white'
                }`}
              >
                <Layers size={14} /> Rainbow Arch
              </button>
              <button
                onClick={() => setActiveView('grid')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase transition-all rounded ${
                  activeView === 'grid'
                    ? 'bg-[#f5e700] text-[#1f1c00] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]'
                    : 'text-[#ccc7aa] hover:text-white'
                }`}
              >
                <Grid size={14} /> Grid View
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-24 text-[#f5e700] font-mono animate-pulse flex flex-col items-center gap-3">
            <RotateCw className="animate-spin text-[#f5e700]" size={32} />
            <span>Hydrating project records from MongoDB cluster...</span>
          </div>
        ) : totalProjects === 0 ? (
          <div className="text-center py-16 text-[#ccc7aa] font-mono border-2 border-dashed border-[#959177]/50 rounded-xl p-8">
            No projects available at this moment.
          </div>
        ) : activeView === '3d' ? (
          /* ---------------- 3D RAINBOW ARCH CAROUSEL ---------------- */
          <div className="relative py-6 flex flex-col items-center">

            {/* Status indicator bar */}
            <div className="mb-6 flex items-center justify-center gap-3 text-xs font-mono text-[#ccc7aa] bg-[#131314]/90 px-4 py-1.5 border border-[#959177]/40 rounded-full backdrop-blur-md z-10 shadow">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${isHovered ? 'bg-amber-400 animate-pulse' : 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 animate-pulse'}`} />
              <span>{isHovered ? 'CLICK TO VIEW FULL DETAILS' : 'HOVER TO CENTER • CLICK TO POPUP DETAILS'}</span>
            </div>

            {/* 3D Scene Viewport */}
            <div
              className="relative w-full h-[540px] md:h-[580px] perspective-1200 cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden rounded-3xl border border-[#959177]/20 bg-gradient-to-b from-[#18181b]/50 via-[#0d0e0e]/80 to-[#090a0a]"
              onMouseLeave={handleMouseLeaveStage}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              {/* Spectral Rainbow Arc Glow Background dynamically tinted to active project color */}
              <div
                className="absolute w-[850px] h-[420px] rounded-[50%] pointer-events-none opacity-40 blur-3xl top-12 transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse at center, hsl(${Math.round((activeSlotIndex / totalProjects) * 360)}, 85%, 60%) 0%, transparent 70%)`,
                }}
              />

              {/* Rainbow Arc Guide Line dynamically colored to match project spectrum */}
              <svg className="absolute w-full h-full pointer-events-none opacity-60 z-0" viewBox="0 0 1000 500" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    {projects.map((_, pIdx) => {
                      const stopPercent = totalProjects > 1 ? (pIdx / (totalProjects - 1)) * 100 : 0;
                      const hue = Math.round((pIdx / totalProjects) * 360);
                      return (
                        <stop
                          key={pIdx}
                          offset={`${stopPercent}%`}
                          stopColor={`hsl(${hue}, 85%, 60%)`}
                        />
                      );
                    })}
                  </linearGradient>
                </defs>
                <path
                  d="M 100 420 Q 500 120 900 420"
                  fill="none"
                  stroke="url(#rainbowGrad)"
                  strokeWidth="4"
                  strokeDasharray="8 6"
                />
              </svg>

              {/* 3D Rainbow Arch Stage Container */}
              <div className="w-full h-full relative preserve-3d flex items-center justify-center">
                {projects.map((project, idx) => {
                  const angle = (idx * 45) - currentOffset;
                  const rad = (angle * Math.PI) / 180;

                  const isVisibleOnArch = angle >= -105 && angle <= 105;
                  if (!isVisibleOnArch) return null;

                  const translateX = Math.sin(rad) * archWidth;
                  const translateY = (1 - Math.cos(rad)) * archHeight;
                  const translateZ = Math.cos(rad) * 240;
                  const rotateZ = angle * 0.15;
                  const rotateY = angle * 0.35;

                  const cosVal = Math.cos(rad);
                  const opacity = Math.max(0.15, cosVal);
                  const scale = 0.84 + (cosVal * 0.22);
                  const isCentered = Math.abs(angle) < 18;

                  const hue = Math.round((idx / totalProjects) * 360);
                  const rainbowColor = `hsl(${hue}, 85%, 60%)`;
                  const rainbowGlow = `0 0 35px hsla(${hue}, 85%, 60%, 0.45)`;

                  return (
                    <div
                      key={project._id || idx}
                      onMouseEnter={() => handleCardHover(idx)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardHover(idx);
                        setSelectedProject({ ...project, hue, rainbowColor });
                      }}
                      className="absolute top-1/2 left-1/2 w-[245px] sm:w-[265px] md:w-[285px] -mt-[200px] -ml-[122px] sm:-ml-[132px] md:-ml-[142px] preserve-3d transition-all duration-300 group cursor-pointer"
                      style={{
                        transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg) scale(${scale})`,
                        opacity: opacity,
                        zIndex: Math.round(cosVal * 100),
                      }}
                    >
                      <div
                        className={`border-2 bg-[#131314]/95 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl flex flex-col transition-all duration-300 ${
                          isCentered
                            ? 'border-white shadow-2xl'
                            : 'border-[#959177]/50 group-hover:border-white'
                        }`}
                        style={{
                          borderColor: isCentered ? rainbowColor : undefined,
                          boxShadow: isCentered ? rainbowGlow : undefined,
                        }}
                      >
                        
                        {/* Rainbow Accent Top Bar */}
                        <div
                          className="h-1.5 w-full transition-all duration-300"
                          style={{ backgroundColor: rainbowColor }}
                        />

                        {/* Card Image Banner */}
                        <div className="h-38 sm:h-44 overflow-hidden relative border-b border-[#959177]/30">
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                          />
                          <div
                            className="absolute top-3 left-3 px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase rounded shadow text-[#1f1c00]"
                            style={{ backgroundColor: rainbowColor }}
                          >
                            {project.category}
                          </div>

                          {isCentered && (
                            <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-[#f5e700] px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded border border-[#f5e700]/40 animate-pulse">
                              Click to Expand
                            </div>
                          )}
                        </div>

                        {/* Card Content Body */}
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-base font-bold text-white mb-2 line-clamp-1 transition-colors group-hover:text-[#f5e700]">
                            {project.title}
                          </h3>
                          <p className="text-xs text-[#ccc7aa] mb-4 line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech Tags */}
                          <div className="flex gap-1 flex-wrap mb-3">
                            {project.tags && project.tags.slice(0, 3).map((tag, tIdx) => (
                              <span
                                key={tIdx}
                                className="px-2 py-0.5 border border-[#959177]/40 font-mono text-[9px] text-[#ccc7aa] rounded-full uppercase bg-[#0d0e0e]/70"
                              >
                                {tag}
                              </span>
                            ))}
                            {project.tags && project.tags.length > 3 && (
                              <span
                                className="px-1.5 py-0.5 border border-[#959177]/50 font-mono text-[9px] rounded-full"
                                style={{ color: rainbowColor, borderColor: rainbowColor }}
                              >
                                +{project.tags.length - 3}
                              </span>
                            )}
                          </div>

                          {/* Live Link */}
                          {project.liveUrl && (
                            <div className="mt-auto pt-2 border-t border-[#959177]/20 flex justify-end">
                              <span
                                className="px-3 py-1 text-[#1f1c00] text-[11px] font-bold uppercase tracking-wider rounded transition-all flex items-center gap-1 shadow"
                                style={{ backgroundColor: rainbowColor }}
                              >
                                Full Details <ExternalLink size=
                                {11} />
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rainbow Arch Navigation */}
            <div className="flex items-center justify-between w-full max-w-lg mt-6 px-4 z-10">
              <button
                onClick={handlePrev}
                className="p-3 bg-[#131314] border-2 border-[#959177] hover:border-[#f5e700] text-white hover:text-[#f5e700] rounded-full transition-all hover:scale-110 shadow-lg"
                title="Previous Projects"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Rainbow Spectrum Dots */}
              <div className="flex gap-2 items-center overflow-x-auto max-w-[240px] px-2 py-1 no-scrollbar">
                {projects.map((_, idx) => {
                  const hue = Math.round((idx / totalProjects) * 360);
                  const dotColor = `hsl(${hue}, 85%, 60%)`;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleCardHover(idx)}
                      className={`h-2.5 rounded-full transition-all ${
                        activeSlotIndex === idx
                          ? 'w-7 shadow-[0_0_10px_currentColor]'
                          : 'w-2.5 opacity-40 hover:opacity-100'
                      }`}
                      style={{ backgroundColor: dotColor, color: dotColor }}
                    />
                  );
                })}
              </div>

              <button
                onClick={handleNext}
                className="p-3 bg-[#131314] border-2 border-[#959177] hover:border-[#f5e700] text-white hover:text-[#f5e700] rounded-full transition-all hover:scale-110 shadow-lg"
                title="Next Projects"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>
        ) : (
          /* ---------------- CLASSIC GRID SHOWCASE ---------------- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 animate-fade-in">
            {projects.map((project, idx) => {
              const hue = Math.round((idx / totalProjects) * 360);
              const rainbowColor = `hsl(${hue}, 85%, 60%)`;
              return (
                <div
                  key={project._id}
                  onClick={() => setSelectedProject({ ...project, hue, rainbowColor })}
                  className="group border-2 border-[#959177] bg-[#131314] flex flex-col rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
                >
                  <div className="h-48 overflow-hidden relative border-b border-[#959177]/30">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                      alt={project.title}
                      src={project.imageUrl}
                    />
                    <div
                      className="absolute top-3 left-3 text-[#1f1c00] px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded shadow"
                      style={{ backgroundColor: rainbowColor }}
                    >
                      {project.category}
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-[#f5e700] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#ccc7aa] mb-4 flex-grow line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    <div className="flex gap-1.5 flex-wrap mb-4">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 border border-[#959177] font-mono text-[9px] text-[#ccc7aa] rounded-full uppercase bg-[#0d0e0e]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="mt-auto pt-3 border-t border-[#959177]/20 flex justify-end">
                      <span
                        className="px-3 py-1.5 text-[#1f1c00] text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-1 shadow"
                        style={{ backgroundColor: rainbowColor }}
                      >
                        Details <ExternalLink size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ---------------- PROJECT DETAILS MODAL POPUP ---------------- */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#131314] border-2 border-white/20 max-w-2xl w-full rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] relative flex flex-col max-h-[90vh] animate-slide-up"
            style={{
              borderColor: selectedProject.rainbowColor || '#f5e700',
              boxShadow: `0 0 40px ${selectedProject.rainbowColor}40`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Rainbow Bar */}
            <div
              className="h-2 w-full"
              style={{ backgroundColor: selectedProject.rainbowColor || '#f5e700' }}
            />

            {/* Close Button (Cross) */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-[#f5e700] hover:text-[#1f1c00] text-white p-2.5 rounded-full border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg"
              title="Close Details (Esc)"
            >
              <X size={20} />
            </button>

            {/* Modal Image Header */}
            <div className="h-64 sm:h-72 overflow-hidden relative border-b border-[#959177]/30 bg-black">
              <img
                src={selectedProject.imageUrl}
                alt={selectedProject.title}
                className="w-full h-full object-cover opacity-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-transparent to-black/40" />
              
              <div
                className="absolute bottom-4 left-6 px-3 py-1 text-xs font-bold tracking-wider uppercase rounded shadow text-[#1f1c00]"
                style={{ backgroundColor: selectedProject.rainbowColor || '#f5e700' }}
              >
                {selectedProject.category}
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 sm:p-8 flex flex-col flex-grow overflow-y-auto space-y-6">
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {selectedProject.title}
                </h3>
                <div className="w-16 h-1 rounded" style={{ backgroundColor: selectedProject.rainbowColor || '#f5e700' }} />
              </div>

              {/* Full Description */}
              <div>
                <h4 className="text-xs font-bold text-[#f5e700] uppercase tracking-wider mb-2">
                  Project Description & Highlights
                </h4>
                <p className="text-sm sm:text-base text-[#ccc7aa] leading-relaxed whitespace-pre-line">
                  {selectedProject.description}
                </p>
              </div>

              {/* Comprehensive Tech Stack Tags */}
              <div>
                <h4 className="text-xs font-bold text-[#f5e700] uppercase tracking-wider mb-3">
                  Technologies & Architecture Stack
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedProject.tags && selectedProject.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3.5 py-1.5 border border-[#959177] font-mono text-xs text-[#e4e2e2] rounded-full uppercase bg-[#0d0e0e] shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {selectedProject.liveUrl && (
                <div className="pt-4 border-t border-[#959177]/20 flex justify-end items-center gap-3">
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="px-4 py-2 border border-[#959177] text-[#ccc7aa] hover:text-white hover:border-white text-xs font-bold uppercase tracking-wider rounded transition-all"
                  >
                    Back to Showcase
                  </button>

                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-[#1f1c00] text-xs font-bold uppercase tracking-wider rounded hover:bg-white hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
                    style={{ backgroundColor: selectedProject.rainbowColor || '#f5e700' }}
                  >
                    Visit Live Project <ExternalLink size={14} />
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
