import React, { useState } from 'react';
const rawAboutAscii = `
                                                       %%######%%%                                   
                               %%###%%@             %%#**********##%%                               
                               %%******#%%         @%***************#%                              
                                 %#*****#%       %#*****************#%@                             
                                   %#*****#%     %********************#%                            
                                   %*******#%%@%#**********************%%                           
                                    #**********************************#%                           
                                    %#*********************************%%                           
                                    %#*********************************%@                           
                                     %#*******************************%%                            
                                      %##*******####****************#%%                             
                            %%##%       @@%##%@@    %#*************#%               %%%%%           
                            %%**#%%                  @%**********##                %#**#%           
                            %%***#%                   #*********#@                @%#**##%          
                            %#***#% %@%%%%%%          ##*******#%         %%@%%%%@@%****#%          
                            #****#%#********#%%%      %********#@      @%#********#%##***#%         
                           %#******************#%    %#********#%%    %#******************##@       
                          %**********************@  %#***********#%  ##*********************#@      
                         %************************%%****************%@#**********************#%     
                       @%***********#%%%#*********@******************%#*********##*************%@   
                      %#*********###*****#********@******************##*******#****###**********%%  
                     %*********##********#********@*******************%******#********##*********%  
                    %*********#*********#*********#*******************##***************##*********% 
                   @#********#*******************%*********************##***************##********#%
                   %*********%******************%************************##*************##*********%
                   %*********#****************#%**************************###***********##*********%
                   %*********%**************#%#******************************##*#******##**********#
                   %**********%***********##**************************************####************+%
                   %*************#%%%###**********************************************************#%
                    %%********************#%@@@%%#****************************************#*****#%  
                       @**************#%%%%%%%%%%%%%%#********************#%%%%%%%%%%#********%%    
                      %*************#%%%%%%%%%%%%%%%%%%%****************%%%%%%%%%%%%%%%#*******#%   
                     %************#%%%%%%%%%%%%%%%%%%%%%%%************#%%%%%%%%%%%%%%%%%%#******%%  
                    %*************%%%%%%%%%%=:+%%%%%%%%%%%%#*********%%%%%%%%%%--#%%%%%%%%#******%  
                    %************#%%%%%%%%%%=::%%%%%%%%%%%%%#*******%%%%%%%%%%%--=%%%%%%%%%#*****#% 
                   @#***********#%%%%%%%%%%%%-:%%%%%%%%%%%%%%#*****%%%%%%%%%%%%=-*%%%%%%%%%%******% 
                   %************#%%%%%%%%%%%%#*#%%%%%%%%%%%%%%#***#%%%%%%%%%%%%%+%%%%%%%%%%%#*****#%
                   %************#%%%%%%%%%%%*****#%%%%%%%%%%%%#***%%%%%%%%%%%%***#%%%%%%%%%%#******%
                   %************#%%%%%%%%%%#*******%%%%%%%%%%%%#*#%%%%%%%%%%#******%%%%%%%%%#*****+%
                   @************#%%%%%%%%%#**+--=***@%%%%%%%%%%##%%%%%%%%%%#**=-+**#%%%%%%%%#******%
                   @#***********#%%%%%%%%%#**-:::=**%%%%%%%%%%%%%%%%%%%%%%%**-::-+*#%%%%%%%%#******%
                    %*+*********#@%%%%%%%%#**-::::***######################*+:::-+*#%%%%%%%%#****+#%
                     %+++******++#%#######%#*+-::-**#**********************+=:::=**#########****+*% 
                     @#+++++++++++*##******#*++==+++%**********************++--=++#*******#*+++++%  
                      @%*+++++++++++*#******#*+++++#**********************%+++++*#******#*++++++#%  
                        %#++++++++++++*##*****#**##************************#***##****#**++++++*%%   
                          @#**+++++++*#*************************************************+++*##%     
                             @%###**#**************************##*********************#%%%%@        
                                 %%#************************************************##%             
                     %%###@   %%##**###*********#######*************########*****##%@               
                       %*+*####*********#######**********##*****###***********###**#%               
                        %*++*********************************************************%              
                         %*+********************+++**********************************#@             
                          %*+++++++++++******+++++++++*******************************%%%%           
                           %%+++*****+++++++++++++++++++********************************#%          
                             %@@     %#++++++++++++++++++*******************************#%          
                                      @%*+++++++++++++++++++************++++++********#%%           
                                       %%%#++++++++++*###*+++++++++++*#%###%#**+**#%%%              
                                     %%%%%%%%%##%%%%%%%%%%%%#######%%%%%%%%%@%%%%%%%%@@             
                                    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@            
                                    %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@           
                                  %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%@%%%%%%%%%%@          
                                %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%#%%%%       
                              %%###############################################%#####*##****#%      
                             %*****************#*********************************************#%     
                            %#+++++++***+++++++%**++++*++***********************%*************#%    
                            %++++++++##++++++++%*+++++++++++++*++++********+*******+***#*******%    
                            %+++++++***++++++++#*+++++++++++++++++++++++++++++++**++++**#*++++#%    
                            %#++++****++++++++**++++++++++++++++++++++++++++++++*#++++++***++*#@    
                            %%******++++++++++%*++++++++++++++++++++++++++++++++*#++++++++++*#%     
                            %%++++++++++++++++*#++++++++++++++++++++++++++++++++*#+++++++++++*#     
                            %%+++++++++++++++++**+++++++++++++++++++++++++++++++*#+++++++++++#%     
                             %*++++++++++++++++*#*++++++++++++++++++++++++++++++*#++++++++++*#@     
                             %#+++++++++++++++*#*++++++++++****#***+++++++++++++*#+++++++++*#@      
                              %#*+++++++++*#%%*+++++++++++*%     @#+++++++++++++*%%%#*****#%        
                                %#*******#%*++++++++++++++*@     %**++++++++++++*%    @@            
                                          @*++++++++++++++*@      #*++++++++++++*@                  
                                          %*++++++++++++++*@      %*+++++++++++*#@                  
                                           %*+++++++++++++*@      @*+++++++++++*%                   
                                           @*+++++++++++++*%      @*+++++++++++*%                   
                                %@%%%%%@@  %**+++++++++++**%   %@@@#*+++++++++*%                    
%%   @@@%%%%%%%%@@         @%##***************+++++++++++*%%@%#*****++++++++**#%                    
@@%%%%%%@@@@@%%%%%%%@@@%%%####***#######*****+++++++++++**%#########********##%                     
               @@%%%%%%%%%%%%%%%@@      @@%%############%% @@       @@@@@@%                         
`; 

