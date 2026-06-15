import React, { useState, useEffect, useRef } from 'react';

const photosData = [
  { id: 1, src: "/photos/foto1.webp", alt: "Friends", span: "tall" },
  { id: 2, src: "/photos/foto2.webp", alt: "Flower", span: "wide" },
  { id: 3, src: "/photos/foto3.webp", alt: "Folfdog", span: "single" }, 
  { id: 4, src: "/photos/foto4.webp", alt: "Edit", span: "single" },
  { id: 5, src: "/photos/foto5.webp", alt: "Tree", span: "full" },
  { id: 6, src: "/photos/foto6.webp", alt: "Mantis", span: "single" }, 
  { id: 7, src: "/photos/foto7.webp", alt: "Apple Blossom", span: "single" },
  { id: 8, src: "/photos/foto8.webp", alt: "Lighthouse", span: "tall" },
  { id: 9, src: "/photos/foto9.webp", alt: "Mirror", span: "wide" },
  { id: 10, src: "/photos/foto10.webp", alt: "Panorámica 2", span: "full" },

  { id: 11, src: "/photos/foto11.webp", alt: "Cat", span: "tall" },
  { id: 12, src: "/photos/foto12.webp", alt: "Parrots", span: "wide" },
  { id: 13, src: "/photos/foto13.webp", alt: "Owl", span: "single" },
  { id: 14, src: "/photos/foto14.webp", alt: "Birds", span: "single" },
  { id: 15, src: "/photos/foto15.webp", alt: "Horses", span: "full" },
  { id: 16, src: "/photos/foto16.webp", alt: "Bird", span: "tall" },
  { id: 17, src: "/photos/foto17.webp", alt: "Salamander", span: "wide" },
  { id: 18, src: "/photos/foto18.webp", alt: "Birds 2", span: "single" },
  { id: 19, src: "/photos/foto19.webp", alt: "Bees", span: "single" },
  { id: 20, src: "/photos/foto20.webp", alt: "White Flower", span: "full" },

  { id: 21, src: "/photos/foto21.webp", alt: "Me", span: "tall" },
  { id: 22, src: "/photos/foto22.webp", alt: "Hausehaunted House", span: "wide" },
  { id: 23, src: "/photos/foto23.webp", alt: "Me", span: "single" },
  { id: 24, src: "/photos/foto24.webp", alt: "Me", span: "single" },
  { id: 25, src: "/photos/foto25.webp", alt: "Iguana", span: "single"},
  { id: 26, src: "/photos/foto26.webp", alt: "book", span: "single"},
  { id: 27, src: "/photos/foto27.webp", alt: "draw", span: "single"},

];

const PhotosPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  
  // NUEVO: Estados de Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const photosPerPage = 10;
  
  // Ref al inicio de la galería para hacer auto-scroll al cambiar de página
  const galleryRef = useRef(null);

  // Hook inicial (scroll top absolute)
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // NUEVO: Algoritmo de partición del array
  const indexOfLastPhoto = currentPage * photosPerPage;
  const indexOfFirstPhoto = indexOfLastPhoto - photosPerPage;
  const currentPhotos = photosData.slice(indexOfFirstPhoto, indexOfLastPhoto);
  const totalPages = Math.ceil(photosData.length / photosPerPage);

  // NUEVO: Función para cambiar de página y resetear el scroll de vista
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (galleryRef.current) {
      // Un offset de -100px para que el título no quede pegado al borde superior del navegador
      const y = galleryRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getGridClasses = (span) => {
    switch (span) {
      case 'full': return 'col-span-1 md:col-span-2 lg:col-span-3 row-span-1';
      case 'wide': return 'col-span-1 md:col-span-2 row-span-1';
      case 'tall': return 'col-span-1 row-span-2';
      case 'large': return 'col-span-1 md:col-span-2 row-span-2';
      case 'single':
      default: return 'col-span-1 row-span-1';
    }
  };

  const handleKeyDown = (e, photo) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedImage(photo);
    }
  };

  return (
    <div className="min-h-screen w-full bg-portfolio-dark pt-32 px-4 md:px-8 pb-20">
      {/* ref aquí para que el scroll devuelva al inicio de la sección de fotos */}
      <div className="max-w-7xl mx-auto" ref={galleryRef}>
        
        <div className="mb-16 text-center" data-aos="fade-down">
          <h1 className="text-5xl font-playfair font-bold text-white mb-4">Photography</h1>
          <div className="w-24 h-1 bg-portfolio-accent mx-auto mb-6"></div>
          <p className="text-gray-400 font-light max-w-2xl mx-auto px-4">
            Exploración visual y captura de momentos
          </p>
        </div>

        {/* REFACTORIZACIÓN: Mapeamos currentPhotos en lugar de photosData */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 grid-flow-row-dense auto-rows-[250px] md:auto-rows-[300px]">
          {currentPhotos.map((photo) => (
            <div 
              key={photo.id} 
              role="button"
              tabIndex={0}
              aria-label={`Ver imagen ampliada: ${photo.alt}`}
              onClick={() => setSelectedImage(photo)}
              onKeyDown={(e) => handleKeyDown(e, photo)}
              className={`
                overflow-hidden rounded-lg bg-portfolio-grey cursor-zoom-in group relative border border-gray-800 focus:outline-none focus:ring-2 focus:ring-portfolio-accent transition-shadow
                ${getGridClasses(photo.span)}
              `}
            >
              <img 
                src={photo.src} 
                alt={photo.alt} 
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:opacity-80 absolute inset-0"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          ))}
        </div>

        {/* Controles de Paginación */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-8 mt-16">
            {/* Flecha Izquierda (Solo visible si no estamos en la primera página) */}
            <button 
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 transition-all duration-300 ${currentPage === 1 ? 'opacity-0 cursor-default pointer-events-none' : 'opacity-100 hover:text-portfolio-accent text-white cursor-pointer hover:-translate-x-2'}`}
              aria-label="Página anterior"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"></line>
                <polyline points="12 19 5 12 12 5"></polyline>
              </svg>
            </button>

            {/* Indicador Numérico */}
            <span className="font-mono text-gray-500 text-sm tracking-widest">
              {currentPage} / {totalPages}
            </span>

            {/* Flecha Derecha (Solo visible si no estamos en la última página) */}
            <button 
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 transition-all duration-300 ${currentPage === totalPages ? 'opacity-0 cursor-default pointer-events-none' : 'opacity-100 hover:text-portfolio-accent text-white cursor-pointer hover:translate-x-2'}`}
              aria-label="Página siguiente"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>
        )}

      </div>

      {/* MODAL */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm cursor-zoom-out transition-opacity"
          onClick={() => setSelectedImage(null)}
          role="dialog"
          aria-modal="true"
        >
          <button 
            className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-portfolio-accent transition-colors bg-black/50 rounded-full p-2"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            aria-label="Cerrar imagen"
          >
            <svg className="w-8 h-8 md:w-10 md:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
          
          <img 
            src={selectedImage.src} 
            alt={selectedImage.alt}
            onClick={(e) => e.stopPropagation()} 
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-md shadow-2xl cursor-default border border-gray-800"
          />
        </div>
      )}

    </div>
  );
};

export default PhotosPage;