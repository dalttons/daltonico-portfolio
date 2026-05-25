import React, { useState, useEffect, useRef } from 'react';

const conceptsData = [
  { id: 1, title: "Epic of Gilgamesh", image: "/concept/1.webp", tech: "Sumerian", desc: "The beginning?" },

  { id: 2, title: "Me", image: "/concept/2.webp", tech: "Yabujincore ", desc: "This error was never triggered by the system." },

  { id: 3, title: "Are you not alone?", image: "/concept/3.png", tech: "Internet", desc: "You accessed this fragment already. You forgot." },

  { id: 4, title: "Mei Misaki", image: "/concept/4.gif", tech: "Another", desc: "Structure exists, but not for you." },

  { id: 5, title: "forest", image: "/concept/5.webp", tech: "Internet", desc: "Lost." },

  { id: 6, title: "You", image: "/concept/6.webp", tech: "Internet", desc: "It's you." },

  { id: 7, title: "Ponyo", image: "/concept/7.webp", tech: "Internet", desc: "3." },

  { id: 8, title: "Kim Jong-un", image: "/concept/8.webp", tech: "Internet", desc: "Waifu." },

  { id: 9, title: "Dreamcore", image: "/concept/9.webp", tech: "Internet", desc: "Lost." },

  { id: 10, title: "TempleOS", image: "/concept/10.webp", tech: "Terrence Andrew Davis", desc: "Biblia." },
];

