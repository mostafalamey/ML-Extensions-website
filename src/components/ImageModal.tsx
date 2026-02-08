import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  alt?: string;
  title?: string;
  description?: string;
  placeholderText?: string;
  sourceElement?: HTMLElement | null;
}

interface ImageDimensions {
  x: number;
  y: number;
  width: number;
  height: number;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  alt = '',
  title,
  description,
  placeholderText,
  sourceElement,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [sourceDimensions, setSourceDimensions] = useState<ImageDimensions | null>(null);
  const [isAnimationReady, setIsAnimationReady] = useState(false);

  // Capture dimensions immediately when modal should open
  useEffect(() => {
    if (isOpen && sourceElement) {
      const rect = sourceElement.getBoundingClientRect();
      setSourceDimensions({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      });
      // Small delay to ensure dimensions are set before animation starts
      setTimeout(() => setIsAnimationReady(true), 16);
    } else if (!isOpen) {
      setIsAnimationReady(false);
    }
  }, [isOpen, sourceElement]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  // Calculate center position for the modal
  const centerX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const centerY = typeof window !== 'undefined' ? window.innerHeight / 2 : 0;

  // Calculate maximum modal size (80% of viewport)
  const maxModalWidth = typeof window !== 'undefined' ? window.innerWidth * 0.8 : 800;
  const maxModalHeight = typeof window !== 'undefined' ? window.innerHeight * 0.8 : 600;

  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const imageVariants = {
    hidden: {
      x: sourceDimensions ? sourceDimensions.x - centerX : 0,
      y: sourceDimensions ? sourceDimensions.y - centerY : 0,
      width: sourceDimensions ? sourceDimensions.width : 300,
      height: sourceDimensions ? sourceDimensions.height : 200,
      scale: 1,
    },
    visible: {
      x: 0,
      y: 0,
      width: Math.min(maxModalWidth, 800),
      height: Math.min(maxModalHeight, 600),
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 120,
        duration: 0.6,
      }
    },
    exit: {
      x: sourceDimensions ? sourceDimensions.x - centerX : 0,
      y: sourceDimensions ? sourceDimensions.y - centerY : 0,
      width: sourceDimensions ? sourceDimensions.width : 300,
      height: sourceDimensions ? sourceDimensions.height : 200,
      scale: 1,
      transition: {
        type: "spring" as const,
        damping: 25,
        stiffness: 120,
        duration: 0.4,
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { delay: 0.3, duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && isAnimationReady && sourceDimensions && (
        <motion.div
          ref={modalRef}
          className="image-modal-backdrop"
          onClick={handleBackdropClick}
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          transition={{ duration: 0.3 }}
        >
          <div className="image-modal-container">
            <motion.div
              className="image-modal-content"
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {imageUrl ? (
                <img 
                  src={imageUrl} 
                  alt={alt}
                  className="image-modal-img"
                />
              ) : (
                <div className="image-modal-placeholder">
                  <span className="image-modal-placeholder-text">{placeholderText}</span>
                  <p className="image-modal-placeholder-subtitle">Demo coming soon</p>
                </div>
              )}
            </motion.div>
            
            {(title || description) && (
              <motion.div
                className="image-modal-info"
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {title && <h3 className="image-modal-title">{title}</h3>}
                {description && <p className="image-modal-description">{description}</p>}
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};