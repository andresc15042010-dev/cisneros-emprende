import React, { useState } from 'react';
import { TouchCarousel } from './TouchCarousel';
import { checkBusinessOpenStatus } from '../lib/schedule';
import { formatCurrencyCOP } from '../lib/whatsapp';

export function BusinessDetail({
  business,
  products = [],
  reviews = [],
  onBack,
  onAddToCart,
  onOpenReviewModal,
  onOpenReportModal,
  isFavorite,
  onToggleFavorite
}) {
  const status = checkBusinessOpenStatus(business.schedule);
  const isOrgullo = business.has_orgullo_cisneros || (business.avg_rating >= 4.6 && (business.total_reviews || 0) >= 5);
  const [activeTab, setActiveTab] = useState('menu'); // 'menu', 'info', 'reviews'

  return (
    <div className="max-w-4xl mx-auto pb-24 animate-in fade-in duration-200">
      
      {/* Botón Volver */}
      <div className="p-3 sm:p-4">
        <button
          onClick={onBack}
          className="text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-all shadow-xs"
        >
          <span>←</span>
          <span>Volver al Directorio</span>
        </button>
      </div>

      {/* Cabecera & Carrusel */}
      <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm mx-3 sm:mx-4">
        <div className="relative">
          <TouchCarousel
            images={business.cover_images && business.cover_images.length > 0 ? business.cover_images : [business.logo_url || 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&auto=format&fit=crop&q=80']}
            alt={business.name}
          />
          <button
            onClick={() => onToggleFavorite && onToggleFavorite(business.id)}
            className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-transform active:scale-90 ${
              isFavorite ? 'bg-red-500 text-white' : 'bg-black/50 text-white hover:text-white'
            }`}
          >
            <span className="text-lg">{isFavorite ? '❤️' : '🤍'}</span>
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-md">
                {business.category_name || business.categories?.name || 'Comercio Local'}
              </span>

              {isOrgullo && (
                <span className="inline-flex items-center gap-1.5 text-xs font-black text-amber-900 bg-amber-100 border border-amber-400/80 px-3 py-0.5 rounded-full shadow-xs">
                  <span>🏅</span> Orgullo Cisneros
                </span>
              )}

              <div className={`px-2.5 py-0.5 rounded-md border font-semibold text-xs flex items-center gap-1.5 ${status.badgeColor}`}>
                <span className={`w-2 h-2 rounded-full ${status.isOpen ? 'bg-emerald-500' : 'bg-rose-500'}`} />
                <span>{status.label}</span>
                <span className="text-slate-500 font-normal">({status.detail})</span>
              </div>
            </div>

            <h2 className="font-black text-slate-900 text-2xl sm:text-3xl tracking-tight">
              {business.name}
            </h2>

            <p className="text-sm text-slate-600 mt-2 leading-relaxed">
              {business.description || 'Emprendimiento local comprometido con la calidad y el servicio en el municipio de Cisneros.'}
            </p>
          </div>

          {/* Dirección Escrita Estricta (Regla: Sin mapas) */}
          <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl flex items-start gap-3">
            <span className="text-2xl mt-0.5">📍</span>
            <div className="text-xs sm:text-sm">
              <span className="font-bold text-slate-900 block">Ubicación física en Cisneros:</span>
              <span className="text-slate-700 block mt-0.5">{business.written_address}</span>
              {business.reference_point && (
                <span className="text-slate-500 italic block mt-1 text-xs">
                  Punto de referencia: {business.reference_point}
                </span>
              )}
            </div>
          </div>

          {/* Domicilios & Contactos Rápidos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="bg-emerald-50/70 border border-emerald-200/60 p-3 rounded-xl text-xs flex items-center gap-2">
              <span className="text-xl">🛵</span>
              <div>
                <span className="font-bold text-emerald-950 block">Servicio de Domicilio</span>
                <span className="text-emerald-800">
                  {business.delivery_available
                    ? `Disponible en Cisneros (${Number(business.delivery_cost) === 0 ? 'Gratis' : formatCurrencyCOP(business.delivery_cost)})`
                    : 'Solo atención en el local'}
                </span>
              </div>
            </div>

            <div className="flex gap-2">
              <a
                href={`https://wa.me/57${business.whatsapp_number.replace(/\D/g, '')}?text=Hola%2C%20los%20contacto%20desde%20Cisneros%20Emprende`}
                target="_blank"
                rel="noreferrer"
                className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-sm transition-all"
              >
                <span>💬</span> WhatsApp Directo
              </a>

              {business.phone_number && (
                <a
                  href={`tel:${business.phone_number}`}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold p-2.5 rounded-xl text-xs flex items-center justify-center"
                  title="Llamar por teléfono"
                >
                  📞
                </a>
              )}

              {business.instagram_url && (
                <a
                  href={business.instagram_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold p-2.5 rounded-xl text-xs flex items-center justify-center"
                  title="Ver Instagram"
                >
                  📸
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Tabs de Contenido (Menú, Información, Reseñas) */}
        <div className="border-t border-slate-200 flex bg-slate-50/50">
          <button
            onClick={() => setActiveTab('menu')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all ${
              activeTab === 'menu'
                ? 'border-emerald-700 text-emerald-900 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            🍽️ Menú & Productos ({products.length})
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`flex-1 py-3 text-xs sm:text-sm font-bold text-center border-b-2 transition-all ${
              activeTab === 'reviews'
                ? 'border-emerald-700 text-emerald-900 bg-white shadow-2xs'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            ⭐ Reseñas ({reviews.length})
          </button>
        </div>
      </div>

      {/* Contenido de Tab: Menú de Productos */}
      {activeTab === 'menu' && (
        <div className="mt-4 px-3 sm:px-4 space-y-3">
          {products.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400">
              <span className="text-3xl block mb-2">📋</span>
              <p className="text-sm font-medium">Este negocio aún no ha cargado productos al menú.</p>
              <p className="text-xs text-slate-400 mt-1">Puedes consultar disponibilidad directamente por WhatsApp.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {products.map((prod) => (
                <div
                  key={prod.id}
                  className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs flex justify-between items-center gap-3 hover:border-emerald-300 transition-colors"
                >
                  <div className="flex-1">
                    <h4 className="font-bold text-slate-900 text-sm">{prod.name}</h4>
                    {prod.description && (
                      <p className="text-xs text-slate-500 line-clamp-2 mt-0.5">{prod.description}</p>
                    )}
                    <span className="text-emerald-700 font-extrabold text-sm block mt-1.5">
                      {formatCurrencyCOP(prod.price)}
                    </span>
                  </div>

                  {prod.image_url && (
                    <img
                      src={prod.image_url}
                      alt={prod.name}
                      className="w-16 h-16 rounded-xl object-cover border border-slate-100"
                      loading="lazy"
                    />
                  )}

                  <button
                    onClick={() => onAddToCart(prod)}
                    className="bg-emerald-800 hover:bg-emerald-900 text-white font-bold p-2.5 rounded-xl text-xs flex items-center justify-center gap-1 shadow-xs transition-transform active:scale-95"
                    title="Agregar al Mini-Carro"
                  >
                    <span>+</span>
                    <span className="text-sm">🛒</span>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Contenido de Tab: Reseñas */}
      {activeTab === 'reviews' && (
        <div className="mt-4 px-3 sm:px-4 space-y-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="font-bold text-slate-900 text-base">Opiniones de la Comunidad</h3>
              <p className="text-xs text-slate-500">Solo usuarios verificados con Google pueden calificar.</p>
            </div>
            <button
              onClick={onOpenReviewModal}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold py-2.5 px-5 rounded-xl text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
            >
              <span>✍️</span> Dejar mi Reseña
            </button>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-white p-8 rounded-2xl border border-slate-200 text-center text-slate-400">
              <span className="text-3xl block mb-2">💬</span>
              <p className="text-sm font-medium">Aún no hay reseñas para este negocio.</p>
              <p className="text-xs text-slate-400 mt-1">¡Sé el primero en dejar tu opinión!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {reviews.map((rev) => (
                <div key={rev.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center justify-center">
                        {rev.user_name ? rev.user_name.charAt(0) : 'U'}
                      </div>
                      <div>
                        <span className="font-bold text-xs text-slate-900 block leading-tight">{rev.user_name || 'Vecino de Cisneros'}</span>
                        <span className="text-[10px] text-slate-400">{new Date(rev.created_at).toLocaleDateString('es-CO')}</span>
                      </div>
                    </div>
                    <div className="text-amber-500 text-xs">
                      {'★'.repeat(rev.rating)}
                      <span className="text-slate-200">{'★'.repeat(5 - rev.rating)}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-700 leading-relaxed">
                    "{rev.comment}"
                  </p>

                  {/* Fotos de evidencia */}
                  {rev.photos && rev.photos.length > 0 && (
                    <div className="flex gap-2 pt-1 overflow-x-auto">
                      {rev.photos.map((p, i) => (
                        <img
                          key={i}
                          src={p}
                          alt="Evidencia"
                          className="w-16 h-16 rounded-lg object-cover border border-slate-200"
                          loading="lazy"
                        />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Botón Reportar Información Incorrecta */}
      <div className="mt-8 text-center">
        <button
          onClick={onOpenReportModal}
          className="text-[11px] font-semibold text-slate-400 hover:text-rose-600 transition-colors inline-flex items-center gap-1"
        >
          <span>⚠️</span> ¿Información incorrecta o negocio cerrado? Reportar aquí
        </button>
      </div>

    </div>
  );
}
