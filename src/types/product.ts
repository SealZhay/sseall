export type ProductCategory =
  | 'Холодильные витрины'
  | 'Кондитерские витрины'
  | 'Витрины для напитков'
  | 'Гастрономические витрины'
  | 'Мясные витрины'
  | 'Морозильные витрины'
  | 'Настольные витрины';

export type AvailabilityStatus = 'В наличии' | 'Под заказ (3-5 дней)' | 'Ожидается поступление';

export interface ProductSpecifications {
  brand?: string;
  model?: string;
  type?: string;
  temperature?: string;
  volume?: string;
  length?: string;
  width?: string;
  height?: string;
  shelves?: string;
  bodyMaterial?: string;
  glassMaterial?: string;
  cooling?: 'Динамическое' | 'Статическое' | 'Комбинированное' | string;
  defrost?: string;
  compressor?: string;
  refrigerant?: string;
  power?: string;
  voltage?: string;
  energyConsump?: string;
  weight?: string;
  color?: string;
  warranty?: string;
  country?: string;
}

export interface Product {
  id: string;
  name: string;
  modelCode: string;
  category: ProductCategory;
  price: number | null; // null represents "Цена по запросу"
  currency: string;
  availability: AvailabilityStatus;
  images: string[];
  shortDescription: string;
  fullDescription: string;
  features: string[];
  specifications: ProductSpecifications;
  isPopular?: boolean;
  isNew?: boolean;
}

export interface FilterState {
  searchQuery: string;
  category: ProductCategory | 'Все';
  minPrice: number;
  maxPrice: number;
  availability: string | 'Все';
  coolingType: string | 'Все';
  sortBy: 'popularity' | 'price-asc' | 'price-desc' | 'newest';
}
