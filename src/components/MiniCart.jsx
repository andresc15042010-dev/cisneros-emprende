import React, { useState } from 'react';
import { buildWhatsAppOrderLink, formatCurrencyCOP } from '../lib/whatsapp';

export function MiniCart({
  business,
  cart,
  onUpdateQuantity,
  onClearCart,
  onClose
}) {
  const [address, setAddress] = useState('');
  const [reference, setReference] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo contra entrega');
  const [customerName, setCustomerName] = useState('');
  const [notes, setNotes] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + (Number(item.price) * Number(item.quantity)), 0);
  const deliveryFee = business?.delivery_available ? Number(business?.delivery_cost || 0) : 0;
  const total = subtotal + deliveryFee;

  const handleCheckout = () => {
    if (!address.trim()) {
      setErrorMsg('Por favor escribe tu dirección en Cisneros para que te puedan entregar el pedido.');
      return;
    }
    setErrorMsg('');

    const url = buildWhatsAppOrderLink(business, cart, {
      address,
      reference,
      paymentMethod,
      customerName,
      notes
    });

    if (url && url !== '#') {
      window.open(url, '_blank', 'noopener,noreferrer');
      onClearCart();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end">
      <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-200">
        
        {/* Header */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-emerald-800 text-white">
          <div className="flex items-center gap-2">
            <span className="text-xl">🛍️</span>
            <div>
              <h2 className="font-bold text-base leading-tight">Mini-Carro de Pedidos</h2>
              <p className="text-xs text-emerald-200">{business?.name || 'Comercio de Cisneros'}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-emerald-900/60 hover:bg-emerald-700 flex items-center justify-center text-white transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Lista de productos */}
        <div className="p-4 overflow-y-auto flex-1 divide-y divide-slate-100">
          {cart.length === 0 ? (
            <div className="text-center py-16 text-slate-400">
              <span className="text-4xl block mb-2">🛒</span>
              <p className="text-sm font-medium">Tu carrito está vacío</p>
              <p className="text-xs text-slate-400 mt-1">Agrega delicias o productos del menú para ordenar por WhatsApp.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div key={item.id} className="flex items-center justify-between py-2">
                  <div className="flex-1 pr-3">
                    <h4 className="font-semibold text-slate-800 text-sm">{item.name}</h4>
                    <span className="text-xs text-emerald-700 font-bold">
                      {formatCurrencyCOP(item.price)} c/u
                    </span>
                  </div>

                  {/* Controles de Cantidad */}
                  <div className="flex items-center gap-2 bg-slate-100 px-2 py-1 rounded-lg border border-slate-200">
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                      className="w-6 h-6 rounded bg-white hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center text-xs shadow-xs"
                    >
                      -
                    </button>
                    <span className="font-bold text-xs text-slate-800 w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                      className="w-6 h-6 rounded bg-emerald-700 hover:bg-emerald-800 text-white font-bold flex items-center justify-center text-xs shadow-xs"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Formulario de entrega */}
          {cart.length > 0 && (
            <div className="pt-4 mt-4 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                📍 Datos de Entrega en Cisneros
              </h3>

              {errorMsg && (
                <div className="bg-red-50 border border-red-200 text-red-700 text-xs p-2.5 rounded-lg">
                  {errorMsg}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Tu Nombre (quien recibe):
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Ej: Laura Restrepo"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Dirección exacta en Cisneros: <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Ej: Carrera 20 # 19-35, Barrio Buenos Aires"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Punto de referencia:
                </label>
                <input
                  type="text"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  placeholder="Ej: A media cuadra de la bomba de gasolina"
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Método de pago:
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 bg-white"
                >
                  <option value="Efectivo contra entrega">💵 Efectivo contra entrega</option>
                  <option value="Transferencia Nequi">📱 Transferencia Nequi</option>
                  <option value="Transferencia Bancolombia">🏦 Transferencia Bancolombia</option>
                  <option value="Daviplata">📲 Daviplata</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Notas o especificaciones para la cocina:
                </label>
                <textarea
                  rows="2"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Ej: Sin cebolla, salsas aparte..."
                  className="w-full text-xs p-2.5 rounded-lg border border-slate-300 focus:outline-emerald-600 resize-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer con Resumen y Botón de WhatsApp */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal productos:</span>
                <span className="font-semibold">{formatCurrencyCOP(subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Domicilio:</span>
                <span className="font-semibold">
                  {business?.delivery_available
                    ? (deliveryFee === 0 ? '¡Gratis!' : formatCurrencyCOP(deliveryFee))
                    : 'A convenir'}
                </span>
              </div>
              <div className="flex justify-between text-slate-900 font-black text-sm pt-1 border-t border-slate-200">
                <span>Total a Pagar:</span>
                <span className="text-emerald-800 text-base">{formatCurrencyCOP(total)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold py-3 px-4 rounded-xl shadow-md flex items-center justify-center gap-2 transition-all"
            >
              <span className="text-lg">📲</span>
              <span>Enviar Pedido por WhatsApp</span>
            </button>
            <p className="text-[10px] text-center text-slate-400">
              Se abrirá WhatsApp con el pedido listo para que el dueño lo confirme directamente.
            </p>
          </div>
        )}

      </div>
    </div>
  );
}