const ConceptsPage = () => {
  // SOLUCIÓN 1: Inicialización Aleatoria (Lazy State Initialization)
  const [activeIndex, setActiveIndex] = useState(() => Math.floor(Math.random() * conceptsData.length));
  const [openedConcept, setOpenedConcept] = useState(null);
  
  // NUEVO: Estado de errores de imagen
  const [imgError, setImgError] = useState({});
  // NUEVO: Referencias para el foco del carrusel
  const itemRefs = useRef([]);

  // SOLUCIÓN AL BUG DEL SCROLL
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // NUEVO: Modal Incompleto (Deuda Técnica) - Escape y Bloqueo de Scroll
  useEffect(() => {
    const handleKeyDownEsc = (e) => {
      if (e.key === 'Escape') setOpenedConcept(null);
    };

    if (openedConcept) {
      document.body.style.overflow = 'hidden'; // Bloquea la fuga de foco de scroll
      window.addEventListener('keydown', handleKeyDownEsc);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDownEsc);
    };
  }, [openedConcept]);

  // NUEVO: Accesibilidad del Carrusel - Mover el foco real a la tarjeta central
  useEffect(() => {
    if (itemRefs.current[activeIndex] && !openedConcept) {
      itemRefs.current[activeIndex].focus();
    }
  }, [activeIndex, openedConcept]);

  const handleNav = (dir) => {
    setActiveIndex((prev) => {
      let next = dir === 'next' ? prev + 1 : prev - 1;
      if (next < 0) return conceptsData.length - 1;
      if (next >= conceptsData.length) return 0;
      return next;
    });
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      if (index === activeIndex) {
        setOpenedConcept(conceptsData[index]);
      } else {
        setActiveIndex(index);
      }
    } else if (e.key === 'ArrowLeft') {
      handleNav('prev');
    } else if (e.key === 'ArrowRight') {
      handleNav('next');
    }
  };

  return (
    // CONTENEDOR PRINCIPAL
    <div className="min-h-screen bg-black text-gray-400 font-mono overflow-hidden relative shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] bg-static flex flex-col">

      {/* HEADER */}
      <div className="text-center pt-32 mb-12 relative z-10">
        <h1 className="text-4xl md:text-5xl tracking-[0.2em] text-white/80 font-black cursor-crosshair hover:animate-text-glitch-severe transition-all">
          ARCHIVE_██
        </h1>
        <p className="mt-4 text-[10px] md:text-xs tracking-[0.4em] text-red-900/80 animate-pulse font-bold">
          UNSTABLE MEMORY FRAGMENT
        </p>
      </div>

      {/* CARRUSEL */}
      <div className="relative h-[450px] md:h-[520px] flex items-center justify-center mb-20">

        <button 
          onClick={() => handleNav('prev')}
          aria-label="Concepto anterior"
          className="absolute left-4 md:left-12 z-50 text-red-900/50 hover:text-red-700 transition-colors text-4xl focus:outline-none focus:text-red-500"
        >
          ←
        </button>

        <button 
          onClick={() => handleNav('next')}
          aria-label="Siguiente concepto"
          className="absolute right-4 md:right-12 z-50 text-red-900/50 hover:text-red-700 transition-colors text-4xl focus:outline-none focus:text-red-500"
        >
          →
        </button>

        {conceptsData.map((concept, index) => {
          // CORRECCIÓN: BUG MATEMÁTICO DEL CARRUSEL (Offset Circular)
          let offset = index - activeIndex;
          const total = conceptsData.length;
          
          // Normaliza el offset para simular un anillo infinito
          if (offset > Math.floor(total / 2)) offset -= total;
          if (offset < -Math.floor(total / 2)) offset += total;

          if (Math.abs(offset) > 2) return null;

          const isCenter = offset === 0;

          return (
            <div
              key={concept.id}
              ref={(el) => (itemRefs.current[index] = el)} // Ref agregada para el autofocus
              role="button"
              tabIndex={isCenter ? 0 : -1}
              aria-label={`Abrir concepto: ${concept.title}`}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`
                absolute w-[280px] md:w-[380px] aspect-[4/5] md:aspect-square
                transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] will-change-transform outline-none focus-visible:ring-2 focus-visible:ring-red-900
                ${isCenter ? 'z-30 scale-100 opacity-100' : 'z-10 opacity-40'}
                ${Math.abs(offset) === 2 ? 'scale-[0.65] opacity-10 blur-sm' : ''} 
                ${Math.abs(offset) === 1 ? 'scale-85 blur-[1px]' : ''}
              `}
              style={{
                transform: `translateX(${offset * 75}%) rotateY(${offset * -15}deg) translateZ(${Math.abs(offset) * -100}px)`,
                perspective: '1000px'
              }}
            >
              <div 
                className={`
                  relative w-full h-full bg-[#0a0a0a] border border-red-900/30 overflow-hidden flex flex-col
                  ${isCenter ? 'cursor-crosshair shadow-[0_0_30px_rgba(120,0,0,0.2)] hover:border-red-700/80 transition-colors' : 'cursor-pointer'}
                `}
                onClick={() => {
                  if (isCenter) setOpenedConcept(concept);
                  else setActiveIndex(index);
                }}
              >
                {/* HEADER DE LA TARJETA */}
                <div className="p-3 border-b border-red-900/20 text-[10px] tracking-widest flex justify-between bg-black/80 z-20 relative">
                  <span className="text-gray-500 font-bold">[ID_{concept.id}]</span>
                  <span className="text-red-900/80">{concept.tech}</span>
                </div>

                {/* CONTENEDOR DE IMAGEN */}
                <div className="relative flex-grow w-full overflow-hidden bg-black">
                  <div className="absolute inset-0 border border-red-900/10 translate-x-[1px] -translate-y-[1px] z-10 pointer-events-none mix-blend-screen"></div>

                  {/* CORRECCIÓN: Prevención de errores de imagen (onError) */}
                  {!imgError[concept.id] ? (
                    <img
                      src={concept.image}
                      alt={concept.title}
                      loading="lazy"
                      onError={() => setImgError(prev => ({ ...prev, [concept.id]: true }))}
                      className={`
                        absolute inset-0 w-full h-full object-cover grayscale contrast-[1.3] brightness-50
                        ${isCenter ? 'scale-105 hover:grayscale-0 hover:brightness-100' : ''} transition-all duration-700
                      `}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]">
                      <span className="text-red-900/50 text-[10px] tracking-widest font-bold uppercase animate-pulse">DATA_CORRUPTED</span>
                    </div>
                  )}

                  {/* Noise estático */}
                  <div className="absolute inset-0 opacity-40 mix-blend-overlay pointer-events-none z-10">
                    <div className="w-full h-full bg-[linear-gradient(transparent_96%,rgba(255,0,0,0.2)_100%)] bg-[length:100%_3px]" />
                  </div>

                  {/* Flicker rojo si está en el centro */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-red-900/10 animate-[pulse_2s_infinite] pointer-events-none z-10 mix-blend-multiply"></div>
                  )}
                </div>

                {/* TITLE DE LA TARJETA */}
                <div className="p-4 bg-[#050505] z-20 relative border-t border-red-900/20">
                  <h3 className="text-xs md:text-sm tracking-[0.2em] text-white/60 font-bold uppercase truncate">
                    {concept.title}
                  </h3>
                </div>

              </div>
            </div>
          );
        })}
      </div>

      {/* SOLUCIÓN 2: MODAL REFACTORIZADO (Delegación Estricta de Clics) */}
      {openedConcept && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out p-4 md:p-8"
          onClick={() => setOpenedConcept(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-static opacity-20 pointer-events-none"></div>

          {/* 1. CONTENEDOR CENTRAL BUG sin stopPropagation. 
              clic en espacios vacíos para cerrar el modal. */}
          <div 
            className="relative w-full max-w-4xl max-h-[95vh] text-center flex flex-col items-center justify-center pointer-events-none"
          >
            
            {/* 2. IMAGEN BUG: Puntero reactivado y stopPropagation individual. 
                clic en la foto y no se cierra. */}
            <div 
              className="relative overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.1)] border border-red-900/20 flex-shrink min-h-0 pointer-events-auto cursor-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={openedConcept.image}
                alt="Concepto Abierto"
                className="max-h-[60vh] md:max-h-[75vh] w-auto max-w-full object-contain grayscale contrast-[1.2] brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
              />
            </div>

            {/* 3. TEXTO BUG: Puntero reactivado y stopPropagation individual. 
                seleccionar texto */}
            <p 
              className="mt-6 md:mt-8 text-red-900/80 text-sm md:text-base tracking-widest animate-flicker max-w-2xl px-4 flex-shrink-0 overflow-y-auto max-h-[20vh] custom-scrollbar pointer-events-auto cursor-auto text-justify md:text-center"
              onClick={(e) => e.stopPropagation()}
            >
              {openedConcept.desc}
            </p>

          </div>
        </div>
      )}

    </div>
  );
};

export default ConceptsPage;