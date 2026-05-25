import React, { useState, useEffect } from 'react';

// 1. Claves
const backgroundWords = [
  "REPIROU", "XV", "⍶⍶⍶⍶⍶", "BNA X VX BNA", "NBJ NB TJ LDNBCQÓV", "3301", 
  "3301", "3301", "CLEO", "A858 ", "A858 ", 
  "QUANTUM IMMORTALITY", "922.MKV", "╋━", "╋━", "𐕣", 
  "████", "𐕣", "☨", "▶︎ •၊၊||၊|။||||။‌‌‌‌‌၊|• 0:10", "⚛", "⛋", "⌧", "", "0", "1", 
  "᛭", "ก็็็็็็็็็็็็็็็็็", "⍼", "▒", "▓", "𖣂ׁ", "𖣂ׁ", "̼͙̈́͆̈́ͯ̒̆̀̓ͧ͠", "̼͙̈́͆̈́ͯ̒̆̀̓ͧ͠", "𝄃𝄃𝄂𝄂𝄀𝄁𝄃𝄂𝄂𝄃", "ก็็็็็็็็็็็็็็็็็", "𝟏𝟏:𝟏𝟏", "𝟏𝟏:𝟏𝟏", "𝟏𝟏:𝟏𝟏"
];

// Generación estática
const staticWordPositions = backgroundWords.map(word => ({
  word,
  top: Math.random() * 90 + 5,   
  left: Math.random() * 90 + 5,  
  size: Math.random() * 8 + 12,  
}));

const rawAscii = `
                                                 %                                                  
                                           ####%%%%%%%                                              
                                         ##%#%%@@@@@@@%#                                            
                                       %%@@@@@@@@@@@@@@%%%%                                         
                                       %@@@@@@@@@@@@@@@@@@@%%                                       
                                      %%@@@@@@@@@@@@@@@@@@@@@%                                      
                                     @@@@@@@@@@@@@@@@@@@@@@@@@                                      
                                     @@@@@@@@@@@@@@@@@@@@@@@@@%                                     
                                     @@@@@@@@@@@@@@@@@@@@@@@@@@                                     
                                     @@@@@@@@@@@@@@@@@@@@@@@@@@                                     
                                     %@@@@@@@@@@@@@%%%%%%%%@@@%                                     
                                     %%@@@@%%%@@@%#########%@@%                                     
                                    %%%@@@%%%%%%#**********%@%                                      
                                    #%%%@%%%%@@@@@%##%%%%%%#%*                                      
                                    ###%%###%%%%%%%###%###****                                      
                                      #%%%###*#####*+********#                                      
                                        %%%%##****+++++++***                                        
                                         %%%%###**++--=*++#                                         
                                         %%%%%##**+:...=**#                                         
                                     +*%%%%%%%%#**++=:+#**                                          
                                    *+*%@@%%%%%#**++*#**+++=                                        
                                 +++++*#@@@%%%#***+++**#%*=========+                                
                          ++==++===++++#@@@%##**********#%*============+                            
                        +=========+++++*@@@%##***######+*%@+=============+                          
                      +===============++%%########****+++%@%===============+                        
                    ++=================+*#######++**++++#@@@*===============*                       
                   *+================+*#######====*+++==*%@@%================                       
                   +==============+**#######%#====+=====+%@@%+================                      
                  *++++========++**########%@@+===+======#@@@*====-===========+                     
                  *++========+**#########**@@@*===+======+@@@#=================+                    
                  *++=====+*###########*==+@@@%===+=======%@@%*=================                    
                  *++===*#############*====#@@@+==========*@@@*=================+                   
                  ++=+*##############+=====*@@@#==++=======@@@#+========+========                   
                 *+*###############*==+====+%@@%===+=======%@@@+=======++========+                  
                 *################+===++====#@@@*==+=--====*@@@*=======++========+                  
                 ###########%%##+=+====++===+%@@#===+======+@@@%=======++++======+                  
                #%%%%####%%%%#*+==++====++===#@@%+==+=======%@@@+======+++=======+                  
                 %%%%%##%%%%###*===++===++===*@@@*==========*@@@*=====+*++==+=====                  
                 ##%%%##%#**%##*===+++===++==+%@@#===+======*@@@%===+#####*++++==+                  
                 #**#%%%#*   ##*+===++====+===%@@%+==+=====+*%@@@+==*%###****=====+                 
                  **+**##    ##*+===+++====+==+@@@*========++#@@@#+*###%%##**+=++++                 
                             ##*++===+++===+===%@@#+=++====++#@@@@##%%%######%                      
                             #**++====++====+==#%%%+=++===+++#%@@@##%##########                     
                             #**+++===+++====++*%%%*==++===++*%@@@%%%%%%%####%%                     
                             #***++====+++===++=*%%*===++=++++*%@%###%%%%%%%%%                      
                              ***++=====++====+++*%+=++++++++++*%%***##%%%%%%                       
                              ***+++====+++====+++#*===+++=++++*#@*++++*%%                          
                              ***+++=====+++====++**+===++==++++*%*+====*                           
                              ***+++======+++====++%*+++++===+++*%#======                           
                              ***+++=======+++=====*#+=++++====++*%======+                          
                              **++++========+++===++@+==++*====++*%*======+                         
                              **++++========++++==+*%%*#%%#+++#@@@@%%+====+                         
                              ***+++=========++**#%%@@@@@%@@@%@@@@@@@%##+==+                        
                              ***+++=========+**%@@@@@@@@@@@@@@@@@@@@@@@%==+                        
                              **++++=====+===+*%@@@@@@@@@@%%@@%%%%%@@@@@%+=+                        
                              **++++======+==+*%@@@@@@@@@@%@@@@@@%@@@@@@%+==+                       
                              ****++=======+++#%@@@@@@@@@@%@@@@@@%@@@@@@%+===*                      
                              *+++++=======+++*@@@@@@@@@@@%@@@@@@@@@@@@@%+===+                      
`;

