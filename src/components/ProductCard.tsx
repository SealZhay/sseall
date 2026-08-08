import React, { useState } from 'react';
import { MessageCircle, ArrowRight, Thermometer, Maximize2, Box, CheckCircle2 } from 'lucide-react';
import { Product } from '../types/product';
import { formatPrice } from '../data/products';
import { getProductWhatsAppLink } from '../config';

interface ProductCardProps {
  product: Product;
  onSelect: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const [imageError, setImageError] = useState(false);
  const formattedPrice = formatPrice(product.price);
  const mainImage = product.images[0];

  const whatsappUrl = getProductWhatsAppLink(product.name, product.modelCode, formattedPrice);

  return (
    <div className="group bg-white rounded-2xl border border-slate-200 hover:border-sky-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden h-full min-w-0">
      
      {/* Product Image Container */}
      <div 
        onClick={() => onSelect(product.id)}
        className="relative aspect-[4/3] bg-slate-50 overflow-hidden cursor-pointer"
      >
        {!imageError ? (
          <img
            src={mainImage}
            alt={product.name}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center p-4 text-slate-400 bg-slate-800 text-white">
            <Box className="w-8 h-8 sm:w-12 sm:h-12 mb-1 text-sky-400 opacity-80" />
            <span className="text-[10px] sm:text-xs font-mono text-center font-bold">{product.modelCode}</span>
          </div>
        )}

        {/* Availability Badge */}
        <div className="absolute top-2 left-2 z-10">
          <span className={`inline-flex items-center gap-1 px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-[10px] sm:text-xs font-semibold backdrop-blur-md shadow-sm ${
            product.availability === 'В наличии'
              ? 'bg-emerald-500/90 text-white'
              : 'bg-amber-500/90 text-white'
          }`}>
            <CheckCircle2 className="w-3 h-3 shrink-0" />
            <span className="truncate">{product.availability}</span>
          </span>
        </div>

        {/* Category Tag */}
        <div className="absolute bottom-2 left-2 z-10 hidden xs:block">
          <span className="px-2 py-0.5 rounded-md text-[10px] sm:text-[11px] font-medium bg-slate-900/80 text-slate-200 backdrop-blur-md truncate max-w-[120px] block">
            {product.category}
          </span>
        </div>
      </div>

      {/* Card Content Body */}
      <div className="p-3 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Product Name */}
          <h3 
            onClick={() => onSelect(product.id)}
            className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors line-clamp-2 cursor-pointer mb-1.5 leading-snug min-h-[32px] sm:min-h-[44px]"
          >
            {product.name}
          </h3>

          {/* Key Specs Row */}
          <div className="grid grid-cols-3 gap-1 sm:gap-2 my-2 pt-2 border-t border-slate-100">
            {product.specifications.temperature && (
              <div className="flex flex-col items-start bg-slate-50 p-1 sm:p-2 rounded-lg border border-slate-100">
                <span className="text-[9px] sm:text-xs text-slate-400 flex items-center gap-0.5 truncate w-full">
                  <Thermometer className="w-3 h-3 text-sky-500 shrink-0" />
                  Темп.
                </span>
                <span className="font-semibold text-slate-900 text-[10px] sm:text-xs mt-0.5 truncate w-full">{product.specifications.temperature}</span>
              </div>
            )}

            {product.specifications.length && (
              <div className="flex flex-col items-start bg-slate-50 p-1 sm:p-2 rounded-lg border border-slate-100">
                <span className="text-[9px] sm:text-xs text-slate-400 flex items-center gap-0.5 truncate w-full">
                  <Maximize2 className="w-3 h-3 text-sky-500 shrink-0" />
                  Длина
                </span>
                <span className="font-semibold text-slate-900 text-[10px] sm:text-xs mt-0.5 truncate w-full">{product.specifications.length}</span>
              </div>
            )}

            {product.specifications.volume && (
              <div className="flex flex-col items-start bg-slate-50 p-1 sm:p-2 rounded-lg border border-slate-100">
                <span className="text-[9px] sm:text-xs text-slate-400 flex items-center gap-0.5 truncate w-full">
                  <Box className="w-3 h-3 text-sky-500 shrink-0" />
                  Объём
                </span>
                <span className="font-semibold text-slate-900 text-[10px] sm:text-xs mt-0.5 truncate w-full">{product.specifications.volume}</span>
              </div>
            )}
          </div>
        </div>

        {/* Footer Price & Buttons */}
        <div className="pt-2 border-t border-slate-100 mt-auto">
          <div className="flex items-baseline justify-between mb-2">
            <span className="text-[10px] sm:text-xs text-slate-400 font-medium hidden xs:inline">Цена:</span>
            <span className="text-sm sm:text-xl font-black text-slate-900 tracking-tight font-mono w-full text-right xs:w-auto">
              {formattedPrice}
            </span>
          </div>

          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            <button
              onClick={() => onSelect(product.id)}
              className="col-span-3 py-2 px-1.5 sm:py-2.5 sm:px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-[10px] sm:text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
            >
              <span className="truncate">Подробнее</span>
              <ArrowRight className="w-3 h-3 shrink-0" />
            </button>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="col-span-2 py-2 px-1 sm:py-2.5 sm:px-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-[10px] sm:text-xs flex items-center justify-center gap-1 transition-colors shadow-sm"
              title="Написать в WhatsApp"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white stroke-none shrink-0" />
              <span>WA</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
