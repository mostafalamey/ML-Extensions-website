import React, { useState, useEffect } from "react";
import { Button } from "./Button";

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
  backgroundImages?: string[]; // Array of images for carousel
  carouselInterval?: number; // Interval in ms (default: 5000)
  className?: string;
}

export const Hero: React.FC<HeroProps> = ({
  title,
  subtitle,
  primaryButtonText = "Get Started",
  primaryButtonHref = "#",
  primaryButtonTarget,
  secondaryButtonText,
  secondaryButtonHref = "#",
  secondaryButtonTarget,
  backgroundImage,
  backgroundImages,
  carouselInterval = 5000,
  className = "",
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Use carousel if backgroundImages is provided, otherwise use single backgroundImage
  const images = backgroundImages || (backgroundImage ? [backgroundImage] : []);
  const isCarousel = images.length > 1;

  useEffect(() => {
    if (!isCarousel) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, carouselInterval);

    return () => clearInterval(interval);
  }, [isCarousel, images.length, carouselInterval]);

  const handleDotClick = (index: number) => {
    setCurrentImageIndex(index);
  };

  return (
    <section className={`hero-section ${className}`} id="home">
      {/* Background images with crossfade transition */}
      {images.map((image, index) => (
        <div
          key={index}
          className={`hero-background ${index === currentImageIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${image})` }}
        />
      ))}

      <div className="hero-overlay"></div>

      <div className="hero-content">
        <h1 className="hero-title">{title}</h1>
        <p className="hero-subtitle">{subtitle}</p>
        <div className="hero-cta">
          <Button
            href={primaryButtonHref}
            variant="primary"
            target={primaryButtonTarget}
          >
            {primaryButtonText}
          </Button>
          {secondaryButtonText && (
            <Button
              href={secondaryButtonHref}
              variant="secondary"
              target={secondaryButtonTarget}
            >
              {secondaryButtonText}
            </Button>
          )}
        </div>

        {/* Carousel dots indicator */}
        {isCarousel && (
          <div className="hero-carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`hero-carousel-dot ${index === currentImageIndex ? "active" : ""}`}
                onClick={() => handleDotClick(index)}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
