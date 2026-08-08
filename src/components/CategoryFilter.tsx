import React from 'react';
import { ProductCategory } from '../types/product';
import { CATEGORIES } from '../data/products';
import { 
  Snowflake, 
  Cake, 
  Wine, 
  ShoppingBag, 
  Beef, 
  Flame, 
  Layers 
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: ProductCategory | 'Все';
  onSelectCategory: (category: ProductCategory | 'Все') => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
}) => {

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Холодильные витрины':
        return <Snowflake className="w-3.5 h-3.5" />;
      case 'Кондитерские витрины':
        return <Cake className="w-3.5 h-3.5 text-amber-500" />;
      case 'Витрины для напитков':
        return <Wine className="w-3.5 h-3.5 text-cyan-500" />;
      case 'Гастрономические витрины':
        return <ShoppingBag className="w-3.5 h-3.5 text-emerald-500" />;
      case 'Мясные витрины':
        return <Beef className="w-3.5 h-3.5 text-rose-500" />;
      case 'Морозильные витрины':
        return <Flame className="w-3.5 h-3.5 text-blue-500" />;
      case 'Настольные витрины':
        return <Layers className="w-3.5 h-3.5 text-indigo-500" />;
      default:
        return <Snowflake className="w-3.5 h-3.5 text-sky-500" />;
    }
  };

  return (
    <div className="w-full">
      {/* Minimalist Horizontal Pill Chips Bar */}
      <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 pt-1 scrollbar-none sm:flex-wrap">
        {/* 'All' category pill */}
        <button
          onClick={() => onSelectCategory('Все')}
          className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
            selectedCategory === 'Все'
              ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
              : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
          }`}
        >
          <Snowflake className={`w-3.5 h-3.5 ${selectedCategory === 'Все' ? 'text-sky-400' : 'text-slate-400'}`} />
          <span>Все</span>
        </button>

        {/* Categories pills */}
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat as ProductCategory)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-1.5 transition-all ${
                isSelected
                  ? 'bg-slate-900 text-white shadow-sm ring-1 ring-slate-900'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <span className={isSelected ? 'text-white' : 'text-slate-400'}>
                {getCategoryIcon(cat)}
              </span>
              <span>{cat}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

