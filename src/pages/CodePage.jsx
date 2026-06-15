import React, { useEffect, useState } from 'react';

const GithubIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

const ExternalLinkIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path></svg>
);

const projectsData = [
  {
    id: 1,
    title: "Windows 95 Portfolio",
    description: "Hace un tiempo estaba postulando a un trabajo en una agencia de marketing, donde se requería un diseñador gráfico. Hablé con ellos y querían ver mi portafolio (No tenía xd). Entonces, para demostrar mis habilidades, creé este portafolio que recrea la interfaz del sistema operativo Windows 95, pues el contratista parecía mayor y quería jugar con su nostalgia. Lo terminé en un par de horas, ya que me topé con el trabajo de @alishirani1384, quien logró recrear una interfaz muy fiel a la de dicho sistema.",
    image: "/code/win95.webp", 
    stack: ["JavaScript", "CSS", "HTML5", "React", "TypeScript"],
    liveUrl: "https://windows1995.vercel.app/",
    githubUrl: "https://github.com/dalttons/Windows-95-Portfolio",
  },
  {
    id: 2,
    title: "Intercambio",
    description: "----------------------",
    image: "/code/",
    stack: ["React", "MySQL", "JavaScript", "JWT", "Tailwind"],
    liveUrl: "",
    githubUrl: "https://github.com/dalttons",
  },
  {
    id: 3,
    title: "Romantic Letter",
    description: "Una carta romántica interactiva creada con tecnologías web. Incluye animación de apertura, música de fondo, confeti cayendo, burbujas flotantes y un frasco lleno de dulces notas para una sorpresa única e inolvidable.",
    image: "/code/RomanticLetter.webp", 
    stack: ["HTML5", "CSS Animations"],
    liveUrl: "https://romanticletter.vercel.app/",
    githubUrl: "https://github.com/dalttons/Romantic-Letter",
  },
  {
    id: 4,
    title: "Asistente Local con IA",
    description: "Prototipo de asistente local con IA para dispositivos de bajos recursos usando Python, llama cpp, qwen y powershell",
    image: "/code/AsistenteLocal.webp",
    stack: ["Python", "llama_cpp", "Qwen"],
    liveUrl: "",
    githubUrl: "https://github.com/dalttons/local-assistant-with-AI",

  }
];

const CodePage = () => {
  const [imgError, setImgError] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  // Función para validar si una URL es funcional
  const isValidUrl = (url) => url && url.length > 8 && !url.endsWith('https:/') && !url.endsWith('https://');

  return (
    <div className="min-h-screen w-full bg-portfolio-dark pt-32 px-4 md:px-8 pb-20 text-gray-300">
      <div className="max-w-7xl mx-auto">
        
        {/* Encabezado */}
        <div className="mb-20 text-center" data-aos="fade-down">
          <h1 className="text-5xl font-playfair font-bold text-white mb-4">Code & Engineering</h1>
          <div className="w-24 h-1 bg-portfolio-accent mx-auto mb-6"></div>
          <p className="text-gray-400 font-light max-w-2xl mx-auto font-poppins px-4">
            Una selección de mis proyectos de software donde resuelvo problemas reales, mejoro mis habilidades y doy vida mi espontánea creatividad.
          </p>
        </div>

        {/* Lista de Proyectos */}
        <div className="space-y-24">
          {projectsData.map((project, index) => (
            <div 
              key={project.id} 
              className={`flex flex-col gap-8 md:gap-12 items-center ${index % 2 !== 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
              data-aos={index % 2 !== 0 ? 'fade-left' : 'fade-right'}
            >
              
              {/* Columna 1: Imagen y Terminal */}
              <div className="w-full md:w-1/2">
                <div className="relative group overflow-hidden rounded-2xl bg-portfolio-grey border border-gray-800 shadow-2xl transition-all duration-500 hover:border-portfolio-accent/50 hover:shadow-[0_0_30px_rgba(255,76,76,0.1)]">
                  
                  <div className="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-[#111] text-gray-500 font-mono text-[10px] tracking-widest uppercase">
                    <span className="flex items-center gap-2">
                      <span className="text-portfolio-accent">{`>`}</span> 
                      {`./deploy/${project.title.toLowerCase().replace(/\s+/g, '-')}.exe`}
                    </span>
                    <span className="opacity-50">v1.0.0</span>
                  </div>

                  {/* MEJORA: Manejo de errores de imagen y con proporciones reales */}
                  <div className="relative bg-black overflow-hidden flex items-center justify-center min-h-[250px]">
                    {!imgError[project.id] ? (
                        <img 
                          src={project.image} 
                          alt={`Arquitectura de ${project.title}`} 
                          className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                          loading="lazy"
                          decoding="async"
                          onError={() => setImgError(prev => ({ ...prev, [project.id]: true }))}
                        />
                    ) : (
                      <div className="text-gray-600 font-mono text-xs uppercase tracking-widest p-8 text-center border border-dashed border-gray-800 w-full h-full absolute inset-0 flex flex-col items-center justify-center">
                        <span className="text-portfolio-accent mb-2 block">X</span>
                        Asset Not Found
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Columna 2: Texto e Interacción */}
              <div className="w-full md:w-1/2 space-y-6">
                <h2 className="text-3xl md:text-4xl font-playfair font-bold text-white tracking-tight">
                  {project.title}
                </h2>
                
                <p className="text-gray-400 font-light text-base font-poppins leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2 pt-2">
                  {project.stack.map(tech => (
                    <span key={tech} className="px-3 py-1 text-[10px] md:text-xs font-mono bg-portfolio-grey text-portfolio-accent rounded-full border border-gray-800">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* MEJORA: Botones condicionales y con estado deshabilitado visual si es necesario */}
                <div className="flex flex-wrap gap-4 pt-4 mt-4">
                  {isValidUrl(project.liveUrl) ? (
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-full bg-white text-black font-semibold text-sm hover:bg-portfolio-accent hover:text-white transition-colors"
                    >
                      <ExternalLinkIcon />
                      Live Demo
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 px-6 py-3 rounded-full bg-gray-800 text-gray-500 font-semibold text-sm cursor-not-allowed">
                      <ExternalLinkIcon />
                      Offline
                    </span>
                  )}

                  {isValidUrl(project.githubUrl) ? (
                    <a 
                      href={project.githubUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-700 text-gray-300 font-semibold text-sm hover:border-white hover:text-white transition-colors"
                    >
                      <GithubIcon />
                      View Code
                    </a>
                  ) : (
                    <span className="flex items-center gap-2 px-6 py-3 rounded-full border border-gray-800 text-gray-600 font-semibold text-sm cursor-not-allowed">
                      <GithubIcon />
                      Private Repo
                    </span>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default CodePage;