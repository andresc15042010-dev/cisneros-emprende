import React, { useState } from 'react';

export function ReportModal({ business, onClose, onSubmitReport }) {
  const [reason, setReason] = useState('wrong_info');
  const [details, setDetails] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await onSubmitReport({
        business_id: business.id,
        reason,
        details: details.trim()
      });
      setDone(true);
      setTimeout(onClose, 2000);
    } catch (err) {
      setError(err.message || 'No se pudo enviar el reporte.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        <div className="bg-rose-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span>⚠️</span>
            <h3 className="font-bold text-base">Reportar Información</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white font-bold">✕</button>
        </div>

        {done ? (
          <div className="p-8 text-center space-y-2">
            <span className="text-4xl block">🛡️</span>
            <h4 className="font-bold text-slate-900 text-base">Reporte Registrado</h4>
            <p className="text-xs text-slate-600">
              Gracias por ayudar a mantener la información de Cisneros actualizada y verídica.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4">
            <p className="text-xs text-slate-600">
              Negocio: <strong>{business.name}</strong>
            </p>

            {error && (
              <div className="bg-red-50 text-red-700 text-xs p-2.5 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Motivo del Reporte:</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-rose-600 bg-white"
              >
                <option value="wrong_info">📍 Dirección o teléfono incorrecto</option>
                <option value="closed_permanently">🔒 Negocio cerrado definitivamente</option>
                <option value="offensive">🚫 Contenido o fotos inapropiadas</option>
                <option value="other">ℹ️ Otro motivo</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detalles del problema:</label>
              <textarea
                rows="3"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Explica brevemente qué información está errada o qué sucedió..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-rose-600 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-rose-700 hover:bg-rose-800 disabled:bg-slate-300 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm"
            >
              {submitting ? 'Enviando reporte...' : 'Enviar Reporte a Moderación'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
