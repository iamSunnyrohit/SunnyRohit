import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  ExternalLink, 
  ChevronLeft, 
  ChevronRight, 
  RotateCw, 
  Grid, 
  Layers, 
  Sparkles, 
  X, 
  Search, 
  Filter, 
  CheckCircle2,
  Code2,
  Cpu,
  Layers3
} from 'lucide-react';
import { initialProjectsData } from '../data/projectsData';

function GithubIcon({ size = 14, className = "" }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function Projects({ projects: externalProjects, loading }) {
  // Use provided projects array or fallback to initialProjectsData
  const projectsList = useMemo(() => {
    if (Array.isArray(externalProjects) && externalProjects.length > 0) {
      return externalProjects;
    }
    return initialProjectsData;
  }, [externalProjects]);

  // State Management
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeView, setActiveView] = useState('3d'); // '3d' or 'grid'
  const [isHovered, setIsHovered] = useState(false);
  const [currentOffset, setCurrentOffset] = useState(0);
  const [targetOffset, setTargetOffset] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [archWidth, setArchWidth] = useState(480);
  const [archHeight, setArchHeight] = useState(120);

  // Card Mouse Tilt state for Grid cards { [index]: { rotateX, rotateY } }
  const [cardTilts, setCardTilts] = useState({});

  // Selected Project for Modal Popup
  const [selectedProject, setSelectedProject] = useState(null);

  const animRef = useRef(null);

  // Compute Categories dynamically with count
  const categories = useMemo(() => {
    const cats = ['All'];
    projectsList.forEach((p) => {
      if (p.category && !cats.includes(p.category)) {
        cats.push(p.category);
      }
    });
    return cats;
  }, [projectsList]);

  // Filtered Projects based on Category and Search Query
  const filteredProjects = useMemo(() => {
    return projectsList.filter((p) => {
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        (p.category && p.category.toLowerCase().includes(q)) ||
        (p.tags && p.tags.some((t) => t.toLowerCase().includes(q)));
      return matchesCategory && matchesSearch;
    });
  }, [projectsList, activeCategory, searchQuery]);

  const totalProjects = filteredProjects.length;

  // ESC key listener to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProject]);

  // Lock body scroll when modal is open
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

  // Responsive arch dimension adjusting for screen size
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

  // Smooth continuous rotation & spring transition for 3D Rainbow Arch
  useEffect(() => {
    if (activeView !== '3d' || totalProjects === 0 || selectedProject) return;

    let lastTime = performance.now();
    const animateRainbowArch = (currentTime) => {
      const delta = currentTime - lastTime;
      lastTime = currentTime;

      if (isHovered && !isDragging) {
        setCurrentOffset((prev) => {
          const diff = targetOffset - prev;
          if (Math.abs(diff) < 0.1) return targetOffset;
          return prev + diff * 0.14;
        });
      } else if (!isDragging) {
        setCurrentOffset((prev) => {
          const maxSweep = Math.max(0, (totalProjects - 1) * 45);
          let next = prev + direction * (delta * 0.016);

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

  // Card Hover & Drag Handlers
  const handleCardHover = (idx) => {
    setIsHovered(true);
    setTargetOffset(idx * 45);
  };

  const handleMouseLeaveStage = () => {
    setIsHovered(false);
    setIsDragging(false);
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMoveStage = (e) => {
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

  // 3D Parallax Tilt for Grid Cards
  const handleGridCardMouseMove = (e, idx) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rotateX = -(y / rect.height) * 14;
    const rotateY = (x / rect.width) * 14;

    setCardTilts((prev) => ({
      ...prev,
      [idx]: { rotateX, rotateY },
    }));
  };

  const handleGridCardMouseLeave = (idx) => {
    setCardTilts((prev) => ({
      ...prev,
      [idx]: { rotateX: 0, rotateY: 0 },
    }));
  };

  const activeSlotIndex = Math.min(
    totalProjects - 1,
    Math.max(0, Math.round(currentOffset / 45))
  );

  return (
    <section id="projects" className="py-[120px] bg-[#0d0e0e] border-t-2 border-[#959177] overflow-hidden select-none relative">
      
      {/* Background Ambient Glow Lights */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#f5e700]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[160px] pointer-events-none" />

      <div className="container max-w-[1280px] mx-auto px-6 relative z-10">
        
        {/* Section Header & Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-6">
          <div>
            <span className="text-xs font-bold text-[#f5e700] mb-2 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} className="text-[#f5e700] animate-spin" />
              Interactive Portfolio Showcase
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight flex items-center gap-3">
              Engineering Showcase
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#f5e700]/10 border border-[#f5e700]/40 text-[#f5e700] font-mono font-normal">
                {filteredProjects.length} Projects
              </span>
            </h2>
          </div>

          {/* View Mode Toggle Controls */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center bg-[#131314] border-2 border-[#959177] p-1 rounded-lg shadow-inner">
              <button
                onClick={() => setActiveView('3d')}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold uppercase transition-all rounded ${
                  activeView === '3d'
                    ? 'bg-[#f5e700] text-[#1f1c00] shadow-[2px_2px_0px_0px_rgba(255,255,255,0.2)]'
                    : 'text-[#ccc7aa] hover:text-white'
                }`}
              >
                <Layers size={14} /> 3D Arch View
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

        {/* Category Filters & Search Controls */}
        <div className="mb-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-[#959177]/30 pb-6">
          
          {/* Category Pills Slider */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 no-scrollbar max-w-full">
            {categories.map((cat) => {
              const count = cat === 'All'
                ? projectsList.length
                : projectsList.filter((p) => p.category === cat).length;

              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setCurrentOffset(0);
                    setTargetOffset(0);
                  }}
                  className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-[#f5e700] text-[#1f1c00] shadow-[0_0_15px_rgba(245,231,0,0.35)] scale-105'
                      : 'bg-[#131314] text-[#ccc7aa] hover:text-white border border-[#959177]/40 hover:border-[#f5e700]/60'
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-black/20 text-[#1f1c00]' : 'bg-[#0d0e0e] text-[#ccc7aa]'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input Bar */}
          <div className="relative min-w-[260px] sm:min-w-[320px]">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#959177]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentOffset(0);
                setTargetOffset(0);
              }}
              placeholder="Search tech stack, category, or title..."
              className="w-full bg-[#131314] border-2 border-[#959177]/60 focus:border-[#f5e700] text-white pl-10 pr-9 py-1.5 rounded-xl text-xs outline-none transition-all placeholder:text-[#959177]/70"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#ccc7aa] hover:text-white"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {loading ? (
          <div className="text-center py-24 text-[#f5e700] font-mono animate-pulse flex flex-col items-center gap-3">
            <RotateCw className="animate-spin text-[#f5e700]" size={32} />
            <span>Hydrating portfolio workspace...</span>
          </div>
        ) : totalProjects === 0 ? (
          <div className="text-center py-20 text-[#ccc7aa] font-mono border-2 border-dashed border-[#959177]/40 rounded-2xl p-8 max-w-md mx-auto">
            <Filter size={36} className="mx-auto mb-3 text-[#f5e700]/60 animate-bounce" />
            <p className="text-sm font-semibold text-white mb-1">No matching projects found</p>
            <p className="text-xs text-[#ccc7aa] mb-4">Try clearing your search query or selecting a different category filter.</p>
            <button
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="px-4 py-1.5 bg-[#f5e700] text-[#1f1c00] text-xs font-bold uppercase rounded-lg hover:scale-105 transition-all shadow"
            >
              Reset Filters
            </button>
          </div>
        ) : activeView === '3d' ? (
          
          /* ---------------- 3D RAINBOW ARCH CAROUSEL SHOWCASE ---------------- */
          <div className="relative py-4 flex flex-col items-center">

            {/* Instruction Guidance Pill */}
            <div className="mb-6 flex items-center justify-center gap-3 text-xs font-mono text-[#ccc7aa] bg-[#131314]/90 px-5 py-2 border border-[#959177]/40 rounded-full backdrop-blur-md z-10 shadow-lg">
              <span className={`inline-block w-2.5 h-2.5 rounded-full ${isHovered ? 'bg-amber-400 animate-ping' : 'bg-gradient-to-r from-red-400 via-yellow-400 to-blue-400 animate-pulse'}`} />
              <span>{isHovered ? 'CLICK CARD FOR FULL ARCHITECTURE DETAILS' : 'DRAG TO SWEEP • HOVER TO CENTER • CLICK FOR DETAILS'}</span>
            </div>

            {/* 3D Scene Viewport */}
            <div
              className="relative w-full h-[540px] md:h-[590px] perspective-1200 cursor-grab active:cursor-grabbing flex items-center justify-center overflow-hidden rounded-3xl border border-[#959177]/30 bg-gradient-to-b from-[#18181b]/70 via-[#0d0e0e]/90 to-[#090a0a] shadow-2xl"
              onMouseLeave={handleMouseLeaveStage}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMoveStage}
              onMouseUp={handleMouseUp}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleMouseUp}
            >
              {/* Dynamic Spectral Rainbow Glow Background */}
              <div
                className="absolute w-[850px] h-[420px] rounded-[50%] pointer-events-none opacity-45 blur-3xl top-12 transition-all duration-700"
                style={{
                  background: `radial-gradient(ellipse at center, hsl(${Math.round(((activeSlotIndex >= 0 ? activeSlotIndex : 0) / totalProjects) * 360)}, 85%, 60%) 0%, transparent 70%)`,
                }}
              />

              {/* Rainbow Spectrum Line Path */}
              <svg className="absolute w-full h-full pointer-events-none opacity-50 z-0" viewBox="0 0 1000 500" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="rainbowGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    {filteredProjects.map((_, pIdx) => {
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
                  strokeWidth="3.5"
                  strokeDasharray="8 6"
                />
              </svg>

              {/* 3D Arch Stage Container */}
              <div className="w-full h-full relative preserve-3d flex items-center justify-center">
                {filteredProjects.map((project, idx) => {
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
                      key={project.id || project._id || idx}
                      onMouseEnter={() => handleCardHover(idx)}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCardHover(idx);
                        setSelectedProject({ ...project, hue, rainbowColor });
                      }}
                      className="absolute top-1/2 left-1/2 w-[250px] sm:w-[270px] md:w-[290px] -mt-[200px] -ml-[125px] sm:-ml-[135px] md:-ml-[145px] preserve-3d transition-all duration-300 group cursor-pointer"
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
                        
                        {/* Rainbow Color Top Accent Bar */}
                        <div
                          className="h-1.5 w-full transition-all duration-300"
                          style={{ backgroundColor: rainbowColor }}
                        />

                        {/* Card Image Banner */}
                        <div className="h-40 sm:h-44 overflow-hidden relative border-b border-[#959177]/30">
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

                          {project.featured && (
                            <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-[#f5e700] px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded border border-[#f5e700]/50 flex items-center gap-1">
                              <Sparkles size={10} /> Featured
                            </div>
                          )}
                        </div>

                        {/* Card Body Details */}
                        <div className="p-5 flex flex-col flex-grow">
                          <h3 className="text-base font-bold text-white mb-2 line-clamp-1 transition-colors group-hover:text-[#f5e700]">
                            {project.title}
                          </h3>
                          <p className="text-xs text-[#ccc7aa] mb-4 line-clamp-3 leading-relaxed">
                            {project.description}
                          </p>

                          {/* Tech Stack Badges */}
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

                          {/* View Action CTA */}
                          <div className="mt-auto pt-2 border-t border-[#959177]/20 flex justify-end">
                            <span
                              className="px-3 py-1 text-[#1f1c00] text-[11px] font-bold uppercase tracking-wider rounded transition-all flex items-center gap-1 shadow group-hover:scale-105"
                              style={{ backgroundColor: rainbowColor }}
                            >
                              Explore <ExternalLink size={11} />
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rainbow Arch Carousel Navigation Bar */}
            <div className="flex items-center justify-between w-full max-w-lg mt-6 px-4 z-10">
              <button
                onClick={handlePrev}
                className="p-3 bg-[#131314] border-2 border-[#959177] hover:border-[#f5e700] text-white hover:text-[#f5e700] rounded-full transition-all hover:scale-110 shadow-lg"
                title="Previous Project"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Spectrum Dots Navigation */}
              <div className="flex gap-2 items-center overflow-x-auto max-w-[260px] px-2 py-1 no-scrollbar">
                {filteredProjects.map((_, idx) => {
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
                title="Next Project"
              >
                <ChevronRight size={20} />
              </button>
            </div>

          </div>
        ) : (
          
          /* ---------------- CLASSIC GRID SHOWCASE WITH 3D TILT ---------------- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 animate-fade-in">
            {filteredProjects.map((project, idx) => {
              const hue = Math.round((idx / totalProjects) * 360);
              const rainbowColor = `hsl(${hue}, 85%, 60%)`;
              const tilt = cardTilts[idx] || { rotateX: 0, rotateY: 0 };

              return (
                <div
                  key={project.id || project._id || idx}
                  onMouseMove={(e) => handleGridCardMouseMove(e, idx)}
                  onMouseLeave={() => handleGridCardMouseLeave(idx)}
                  onClick={() => setSelectedProject({ ...project, hue, rainbowColor })}
                  className="group border-2 border-[#959177]/70 hover:border-white bg-[#131314] flex flex-col rounded-2xl overflow-hidden transition-transform duration-200 hover:shadow-[0_10px_30px_rgba(0,0,0,0.8)] cursor-pointer preserve-3d relative"
                  style={{
                    transform: `perspective(1000px) rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg)`,
                  }}
                >
                  {/* Top Color Spectrum Accent Bar */}
                  <div
                    className="h-1.5 w-full transition-all duration-300"
                    style={{ backgroundColor: rainbowColor }}
                  />

                  {/* Card Banner */}
                  <div className="h-52 overflow-hidden relative border-b border-[#959177]/30 bg-black">
                    <img
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-90"
                      alt={project.title}
                      src={project.imageUrl}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-transparent to-transparent opacity-80" />

                    <div
                      className="absolute top-3 left-3 text-[#1f1c00] px-2.5 py-0.5 text-[10px] font-bold tracking-wide uppercase rounded shadow"
                      style={{ backgroundColor: rainbowColor }}
                    >
                      {project.category}
                    </div>

                    {project.featured && (
                      <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md text-[#f5e700] px-2 py-0.5 text-[9px] font-bold tracking-wider uppercase rounded border border-[#f5e700]/50 flex items-center gap-1">
                        <Sparkles size={10} /> Featured
                      </div>
                    )}
                  </div>

                  {/* Card Content Body */}
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-[#f5e700] transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-[#ccc7aa] mb-4 flex-grow line-clamp-3 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex gap-1.5 flex-wrap mb-4">
                      {project.tags && project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 border border-[#959177]/50 font-mono text-[10px] text-[#ccc7aa] rounded-full uppercase bg-[#0d0e0e]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* CTA Footer */}
                    <div className="mt-auto pt-3 border-t border-[#959177]/20 flex justify-between items-center">
                      <span className="text-[11px] font-mono text-[#959177] group-hover:text-white transition-colors">
                        Click to view details
                      </span>
                      <span
                        className="px-3.5 py-1.5 text-[#1f1c00] text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center gap-1 shadow group-hover:scale-105"
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

      {/* ---------------- INTERACTIVE PROJECT DETAILS MODAL POPUP ---------------- */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="bg-[#131314] border-2 max-w-3xl w-full rounded-2xl overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.9)] relative flex flex-col max-h-[92vh] animate-slide-up"
            style={{
              borderColor: selectedProject.rainbowColor || '#f5e700',
              boxShadow: `0 0 50px ${selectedProject.rainbowColor}50`,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Top Accent Bar */}
            <div
              className="h-2 w-full"
              style={{ backgroundColor: selectedProject.rainbowColor || '#f5e700' }}
            />

            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-20 bg-black/70 hover:bg-[#f5e700] hover:text-[#1f1c00] text-white p-2.5 rounded-full border border-white/20 transition-all duration-200 hover:scale-110 shadow-lg"
              title="Close Details (Esc)"
            >
              <X size={20} />
            </button>

            {/* Modal Image Header */}
            <div className="h-64 sm:h-72 overflow-hidden relative border-b border-[#959177]/30 bg-black flex-shrink-0">
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

              {selectedProject.featured && (
                <div className="absolute bottom-4 right-6 bg-black/80 backdrop-blur-md text-[#f5e700] px-3 py-1 text-xs font-bold tracking-wider uppercase rounded border border-[#f5e700]/50 flex items-center gap-1.5">
                  <Sparkles size={12} /> Core Featured Project
                </div>
              )}
            </div>

            {/* Modal Scrollable Content Body */}
            <div className="p-6 sm:p-8 flex flex-col flex-grow overflow-y-auto space-y-6">
              
              {/* Header Title */}
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  {selectedProject.title}
                </h3>
                <div
                  className="w-20 h-1.5 rounded-full"
                  style={{ backgroundColor: selectedProject.rainbowColor || '#f5e700' }}
                />
              </div>

              {/* Overview Description */}
              <div>
                <h4 className="text-xs font-bold text-[#f5e700] uppercase tracking-wider mb-2 flex items-center gap-2">
                  <Code2 size={14} /> System Description & Core Value
                </h4>
                <p className="text-sm sm:text-base text-[#ccc7aa] leading-relaxed">
                  {selectedProject.longDescription || selectedProject.description}
                </p>
              </div>

              {/* Architecture & Engineering Highlights */}
              {selectedProject.architectureHighlights && selectedProject.architectureHighlights.length > 0 && (
                <div className="bg-[#0d0e0e] border border-[#959177]/40 rounded-xl p-4 sm:p-5">
                  <h4 className="text-xs font-bold text-[#f5e700] uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Cpu size={14} /> Architecture & Technical Highlights
                  </h4>
                  <ul className="space-y-2">
                    {selectedProject.architectureHighlights.map((highlight, hIdx) => (
                      <li key={hIdx} className="text-xs sm:text-sm text-[#e4e2e2] flex items-start gap-2.5">
                        <CheckCircle2 size={15} className="text-[#f5e700] mt-0.5 flex-shrink-0" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Technology Stack Tags */}
              <div>
                <h4 className="text-xs font-bold text-[#f5e700] uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Layers3 size={14} /> Technologies & Frameworks
                </h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedProject.tags && selectedProject.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="px-3 py-1 border border-[#959177] font-mono text-xs text-[#e4e2e2] rounded-full uppercase bg-[#0d0e0e] shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Modal Action Buttons */}
              <div className="pt-4 border-t border-[#959177]/20 flex flex-col sm:flex-row justify-end items-stretch sm:items-center gap-3">
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-2.5 border border-[#959177] text-[#ccc7aa] hover:text-white hover:border-white text-xs font-bold uppercase tracking-wider rounded transition-all text-center"
                >
                  Back to Showcase
                </button>

                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 bg-[#131314] border-2 border-[#959177] hover:border-white text-white text-xs font-bold uppercase tracking-wider rounded transition-all flex items-center justify-center gap-2 shadow"
                  >
                    <GithubIcon size={14} /> GitHub Repository
                  </a>
                )}

                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-5 py-2.5 text-[#1f1c00] text-xs font-bold uppercase tracking-wider rounded hover:bg-white hover:scale-105 transition-all flex items-center justify-center gap-2 shadow-lg"
                    style={{ backgroundColor: selectedProject.rainbowColor || '#f5e700' }}
                  >
                    View Live Project <ExternalLink size={14} />
                  </a>
                )}
              </div>

            </div>
          </div>
        </div>
      )}
    </section>
  );
}
