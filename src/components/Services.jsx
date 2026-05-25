import React, { useState, useEffect, useRef } from 'react';

// Estructura de Datos REFACTORIZADA (Limpia y estructurada)
const techStack = [
  { name: 'Node.js', iconPath: '/icons/Node.svg' },
  { name: 'SQL', iconPath: '/icons/postgresql.svg' },
  { name: 'React', iconPath: '/icons/react.svg' },
  { name: 'Ollama', iconPath: '/icons/ollama.svg' },
  { name: 'Llama-cpp', iconPath: '/icons/llamacpp.svg' },
  { name: 'linux', iconPath: '/icons/linux.svg' },
  { name: 'JavaScript', iconPath: '/icons/js.svg' },
  { name: 'HTML5', iconPath: '/icons/html5.svg' },
  { name: 'CSS3', iconPath: '/icons/css3.svg' },
  { name: 'Photoshop', iconPath: '/icons/photoshop.svg' },
  { name: 'GIMP', iconPath: '/icons/gimp.svg' },
  { name: 'Illustrator', iconPath: '/icons/illustrator.svg' },
  { name: 'Capcut', iconPath: '/icons/capcut.svg' },
];

const skillsData = [
  {
    id: "01",
    title: "FRONTEND DEV",
    description: "Construcción de interfaces web modernas usando React, Tailwind CSS y JavaScript. Enfocado en sistemas de animación basados en física y rendering interactivo."
  },
  {
    id: "02",
    title: "AUDIOVISUAL MEDIA",
    description: "Dirección creativa, edición de video cinematográfico y fotografía."
  },
  {
    id: "03",
    title: "UI/UX DESIGN",
    description: "Diseño y prototipado de interfaces, arquitectura de información y experiencias digitales experimentales. Integración de herramientas basadas en Python y modelos locales de IA."
  }
];

