import React from 'react';

export function Navbar({
  searchTerm,
  onSearchChange,
  cartCount = 0,
  onOpenCart,
  onOpenSuggestion,
  onOpenRegister,
  onOpenAdmin,
  user,
  onLogin,
  onLogout
}) {
  const isAdmin = user && (user.role === 'admin' || user.email === 'andresc.15042010@gmail.com');

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-2xs">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        
        {/* Logo & Marca */}
        <div className="flex items-center gap-2.5 cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-800 to-emerald-600 flex items-center justify-center text-white shadow-sm font-black text-xl">
            🌱
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg text-emerald-950 tracking-tight leading-none">
              Cisneros <span className="text-amber-600">Emprende</span>
            </h1>
            <p className="text-[10px] text-slate-500 font-medium">Antioquia, Colombia</p>
          </div>
        </div>

        {/* Buscador Central */}
        <div className="flex-1 max-w-md hidden sm:block">
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar cafés, trucheras, ropa, panaderías..."
              className="w-full pl-8 pr-4 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:outline-none focus:border-emerald-600 focus:bg-white transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Acciones del Header */}
        <div className="flex items-center gap-2">
          
          {/* Buzón Ciudadano */}
          <button
            onClick={onOpenSuggestion}
            className="text-xs font-semibold text-slate-600 hover:text-emerald-800 p-2 rounded-lg hover:bg-slate-100 transition-colors flex items-center gap-1"
            title="Buzón de sugerencias"
          >
            <span>📬</span>
            <span className="hidden md:inline">Sugerencias</span>
          </button>

          {/* Registrar Emprendimiento */}
          <button
            onClick={onOpenRegister}
            className="text-xs font-bold bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200/80 px-3 py-1.5 rounded-lg transition-all flex items-center gap-1"
          >
            <span>🏪</span>
            <span className="hidden sm:inline">Registrar Negocio</span>
          </button>

          {/* Panel Secreto de Cami (Admin) */}
          {isAdmin && (
            <button
              onClick={onOpenAdmin}
              className="text-xs font-extrabold bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-amber-950 px-2.5 py-1.5 rounded-lg shadow-sm flex items-center gap-1 transition-all animate-pulse"
              title="Panel de Control Cami"
            >
              <span>👑</span>
              <span className="hidden sm:inline">Admin</span>
            </button>
          )}

          {/* Carrito de Compras */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
            title="Ver Mini-Carro"
          >
            <span className="text-base">🛒</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-700 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          {/* Usuario / Login con Google */}
          {user ? (
            <div className="flex items-center gap-1.5 pl-1 border-l border-slate-200">
              {user.avatar_url ? (
                <img
                  src={user.avatar_url}
                  alt={user.full_name}
                  className="w-7 h-7 rounded-full border border-emerald-600"
                />
              ) : (
                <div className="w-7 h-7 rounded-full bg-emerald-700 text-white font-bold text-xs flex items-center justify-center">
                  {user.full_name ? user.full_name.charAt(0) : 'U'}
                </div>
              )}
              <button
                onClick={onLogout}
                className="text-[11px] text-slate-400 hover:text-slate-700 font-semibold"
                title="Cerrar sesión"
              >
                Salir
              </button>
            </div>
          ) : (
            <button
              onClick={onLogin}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm transition-all"
            >
              Ingresar
            </button>
          )}

        </div>
      </div>

      {/* Buscador Móvil inferior */}
      <div className="px-4 pb-2 sm:hidden">
        <div className="relative">
          <span className="absolute left-3 top-2.5 text-slate-400 text-xs">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Buscar comercios en Cisneros..."
            className="w-full pl-8 pr-4 py-2 text-xs rounded-xl bg-slate-100 border border-slate-200 focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-800"
          />
        </div>
      </div>
    </header>
  );
}
