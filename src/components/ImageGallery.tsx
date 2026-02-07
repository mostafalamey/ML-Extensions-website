import React, { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";

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
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollIntervalRef = useRef<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

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

  const handleImageClick = (image: GalleryImage, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleCloseModal();
    }
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
              onClick={(e) => handleImageClick(image, e)}
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
        <div className="image-gallery-modal" onClick={handleBackdropClick}>
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
        </div>
      )}
    </>
  );
};
