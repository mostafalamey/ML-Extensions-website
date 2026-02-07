import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { staggerItem } from '../utils/animations';

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
        <motion.a 
          href={href} 
          className="product-card" 
          target="_blank" 
          rel="noopener noreferrer"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerItem}
        >
          {content}
        </motion.a>
      );
    } else {
      const MotionLink = motion(Link);
      return (
        <MotionLink 
          to={href} 
          className="product-card"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerItem}
        >
          {content}
        </MotionLink>
      );
    }
  }

  return (
    <motion.div 
      className="product-card" 
      onClick={onClick} 
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={staggerItem}
    >
      {content}
    </motion.div>
  );
};