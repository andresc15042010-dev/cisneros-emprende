import React, { useState, useRef } from 'react';

/**
 * Carrusel táctil ligero para fotos de negocios y menús
 * Diseñado con CSS Scroll Snap nativo para fluidez en móviles sin consumir batería ni datos
 */
export function TouchCarousel({ images = [], alt = 'Negocio Cisneros' }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  if (!images || images.length === 0) {
    return (
      <div className="w-full h-48 bg-slate-100 flex items-center justify-center text-slate-400">
        <span className="text-xs font-medium">Sin imágenes registradas</span>
      </div>
    );
  }

  const handleScroll = () => {
    if (containerRef.current) {
      const { scrollLeft, offsetWidth } = containerRef.current;
      const index = Math.round(scrollLeft / offsetWidth);
      setCurrentIndex(index);
    }
  };

  const scrollToImage = (idx) => {
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: idx * containerRef.current.offsetWidth,
        behavior: 'smooth'
      });
      setCurrentIndex(idx);
    }
  };

  return (
    <div className="relative w-full overflow-hidden group rounded-t-xl bg-slate-900">
      {/* Contenedor Swipeable */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-none h-48 sm:h-56"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {images.map((img, idx) => (
          <div key={idx} className="w-full flex-shrink-0 snap-center relative">
            <img
              src={img}
              alt={`${alt} - Foto ${idx + 1}`}
              className="w-full h-full object-cover select-none"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Indicadores de bolitas (Puntos de carrusel) */}
      {images.length > 1 && (
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10 pointer-events-none">
          {images.map((_, idx) => (
            <span
              key={idx}
              onClick={(e) => { e.stopPropagation(); scrollToImage(idx); }}
              className={`w-2 h-2 rounded-full transition-all pointer-events-auto cursor-pointer ${
                idx === currentIndex ? 'bg-white w-4 shadow' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      )}

      {/* Contador de fotos en esquina superior */}
      {images.length > 1 && (
        <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {currentIndex + 1}/{images.length}
        </div>
      )}
    </div>
  );
}
