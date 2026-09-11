import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { initialProjectsData } from './data/projectsData';

export default function App() {
  const [projects, setProjects] = useState(initialProjectsData);
  const [loading, setLoading] = useState(false);

  // Optional dynamic sync from backend if API server is running
  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5005';
    fetch(`${apiBaseUrl}/api/projects`)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP status ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch((err) => {
        // Fallback to frontend static projects data gracefully
        console.log('Serving frontend local projects dataset:', err.message);
      });
  }, []);

  return (
    <div className="bg-[#131314] text-[#e4e2e2] font-sans antialiased overflow-x-hidden selection:bg-[#f5e700] selection:text-[#1f1c00]">
      <Navbar />
      <Hero />
      <About />
      <Projects projects={projects} loading={loading} />
      <Experience />
      <Contact />
      <Footer />
    </div>
  );
}
