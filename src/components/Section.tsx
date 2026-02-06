import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'alt';
  padding?: 'default' | 'large' | 'small';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  id,
  background = 'default',
  padding = 'default'
}) => {
  const baseClasses = ['section'];
  
  if (background === 'alt') baseClasses.push('section-alt');
  if (padding === 'large') baseClasses.push('section-large');
  if (padding === 'small') baseClasses.push('section-small');
  
  return (
    <section id={id} className={`${baseClasses.join(' ')} ${className}`}>
      {children}
    </section>
  );
};

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  textAlign
}) => {
  const textAlignClass = textAlign ? `text-${textAlign}` : '';
  
  return (
    <div className={`container ${textAlignClass} ${className}`}>
      {children}
    </div>
  );
};