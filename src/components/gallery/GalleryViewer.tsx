import { useState, useEffect, useCallback } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { GalleryImageItem } from '@/data/mockData';
import { cn } from '@/lib/utils';

interface GalleryViewerProps {
  images: GalleryImageItem[];
  title: string;
  initialIndex?: number;
  onClose: () => void;
}

const GalleryViewer = ({ images, title, initialIndex = 0, onClose }: GalleryViewerProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, goToPrevious, goToNext]);

  // Touch handlers for swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) goToNext();
    if (isRightSwipe) goToPrevious();
  };

  const currentImage = images[currentIndex];

  return (
    <div 
      className="fixed inset-0 z-50 bg-foreground/95 flex flex-col animate-fade-in"
      onClick={onClose}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-background/10 backdrop-blur-sm">
        <div className="text-primary-foreground">
          <h2 className="font-heading text-lg font-semibold">{title}</h2>
          <p className="text-sm opacity-80">
            {currentIndex + 1} of {images.length}
          </p>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-card/20 backdrop-blur-sm flex items-center justify-center hover:bg-card/40 transition-colors"
        >
          <X className="w-5 h-5 text-primary-foreground" />
        </button>
      </div>

      {/* Main Image Area */}
      <div 
        className="flex-1 flex items-center justify-center p-4 relative"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* Previous Button - Desktop */}
        <button
          onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
          className="hidden md:flex absolute left-4 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm items-center justify-center hover:bg-card/40 transition-colors z-10"
        >
          <ChevronLeft className="w-6 h-6 text-primary-foreground" />
        </button>

        {/* Image */}
        <img
          src={currentImage.url}
          alt={currentImage.alt}
          className="max-w-full max-h-[70vh] rounded-lg shadow-2xl object-contain animate-scale-in"
          key={currentImage.id}
        />

        {/* Next Button - Desktop */}
        <button
          onClick={(e) => { e.stopPropagation(); goToNext(); }}
          className="hidden md:flex absolute right-4 w-12 h-12 rounded-full bg-card/20 backdrop-blur-sm items-center justify-center hover:bg-card/40 transition-colors z-10"
        >
          <ChevronRight className="w-6 h-6 text-primary-foreground" />
        </button>
      </div>

      {/* Image Caption */}
      <div className="text-center pb-2 text-primary-foreground/80 text-sm">
        {currentImage.alt}
      </div>

      {/* Thumbnail Navigation */}
      <div className="p-4 bg-background/10 backdrop-blur-sm">
        <div className="flex gap-2 justify-center overflow-x-auto pb-2 max-w-full">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
              className={cn(
                'w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-all',
                index === currentIndex 
                  ? 'border-primary scale-110' 
                  : 'border-transparent opacity-60 hover:opacity-100'
              )}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Swipe Indicator */}
      <p className="md:hidden text-center pb-4 text-primary-foreground/60 text-xs">
        Swipe left or right to navigate
      </p>
    </div>
  );
};

export default GalleryViewer;
