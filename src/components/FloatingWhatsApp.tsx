import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { STORE_CONFIG, getWhatsAppLink } from '../config';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const defaultMsg = 'Здравствуйте! Хочу уточнить наличие и стоимость холодильного оборудования ESSE.KZ';
  const waUrl = getWhatsAppLink(defaultMsg);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2 group">
      
      {/* Optional Tooltip Card */}
      {showTooltip && (
        <div className="bg-slate-900 text-white p-3.5 rounded-2xl shadow-2xl border border-slate-800 max-w-xs relative animate-bounce-subtle hidden sm:block">
          <button
            onClick={() => setShowTooltip(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-white p-1 rounded-full"
            aria-label="Закрыть"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-xs font-bold text-slate-200">Отдел продаж ESSE.KZ</span>
          </div>
          
          <p className="text-xs text-slate-300">
            Поможем подобрать витрину под ваш магазин или ресторан. Напишите нам!
          </p>
        </div>
      )}

      {/* Floating Action Button */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-4 py-3.5 rounded-full bg-[#25D366] hover:bg-[#20ba5a] text-white shadow-xl shadow-[#25D366]/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
        aria-label="Связаться в WhatsApp"
      >
        <div className="relative">
          <MessageCircle className="w-7 h-7 fill-white stroke-none" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-pulse" />
        </div>

        <span className="font-bold text-sm tracking-wide hidden md:inline-block pr-1">
          WhatsApp
        </span>
      </a>

    </div>
  );
};
