import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

export interface LightboxImage {
  src: string;
  title: string;
  caption: string;
}

interface LightboxModalProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onIndexChange: (newIndex: number) => void;
}

export const LightboxModal: React.FC<LightboxModalProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onIndexChange
}) => {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        onIndexChange((currentIndex - 1 + images.length) % images.length);
      }
      if (e.key === 'ArrowRight') {
        onIndexChange((currentIndex + 1) % images.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length, onClose, onIndexChange]);

  if (!isOpen || images.length === 0) return null;

  const current = images[currentIndex];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col items-center justify-between p-4 sm:p-6"
    >
      {/* Top bar */}
      <div className="w-full flex items-center justify-between text-white/80 pb-2">
        <span className="text-sm font-medium tracking-wide tabular-nums">
          {currentIndex + 1} / {images.length}
        </span>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
          aria-label="Close image lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image View */}
      <div className="relative flex-1 flex items-center justify-center max-w-5xl w-full my-auto overflow-hidden">
        <button
          type="button"
          onClick={() => onIndexChange((currentIndex - 1 + images.length) % images.length)}
          className="absolute left-2 sm:left-4 z-10 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <img
          src={current.src}
          alt={current.title}
          referrerPolicy="no-referrer"
          className="max-h-[75vh] max-w-full object-contain rounded-lg shadow-2xl transition-all duration-200"
        />

        <button
          type="button"
          onClick={() => onIndexChange((currentIndex + 1) % images.length)}
          className="absolute right-2 sm:right-4 z-10 p-3 bg-black/40 hover:bg-black/70 text-white rounded-full transition-colors cursor-pointer"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Caption bar */}
      <div className="text-center pt-3 pb-2 max-w-xl text-white">
        <h4 className="text-base font-semibold">{current.title}</h4>
        <p className="text-xs text-stone-300 mt-1">{current.caption}</p>
      </div>
    </div>
  );
};
