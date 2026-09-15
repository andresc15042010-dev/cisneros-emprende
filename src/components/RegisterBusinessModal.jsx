import React, { useState } from 'react';
import { compressImage } from '../lib/imageCompressor';

export function RegisterBusinessModal({
  user,
  categories = [],
  onClose,
  onSubmitBusiness,
  onRequireLogin
}) {
  const [name, setName] = useState('');
  const [categoryId, setCategoryId] = useState(categories[0]?.id || 1);
  const [description, setDescription] = useState('');
  const [writtenAddress, setWrittenAddress] = useState('');
  const [referencePoint, setReferencePoint] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [phone, setPhone] = useState('');
  const [instagram, setInstagram] = useState('');
  const [deliveryAvailable, setDeliveryAvailable] = useState(true);
  const [deliveryCost, setDeliveryCost] = useState('0');
  const [photoFiles, setPhotoFiles] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  if (!user) {
    return (
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full text-center shadow-2xl">
          <span className="text-4xl block mb-2">🏪</span>
          <h3 className="font-bold text-slate-900 text-lg mb-1">Registra tu Emprendimiento</h3>
          <p className="text-xs text-slate-600 mb-5">
            Para vincular tu negocio a tu nombre y administrar tu menú y fotos, inicia sesión con tu cuenta de Google.
          </p>
          <button
            onClick={onRequireLogin}
            className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-2.5 px-4 rounded-xl text-sm shadow-sm"
          >
            Identificarme con Google
          </button>
          <button onClick={onClose} className="mt-3 text-xs text-slate-400 font-semibold">
            Cerrar
          </button>
        </div>
      </div>
    );
  }

  const handlePhotos = async (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        setError('Máximo puedes subir 5 fotos del local o menú.');
        return;
      }
      try {
        const compressed = await Promise.all(
          files.map(f => compressImage(f, { maxWidth: 1200, quality: 0.8 }))
        );
        setPhotoFiles(compressed);
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || !writtenAddress.trim() || !whatsapp.trim()) {
      setError('Por favor completa el nombre, dirección escrita y WhatsApp.');
      return;
    }
    setError('');
    setSubmitting(true);

    try {
      await onSubmitBusiness({
        name: name.trim(),
        category_id: Number(categoryId),
        description: description.trim(),
        written_address: writtenAddress.trim(),
        reference_point: referencePoint.trim(),
        whatsapp_number: whatsapp.trim(),
        phone_number: phone.trim(),
        instagram_url: instagram.trim(),
        delivery_available: deliveryAvailable,
        delivery_cost: Number(deliveryCost) || 0,
        photoFiles
      });
      setSuccess(true);
      setTimeout(onClose, 2500);
    } catch (err) {
      setError(err.message || 'Error al enviar el registro.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        <div className="bg-emerald-800 text-white p-4 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-base">Registrar Nuevo Emprendimiento</h3>
            <p className="text-xs text-emerald-200">Cisneros, Antioquia</p>
          </div>
          <button onClick={onClose} className="text-white/80 hover:text-white font-bold">✕</button>
        </div>

        {success ? (
          <div className="p-8 text-center space-y-3">
            <span className="text-5xl block animate-bounce">🎉</span>
            <h4 className="font-bold text-slate-900 text-lg">¡Negocio Registrado con Éxito!</h4>
            <p className="text-xs text-slate-600">
              Tu negocio ha quedado en estado <strong>"Pendiente de Aprobación"</strong>. La administradora Cami revisará los datos y se publicará en la vitrina municipal muy pronto.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 overflow-y-auto space-y-3.5">
            {error && (
              <div className="bg-red-50 text-red-700 text-xs p-2.5 rounded-lg border border-red-200">
                {error}
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Nombre del Negocio: *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej: Panadería El Trapiche Real"
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Categoría: *</label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 bg-white"
                >
                  {categories.map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">WhatsApp para Pedidos: *</label>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="Ej: 3101234567"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Descripción corta del negocio:</label>
              <textarea
                rows="2"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Ej: Deliciosos panes artesanales, buñuelos calientes y café especial de Cisneros..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 resize-none"
              />
            </div>

            {/* Dirección Textual Estricta */}
            <div className="bg-emerald-50/50 p-3 rounded-xl border border-emerald-200/60 space-y-2">
              <span className="text-[11px] font-bold text-emerald-900 block">
                📍 Ubicación en Cisneros (Descriptiva por texto):
              </span>
              <div>
                <label className="block text-[11px] text-slate-600 mb-0.5">Dirección exacta: *</label>
                <input
                  type="text"
                  value={writtenAddress}
                  onChange={(e) => setWrittenAddress(e.target.value)}
                  placeholder="Ej: Calle 19 # 20-14, Centro"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-emerald-600 bg-white"
                  required
                />
              </div>
              <div>
                <label className="block text-[11px] text-slate-600 mb-0.5">Punto de referencia:</label>
                <input
                  type="text"
                  value={referencePoint}
                  onChange={(e) => setReferencePoint(e.target.value)}
                  placeholder="Ej: A 50 metros del Parque Principal diagonal a la estación"
                  className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-emerald-600 bg-white"
                />
              </div>
            </div>

            {/* Domicilios */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="chk-delivery"
                  checked={deliveryAvailable}
                  onChange={(e) => setDeliveryAvailable(e.target.checked)}
                  className="w-4 h-4 text-emerald-600 rounded"
                />
                <label htmlFor="chk-delivery" className="text-xs font-semibold text-slate-700">
                  ¿Haces Domicilios en Cisneros?
                </label>
              </div>
              {deliveryAvailable && (
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Costo Domicilio ($ COP):</label>
                  <input
                    type="number"
                    value={deliveryCost}
                    onChange={(e) => setDeliveryCost(e.target.value)}
                    placeholder="0 si es gratis"
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 focus:outline-emerald-600"
                  />
                </div>
              )}
            </div>

            {/* Subida de Fotos */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Fotos del Local o Menú (Máx 5):</label>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotos}
                className="text-xs text-slate-500 file:mr-2 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
              />
              {photoFiles.length > 0 && (
                <p className="text-[11px] text-emerald-700 font-medium mt-1">
                  ✓ {photoFiles.length} foto(s) comprimida(s) y lista(s)
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-emerald-700 hover:bg-emerald-800 disabled:bg-slate-300 text-white font-bold py-3 rounded-xl text-xs transition-all shadow-md mt-2"
            >
              {submitting ? 'Registrando negocio...' : 'Enviar para Aprobación de Cami'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
