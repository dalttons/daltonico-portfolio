// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

import Navbar from './components/Navbar';
import Home from './pages/Home';
import PhotosPage from './pages/PhotosPage';
import VideosPage from './pages/VideosPage';
import CodePage from './pages/CodePage';
import ConceptsPage from './pages/ConceptsPage';

function App() {
  // Inicialización global de AOS
  useEffect(() => {
    AOS.init({ 
      duration: 1000, 
      once: true, 
      offset: 100 
    });
    
    setTimeout(() => {
      AOS.refresh();
    }, 500);
  }, []);

  return (
    <BrowserRouter>
    <Navbar />
      <main className="bg-portfolio-dark text-white font-poppins antialiased">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/fotos" element={<PhotosPage />} />
          <Route path="/videos" element={<VideosPage />} />
          <Route path="/codigo" element={<CodePage />} />
          <Route path="/concepts" element={<ConceptsPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;