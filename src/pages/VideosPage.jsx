import React, { useState, useEffect } from 'react';

const videosData = [
  { id: 1, title: "Zorritos", thumb: "/videos/video1.webp", vimeoId: "1174247522", format: "horizontal" },

  { id: 2, title: "Playa", thumb: "/videos/video2.webp", vimeoId: "1195207721", format: "vertical" },
  
  { id: 3, title: "Corto", thumb: "/videos/video3.webp", vimeoId: "", format: "horizontal" },

  { id: 4, title: "Rattata ", thumb: "/videos/video4.webp", vimeoId: "789123456", format: "horizontal" },
];

const VideosPage = () => {
  const [selectedVideo, setSelectedVideo] = useState(null);

  // SOLUCIÓN AL BUG DEL SCROLL DE NAVEGACIÓN X2
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleKeyDown = (e, video) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedVideo(video);
    }
  };

  return (
    <div className="min-h-screen w-full bg-portfolio-dark pt-32 px-4 md:px-8 pb-20">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER */}
        <div className="mb-16 text-center" data-aos="fade-down">
          <h1 className="text-5xl font-playfair font-bold text-white mb-4">Motion & Video</h1>
          <div className="w-24 h-1 bg-portfolio-accent mx-auto mb-6"></div>
          <p className="text-gray-400 font-light max-w-2xl mx-auto">
            Edición y narrativa
          </p>
        </div>

        {/* Cuadrícula Uniforme */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          {videosData.map((video, index) => (
            <div 
              key={video.id} 
              role="button"
              tabIndex={0}
              aria-label={`Reproducir video: ${video.title}`}
              className="group relative rounded-none overflow-hidden bg-portfolio-grey cursor-pointer border border-gray-800 focus:outline-none focus:border-portfolio-accent transition-colors"
              onClick={() => setSelectedVideo(video)}
              onKeyDown={(e) => handleKeyDown(e, video)}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="aspect-video w-full relative overflow-hidden bg-black">
                <img 
                  src={video.thumb} 
                  alt={video.title} 
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-60"
                  onError={(e) => { e.target.style.opacity = 0; }} 
                />
                
                {/* DISEÑO TEXTO SOBRE VIDEO*/}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="font-mono text-xs tracking-[0.3em] uppercase text-red-900/80 animate-flicker group-hover:text-red-700 transition-colors duration-300">
                    DO NOT PLAY
                  </span>
                </div>

                {/* Decoración Esquinas */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-portfolio-accent/0 group-hover:border-portfolio-accent/100 transition-colors z-10 m-4"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-portfolio-accent/0 group-hover:border-portfolio-accent/100 transition-colors z-10 m-4"></div>
              </div>
              
              {/* Título */}
              <div className="p-6 border-t border-gray-800 group-hover:bg-portfolio-accent/5 transition-colors">
                <h3 className="font-playfair text-xl font-bold text-white group-hover:text-portfolio-accent transition-colors">
                  {video.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* LIGHTBOX DE VIDEO */}
      {selectedVideo && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-md transition-opacity px-4"
          onClick={() => setSelectedVideo(null)}
          role="dialog"
          aria-modal="true"
        >
          <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-portfolio-accent transition-colors z-50 bg-black/50 p-2 rounded-full"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedVideo(null);
            }}
            aria-label="Cerrar reproductor"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>

          {/* 2. LÓGICA CONDICIONAL: Ajusta el tamaño y la proporción según el formato */}
          <div 
            className={`relative w-full rounded-none overflow-hidden shadow-[0_0_50px_rgba(255,76,76,0.15)] border border-gray-800 transition-all duration-300
              ${selectedVideo.format === 'vertical' ? 'max-w-sm aspect-[9/16]' : 'max-w-5xl aspect-video'}
            `}
            onClick={(e) => e.stopPropagation()} 
          >
            <iframe 
              src={`https://player.vimeo.com/video/${selectedVideo.vimeoId}?autoplay=1&title=0&byline=0&portrait=0`}
              className="absolute top-0 left-0 w-full h-full bg-black"
              frameBorder="0" 
              allow="autoplay; fullscreen; picture-in-picture" 
              allowFullScreen
              title={`Reproduciendo: ${selectedVideo.title}`}
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default VideosPage;