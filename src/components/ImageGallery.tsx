import React, { useState, useRef, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  scrollSpeed?: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  scrollSpeed = 0.5,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollIntervalRef = useRef<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  // Create a duplicated array for infinite scroll effect
  const duplicatedImages = [...images, ...images, ...images];

  useEffect(() => {
    if (hoveredIndex === null && !selectedImage) {
      // Start scrolling
      scrollIntervalRef.current = window.setInterval(() => {
        setScrollPosition((prev) => {
          const newPosition = prev + scrollSpeed;
          // Reset when we've scrolled through one full set (width per item is 300px)
          if (newPosition >= images.length * 300) {
            return 0;
          }
          return newPosition;
        });
      }, 16); // ~60fps
    } else {
      // Stop scrolling
      if (scrollIntervalRef.current !== null) {
        clearInterval(scrollIntervalRef.current);
        scrollIntervalRef.current = null;
      }
    }

    return () => {
      if (scrollIntervalRef.current !== null) {
        clearInterval(scrollIntervalRef.current);
      }
    };
  }, [hoveredIndex, selectedImage, images.length, scrollSpeed]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!selectedImage) return;
      
      switch (event.key) {
        case 'ArrowLeft':
          event.preventDefault();
          handlePrevImage();
          break;
        case 'ArrowRight':
          event.preventDefault();
          handleNextImage();
          break;
        case 'Escape':
          event.preventDefault();
          handleCloseModal();
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [selectedImage, selectedImageIndex]);

  const handleImageClick = (image: GalleryImage, e: React.MouseEvent, imageIndex?: number) => {
    e.stopPropagation();
    const index = imageIndex ?? images.findIndex(img => img.id === image.id);
    setSelectedImage(image);
    setSelectedImageIndex(index);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handlePrevImage = () => {
    const prevIndex = selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;
    setSelectedImageIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const handleNextImage = () => {
    const nextIndex = selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
    setSelectedImageIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
  };

  // Touch handlers for mobile swipe navigation
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touch = e.changedTouches[0];
    const deltaX = touch.clientX - touchStartRef.current.x;
    const deltaY = touch.clientY - touchStartRef.current.y;

    // Only trigger swipe if horizontal movement is significantly larger than vertical
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      if (deltaX > 0) {
        // Swipe right - go to previous image
        handlePrevImage();
      } else {
        // Swipe left - go to next image
        handleNextImage();
      }
    }

    touchStartRef.current = null;
  };

  return (
    <>
      <div className="image-gallery" ref={galleryRef}>
        {/* Dynamic transform - inline style required for calculated scroll position */}
        <div
          className="image-gallery-track"
          style={{ transform: `translateX(-${scrollPosition}px)` }}
        >
          {duplicatedImages.map((image, index) => (
            <div
              key={`${image.id}-${index}`}
              className="image-gallery-item"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={(e) => handleImageClick(image, e, index % images.length)}
            >
              <img
                src={image.url}
                alt={image.alt}
                className="image-gallery-img"
              />
              <div
                className={`image-gallery-overlay ${hoveredIndex === index ? "hovered" : ""}`}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for enlarged image */}
      {selectedImage && (
        <div 
          className="image-gallery-modal" 
          onClick={handleBackdropClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            className="image-gallery-modal-close"
            onClick={handleCloseModal}
            aria-label="Close"
          >
            <X size={32} />
          </button>
          <div className="image-gallery-modal-content">
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="image-gallery-modal-img"
            />
          </div>
          
          {/* Navigation arrows */}
          <button
            className="image-gallery-modal-nav image-gallery-modal-nav-prev"
            onClick={handlePrevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>
          
          <button
            className="image-gallery-modal-nav image-gallery-modal-nav-next"
            onClick={handleNextImage}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image counter */}
          <div className="image-gallery-modal-counter">
            {selectedImageIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
};