const Services = () => {
  const [activeSkill, setActiveSkill] = useState("01");
  const skillRefs = useRef([]);

  // Lógica del Intersection Observer (Scroll Spy) para móviles
  useEffect(() => {
    // Solo activamos el observador si es un dispositivo móvil/tablet (menor a 1024px)
    const isMobile = window.matchMedia("(max-width: 1024px)").matches;
    
    if (!isMobile) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSkill(entry.target.dataset.id);
          }
        });
      },
      {
        root: null,
        // Dibuja una línea de intersección en el centro de la pantalla (con un margen del 40% arriba y abajo)
        rootMargin: "-40% 0px -40% 0px",
        threshold: 0,
      }
    );

    skillRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      skillRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

  // Manejador de teclado para accesibilidad
  const handleKeyDown = (e, id) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setActiveSkill(id);
    }
  };

  return (
    <section id="services" className="min-h-screen w-full bg-portfolio-dark py-24 px-4 md:px-8 relative overflow-hidden border-t border-gray-900">
      
      {/* CAPA Z-0: Ruido Estático Base */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03] mix-blend-overlay bg-[linear-gradient(transparent_50%,rgba(255,255,255,1)_50%)] bg-[length:100%_4px]"></div>

      {/* CAPA Z-5: GIF detrás del texto "WHAT I DO" */}
      <div className="absolute left-0 top-0 w-full md:w-[60vw] h-[80vh] z-[5] pointer-events-none opacity-20 mix-blend-screen mask-image-gradient">
        <div className="w-full h-full" style={{ maskImage: 'radial-gradient(ellipse at left center, black 20%, transparent 70%)', WebkitMaskImage: 'radial-gradient(ellipse at left center, black 20%, transparent 70%)' }}>
          <img 
            src="/Lain/1367109547_2.gif"
            alt="" 
            className="w-full h-full object-cover filter grayscale contrast-150"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col h-full justify-center">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* COLUMNA IZQUIERDA TEXTO */}
          <div className="lg:col-span-5 flex flex-col justify-between relative z-20" data-aos="fade-right">
            <div>
              <div className="inline-flex items-center gap-2 mb-8 border border-red-900/30 bg-red-900/10 px-3 py-1 text-red-500 font-mono text-[10px] tracking-widest uppercase shadow-[0_0_15px_rgba(255,0,0,0.1)]">
                <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                .- -.-. .- - .. -. - .... . ... -.- -.--
              </div>
              
              <h2 className="font-playfair text-6xl md:text-8xl font-black text-white leading-none mb-6 drop-shadow-2xl">
                WHAT<br/><span className="text-gray-500">I DO.</span>
              </h2>
            </div>
            
            <p className="text-gray-400 font-light text-lg border-l-2 border-portfolio-accent pl-6 mt-8 md:mt-20 max-w-md bg-portfolio-dark/40 backdrop-blur-sm py-2">
              Mis áreas de operación. Combino lógica de programación con una visión artística.
            </p>
          </div>

          {/* COLUMNA DERECHA: Registro de Habilidades Interactivo */}
          <div className="lg:col-span-7 flex flex-col justify-center relative z-20" data-aos="fade-left">
            <div className="border-t border-gray-800">
              {skillsData.map((skill, index) => (
                <div 
                  key={skill.id}
                  ref={(el) => (skillRefs.current[index] = el)}
                  data-id={skill.id}
                  role="button"
                  tabIndex={0}
                  aria-expanded={activeSkill === skill.id}
                  className="group cursor-pointer border-b border-gray-800 transition-colors hover:border-portfolio-accent bg-portfolio-dark/30 backdrop-blur-[2px] outline-none focus-visible:bg-gray-900 focus-visible:border-portfolio-accent"
                  onMouseEnter={() => {
                    if (window.innerWidth > 1024) setActiveSkill(skill.id);
                  }}
                  onClick={() => setActiveSkill(skill.id)}
                  onKeyDown={(e) => handleKeyDown(e, skill.id)}
                >
                  <div className="py-8 px-4 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 transition-all duration-300">
                    
                    <span className={`font-mono text-xl transition-colors duration-300 ${activeSkill === skill.id ? 'text-portfolio-accent' : 'text-gray-700'}`}>
                      {skill.id}
                    </span>
                    
                    <div className="flex-1">
                      <h3 className={`font-playfair font-bold text-3xl md:text-5xl uppercase tracking-tight transition-all duration-300 ${activeSkill === skill.id ? 'text-white translate-x-2' : 'text-gray-500 group-hover:text-gray-300'}`}>
                        {skill.title}
                      </h3>
                      
                      <div className={`grid transition-all duration-500 ease-in-out ${activeSkill === skill.id ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'}`}>
                        <p className="overflow-hidden text-gray-400 font-light text-sm md:text-base leading-relaxed max-w-xl">
                          {skill.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="hidden md:block font-mono text-[10px] text-gray-600 uppercase tracking-widest text-right">
                      {activeSkill === skill.id ? '[ ACTIVE ]' : '[ IDLE ]'}
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* TECH STACK CAROUSEL REFACTORIZADO */}
        <div className="w-full overflow-hidden mt-32 relative group z-20" data-aos="fade-up">
          <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-portfolio-dark to-transparent z-10 pointer-events-none"></div>
          <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-portfolio-dark to-transparent z-10 pointer-events-none"></div>

          <div className="animate-[tech-marquee_30s_linear_infinite] w-max whitespace-nowrap flex items-center text-gray-500 hover:[animation-play-state:paused] cursor-default">
            
            {techStack.map((tech) => (
              <div key={tech.name} className="flex items-center gap-4 px-12 opacity-50 hover:opacity-100 transition-all duration-300" title={tech.name}>
                <img src={tech.iconPath} alt={`${tech.name} Logo`} className="h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" loading="lazy" />
              </div>
            ))}
            
            {techStack.map((tech) => (
              <div key={`dup-${tech.name}`} className="flex items-center gap-4 px-12 opacity-50 hover:opacity-100 transition-all duration-300" title={tech.name}>
                <img src={tech.iconPath} alt={`${tech.name} Logo`} className="h-12 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]" loading="lazy" />
              </div>
            ))}
            
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;