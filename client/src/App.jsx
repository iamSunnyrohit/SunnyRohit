import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch production portfolio details dynamically from Backend Rest API
  useEffect(() => {
    const apiBaseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5005';
    fetch(`${apiBaseUrl}/api/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error connecting to backend portfolio API:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="bg-[#131314] text-[#e4e2e2] font-sans antialiased overflow-x-hidden selection:bg-[#f5e700] selection:text-[#1f1c00]">
      <Navbar />
      <Hero />
      <About />
      <Projects projects={projects} loading={loading} />
      <Contact />
      <Footer />
    </div>
  );
}
