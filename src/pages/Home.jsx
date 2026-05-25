import React, { Suspense, lazy, useEffect } from 'react';
import Hero from '../components/Hero';

// 1. Variable global: Solo es 'true' cuando el usuario recién entra o presiona F5
let isFirstLoad = true;

// 2. Code Splitting
const About = lazy(() => import('../components/About'));
const GridProjects = lazy(() => import('../components/GridProjects'));
const Services = lazy(() => import('../components/Services'));
const Contact = lazy(() => import('../components/Contact'));

const Home = () => {
  
  useEffect(() => {
    // Si es una recarga (F5) o la primera vez que entra a la web
    if (isFirstLoad) {
      // Un pequeñísimo retraso para dejar que el navegador renderice,
      // seguido de un deslizamiento suave (smooth) hacia arriba.
      setTimeout(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 100);
      
      // Marcamos como falso para que NO se ejecute si retrocedemos con la flecha
      isFirstLoad = false;
    }
  }, []);

  // 3. Fallback de carga (Estética mientras React descarga los fragmentos)
  const FallbackLoader = () => (
    <div className="w-full min-h-[50vh] flex items-center justify-center bg-portfolio-dark">
      <span className="text-red-900/50 font-mono text-xs tracking-[0.3em] uppercase animate-pulse">
        [ LOADING_MODULES ]
      </span>
    </div>
  );

  return (
    <>
      {/* Carga prioritaria y síncrona (Above the fold) */}
      <Hero />
      
      {/* Carga diferida en segundo plano */}
      <Suspense fallback={<FallbackLoader />}>
        <About />
        <GridProjects />
        <Services />
        <Contact /> 
      </Suspense>
    </>
  );
};

export default Home;