const About = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  // Manejador para teclado (Accesibilidad obligatoria)???
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsFlipped(!isFlipped);
    }
  };

  return (
    <section id="about" className="min-h-screen w-full bg-portfolio-dark flex flex-col items-center justify-center py-20 px-4 md:px-8 relative overflow-hidden">

      {/* Título */}
      <div className="mb-16 text-center relative z-10" data-aos="fade-up">
        <h2 className="font-playfair text-5xl font-bold text-white mb-4">About Me</h2>
        <div className="w-24 h-1 bg-portfolio-accent mx-auto"></div>
      </div>

      {/* Grid Principal */}
      <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center relative z-10">
        
        {/* Columna Izquierda: Tarjeta 3D */}
        <div 
          className="relative w-full max-w-[350px] md:max-w-[400px] aspect-[3/4] mx-auto cursor-pointer group"
          onClick={handleCardClick}
          onKeyDown={handleKeyDown}
          role="button"
          tabIndex={0}
          aria-label="Girar tarjeta de perfil"
          data-aos="fade-right"
          style={{ perspective: '1000px' }}
        >
          {/* PISTA VISUAL */}
          <div className="absolute -bottom-4 -right-4 z-30 bg-portfolio-accent text-white font-mono text-[10px] px-3 py-1 border border-black shadow-lg uppercase tracking-wider group-hover:bg-white group-hover:text-black transition-colors rounded-sm animate-pulse">
            {isFlipped ? '[ 🀢🀣🀦🀤 ᶻ 𝘇 𐰁 ˙𐃷˙ ]' : '[ DO NOT TOUCH ]'}
          </div>

          <div 
            className="w-full h-full relative transition-transform duration-700 ease-in-out"
            style={{ 
              transformStyle: 'preserve-3d',
              transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
            }}
          >
            {/* LADO FRONTAL ASCII */}
            <div 
              // MEJORA: bg-transparent y shadow-2xl removido para que el ASCII flote
              // MEJORA: flex center y overflow-hidden para contención
              className="absolute inset-0 w-full h-full overflow-hidden flex items-center justify-center bg-transparent will-change-transform"
              style={{ backfaceVisibility: 'hidden' }}
            >
              {/* MEJORA: Ruido */}
              <div className="absolute inset-0 z-10 pointer-events-none opacity-20 mix-blend-overlay bg-[linear-gradient(transparent_50%,rgba(0,0,0,1)_50%)] bg-[length:100%_4px]"></div>
              
              <pre 
                // MEJORA RESPONSIVA
                // MEJORA ESTÉTICA: animate-glitch
                className="relative z-0 text-[4px] md:text-[5.5px] font-mono leading-none m-0 p-0 text-red-600 font-bold whitespace-pre select-none animate-glitch hover:animate-text-glitch-severe transition-all duration-75"
                style={{ 
                  textShadow: '0 0 5px rgba(255,0,0,0.5)',
                  backfaceVisibility: 'hidden' 
                }}
              >
                {rawAboutAscii.trim()}
              </pre>
            </div>

            {/* Lado de atrás */}
            <div 
              className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-portfolio-grey"
              style={{ 
                backfaceVisibility: 'hidden', 
                transform: 'rotateY(180deg)',
                border: '1px solid rgba(255,76,76,0.1)'
              }}
            >
              <img 
                src="/about_me/aboutback.png" 
                alt="About Back" 
                loading="lazy"
                className="w-full h-full object-cover contrast-125 brightness-90 shadow-[inset_0_0_100px_rgba(0,0,0,1)]"
              />
            </div>
          </div>
        </div>

        {/* Columna Derecha: Texto */}
        <div className="text-gray-300 font-light leading-relaxed text-base md:text-lg text-justify border-l border-gray-800 pl-6 md:pl-10 relative" data-aos="fade-left">
          
          {/* ENCAPSULAMIENTO ESTRICTO DEL El GIF */}

          <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-20 mix-blend-screen overflow-hidden">
            <div className="w-full h-full" style={{ maskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)', WebkitMaskImage: 'radial-gradient(circle at center, black 40%, transparent 90%)' }}>
              <img 
                src="/Lain/Sleep.gif" 
                alt="" 
                className="w-full h-full object-cover filter grayscale contrast-150"
              />
            </div>
          </div>

          {/* LÍNEA ROJA CORREGIDA (RESTAURACIÓN) */}
          <div className="absolute top-0 -left-[1px] w-[2px] h-10 bg-portfolio-accent z-20"></div>

          {/* Envolvemos los textos en z-10 para que floten sobre el GIF */}
          <div className="relative z-10">
            <p className="mb-6 font-poppins">
              Hola, soy <strong className="text-white font-bold">𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃</strong>. Este es un espacio dedicado a compartir mis ideas y proyectos que he estado desarrollando.
            </p>
            <p className="mb-6 font-poppins">
              Me gusta la música, tocar instrumentos musicales, el anime, la historia y la pintura. Aunque, más que "pintar", me gusta apreciar las corrientes artísticas; ya que no le doy color a mis dibujos. También me gusta el ajedrez, los videojuegos, el terror psicológico y los misterios de internet. Ah, también colecciono cartas, programo y me gustan los tattoos.
            </p>
            <p className="font-poppins">
              Pero bueno, al final, mi enfoque no es solo la programación, edición, dibujo o fotografía. Lo que intento es unir todo eso para construir un... estilo estético propio. O bueno, eso intento, no lo sé
            </p>
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default About;