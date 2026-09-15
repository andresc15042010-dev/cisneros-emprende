import React, { useState } from 'react';
import { compressImage } from '../lib/imageCompressor';

export function ReviewFormModal({
  business,
  user,
  existingReview = null,
  onSubmitReview,
  onClose,
  onRequireLogin
}) {
  const [rating, setRating] = useState(existingReview ? existingReview.rating : 5);
  const [comment, setComment] = useState(existingReview ? existingReview.comment : '');
  const [photoFiles, setPhotoFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
          <span className="text-4xl block mb-2">🔐</span>
          <h3 className="font-bold text-slate-900 text-lg mb-1">Inicia Sesión con Google</h3>
          <p className="text-xs text-slate-600 mb-5">
            Para garantizar que las reseñas en Cisneros sean 100% auténticas y evitar spam, debes identificarte con tu cuenta de Google.
          </p>
          <button
            onClick={onRequireLogin}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-sm"
          >
            <span>Continuar con Google</span>
          </button>
          <button
            onClick={onClose}
            className="mt-3 text-xs text-slate-400 hover:text-slate-600 font-semibold"
          >
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  const handlePhotoSelect = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      if (files.length + photoFiles.length > 3) {
        setError('Máximo puedes adjuntar 3 fotos de evidencia.');
        return;
      }
      try {
        const compressed = await Promise.all(
          files.map(f => compressImage(f, { maxWidth: 1000, quality: 0.75 }))
        );
        setPhotoFiles([...photoFiles, ...compressed]);
      } catch (err) {
        console.error('Error al comprimir:', err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError('Por favor escribe tu opinión sobre este negocio.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      await onSubmitReview({
        business_id: business.id,
        rating,
        comment,
        photoFiles
      });
      onClose();
    } catch (err) {
      setError(err.message || 'No se pudo guardar la reseña.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="bg-emerald-800 text-white p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-base">Dejar Reseña en Cisneros</h3>
            <p className="text-xs text-emerald-200">{business.name}</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white font-bold">✕</button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-4">
          {error && (
            <div className="bg-red-50 text-red-700 text-xs p-3 rounded-lg border border-red-200">
              {error}
            </div>
          )}

          {/* Calificación por estrellas */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5">
              Tu Calificación:
            </label>
            <div className="flex gap-2 text-3xl">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onClick={() => setRating(star)}
                  className={`transition-transform active:scale-125 ${
                    star <= rating ? 'text-amber-400' : 'text-slate-200'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Comentario */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Tu Experiencia (Comentario):
            </label>
            <textarea
              rows="4"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Cuéntale a la comunidad de Cisneros qué tal fue la atención, calidad o sabor..."
              className="w-full text-xs p-3 rounded-xl border border-slate-300 focus:outline-emerald-600 resize-none"
              required
            />
          </div>

          {/* Fotos de Evidencia */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Fotos de Evidencia o Pedido (Opcional - Máx 3):
            </label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoSelect}
              className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
            />
            {photoFiles.length > 0 && (
              <p className="text-[11px] text-emerald-700 font-medium mt-1">
                ✓ {photoFiles.length} foto(s) optimizada(s) lista(s) para subir
              </p>
            )}
          </div>

          <div className="bg-slate-50 p-3 rounded-xl text-[11px] text-slate-500">
            ℹ️ <strong>Regla de Cisneros Emprende:</strong> Solo se permite 1 reseña por cuenta de Google por negocio para proteger a los emprendedores contra comentarios maliciosos o spam.
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md"
          >
            {submitting ? 'Guardando reseña...' : 'Publicar Reseña Verificada'}
          </button>
        </form>
      </div>
    </div>
  );
}
