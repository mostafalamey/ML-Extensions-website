import React, { useState } from "react";
import { motion } from "framer-motion";
import { ImageModal } from "./ImageModal";
import { staggerItem } from "../utils/animations";

interface FeatureShowcardProps {
  title: string;
  description: string;
  gifUrl?: string;
  placeholderText?: string;
  className?: string;
}

export const FeatureShowcard: React.FC<FeatureShowcardProps> = ({
  title,
  description,
  gifUrl,
  placeholderText = "Feature Demo",
  className = "",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleImageClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <motion.div
        className={`feature-showcard ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerItem}
      >
        <div
          className="feature-showcard-media"
          onClick={handleImageClick}
          style={{ cursor: "pointer" }}
        >
          {gifUrl ? (
            <img
              src={gifUrl}
              alt={`${title} demonstration`}
              className="feature-gif"
            />
          ) : (
            <div className="feature-placeholder">
              <span className="placeholder-text">{placeholderText}</span>
            </div>
          )}
        </div>
        <div className="feature-showcard-content">
          <h3 className="feature-showcard-title">{title}</h3>
          <p className="feature-showcard-description">{description}</p>
          <div className="feature-click-hint">
            <span>Click image to view {gifUrl ? "demo" : "details"}</span>
          </div>
        </div>
      </motion.div>

      <ImageModal
        isOpen={isModalOpen}
        onClose={closeModal}
        imageUrl={gifUrl}
        alt={`${title} demonstration`}
        title={title}
        description={description}
        placeholderText={placeholderText}
      />
    </>
  );
};
