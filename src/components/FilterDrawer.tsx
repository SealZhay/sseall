import React from 'react';
import { FilterState, ProductCategory } from '../types/product';
import { CATEGORIES } from '../data/products';
import { Search, RotateCcw, X, SlidersHorizontal } from 'lucide-react';

interface FilterDrawerProps {
  filterState: FilterState;
  onChangeFilter: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  isOpenOnMobile?: boolean;
  onCloseMobile?: () => void;
  totalResults: number;
}

export const FilterDrawer: React.FC<FilterDrawerProps> = ({
  filterState,
  onChangeFilter,
  onResetFilters,
  isOpenOnMobile = false,
  onCloseMobile,
  totalResults,
}) => {

  const coolingTypes = ['Все', 'Динамическое', 'Статическое'];
  const availabilityOptions = ['Все', 'В наличии', 'Под заказ (3-5 дней)'];

  const content = (
    <div className="space-y-6">
      
      {/* Search Input */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Поиск по каталогу
        </label>
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterState.searchQuery}
            onChange={(e) => onChangeFilter({ searchQuery: e.target.value })}
            placeholder="Название, модель или код..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
          />
          {filterState.searchQuery && (
            <button
              onClick={() => onChangeFilter({ searchQuery: '' })}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Categories Select */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Категория
        </label>
        <div className="space-y-1">
          <button
            onClick={() => onChangeFilter({ category: 'Все' })}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold transition-colors flex items-center justify-between ${
              filterState.category === 'Все'
                ? 'bg-sky-600 text-white'
                : 'text-slate-700 hover:bg-slate-100'
            }`}
          >
            <span>Все категории</span>
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onChangeFilter({ category: cat as ProductCategory })}
              className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium transition-colors flex items-center justify-between ${
                filterState.category === cat
                  ? 'bg-sky-600 text-white font-semibold'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <span>{cat}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Filter */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Цена (₸)
        </label>
        <div className="grid grid-cols-2 gap-2">
          <div>
            <span className="text-[10px] text-slate-400 block mb-1">От</span>
            <input
              type="number"
              value={filterState.minPrice || ''}
              onChange={(e) => onChangeFilter({ minPrice: Number(e.target.value) || 0 })}
              placeholder="0 ₸"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block mb-1">До</span>
            <input
              type="number"
              value={filterState.maxPrice || ''}
              onChange={(e) => onChangeFilter({ maxPrice: Number(e.target.value) || 0 })}
              placeholder="3 000 000 ₸"
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>
        </div>
      </div>

      {/* Cooling Type */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Тип охлаждения
        </label>
        <div className="flex flex-wrap gap-1.5">
          {coolingTypes.map((type) => (
            <button
              key={type}
              onClick={() => onChangeFilter({ coolingType: type })}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                filterState.coolingType === type
                  ? 'bg-slate-900 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Availability */}
      <div>
        <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
          Наличие
        </label>
        <div className="space-y-1.5">
          {availabilityOptions.map((opt) => (
            <label key={opt} className="flex items-center gap-2 cursor-pointer text-xs text-slate-700">
              <input
                type="radio"
                name="availability"
                checked={filterState.availability === opt}
                onChange={() => onChangeFilter({ availability: opt })}
                className="text-sky-600 focus:ring-sky-500"
              />
              <span>{opt}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <div className="pt-4 border-t border-slate-200">
        <button
          onClick={onResetFilters}
          className="w-full py-2.5 px-4 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5 text-slate-500" />
          <span>Сбросить все фильтры</span>
        </button>
      </div>

    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm h-fit sticky top-24">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-sky-600" />
            <h2 className="text-sm font-bold text-slate-900">Фильтры</h2>
          </div>
          <span className="text-xs font-mono font-bold text-sky-600 bg-sky-50 px-2 py-0.5 rounded-full">
            Найдено: {totalResults}
          </span>
        </div>
        {content}
      </aside>

      {/* Mobile Drawer */}
      {isOpenOnMobile && (
        <div className="fixed inset-0 z-50 lg:hidden bg-slate-900/60 backdrop-blur-sm flex justify-end animate-fadeIn">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4 text-sky-600" />
                  <h2 className="text-base font-bold text-slate-900">Фильтры поиска</h2>
                </div>
                <button
                  onClick={onCloseMobile}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg bg-slate-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {content}
            </div>

            <div className="pt-6 border-t border-slate-200 mt-6">
              <button
                onClick={onCloseMobile}
                className="w-full py-3 rounded-xl bg-slate-900 text-white font-bold text-sm shadow-md"
              >
                Показать результаты ({totalResults})
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
