/**
 * Animation variants for scroll reveal effects
 * Each variant has an initial hidden state and an animate visible state
 */

// Type for animation variants
type AnimationVariant = {
  hidden: any;
  visible: any;
};

// Fade up: Elements slide up while fading in
export const fadeUp: AnimationVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

// Fade left: Elements slide from left while fading in
export const fadeLeft: AnimationVariant = {
  hidden: { opacity: 0, x: -30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

// Fade right: Elements slide from right while fading in
export const fadeRight: AnimationVariant = {
  hidden: { opacity: 0, x: 30 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

// Scale: Elements grow from smaller size while fading in
export const scale: AnimationVariant = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  }
};

// Zoom: Elements zoom in with slight rotation while fading in
export const zoom: AnimationVariant = {
  hidden: { opacity: 0, scale: 0.8, rotate: -2 },
  visible: { 
    opacity: 1, 
    scale: 1,
    rotate: 0,
    transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }
  }
};

// Container for staggered children animations
export const staggerContainer: AnimationVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3, // 300ms delay between each child
      delayChildren: 0.2 // Wait 200ms before starting children animations
    }
  }
};

// For individual staggered items (cards, features, etc.)
export const staggerItem: AnimationVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  }
};

// Hero-specific animations
export const heroText: AnimationVariant = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
  }
};

export const heroFade: AnimationVariant = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.6, delay: 0.3 }
  }
};

// Map animation names to variants for easy access
export const animationVariants: Record<string, AnimationVariant> = {
  'fade-up': fadeUp,
  'fade-left': fadeLeft,
  'fade-right': fadeRight,
  'scale': scale,
  'zoom': zoom,
};

// Helper function to get animation variant by name
export const getAnimationVariant = (
  animation?: 'fade-up' | 'fade-left' | 'fade-right' | 'scale' | 'zoom'
): AnimationVariant | undefined => {
  return animation ? animationVariants[animation] : fadeUp; // Default to fade-up
};
