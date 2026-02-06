import React from 'react';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost';
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  target?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  onClick, 
  href, 
  target,
  className = '',
  icon 
}) => {
  const baseClass = `btn btn-${variant} ${className}`;
  const content = (
    <>
      {icon && <span style={{ marginRight: 'var(--spacing-2)' }}>{icon}</span>}
      {children}
    </>
  );

  if (href) {
    return (
      <a 
        href={href} 
        className={baseClass}
        target={target}
        rel={target === '_blank' ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    );
  }

  return (
    <button className={baseClass} onClick={onClick}>
      {content}
    </button>
  );
};