import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const projectsData = [
  {
    id: 1,
    category: "Photography",
    title: "Urban Captures",
    description: "Capturas de lo real y lo cotidiano, a veces preservadas, a veces alteradas.",
    image: "/projects/gridpictures.gif", 
    tags: ["Street", "Nature", "Distortion", "Animals","Strange Beauty"],
    link: "/fotos" 
  },
  {
    id: 2,
    category: "Video",
    title: "Cinematic Stories",
    description: "Intento de cortometrajes y ediciones.",
    image: "/projects/gridvideos.gif",
    tags: ["Dark", "Analog Horror", "Noise", "Calm", "Color"],
    link: "/videos" 
  },
  {
    id: 3,
    category: "Coding",
    title: "--------",
    description: "Proyectos que iniciaron por y para alguien, pero ahora estoy perdido.",
    image: "/projects/gridcode.jpg", 
    tags: ["React", "JavaScript", "Python", "Tailwind", "HTML"],
    link: "/codigo" 
  },
  {
    id: 4,
    category: "M̶̧͚̪͉̯̜̰͎̘̀͋̇̀͗̍́͆̑̏͂̿̊̚y̸̨̲̱̪̞̪̯̟̩͓̲̙͑͊̏̅̽̐́̓̌̏̒̍ͦ͘͝s̴̡̨̼͖̝̗̯̭͖̬͔͚̺̣͈ͥ̀̇͆̀ͭ͛ͫ́͂̒̉ͨͫͥ̓̚̕͢͟͟͜͟͜͜͢͠t̶̵̪̰͖̙̻͔̰̖̫̝̙̦̠̽ͫ̊̾̒ͭ̏ͦ͆̑̈́̐͒ͦ͗͐̀ͬ̍̀͘͟͢e͙̥̠͚̼͉̅ͣ́ͬ̇̏̉͜_̸̴̴̨̤̫͉̦͙̪̙͍̯̭̲͎̝̜̄ͨͤ̏̋ͭ̇ͫ͠͞͠͡r̷̸̸̴̶̛͍̦͇̰͈̻̖͔͖̱͔͙̘̘͈͔̈́ͧ̓̿̇ͭ̊̌̍̂̓͂̊ͧ̔ͫ́̐̇̾̕͜ý͓̮͉͈͇͍̖͎̩̞͈́̋̇̾͋̈́̾͆͑͘͘͜͜͠͝r̵̡͕͈͚͍͍̼͕̍̀̈́̽̎̍͗̍́̏̚͜͠y̶͔͗",
    title: "ʞouʞ ʇ'uop I",
    description: "Help",
    image: "/projects/TV_Lain.gif", 
    tags: ["I don't know"],
    link: "/concepts",
    isAnomaly: true
  }
];

