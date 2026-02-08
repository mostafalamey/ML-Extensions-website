import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

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
  const [isPopupOpen, setIsPopupOpen] = useState(false);
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
          const itemWidth = 350; // Item width from CSS
          // Reset when we've scrolled through one full set
          if (newPosition >= images.length * itemWidth) {
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
        case "ArrowLeft":
          event.preventDefault();
          handlePrevImage();
          break;
        case "ArrowRight":
          event.preventDefault();
          handleNextImage();
          break;
        case "Escape":
          event.preventDefault();
          handleClosePopup();
          break;
      }
    };

    if (selectedImage) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [selectedImage, selectedImageIndex]);

  const handleImageClick = (
    image: GalleryImage,
    e: React.MouseEvent,
    imageIndex?: number,
  ) => {
    e.stopPropagation();
    const index = imageIndex ?? images.findIndex((img) => img.id === image.id);
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedImage(null);
  };

  const handlePrevImage = () => {
    const prevIndex =
      selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1;
    setSelectedImageIndex(prevIndex);
    setSelectedImage(images[prevIndex]);
  };

  const handleNextImage = () => {
    const nextIndex =
      selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0;
    setSelectedImageIndex(nextIndex);
    setSelectedImage(images[nextIndex]);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClosePopup();
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

      {/* Image Popup */}
      {isPopupOpen && selectedImage && (
        <div
          className="image-gallery-popup"
          onClick={handleBackdropClick}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close button */}
          <button
            className="image-gallery-popup-close"
            onClick={handleClosePopup}
            aria-label="Close"
          >
            <X size={24} />
          </button>

          {/* Navigation arrows */}
          <button
            className="image-gallery-popup-nav image-gallery-popup-nav-prev"
            onClick={handlePrevImage}
            aria-label="Previous image"
          >
            <ChevronLeft size={28} />
          </button>

          <button
            className="image-gallery-popup-nav image-gallery-popup-nav-next"
            onClick={handleNextImage}
            aria-label="Next image"
          >
            <ChevronRight size={28} />
          </button>

          {/* Image counter */}
          <div className="image-gallery-popup-counter">
            {selectedImageIndex + 1} / {images.length}
          </div>

          {/* Image container */}
          <div className="image-gallery-popup-content">
            <img
              src={selectedImage.url}
              alt={selectedImage.alt}
              className="image-gallery-popup-img"
            />
          </div>
        </div>
      )}
    </>
  );
};
