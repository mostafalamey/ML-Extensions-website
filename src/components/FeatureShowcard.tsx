import React, { useState } from 'react';
import { Modal } from './Modal';

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
  className = ''
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div 
        className={`feature-showcard clickable ${className}`}
        onClick={handleCardClick}
        style={{ cursor: 'pointer' }}
      >
        <div className="feature-showcard-media">
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
            <span>Click to view {gifUrl ? 'demo' : 'details'}</span>
          </div>
        </div>
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={closeModal}
        title={title}
        className="feature-modal"
      >
        <div className="modal-gif-container">
          {gifUrl ? (
            <img 
              src={gifUrl}
              alt={`${title} demonstration`}
              className="modal-gif"
            />
          ) : (
            <div className="modal-placeholder">
              <div className="modal-placeholder-content">
                <span className="modal-placeholder-text">{placeholderText}</span>
                <p className="modal-placeholder-subtitle">GIF demo coming soon</p>
              </div>
            </div>
          )}
          <p className="modal-description">{description}</p>
        </div>
      </Modal>
    </>
  );
};