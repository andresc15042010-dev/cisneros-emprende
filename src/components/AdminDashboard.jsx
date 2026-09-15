import React, { useState } from 'react';

export function AdminDashboard({
  businesses = [],
  suggestions = [],
  reports = [],
  reviews = [],
  onUpdateBusinessStatus,
  onToggleFeatured,
  onDeleteReview,
  onResolveSuggestion,
  onResolveReport,
  onClose
}) {
  const [activeTab, setActiveTab] = useState('pending'); // 'pending', 'all_businesses', 'suggestions', 'reports', 'reviews'

  const pendingBusinesses = businesses.filter(b => b.status === 'pending');

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white w-full max-w-5xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border border-slate-200">
        
        {/* Header Admin Cami */}
        <div className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-900 text-white p-5 flex items-center justify-between shadow-md">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-xl shadow-lg border border-amber-300">
              👑
            </div>
            <div>
              <h2 className="font-extrabold text-lg sm:text-xl tracking-tight">Panel Administrativo: Cami</h2>
              <p className="text-xs text-emerald-200">Control maestro de comercios y buzón ciudadano de Cisneros</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white text-base font-bold transition-all"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex overflow-x-auto scrollbar-none border-b border-slate-200 bg-slate-50 px-4 gap-1 pt-2">
          <button
            onClick={() => setActiveTab('pending')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'pending'
                ? 'bg-white border-t-2 border-emerald-600 text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <span>⏳</span>
            <span>Pendientes ({pendingBusinesses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('all_businesses')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'all_businesses'
                ? 'bg-white border-t-2 border-emerald-600 text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <span>🏪</span>
            <span>Todos los Negocios ({businesses.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('suggestions')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'suggestions'
                ? 'bg-white border-t-2 border-emerald-600 text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <span>📬</span>
            <span>Buzón Ciudadano ({suggestions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'reports'
                ? 'bg-white border-t-2 border-emerald-600 text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <span>⚠️</span>
            <span>Reportes ({reports.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-2.5 text-xs font-bold rounded-t-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'reviews'
                ? 'bg-white border-t-2 border-emerald-600 text-emerald-800 shadow-sm'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <span>💬</span>
            <span>Moderar Reseñas ({reviews.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-5 overflow-y-auto flex-1 bg-slate-50/50">
          
          {/* TAB 1: PENDIENTES */}
          {activeTab === 'pending' && (
            pendingBusinesses.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <span className="text-4xl block mb-2">🎉</span>
                <p className="font-semibold text-slate-600">¡Al día! No hay nuevos negocios pendientes de aprobación.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingBusinesses.map((b) => (
                  <div key={b.id} className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-900 text-base">{b.name}</h4>
                        <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                          Pendiente
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">📍 <strong>Dirección:</strong> {b.written_address} {b.reference_point ? `(${b.reference_point})` : ''}</p>
                      <p className="text-xs text-slate-600">📱 <strong>WhatsApp:</strong> {b.whatsapp_number}</p>
                      <p className="text-xs text-slate-500 italic">"{b.description}"</p>
                    </div>

                    <div className="flex items-center gap-2 w-full md:w-auto">
                      <button
                        onClick={() => onUpdateBusinessStatus(b.id, 'approved')}
                        className="flex-1 md:flex-none bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-sm transition-all"
                      >
                        ✓ Aprobar Negocio
                      </button>
                      <button
                        onClick={() => onUpdateBusinessStatus(b.id, 'rejected')}
                        className="flex-1 md:flex-none bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold px-3 py-2 rounded-xl transition-all"
                      >
                        ✕ Rechazar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 2: TODOS LOS NEGOCIOS & DESTACADO */}
          {activeTab === 'all_businesses' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 mb-2">
                Aquí puedes activar el <strong>Destacado de la Semana</strong> para el banner superior o pausar comercios inactivos:
              </p>
              {businesses.map((b) => (
                <div key={b.id} className="bg-white border border-slate-200 rounded-xl p-3.5 flex items-center justify-between gap-3 shadow-2xs">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-800 text-sm">{b.name}</h4>
                      {b.is_featured && (
                        <span className="text-[10px] bg-amber-400 text-amber-950 font-black px-2 py-0.2 rounded-full">
                          ⭐ DESTACADO
                        </span>
                      )}
                      <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full ${
                        b.status === 'approved' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {b.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500">📍 {b.written_address}</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onToggleFeatured(b.id, !b.is_featured)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-all ${
                        b.is_featured
                          ? 'bg-amber-100 text-amber-900 border-amber-300'
                          : 'bg-slate-100 text-slate-700 hover:bg-amber-50 border-slate-200'
                      }`}
                    >
                      {b.is_featured ? 'Quitar Destacado' : '⭐ Destacar en Semana'}
                    </button>

                    <button
                      onClick={() => onUpdateBusinessStatus(b.id, b.status === 'paused' ? 'approved' : 'paused')}
                      className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                    >
                      {b.status === 'paused' ? 'Reactivar' : 'Pausar'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: SUGERENCIAS */}
          {activeTab === 'suggestions' && (
            suggestions.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <span>📬</span> No hay sugerencias recibidas aún.
              </div>
            ) : (
              <div className="space-y-3">
                {suggestions.map((s) => (
                  <div key={s.id} className="bg-white border border-slate-200 rounded-xl p-4 shadow-xs">
                    <div className="flex justify-between items-center text-xs text-slate-500 mb-2">
                      <span className="font-bold text-slate-800">{s.sender_name} ({s.sender_email || s.sender_phone || 'Anónimo'})</span>
                      <span>{new Date(s.created_at).toLocaleDateString('es-CO')}</span>
                    </div>
                    <p className="text-xs text-slate-700 bg-slate-50 p-3 rounded-lg border border-slate-100">
                      "{s.message}"
                    </p>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => onResolveSuggestion(s.id)}
                        className="text-xs text-emerald-700 font-bold hover:underline"
                      >
                        Marcar como atendida ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 4: REPORTES */}
          {activeTab === 'reports' && (
            reports.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <span>🛡️</span> No hay reportes de información errónea.
              </div>
            ) : (
              <div className="space-y-3">
                {reports.map((r) => (
                  <div key={r.id} className="bg-white border border-rose-200 rounded-xl p-4 shadow-xs">
                    <div className="flex justify-between text-xs text-rose-800 font-bold mb-1">
                      <span>Negocio: {r.business_name || 'Negocio Cisneros'}</span>
                      <span>Motivo: {r.reason}</span>
                    </div>
                    <p className="text-xs text-slate-700 bg-rose-50/50 p-2.5 rounded-lg border border-rose-100">
                      {r.details}
                    </p>
                    <div className="mt-2 flex justify-end">
                      <button
                        onClick={() => onResolveReport(r.id)}
                        className="text-xs text-slate-600 font-semibold hover:text-slate-900"
                      >
                        Descartar o resolver reporte ✓
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          )}

          {/* TAB 5: RESEÑAS */}
          {activeTab === 'reviews' && (
            reviews.length === 0 ? (
              <div className="text-center py-16 text-slate-400">
                <span>💬</span> No hay reseñas registradas aún.
              </div>
            ) : (
              <div className="space-y-3">
                {reviews.map((rev) => (
                  <div key={rev.id} className="bg-white border border-slate-200 rounded-xl p-3.5 flex justify-between items-start gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-bold text-xs text-slate-800">{rev.user_name || 'Usuario Google'}</span>
                        <span className="text-amber-500 text-xs">{'★'.repeat(rev.rating)}</span>
                        <span className="text-[10px] text-slate-400">en {rev.business_name}</span>
                      </div>
                      <p className="text-xs text-slate-600">"{rev.comment}"</p>
                    </div>
                    <button
                      onClick={() => onDeleteReview(rev.id)}
                      className="text-xs bg-rose-50 hover:bg-rose-100 text-rose-700 px-2.5 py-1 rounded-md font-bold"
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </div>
            )
          )}

        </div>
      </div>
    </div>
  );
}
