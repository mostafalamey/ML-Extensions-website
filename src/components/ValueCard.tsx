import React from 'react';

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
    <div className="value-card">
      <div className="feature-icon" style={{ margin: '0 0 var(--spacing-4) 0' }}>
        {icon}
      </div>
      <h3 className="value-title">{title}</h3>
      <p className="value-description">{description}</p>
    </div>
  );
};