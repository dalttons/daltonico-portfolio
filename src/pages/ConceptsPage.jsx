import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, animate, useTransform, useMotionValueEvent } from 'framer-motion';

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
  const [openedConcept, setOpenedConcept] = useState(null);
  const [imgError, setImgError] = useState({});
  const isDragging = useRef(false);

  const total = conceptsData.length;
  // Motor físico continuo
  const rawIndex = useMotionValue(Math.floor(Math.random() * total));
  // Sincronización de estado para revivir el diseño discreto de la V1
  const [activeIndex, setActiveIndex] = useState(rawIndex.get());

  // Listener para recuperar el estado "isCenter" de tu V1 sin matar el rendimiento
  useMotionValueEvent(rawIndex, "change", (latest) => {
    const current = ((Math.round(latest) % total) + total) % total;
    if (current !== activeIndex) {
      setActiveIndex(current);
    }
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  useEffect(() => {
    const handleKeyDownEsc = (e) => {
      if (e.key === 'Escape') setOpenedConcept(null);
    };
    if (openedConcept) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDownEsc);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDownEsc);
    };
  }, [openedConcept]);

  // NUEVO: Delegación global de eventos de teclado (Previene saltos de DOM en móviles)
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (openedConcept) return; // Bloquea la navegación si el modal está abierto
      if (e.key === 'ArrowLeft') handleNav('prev');
      if (e.key === 'ArrowRight') handleNav('next');
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [openedConcept]);

  const handleNav = (dir) => {
    const current = Math.round(rawIndex.get());
    const next = dir === 'next' ? current + 1 : current - 1;
    // Replicación exacta de tu cubic-bezier de V1 para los botones
    animate(rawIndex, next, { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.7 });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowLeft') handleNav('prev');
    if (e.key === 'ArrowRight') handleNav('next');
  };

  const handlePanStart = () => {
    isDragging.current = true;
  };

  const handlePan = (e, info) => {
    // Arrastre progresivo 1:1
    const delta = -info.delta.x / 200; 
    rawIndex.set(rawIndex.get() + delta);
  };

  const handlePanEnd = (e, info) => {
    const velocity = -info.velocity.x / 150; 
    
    // Motor de inercia para la "ruleta"
    animate(rawIndex, rawIndex.get(), {
      type: "inertia",
      velocity: velocity,
      power: 0.8,
      timeConstant: 400,
      modifyTarget: (target) => Math.round(target) 
    });

    setTimeout(() => {
      isDragging.current = false;
    }, 50);
  };

  const handleCardClick = (concept, index) => {
    if (isDragging.current) return;

    if (index === activeIndex) {
      setOpenedConcept(concept);
    } else {
      let diff = index - activeIndex;
      if (diff > total / 2) diff -= total;
      if (diff < -total / 2) diff += total;
      animate(rawIndex, Math.round(rawIndex.get()) + diff, { type: "tween", ease: [0.25, 1, 0.5, 1], duration: 0.7 });
    }
  };

  return (
    <div className="min-h-screen bg-black text-gray-400 font-mono overflow-hidden relative shadow-[inset_0_0_150px_rgba(0,0,0,0.9)] bg-static flex flex-col">
      <div className="text-center pt-32 mb-12 relative z-10 pointer-events-none">
        <h1 className="text-4xl md:text-5xl tracking-[0.2em] text-white/80 font-black hover:animate-text-glitch-severe transition-all pointer-events-auto inline-block">
          ARCHIVE_██
        </h1>
        <p className="mt-4 text-[10px] md:text-xs tracking-[0.4em] text-red-900/80 animate-pulse font-bold">
          UNSTABLE MEMORY FRAGMENT
        </p>
      </div>

      <motion.div 
        className="relative h-[450px] md:h-[520px] flex items-center justify-center mb-20 touch-pan-y outline-none"
        onPanStart={handlePanStart}
        onPan={handlePan}
        onPanEnd={handlePanEnd}
        style={{ userSelect: 'none', WebkitUserSelect: 'none' }}
      >
        <button 
          onClick={(e) => { e.stopPropagation(); handleNav('prev'); }}
          className="absolute left-4 md:left-12 z-50 text-red-900/50 hover:text-red-700 transition-colors text-4xl focus:outline-none focus:text-red-500"
        >
          ←
        </button>

        <button 
          onClick={(e) => { e.stopPropagation(); handleNav('next'); }}
          className="absolute right-4 md:right-12 z-50 text-red-900/50 hover:text-red-700 transition-colors text-4xl focus:outline-none focus:text-red-500"
        >
          →
        </button>

        {conceptsData.map((concept, index) => {
          // El estado original de V1 restaurado
          const isCenter = index === activeIndex;

          const offsetMV = useTransform(rawIndex, (v) => {
            let diff = index - (v % total);
            diff = ((diff % total) + total) % total;
            if (diff > total / 2) diff -= total;
            return diff;
          });

          const transform = useTransform(offsetMV, (v) => 
            `perspective(1000px) translateX(${v * 75}%) rotateY(${v * -15}deg) translateZ(${Math.abs(v) * -100}px)`
          );

          // Traducción matemática matemáticamente perfecta de tus clases de V1
          // offset 1: scale-85 (0.85), opacity-40 (0.4), blur-[1px]
          // offset 2: scale-[0.65] (0.65), opacity-10 (0.1), blur-sm (4px)
          const scale = useTransform(offsetMV, [-3, -2, -1, 0, 1, 2, 3], [0.4, 0.65, 0.85, 1, 0.85, 0.65, 0.4]);
          const opacity = useTransform(offsetMV, [-3, -2, -1, 0, 1, 2, 3], [0, 0.1, 0.4, 1, 0.4, 0.1, 0]);
          const blur = useTransform(offsetMV, [-3, -2, -1, 0, 1, 2, 3], ["8px", "4px", "1px", "0px", "1px", "4px", "8px"]);
          const display = useTransform(offsetMV, (v) => Math.abs(v) > 2.5 ? "none" : "block");

          return (
            <motion.div
              key={concept.id}
              style={{
                transform,
                scale,
                opacity,
                filter: blur,
                display,
                zIndex: isCenter ? 30 : 10
              }}
              className="absolute w-[280px] md:w-[380px] aspect-[4/5] md:aspect-square will-change-transform outline-none"
            >
              <div 
                role="button"
                onClick={() => handleCardClick(concept, index)}
                style={{ userSelect: 'none', WebkitUserSelect: 'none', WebkitUserDrag: 'none' }}
                className={`
                  relative w-full h-full bg-[#0a0a0a] border overflow-hidden flex flex-col cursor-grab active:cursor-grabbing
                  ${isCenter ? 'border-red-900/30 shadow-[0_0_30px_rgba(120,0,0,0.2)] hover:border-red-700/80 transition-colors' : 'border-red-900/10'}
                `}
              >
                
                <div className="p-3 border-b border-red-900/20 text-[10px] tracking-widest flex justify-between bg-black/80 z-20 relative pointer-events-none">
                  <span className="text-gray-500 font-bold">[ID_{concept.id}]</span>
                  <span className="text-red-900/80">{concept.tech}</span>
                </div>

                <div className="relative flex-grow w-full overflow-hidden bg-black pointer-events-none">
                  <div className="absolute inset-0 border border-red-900/10 translate-x-[1px] -translate-y-[1px] z-10 mix-blend-screen"></div>

                  {!imgError[concept.id] ? (
                    <img
                      src={concept.image}
                      alt={concept.title}
                      loading="lazy"
                      draggable="false"
                      onError={() => setImgError(prev => ({ ...prev, [concept.id]: true }))}
                      className={`
                        absolute inset-0 w-full h-full object-cover grayscale contrast-[1.3] brightness-50 transition-all duration-700
                        ${isCenter ? 'scale-105 hover:grayscale-0 hover:brightness-100' : ''}
                      `}
                    />
                  ) : (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#050505]">
                      <span className="text-red-900/50 text-[10px] tracking-widest font-bold uppercase animate-pulse">DATA_CORRUPTED</span>
                    </div>
                  )}

                  <div className="absolute inset-0 opacity-40 mix-blend-overlay z-10">
                    <div className="w-full h-full bg-[linear-gradient(transparent_96%,rgba(255,0,0,0.2)_100%)] bg-[length:100%_3px]" />
                  </div>

                  {/* V1: El flicker rojo restaurado condicionalmente */}
                  {isCenter && (
                    <div className="absolute inset-0 bg-red-900/10 animate-[pulse_2s_infinite] z-10 mix-blend-multiply"></div>
                  )}
                </div>

                <div className="p-4 bg-[#050505] z-20 relative border-t border-red-900/20 pointer-events-none">
                  <h3 className="text-xs md:text-sm tracking-[0.2em] text-white/60 font-bold uppercase truncate">
                    {concept.title}
                  </h3>
                </div>

              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {openedConcept && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out p-4 md:p-8"
          onClick={() => setOpenedConcept(null)}
          role="dialog"
          aria-modal="true"
        >
          <div className="absolute inset-0 bg-static opacity-20 pointer-events-none"></div>

          <div className="relative w-full max-w-4xl max-h-[95vh] text-center flex flex-col items-center justify-center pointer-events-none">
            
            <div 
              className="relative overflow-hidden shadow-[0_0_50px_rgba(255,0,0,0.1)] border border-red-900/20 flex-shrink min-h-0 pointer-events-auto cursor-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={openedConcept.image}
                alt="Concepto Abierto"
                draggable="false"
                className="max-h-[60vh] md:max-h-[75vh] w-auto max-w-full object-contain grayscale contrast-[1.2] brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-700"
              />
            </div>

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