import { useRef, useEffect, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  opacity: number;
  hue: number;
}

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const animationRef = useRef<number>(0);

  // Configuration
  const config = {
    particleCount: 40,
    connectionDistance: 140,
    mouseConnectionDistance: 180,
    particleMinRadius: 1,
    particleMaxRadius: 3,
    particleMinOpacity: 0.15,
    particleMaxOpacity: 0.4,
    lineOpacity: 0.12,
    mouseLineOpacity: 0.25,
    speedFactor: 0.3,
    // Gold hue range (HSL): ~43 to ~51 degrees
    hueMin: 43,
    hueMax: 51,
    saturation: 76, // %
    lightness: 49,  // %
  };

  const createParticle = useCallback((width: number, height: number): Particle => {
    const hue = config.hueMin + Math.random() * (config.hueMax - config.hueMin);
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * config.speedFactor * 2,
      vy: (Math.random() - 0.5) * config.speedFactor * 2,
      radius: config.particleMinRadius + Math.random() * (config.particleMaxRadius - config.particleMinRadius),
      opacity: config.particleMinOpacity + Math.random() * (config.particleMaxOpacity - config.particleMinOpacity),
      hue,
    };
  }, []);

  const initParticles = useCallback((width: number, height: number) => {
    particlesRef.current = [];
    for (let i = 0; i < config.particleCount; i++) {
      particlesRef.current.push(createParticle(width, height));
    }
  }, [createParticle]);

  const updateParticle = useCallback((particle: Particle, width: number, height: number) => {
    particle.x += particle.vx;
    particle.y += particle.vy;

    // Wrap around screen edges
    if (particle.x < 0) particle.x = width;
    if (particle.x > width) particle.x = 0;
    if (particle.y < 0) particle.y = height;
    if (particle.y > height) particle.y = 0;
  }, []);

  const drawParticle = useCallback((ctx: CanvasRenderingContext2D, particle: Particle) => {
    const color = `hsla(${particle.hue}, ${config.saturation}%, ${config.lightness}%, ${particle.opacity})`;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
  }, []);

  const drawConnections = useCallback((ctx: CanvasRenderingContext2D, particles: Particle[]) => {
    const mouse = mouseRef.current;

    for (let i = 0; i < particles.length; i++) {
      const p1 = particles[i];

      // Draw connections between particles
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.connectionDistance) {
          const opacity = (1 - distance / config.connectionDistance) * config.lineOpacity;
          const avgHue = (p1.hue + p2.hue) / 2;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `hsla(${avgHue}, ${config.saturation}%, ${config.lightness}%, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }

      // Draw connections to mouse
      if (mouse.x > 0 && mouse.y > 0) {
        const dx = p1.x - mouse.x;
        const dy = p1.y - mouse.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < config.mouseConnectionDistance) {
          const opacity = (1 - distance / config.mouseConnectionDistance) * config.mouseLineOpacity;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `hsla(${p1.hue}, ${config.saturation}%, ${config.lightness + 10}%, ${opacity})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }
  }, []);

  const animate = useCallback((ctx: CanvasRenderingContext2D, width: number, height: number) => {
    // Skip rendering when tab is not visible
    if (document.hidden) {
      animationRef.current = requestAnimationFrame(() => animate(ctx, width, height));
      return;
    }

    ctx.clearRect(0, 0, width, height);

    const particles = particlesRef.current;

    // Update and draw particles
    for (const particle of particles) {
      updateParticle(particle, width, height);
      drawParticle(ctx, particle);
    }

    // Draw connections
    drawConnections(ctx, particles);

    animationRef.current = requestAnimationFrame(() => animate(ctx, width, height));
  }, [updateParticle, drawParticle, drawConnections]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(dpr, dpr);

      // Reinitialize particles on resize
      initParticles(width, height);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -1000, y: -1000 };
    };

    // Initial setup
    handleResize();

    // Start animation
    animate(ctx, window.innerWidth, window.innerHeight);

    // Event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [animate, initParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        pointerEvents: 'none',
        willChange: 'transform',
      }}
      aria-hidden="true"
    />
  );
};

export { ParticleBackground };
