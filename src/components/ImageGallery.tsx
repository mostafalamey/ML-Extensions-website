import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from 'framer-motion';
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

interface ImageDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  scrollSpeed = 0.5,
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sourceDimensions, setSourceDimensions] = useState<ImageDimensions | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const scrollIntervalRef = useRef<number | null>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const imageRefs = useRef<{ [key: string]: HTMLImageElement | null }>({});

  // Handle mobile detection and window resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkMobile(); // Initial check
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    
    // Get the clicked image element for animation
    const target = e.currentTarget as HTMLElement;
    const imgElement = target.querySelector('img');
    
    if (imgElement) {
      const rect = imgElement.getBoundingClientRect();
      setSourceDimensions({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      });
    }
    
    setSelectedImage(image);
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    // Delay clearing the selected image to allow exit animation
    setTimeout(() => {
      setSelectedImage(null);
    }, 400);
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

  // Calculate center position for the modal
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

  // Calculate modal size based on device
  const modalWidth = isMobile 
    ? Math.min(window.innerWidth * 0.9, 400)  // Portrait width for mobile
    : Math.min(window.innerWidth * 0.9, 1000); // Desktop width
  const modalHeight = isMobile 
    ? window.innerHeight * 0.7  // Portrait height for mobile
    : Math.min(window.innerHeight * 0.9, 700); // Desktop height

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const imageVariants = {
    hidden: sourceDimensions ? {
      x: sourceDimensions.x - centerX,
      y: sourceDimensions.y - centerY,
      width: sourceDimensions.width,
      height: sourceDimensions.height,
      scale: 1,
    } : { opacity: 0, scale: 0.5 },
    visible: {
      x: 0,
      y: 0,
      width: modalWidth,
      height: modalHeight,
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 120,
        duration: 0.6,
      }
    },
    exit: sourceDimensions ? {
      x: sourceDimensions.x - centerX,
      y: sourceDimensions.y - centerY,
      width: sourceDimensions.width,
      height: sourceDimensions.height,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 120,
        duration: 0.4,
      }
    } : { opacity: 0, scale: 0.5, transition: { duration: 0.3 } }
  };

  const controlsVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { delay: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
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
                ref={(el) => {
                  if (el) imageRefs.current[`${image.id}-${index}`] = el;
                }}
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

      {/* Enhanced Modal with Smooth Animation */}
      <AnimatePresence mode="wait">
        {isModalOpen && selectedImage && sourceDimensions && (
          <motion.div 
            className="image-gallery-modal-enhanced" 
            onClick={handleBackdropClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              className="image-gallery-modal-controls"
              variants={controlsVariants}
              initial="hidden"
              animate="visible" 
              exit="exit"
            >
              <button
                className="image-gallery-modal-close"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <X size={32} />
              </button>
              
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
            </motion.div>

            <div className="image-gallery-modal-container">
              <motion.div
                className="image-gallery-modal-content-enhanced"
                variants={imageVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <img
                  src={selectedImage.url}
                  alt={selectedImage.alt}
                  className="image-gallery-modal-img-enhanced"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
