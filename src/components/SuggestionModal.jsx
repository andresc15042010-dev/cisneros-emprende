import React, { useState } from 'react';

export function SuggestionModal({ onClose, onSubmitSuggestion }) {
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      setError('Por favor escribe tu sugerencia.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      await onSubmitSuggestion({
        sender_name: name.trim() || 'Ciudadano de Cisneros',
        sender_contact: contact.trim(),
        message: message.trim()
      });
      setSent(true);
      setTimeout(() => {
        onClose();
      }, 2500);
    } catch (err) {
      setError(err.message || 'No se pudo enviar la sugerencia.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 duration-150">
        
        <div className="bg-emerald-800 text-white p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="text-xl">📬</span>
            <h3 className="font-bold text-base">Buzón de Sugerencias</h3>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white font-bold">✕</button>
        </div>

        {sent ? (
          <div className="p-8 text-center space-y-2">
            <span className="text-5xl block animate-bounce">💌</span>
            <h4 className="font-bold text-slate-900 text-lg">¡Muchas Gracias!</h4>
            <p className="text-xs text-slate-600">
              Tu sugerencia ha sido enviada al buzón de Cami y la administración municipal de Cisneros.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
            <p className="text-xs text-slate-600">
              ¿Tienes una idea para mejorar el comercio en Cisneros o quieres sugerir un negocio que aún no está en la plataforma? Déjanos tu mensaje:
            </p>

            {error && (
              <div className="bg-red-50 text-red-700 text-xs p-2.5 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tu Nombre (Opcional):</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Carlos Gómez"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp o Correo (Opcional):</label>
              <input
                type="text"
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Para responderte si es necesario"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Tu Sugerencia o Comentario: <span className="text-red-500">*</span></label>
              <textarea
                rows="4"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe aquí tus ideas o sugerencias..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 resize-none"
                required
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold py-2.5 rounded-xl text-xs transition-all shadow-sm"
            >
              {submitting ? 'Enviando sugerencia...' : 'Enviar al Buzón Ciudadano'}
            </button>
          </form>
        )}

      </div>
    </div>
  );
}
