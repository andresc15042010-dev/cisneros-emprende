import React from 'react';

export function CategoryChips({ categories = [], selectedCategory, onSelectCategory }) {
  return (
    <div className="w-full overflow-x-auto scrollbar-none py-2 px-1 flex gap-2">
      <button
        onClick={() => onSelectCategory('all')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shadow-xs ${
          selectedCategory === 'all'
            ? 'bg-emerald-800 text-white shadow-emerald-800/20'
            : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
        }`}
      >
        <span>🌟</span>
        <span>Todos</span>
      </button>

      {categories.map((cat) => {
        const isSelected = selectedCategory === String(cat.id) || selectedCategory === cat.slug;
        return (
          <button
            key={cat.id}
            onClick={() => onSelectCategory(cat.slug || String(cat.id))}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap flex items-center gap-1.5 shadow-xs ${
              isSelected
                ? 'bg-emerald-800 text-white shadow-emerald-800/20'
                : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
            }`}
          >
            <span>{cat.emoji || '🏪'}</span>
            <span>{cat.name}</span>
          </button>
        );
      })}
    </div>
  );
}
