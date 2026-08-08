import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Product } from '../types/product';
import { formatPrice } from '../data/products';
import { getProductWhatsAppLink } from '../config';

interface StickyMobileCTAProps {
  product: Product;
}

export const StickyMobileCTA: React.FC<StickyMobileCTAProps> = ({ product }) => {
  const formattedPrice = formatPrice(product.price);
  const waUrl = getProductWhatsAppLink(product.name, product.modelCode, formattedPrice);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-4 py-3 sm:hidden shadow-2xl">
      <div className="flex items-center justify-between gap-3 min-h-[52px]">
        
        {/* Price & Name */}
        <div className="min-w-0 flex-1">
          <div className="text-xs text-slate-400 truncate">{product.name}</div>
          <div className="text-lg font-black text-white font-mono leading-tight">{formattedPrice}</div>
        </div>

        {/* Action Button */}
        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="shrink-0 min-h-[48px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-sm shadow-lg shadow-[#25D366]/20 active:scale-95 transition-all"
        >
          <MessageCircle className="w-5 h-5 fill-white stroke-none" />
          <span>WhatsApp</span>
        </a>

      </div>
    </div>
  );
};
