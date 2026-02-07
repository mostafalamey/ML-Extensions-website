import React from 'react';
import { motion } from 'framer-motion';
import { getAnimationVariant, staggerContainer } from '../utils/animations';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'alt';
  padding?: 'default' | 'large' | 'small';
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'zoom';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  background = 'default',
  padding = 'default',
  animation
}) => {
  const baseClasses = ['section'];
  
  if (background === 'alt') baseClasses.push('section-alt');
  if (padding === 'large') baseClasses.push('section-large');
  if (padding === 'small') baseClasses.push('section-small');
  
  // If no animation, render regular section
  if (!animation) {
    return (
      <section 
        id={id} 
        className={`${baseClasses.join(' ')} ${className}`}
      >
        {children}
      </section>
    );
  }
  
  const variant = getAnimationVariant(animation);
  
  return (
    <motion.section 
      id={id} 
      className={`${baseClasses.join(' ')} ${className}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={variant}
    >
      {children}
    </motion.section>
  );
};

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
  stagger?: boolean; // Enable stagger animation for children
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  textAlign,
  stagger = false
}) => {
  const textAlignClass = textAlign ? `text-${textAlign}` : '';
  
  if (stagger) {
    return (
      <motion.div 
        className={`container ${textAlignClass} ${className}`}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={staggerContainer}
      >
        {children}
      </motion.div>
    );
  }
  
  return (
    <div className={`container ${textAlignClass} ${className}`}>
      {children}
    </div>
  );
};