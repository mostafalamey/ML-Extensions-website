import React from 'react';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  width?: number | string;
  height?: number | string;
  loading?: 'lazy' | 'eager';
  style?: React.CSSProperties;
  onClick?: () => void;
  onLoad?: () => void;
  onError?: () => void;
}

/**
 * SmartImage component that automatically uses WebP format with JPEG fallback
 * and includes lazy loading support
 */
export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  alt,
  className,
  width,
  height,
  loading = 'lazy',
  style,
  onClick,
  onLoad,
  onError,
}) => {
  // Convert file extension to webp for the primary source
  const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

  return (
    <picture className={className} style={style} onClick={onClick}>
      {/* WebP source for modern browsers */}
      <source srcSet={webpSrc} type="image/webp" />
      
      {/* Fallback for older browsers */}
      <img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={loading}
        style={style}
        onLoad={onLoad}
        onError={onError}
        className={className}
      />
    </picture>
  );
};

// Hook for programmatic WebP support detection
export const useWebPSupport = () => {
  const [supportsWebP, setSupportsWebP] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
      const dataURL = canvas.toDataURL('image/webp');
      setSupportsWebP(dataURL.indexOf('data:image/webp') === 0);
    } else {
      setSupportsWebP(false);
    }
  }, []);

  return supportsWebP;
};

// Utility function to get the appropriate image source
export const getOptimizedImageSrc = (originalSrc: string, forceFormat?: 'webp' | 'original') => {
  if (forceFormat === 'original') return originalSrc;
  if (forceFormat === 'webp' || typeof window !== 'undefined') {
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  }
  return originalSrc;
};