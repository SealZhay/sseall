import React, { useState, useMemo, useEffect } from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { CategoryFilter } from '../components/CategoryFilter';
import { FilterDrawer } from '../components/FilterDrawer';
import { FilterState, ProductCategory } from '../types/product';
import { SlidersHorizontal, Search, ArrowUpDown, RotateCcw, Box } from 'lucide-react';

interface CatalogPageProps {
  initialCategory?: ProductCategory | 'Все';
  onSelectProduct: (productId: string) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  initialCategory = 'Все',
  onSelectProduct,
}) => {
  const [filterState, setFilterState] = useState<FilterState>({
    searchQuery: '',
    category: initialCategory,
    minPrice: 0,
    maxPrice: 0,
    availability: 'Все',
    coolingType: 'Все',
    sortBy: 'popularity',
  });

  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (initialCategory) {
      setFilterState((prev) => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  const handleUpdateFilter = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({
      searchQuery: '',
      category: 'Все',
      minPrice: 0,
      maxPrice: 0,
      availability: 'Все',
      coolingType: 'Все',
      sortBy: 'popularity',
    });
  };

  // Filter & Sort logic
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category check
      if (filterState.category !== 'Все' && product.category !== filterState.category) {
        return false;
      }

      // Search query check
      if (filterState.searchQuery.trim()) {
        const query = filterState.searchQuery.toLowerCase();
        const nameMatch = product.name.toLowerCase().includes(query);
        const codeMatch = product.modelCode.toLowerCase().includes(query);
        const brandMatch = product.specifications.brand?.toLowerCase().includes(query);
        const categoryMatch = product.category.toLowerCase().includes(query);
        if (!nameMatch && !codeMatch && !brandMatch && !categoryMatch) {
          return false;
        }
      }

      // Price filter
      if (product.price !== null) {
        if (filterState.minPrice > 0 && product.price < filterState.minPrice) return false;
        if (filterState.maxPrice > 0 && product.price > filterState.maxPrice) return false;
      }

      // Cooling type filter
      if (
        filterState.coolingType !== 'Все' &&
        product.specifications.cooling !== filterState.coolingType
      ) {
        return false;
      }

      // Availability filter
      if (
        filterState.availability !== 'Все' &&
        !product.availability.includes(filterState.availability)
      ) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (filterState.sortBy === 'price-asc') {
        return (a.price || 0) - (b.price || 0);
      }
      if (filterState.sortBy === 'price-desc') {
        return (b.price || 0) - (a.price || 0);
      }
      if (filterState.sortBy === 'newest') {
        return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      }
      // popularity default
      return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
    });
  }, [filterState]);

  return (
    <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Каталог оборудования
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Холодильные, кондитерские и морозильные витрины с гарантией.
        </p>
      </div>

      {/* Category Pills Bar */}
      <CategoryFilter
        selectedCategory={filterState.category}
        onSelectCategory={(cat) => handleUpdateFilter({ category: cat })}
      />

      {/* Search & Mobile Filter Toggle Bar */}
      <div className="flex flex-col gap-3 bg-white p-3.5 sm:p-4 rounded-2xl border border-slate-200 shadow-sm">
        
        {/* Row 1: Full-Width Search Bar Input */}
        <div className="relative w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filterState.searchQuery}
            onChange={(e) => handleUpdateFilter({ searchQuery: e.target.value })}
            placeholder="Поиск по названию или модели..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:bg-white transition-all"
          />
        </div>

        {/* Row 2: Mobile Filter Button & Sort Controls */}
        <div className="grid grid-cols-2 gap-2.5 sm:flex sm:items-center sm:justify-end">
          
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs shadow-sm active:scale-95 transition-all"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Фильтры</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <ArrowUpDown className="w-4 h-4 text-slate-400 hidden sm:block" />
            <select
              value={filterState.sortBy}
              onChange={(e) => handleUpdateFilter({ sortBy: e.target.value as FilterState['sortBy'] })}
              className="w-full sm:w-auto bg-slate-50 border border-slate-200 text-slate-800 text-xs font-semibold rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-sky-500 cursor-pointer"
            >
              <option value="popularity">По популярности</option>
              <option value="price-asc">Сначала дешевле</option>
              <option value="price-desc">Сначала дороже</option>
              <option value="newest">По новизне</option>
            </select>
          </div>

        </div>

      </div>

      {/* Main Grid + Filter Layout */}
      <div className="flex gap-8">
        
        {/* Sidebar Filter Component */}
        <FilterDrawer
          filterState={filterState}
          onChangeFilter={handleUpdateFilter}
          onResetFilters={handleResetFilters}
          isOpenOnMobile={mobileFilterOpen}
          onCloseMobile={() => setMobileFilterOpen(false)}
          totalResults={filteredProducts.length}
        />

        {/* Products Grid - 2 columns on mobile, 3 columns on desktop */}
        <div className="flex-1 min-w-0">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          ) : (
            /* Empty Filter State */
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-4 my-8">
              <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <Box className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Оборудование не найдено</h3>
              <p className="text-sm text-slate-500 max-w-sm mx-auto">
                Попробуйте изменить параметры поиска, расширить диапазон цен или выбрать другую категорию.
              </p>
              <button
                onClick={handleResetFilters}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-colors shadow-sm"
              >
                <RotateCcw className="w-4 h-4" />
                <span>Сбросить все фильтры</span>
              </button>
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