const GridProjects = () => {
  const [imgError, setImgError] = useState({});

  // BENTO BOX
  const getBentoSpan = (index) => {
    switch(index) {
      case 0: return "md:col-span-2 md:row-span-2";
      case 1: return "md:col-span-1 md:row-span-1";
      case 2: return "md:col-span-1 md:row-span-1";
      case 3: return "md:col-span-3 md:row-span-1";
      default: return "md:col-span-1 md:row-span-1";
    }
  };

  return (
    <section id="project" className="min-h-screen w-full bg-portfolio-grey py-24 px-4 md:px-8 relative">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-20 text-center" data-aos="fade-up">
          <h2 className="font-playfair text-5xl font-bold text-white mb-4">My Creations</h2>
          <div className="w-24 h-1 bg-portfolio-accent mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-xl mx-auto font-light">
          Mis diferentes facetas creativas
          </p>
        </div>

        {/* CONTENEDOR BENTO: 3 columnas, filas automáticas de 250px en PC, 350px en móvil */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[350px] md:auto-rows-[250px]">
          
          {projectsData.map((project, index) => {
            const isConcepts = project.isAnomaly === true;

            const wrapperClasses = isConcepts 
              ? "group relative block bg-[#111] rounded-3xl overflow-hidden shadow-xl transition-all duration-300 border border-gray-900 hover:border-red-900 hover:translate-y-2 hover:animate-[violent-shake_0.2s_infinite] cursor-crosshair will-change-transform"
              : "group relative block bg-portfolio-dark rounded-3xl overflow-hidden shadow-xl transition-all duration-300 border border-gray-800 hover:-translate-y-2 hover:shadow-portfolio-accent/20 hover:border-portfolio-accent/50";

            return (
              <div 
                key={project.id}
                // lógica de Grid Span
                className={`${wrapperClasses} ${getBentoSpan(index)} flex flex-col justify-end`}
                data-aos="fade-up"
                data-aos-delay={index * 100} 
              >
                
                {/* CAPA Z-0: IMAGEN Y ÁREA DE CLIC PRINCIPAL */}
                <Link 
                  to={project.link} 
                  className="absolute inset-0 z-0 bg-black outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-portfolio-accent"
                  aria-label={`Abrir proyecto: ${project.title}`}
                  tabIndex="-1" // Evita doble tabulación para lectores de pantalla
                >
                  {!imgError[project.id] ? (
                    <img 
                      src={project.image} 
                      alt="" // Vacío intencionalmente por ser presentacional en este nivel
                      loading="lazy" 
                      decoding="async"
                      className={`w-full h-full object-cover transition-all duration-500 will-change-[filter,transform] ${
                        isConcepts 
                          ? 'scale-105 group-hover:invert group-hover:sepia group-hover:hue-rotate-180 group-hover:saturate-200 opacity-60' 
                          : 'group-hover:scale-105 opacity-70 group-hover:opacity-100'
                      }`}
                      onError={() => setImgError(prev => ({ ...prev, [project.id]: true }))}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-gray-600 text-xs font-mono">IMAGE ERROR</span>
                    </div>
                  )}

                  {/* OVERLAY TÉTRICO */}
                  {isConcepts && (
                    <div className="absolute inset-0 pointer-events-none z-10 transition-opacity duration-300 group-hover:opacity-80">
                      <div className="absolute inset-0 bg-black/60"></div>
                      <img 
                        src="/projects/chains.png" 
                        alt="Cadenas" 
                        className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-screen"
                      />
                      <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                        <div className="w-full h-full bg-[linear-gradient(transparent_96%,rgba(255,0,0,0.15)_100%)] bg-[length:100%_3px]" />
                      </div>
                      <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(80,0,0,0.6)]"></div>
                      <div className="absolute inset-0 animate-pulse opacity-10 bg-red-900 mix-blend-multiply"></div>
                    </div>
                  )}
                </Link>

                {/* CAPA Z-10: GRADIENTE PROTECTOR DE LEGIBILIDAD */}
                <div className={`absolute inset-x-0 bottom-0 h-3/4 pointer-events-none z-10 bg-gradient-to-t ${isConcepts ? 'from-black via-[#111]/80' : 'from-portfolio-dark via-portfolio-dark/80'} to-transparent`}></div>

                {/* CAPA Z-20: CONTENEDOR DE TEXTO SUPERPUESTO */}
                <div className="relative z-20 p-6 md:p-8 flex flex-col justify-end w-full h-full pointer-events-none">
                  
                  {/* CATEGORÍA */}
                  <div className="mb-3">
                    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-sm tracking-widest uppercase pointer-events-auto ${isConcepts ? 'bg-red-900/40 text-red-500 border border-red-900/50' : 'bg-portfolio-accent/20 text-white backdrop-blur-md border border-portfolio-accent/30'}`}>
                      {project.category}
                    </span>
                  </div>
                  
                  {/* TÍTULO (Clickeable) */}
                  <h3 className="font-playfair text-3xl font-bold text-white mb-2 pointer-events-auto w-fit">
                    <Link 
                      to={project.link} 
                      className="focus-visible:outline focus-visible:outline-2 focus-visible:outline-portfolio-accent"
                    >
                      <span className={`${isConcepts ? 'group-hover:[text-shadow:2px_0_red,-2px_0_blue] group-hover:text-gray-300 transition-all' : 'group-hover:text-portfolio-accent transition-colors drop-shadow-md'}`}>
                        {project.title}
                      </span>
                    </Link>
                  </h3>
                  
                  {/* DESCRIPCIÓN (Seleccionable, no clickeable) */}
                  <div className="text-sm font-light leading-relaxed line-clamp-2 md:line-clamp-3 mb-4 pointer-events-auto cursor-text text-gray-300 drop-shadow-md">
                    {isConcepts ? (
                      <p className="text-gray-400">
                        Internet <span className="bg-black text-white select-none" aria-hidden="true">Arch███</span>. Imágenes que <span className="bg-black text-white select-none" aria-hidden="true">no sé d█ █████</span> salieron. Help.
                      </p>
                    ) : (
                      <p>
                        {project.description}
                      </p>
                    )}
                  </div>

                  {/* TAGS (Seleccionables) */}
                  <div className="flex flex-wrap gap-2 pointer-events-auto">
                    {project.tags?.map((tag, i) => (
                      <span 
                        key={`${tag}-${i}`} 
                        className={`text-[9px] font-mono px-2 py-1 rounded-sm tracking-wider uppercase ${isConcepts ? 'text-red-900 bg-black border border-red-900/30' : 'text-gray-400 bg-black/50 backdrop-blur-sm border border-gray-700/50'}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      </div>
    </section>
  );
};

export default GridProjects;