// Algoritmo de Fractura
const asciiLinesRaw = rawAscii.split('\n');
if (asciiLinesRaw[0]?.trim() === '') asciiLinesRaw.shift();
if (asciiLinesRaw[asciiLinesRaw.length - 1]?.trim() === '') asciiLinesRaw.pop();

const physicsLines = asciiLinesRaw.map((line, index) => ({
  text: line,
  dropFactor: 1 + (index * 0.15),
  driftFactor: (index % 2 === 0 ? 1 : -1) * (Math.random() * 0.5)
}));

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const universalFallFactor = 0.5; 
  const backgroundY = scrollY * universalFallFactor;
  const backgroundOpacity = Math.max(1 - (scrollY * 0.002), 0);

  return (
    <div 
      id="home" 
      className="hero-container relative h-screen w-full overflow-hidden bg-black flex items-center justify-center shadow-[inset_0_0_200px_rgba(0,0,0,0.9)]"
    >
      {/* CAPA DE FONDO (GIF DIFUMINADO) */}
      <div 
        className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-20 mix-blend-screen will-change-transform"
        style={{
          transform: `translateY(${backgroundY * 0.3}px)`, // Parallax sutil
          opacity: backgroundOpacity * 0.1 // Se desvanece con el scroll
        }}
      >
        <div className="w-full h-full" style={{ maskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at center, black 10%, transparent 80%)' }}>
          <img 
            src="/Lain/lain_spk.gif"
            alt="" 
            className="w-full h-full object-cover filter grayscale-10 contrast-150 blur-[1px]"
          />
        </div>
      </div>

      {/* Palabras flotantes */}
      <div 
        className="absolute w-full h-full z-10 pointer-events-none select-none opacity-[0.25] font-mono will-change-transform"
        style={{
          transform: `translateY(${backgroundY}px)`, 
          opacity: backgroundOpacity 
        }}
      >
        {staticWordPositions.map((item, index) => (
          <span 
            key={index} 
            className="absolute tracking-widest text-red-900/50 whitespace-nowrap animate-micro-jitter mix-blend-screen"
            style={{ 
              top: `${item.top}%`, 
              left: `${item.left}%`, 
              fontSize: `${item.size}px`
            }}
          >
            {item.word}
          </span>
        ))}
      </div>

      {/* CAPA TEXTO GIGANTE */}
      <div 
        className="absolute inset-0 z-10 flex items-center justify-center select-none pointer-events-none px-4"
        style={{
          transform: `translateY(${backgroundY * 0.8}px)`,
          opacity: backgroundOpacity * 0.05
        }}
      >
        <h1 className="text-[12vw] md:text-[5vw] text-center font-playfair font-black text-white break-all leading-[1.1] animate-pulse max-w-full opacity-10">
          NMQAAZINADPUOPOFFTFTFSFOMCODEQRICAPOSCHTCSNPFATDEOMO
        </h1>
      </div>

      {/* CAPA ASCII y derrumbe fluido */}
      <div className="relative z-20 flex flex-col items-center justify-center pointer-events-none w-full px-4">
        {physicsLines.map((item, index) => {
          const translateY = scrollY * item.dropFactor;
          const translateX = scrollY * item.driftFactor;
          const rotate = scrollY * 0.05 * (index % 2 === 0 ? 1 : -1);
          const opacity = Math.max(1 - (scrollY * 0.002), 0);

          return (
            <pre 
              key={index} 
              className="text-[5px] sm:text-[8px] md:text-[10px] lg:text-[12px] font-mono leading-none m-0 p-0 text-red-600 font-bold whitespace-pre will-change-transform"
              style={{ 
                transform: `translate3d(${translateX}px, ${translateY}px, 0) rotate(${rotate}deg)`,
                opacity: opacity,
                textShadow: '0 0 5px rgba(255,0,0,0.5)'
              }}
            >
              {item.text}
            </pre>
          );
        })}
      </div>

      {/* GRADIENTE INFERIOR */}
      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-portfolio-dark to-transparent z-30 pointer-events-none"></div>

    </div>
  );
};

export default Hero;