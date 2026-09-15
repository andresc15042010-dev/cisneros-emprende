import React from 'react';
import { TouchCarousel } from './TouchCarousel';
import { checkBusinessOpenStatus } from '../lib/schedule';

export function BusinessCard({
  business,
  onSelect,
  isFavorite = false,
  onToggleFavorite,
  user
}) {
  const status = checkBusinessOpenStatus(business.schedule);
  const isOrgullo = business.has_orgullo_cisneros || (business.avg_rating >= 4.6 && (business.total_reviews || 0) >= 5);

  return (
    <article
      onClick={() => onSelect(business)}
      className="bg-white rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col overflow-hidden cursor-pointer hover:border-emerald-300 relative group"
    >
      {/* Carrusel táctil de fotos */}
      <div className="relative">
        <TouchCarousel
          images={business.cover_images && business.cover_images.length > 0 ? business.cover_images : [business.logo_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80']}
          alt={business.name}
        />

        {/* Botón Favorito ❤️ */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite && onToggleFavorite(business.id);
          }}
          className={`absolute top-2.5 left-2.5 w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-transform active:scale-90 shadow ${
            isFavorite ? 'bg-red-500 text-white' : 'bg-black/40 text-white/90 hover:text-white'
          }`}
          title={user ? 'Guardar en mis favoritos' : 'Inicia sesión para dar Me Gusta'}
        >
          <span className="text-sm">{isFavorite ? '❤️' : '🤍'}</span>
        </button>

        {/* Banner Destacado de la Semana */}
        {business.is_featured && (
          <div className="absolute bottom-2 left-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-black px-2.5 py-0.5 rounded-full shadow-md flex items-center gap-1">
            <span>⭐</span> Destacado de Cisneros
          </div>
        )}
      </div>

      {/* Contenido Principal */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Header de tarjeta: Categoría e Insignia Orgullo */}
          <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
            <span className="text-[11px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md">
              {business.category_name || business.categories?.name || 'Comercio Local'}
            </span>

            {isOrgullo && (
              <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-amber-900 bg-amber-100/90 border border-amber-300 px-2 py-0.5 rounded-full shadow-xs">
                <span>🏅</span> Orgullo Cisneros
              </span>
            )}
          </div>

          {/* Nombre del Negocio */}
          <h3 className="font-bold text-slate-900 text-lg group-hover:text-emerald-700 transition-colors line-clamp-1">
            {business.name}
          </h3>

          {/* Calificación y Likes */}
          <div className="flex items-center gap-3 text-xs text-slate-600 mt-1 mb-2.5">
            <div className="flex items-center gap-1 font-semibold text-amber-600">
              <span>★</span>
              <span>{business.avg_rating ? Number(business.avg_rating).toFixed(1) : 'Nuevo'}</span>
              <span className="text-slate-400 font-normal">({business.total_reviews || 0})</span>
            </div>
            <span className="text-slate-300">•</span>
            <div className="flex items-center gap-1 text-slate-500">
              <span>❤️</span>
              <span>{business.total_favorites || 0}</span>
            </div>
          </div>

          {/* Dirección Estrictamente Descriptiva (Sin Mapas) */}
          <div className="flex items-start gap-1.5 text-xs text-slate-600 bg-slate-50 p-2 rounded-lg border border-slate-100 mb-3">
            <span className="text-emerald-600 text-sm mt-0.5">📍</span>
            <div className="line-clamp-2">
              <span className="font-medium text-slate-800">{business.written_address}</span>
              {business.reference_point && (
                <span className="text-slate-500 block text-[11px] italic mt-0.5">
                  ({business.reference_point})
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Footer de Tarjeta: Estado y Domicilios */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
          {/* Badge Abierto / Cerrado */}
          <div className={`px-2 py-0.5 rounded-md border font-semibold text-[11px] flex items-center gap-1.5 ${status.badgeColor}`}>
            <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
            <span>{status.label}</span>
          </div>

          {/* Domicilios */}
          <div className="text-[11px] font-medium text-slate-500">
            {business.delivery_available ? (
              <span className="text-emerald-700">🛵 Domicilios {Number(business.delivery_cost) === 0 ? 'Gratis' : `$${Number(business.delivery_cost).toLocaleString('es-CO')}`}</span>
            ) : (
              <span className="text-slate-400">🏪 Solo en local</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
