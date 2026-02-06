import React from 'react';
import { Button } from './Button';

interface HeroProps {
  title: string;
  subtitle: string;
  primaryButtonText?: string;
  primaryButtonHref?: string;
  primaryButtonTarget?: string;
  secondaryButtonText?: string;
  secondaryButtonHref?: string;
  secondaryButtonTarget?: string;
  backgroundImage?: string;
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryButtonText = 'Get Started',
  primaryButtonHref = '#',
  primaryButtonTarget,
  secondaryButtonText,
  secondaryButtonHref = '#',
  secondaryButtonTarget,
  backgroundImage,
  className = ''
}) => {
  const sectionStyle = backgroundImage 
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <section 
      className={`hero-section ${className}`} 
      id="home"
      style={sectionStyle}
    >
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <div className="hero-cta">
          <Button href={primaryButtonHref} variant="primary" target={primaryButtonTarget}>
            {primaryButtonText}
          </Button>
          {secondaryButtonText && (
            <Button href={secondaryButtonHref} variant="secondary" target={secondaryButtonTarget}>
              {secondaryButtonText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};