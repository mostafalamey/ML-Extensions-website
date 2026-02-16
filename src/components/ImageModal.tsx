import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl?: string;
  alt?: string;
  title?: string;
  description?: string;
  placeholderText?: string;
}

export const ImageModal: React.FC<ImageModalProps> = ({
  isOpen,
  onClose,
  imageUrl,
  alt = "",
  title,
  description,
  placeholderText,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) {
      onClose();
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { delay: 0.2, duration: 0.2 } },
  };

  const modalVariants = {
    hidden: {
      opacity: 0,
      x: -256,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.36,
        ease: "easeOut" as const,
      },
    },
    exit: {
      opacity: 0,
      x: -256,
      transition: {
        delay: 0.25,
        duration: 0.24,
        ease: "easeIn" as const,
      },
    },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.3, duration: 0.3 },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.2 },
    },
  };

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
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
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="image-modal-media">
                {imageUrl ? (
                  <img src={imageUrl} alt={alt} className="image-modal-img" />
                ) : (
                  <div className="image-modal-placeholder">
                    <span className="image-modal-placeholder-text">
                      {placeholderText}
                    </span>
                    <p className="image-modal-placeholder-subtitle">
                      Demo coming soon
                    </p>
                  </div>
                )}
              </div>

              {(title || description) && (
                <motion.div
                  className="image-modal-info"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                >
                  {title && <h3 className="image-modal-title">{title}</h3>}
                  {description && (
                    <p className="image-modal-description">{description}</p>
                  )}
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
