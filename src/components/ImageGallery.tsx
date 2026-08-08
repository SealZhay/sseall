import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, X, Box, Image as ImageIcon } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  productName: string;
  modelCode: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  productName,
  modelCode,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [imageErrors, setImageErrors] = useState<Record<number, boolean>>({});

  const validImages = images && images.length > 0 ? images : [];

  const handlePrev = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === 0 ? validImages.length - 1 : prev - 1));
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev === validImages.length - 1 ? 0 : prev + 1));
  };

  const currentImg = validImages[selectedIndex];
  const isCurrentFailed = imageErrors[selectedIndex];

  // Image perspectives tags (e.g. 1. Вид спереди, 2. Вид сбоку, 3. Внутреннее пространство, 4. Детали, 5. В интерьере)
  const perspectiveLabels = [
    'Фронтальный вид',
    'Вид в ракурсе',
    'Внутренний объем и подсветка',
    'Панель управления и детали',
    'В интерьере заведения'
  ];

  return (
    <div className="space-y-4">
      
      {/* Main Image View */}
      <div className="relative aspect-[4/3] w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-200 group shadow-md">
        
        {!isCurrentFailed ? (
          <img
            src={currentImg}
            alt={`${productName} - фото ${selectedIndex + 1}`}
            onError={() => setImageErrors((prev) => ({ ...prev, [selectedIndex]: true }))}
            className="w-full h-full object-cover object-center cursor-zoom-in transition-transform duration-300 group-hover:scale-[1.02]"
            onClick={() => setIsFullscreen(true)}
          />
        ) : (
          <div 
            onClick={() => setIsFullscreen(true)}
            className="w-full h-full flex flex-col items-center justify-center p-8 bg-slate-900 text-white cursor-pointer"
          >
            <Box className="w-16 h-16 text-sky-400 mb-3 animate-pulse" />
            <span className="text-sm font-bold tracking-wide font-mono">{modelCode}</span>
            <span className="text-xs text-slate-400 mt-1">
              {perspectiveLabels[selectedIndex] || `Фотография #${selectedIndex + 1}`}
            </span>
          </div>
        )}

        {/* Perspective Label Badge */}
        <div className="absolute top-4 left-4 z-10 pointer-events-none">
          <span className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-900/80 text-white backdrop-blur-md shadow-md flex items-center gap-1.5">
            <ImageIcon className="w-3.5 h-3.5 text-sky-400" />
            {perspectiveLabels[selectedIndex] || `Фото ${selectedIndex + 1}`}
          </span>
        </div>

        {/* Zoom Button */}
        <button
          onClick={() => setIsFullscreen(true)}
          className="absolute top-4 right-4 z-10 p-2.5 rounded-xl bg-slate-900/80 text-white hover:bg-slate-900 backdrop-blur-md shadow-md transition-all opacity-80 hover:opacity-100"
          title="Открыть на весь экран"
        >
          <Maximize2 className="w-4 h-4" />
        </button>

        {/* Prev / Next Arrows */}
        {validImages.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 text-slate-900 hover:bg-white shadow-lg transition-all hover:scale-110 active:scale-95"
              aria-label="Предыдущая фотография"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-2.5 rounded-full bg-white/90 text-slate-900 hover:bg-white shadow-lg transition-all hover:scale-110 active:scale-95"
              aria-label="Следующая фотография"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}

        {/* Counter Badge */}
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900/80 text-slate-200 backdrop-blur-md">
            {selectedIndex + 1} / {validImages.length}
          </span>
        </div>
      </div>

      {/* Thumbnails Row (Horizontally scrollable on mobile) */}
      <div className="flex overflow-x-auto gap-2.5 pb-1 sm:grid sm:grid-cols-5 sm:gap-3">
        {validImages.map((img, idx) => {
          const isSelected = idx === selectedIndex;
          const isFailed = imageErrors[idx];

          return (
            <button
              key={idx}
              onClick={() => setSelectedIndex(idx)}
              className={`relative w-20 sm:w-auto shrink-0 aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all bg-slate-900 ${
                isSelected 
                  ? 'border-sky-500 ring-2 ring-sky-500/30 scale-[1.02] shadow-md' 
                  : 'border-slate-200 opacity-70 hover:opacity-100 hover:border-slate-400'
              }`}
            >
              {!isFailed ? (
                <img
                  src={img}
                  alt={`Миниатюра ${idx + 1}`}
                  onError={() => setImageErrors((prev) => ({ ...prev, [idx]: true }))}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-1 bg-slate-800 text-slate-300">
                  <Box className="w-5 h-5 text-sky-400" />
                  <span className="text-[9px] font-mono mt-0.5">#{idx + 1}</span>
                </div>
              )}

              {/* Selection overlay */}
              {isSelected && (
                <div className="absolute inset-0 bg-sky-500/10 border-2 border-sky-500 rounded-xl" />
              )}
            </button>
          );
        })}
      </div>

      {/* Fullscreen Modal View */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setIsFullscreen(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setIsFullscreen(false)}
            className="absolute top-6 right-6 p-3 rounded-full bg-slate-800/80 text-white hover:bg-slate-700 transition-colors z-50"
            aria-label="Закрыть"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Fullscreen Image Container */}
          <div 
            className="relative max-w-5xl max-h-[85vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {!isCurrentFailed ? (
              <img
                src={currentImg}
                alt={`${productName} - полноэкранное фото ${selectedIndex + 1}`}
                className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
              />
            ) : (
              <div className="flex flex-col items-center justify-center p-12 bg-slate-900 rounded-2xl border border-slate-800 text-white max-w-md text-center">
                <Box className="w-20 h-20 text-sky-400 mb-4" />
                <h4 className="text-lg font-bold">{productName}</h4>
                <p className="text-xs text-slate-400 mt-1">Модель: {modelCode}</p>
                <p className="text-sm text-sky-400 mt-3 font-semibold">
                  {perspectiveLabels[selectedIndex] || `Фотография #${selectedIndex + 1}`}
                </p>
              </div>
            )}

            {/* Navigation controls in lightbox */}
            {validImages.length > 1 && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-sky-600 transition-all shadow-xl"
                  aria-label="Предыдущее"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-slate-900/80 text-white hover:bg-sky-600 transition-all shadow-xl"
                  aria-label="Следующее"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Lightbox Caption */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-slate-900/90 text-white text-xs font-medium border border-slate-800">
              {perspectiveLabels[selectedIndex] || `Фото ${selectedIndex + 1}`} ({selectedIndex + 1} из {validImages.length})
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
