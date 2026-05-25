import React, { useState } from 'react';

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    
    const form = e.target;
    const data = new FormData(form);

    try {
      // 1. SEGURIDAD: Consumo de URL mediante variable de entorno
      const response = await fetch(import.meta.env.VITE_FORMSPREE_ENDPOINT, {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      
      if (response.ok) {
        setStatus('success');
        form.reset();
        // 2. Limpieza automática del estado después de 5 segundos
        setTimeout(() => setStatus(''), 5000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus(''), 5000);
      }
    } catch (error) {
      setStatus('error');
      setTimeout(() => setStatus(''), 5000);
    }
  };

  return (
    <section id="contact" className="min-h-screen w-full bg-portfolio-grey py-24 px-4 md:px-8 relative flex flex-col justify-center overflow-hidden">
      
      {/* CAPA Z-5 - EL GIF FANTASMA */}
      <div className="absolute left-10 top-20 w-full md:w-[50vw] h-[70vh] z-[5] pointer-events-none opacity-20 mix-blend-screen">
        <div className="w-full h-full" style={{ maskImage: 'radial-gradient(circle at center left, black 20%, transparent 80%)', WebkitMaskImage: 'radial-gradient(circle at center left, black 20%, transparent 80%)' }}>
          <img 
            src="/Lain/esbejs3.gif"
            alt="" 
            className="w-full h-full object-cover filter grayscale contrast-150"
          />
        </div>
      </div>

      <div className="max-w-6xl w-full mx-auto relative z-10">
        
        <div className="mb-20 text-center" data-aos="fade-up">
          <h2 className="font-playfair text-5xl font-bold text-white mb-4">Contact Me</h2>
          <div className="w-24 h-1 bg-portfolio-accent mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          
          <div data-aos="fade-right" className="flex flex-col h-full justify-center">
            <h3 className="text-3xl font-playfair font-bold text-white mb-6">Let's build something.</h3>
            <p className="text-gray-400 font-light mb-10 leading-relaxed max-w-md">
              Si estás interesado en colaborar, tienes un proyecto en mente o simplemente quieres hablar de tecnología, envíame un mensaje. 
            </p>

            <div className="p-6 border border-gray-800 bg-portfolio-dark rounded-xl max-w-sm relative overflow-hidden group">
              <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white via-black to-black pointer-events-none"></div>
              
              <div className="relative z-10 flex flex-col gap-4 font-mono text-sm">
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-gray-500 animate-glitch">SYSTEM_STATUS</span>
                  <span className="text-green-500 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                    ONLINE
                  </span>
                </div>
                <div className="flex justify-between items-center border-b border-gray-800 pb-2">
                  <span className="text-gray-500">AVAILABILITY</span>
                  <span className="text-white animate-glitch-delayed">OPEN FOR WORK</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 animate-glitch">LOCATION</span>
                  <span className="text-white">NOT AVAILABLE</span>
                </div>
              </div>
            </div>

          </div>

          <div data-aos="fade-left">
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="sr-only">Your Name</label>
                <input 
                  id="name"
                  name="name" 
                  type="text" 
                  placeholder="Your Name" 
                  required
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-portfolio-accent transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="sr-only">Your Email</label>
                <input 
                  id="email"
                  name="email" 
                  type="email" 
                  placeholder="Your Email" 
                  required
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-portfolio-accent transition-colors"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea 
                  id="message"
                  name="message" 
                  placeholder="Your Message" 
                  rows="5"
                  required
                  className="w-full bg-[#1a1a1a] border border-gray-700 rounded-lg px-6 py-4 text-white focus:outline-none focus:border-portfolio-accent transition-colors resize-none"
                ></textarea>
              </div>

              {/* 3. PROTECCIÓN ANTI-SPAM: Campo Honeypot oculto para Formspree */}
              <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex="-1" autoComplete="off" />

              <button 
                type="submit"
                disabled={status === 'sending'}
                className="w-full bg-white text-black font-semibold rounded-lg px-6 py-4 hover:bg-portfolio-accent hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center"
              >
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>

              {/* 4. ACCESIBILIDAD Y DISEÑO: Contenedor con altura fija y aria-live */}
              <div aria-live="polite" className="min-h-[24px]">
                {status === 'success' && (
                  <p className="text-green-500 font-mono text-sm text-center animate-pulse">¡Mensaje enviado con éxito! Te responderé pronto.</p>
                )}
                {status === 'error' && (
                  <p className="text-portfolio-accent font-mono text-sm text-center animate-pulse">Hubo un error al enviar el mensaje. Inténtalo más tarde.</p>
                )}
              </div>

            </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Contact;