import React from 'react';
import { getProductById, formatPrice, PRODUCTS } from '../data/products';
import { ImageGallery } from '../components/ImageGallery';
import { StickyMobileCTA } from '../components/StickyMobileCTA';
import { ProductCard } from '../components/ProductCard';
import { getProductWhatsAppLink, STORE_CONFIG } from '../config';
import { 
  CheckCircle2, 
  MessageCircle, 
  Phone, 
  ChevronRight, 
  ShieldCheck, 
  Truck, 
  Wrench, 
  Sparkles,
  ArrowLeft,
  AlertCircle
} from 'lucide-react';

interface ProductDetailPageProps {
  productId: string;
  onNavigate: (path: string) => void;
  onSelectProduct: (productId: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  productId,
  onNavigate,
  onSelectProduct,
}) => {
  const product = getProductById(productId);

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">Товар не найден</h1>
        <p className="text-slate-500 text-sm">
          Запрошенное холодильное оборудование не найдено или было перемещено.
        </p>
        <button
          onClick={() => onNavigate('/catalog')}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Вернуться в каталог</span>
        </button>
      </div>
    );
  }

  const formattedPrice = formatPrice(product.price);
  const whatsappUrl = getProductWhatsAppLink(product.name, product.modelCode, formattedPrice);

  // Specifications key-value mapping
  const specLabels: Record<string, string> = {
    brand: 'Бренд',
    model: 'Модель',
    type: 'Тип оборудования',
    temperature: 'Температурный режим',
    volume: 'Объём',
    length: 'Длина',
    width: 'Ширина',
    height: 'Высота',
    shelves: 'Количество полок',
    bodyMaterial: 'Материал корпуса',
    glassMaterial: 'Материал стекла',
    cooling: 'Тип охлаждения',
    defrost: 'Тип разморозки',
    compressor: 'Компрессор',
    refrigerant: 'Хладагент',
    power: 'Мощность',
    voltage: 'Напряжение',
    energyConsump: 'Энергопотребление',
    weight: 'Вес',
    color: 'Цвет',
    warranty: 'Гарантия',
    country: 'Страна производства',
  };

  const activeSpecs = Object.entries(product.specifications).filter(
    ([_, val]) => val !== undefined && val !== ''
  );

  // Related products from same category
  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 3);

  return (
    <div className="space-y-12 pb-20">
      
      {/* Sticky Mobile CTA */}
      <StickyMobileCTA product={product} />

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-xs text-slate-500 mb-6 flex-wrap">
          <button onClick={() => onNavigate('/')} className="hover:text-slate-900">Главная</button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <button onClick={() => onNavigate('/catalog')} className="hover:text-slate-900">Каталог</button>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-400">{product.category}</span>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* Top Product Hero Block: Left Gallery & Right Product Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200 shadow-sm">
          
          {/* Left: Product Images Gallery */}
          <div className="lg:col-span-7">
            <ImageGallery
              images={product.images}
              productName={product.name}
              modelCode={product.modelCode}
            />
          </div>

          {/* Right: Product Details & WhatsApp Conversion */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            
            <div className="space-y-4">
              
              {/* Category & Availability */}
              <div className="flex items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-lg text-xs font-bold bg-slate-100 text-slate-700">
                  {product.category}
                </span>

                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
                  product.availability === 'В наличии'
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {product.availability}
                </span>
              </div>

              {/* Title & SKU */}
              <div>
                <h1 className="text-2xl sm:text-3xl font-black text-slate-900 leading-tight">
                  {product.name}
                </h1>
                <div className="text-xs text-slate-400 mt-1 font-mono">
                  Артикул / Модель: <span className="font-bold text-slate-700">{product.modelCode}</span>
                </div>
              </div>

              {/* PRICE Display */}
              <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200/80">
                <div className="text-xs text-slate-500 font-medium mb-1">Стоимость оборудования:</div>
                <div className="text-3xl font-black text-slate-900 font-mono tracking-tight text-sky-900">
                  {formattedPrice}
                </div>
              </div>

              {/* Short Description */}
              <p className="text-slate-600 text-sm leading-relaxed">
                {product.shortDescription}
              </p>

              {/* Primary WhatsApp Action */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-black text-base flex items-center justify-center gap-3 transition-all shadow-lg shadow-[#25D366]/20 hover:scale-[1.01] active:scale-[0.99]"
                >
                  <MessageCircle className="w-6 h-6 fill-white stroke-none shrink-0" />
                  <span>Написать в WhatsApp</span>
                </a>

                <a
                  href={`tel:${STORE_CONFIG.phonePrimary.replace(/[^0-9+]/g, '')}`}
                  className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-sky-600" />
                  <span>Позвонить отделу продаж ({STORE_CONFIG.phonePrimary})</span>
                </a>
              </div>

            </div>

            {/* Quick Benefits Checklist */}
            <div className="pt-6 border-t border-slate-100 space-y-3 text-xs text-slate-600">
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Официальная гарантия завода-изготовителя 12 месяцев</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Truck className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Доставка по г. Алматы, Астана и во все регионы РК</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Wrench className="w-4 h-4 text-sky-600 shrink-0" />
                <span>Консультация по установке и пусконаладке оборудования</span>
              </div>
            </div>

          </div>

        </div>

        {/* Detailed Sections: Specifications & Features */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-12">
          
          {/* Specifications Table (Left 8 cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 pb-3 border-b border-slate-100">
                Технические характеристики
              </h2>

              <div className="grid grid-cols-1 divide-y divide-slate-100 text-sm">
                {activeSpecs.map(([key, val]) => (
                  <div key={key} className="py-3.5 grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <span className="text-slate-500 font-medium">
                      {specLabels[key] || key}
                    </span>
                    <span className="text-slate-900 font-semibold font-mono sm:text-right">
                      {val}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Full Description & Features */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h2 className="text-xl font-bold text-slate-900 pb-3 border-b border-slate-100">
                Описание и преимущества модели
              </h2>

              <p className="text-slate-700 text-sm leading-relaxed">
                {product.fullDescription}
              </p>

              {product.features && product.features.length > 0 && (
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                    Ключевые особенности:
                  </h3>
                  <ul className="space-y-2">
                    {product.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-sm text-slate-700">
                        <Sparkles className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

          </div>

          {/* Right Column Sidebar: Direct Contact Card & Guarantees */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-slate-900 text-white p-6 rounded-3xl border border-slate-800 space-y-4">
              <h3 className="text-lg font-bold text-white">
                Заказать витрину {product.modelCode}
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Свяжитесь с отделом продаж прямо сейчас. Мы зафиксируем цену, уточним сроки доставки и подготовим счет или коммерческое предложение.
              </p>

              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md"
              >
                <MessageCircle className="w-5 h-5 fill-white stroke-none" />
                <span>Запросить в WhatsApp</span>
              </a>
            </div>

            <div className="bg-slate-50 p-6 rounded-3xl border border-slate-200 space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-slate-900 text-sm">Гарантийное обслуживание</h4>
              <p className="leading-relaxed">
                Все оборудование ESSE.KZ поставляется с официальным гарантийным талоном. При возникновении вопросов наш сервисный отдел всегда на связи.
              </p>
            </div>

          </div>

        </div>

        {/* Related Products Grid */}
        {relatedProducts.length > 0 && (
          <div className="mt-16 space-y-6">
            <h2 className="text-2xl font-black text-slate-900">Похожие модели оборудования</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
              {relatedProducts.map((rel) => (
                <ProductCard
                  key={rel.id}
                  product={rel}
                  onSelect={onSelectProduct}
                />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
