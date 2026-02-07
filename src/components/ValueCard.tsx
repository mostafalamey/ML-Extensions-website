import React from 'react';
import { motion } from 'framer-motion';
import { staggerItem } from '../utils/animations';

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description
}) => {
  return (
    <motion.div 
      className="value-card"
      variants={staggerItem}
    >
      <div className="feature-icon" style={{ margin: '0 0 var(--spacing-4) 0' }}>
        {icon}
      </div>
      <h3 className="value-title">{title}</h3>
      <p className="value-description">{description}</p>
    </motion.div>
  );
};