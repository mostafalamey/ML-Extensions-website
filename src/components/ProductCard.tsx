import React from 'react';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  title: string;
  description: string;
  imageSrc?: string;
  imageAlt?: string;
  href?: string;
  onClick?: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  title,
  description,
  imageSrc,
  imageAlt,
  href,
  onClick
}) => {
  const content = (
    <>
      <div className="product-card-image">
        {imageSrc && <img src={imageSrc} alt={imageAlt || title} />}
        <div className="product-card-overlay"></div>
      </div>
      <div className="product-card-content">
        <h3 className="product-card-title">{title}</h3>
        <p className="product-card-description">{description}</p>
        <span className="product-card-cta">View Details</span>
      </div>
    </>
  );

  if (href) {
    if (href.startsWith('http')) {
      return (
        <a href={href} className="product-card" target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    } else {
      return (
        <Link to={href} className="product-card">
          {content}
        </Link>
      );
    }
  }

  return (
    <div className="product-card" onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {content}
    </div>
  );
};