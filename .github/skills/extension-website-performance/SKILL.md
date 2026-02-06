---
name: extension-website-performance
description: Optimizes website performance for extension showcase sites with image compression, lazy loading, SEO, and Core Web Vitals improvement. Use when optimizing site speed and search rankings.
---

# Extension Website Performance Optimizer

Optimize your ML Extensions website for maximum speed, SEO, and user experience.

## Core Web Vitals Optimization

### Largest Contentful Paint (LCP)
```jsx
// Optimize hero images with priority loading
const HeroImage = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    className="w-full h-auto"
    loading="eager"
    fetchPriority="high"
    width={1200}
    height={600}
  />
);

// Preload critical resources
export const preloadCriticalResources = () => {
  const criticalResources = [
    '/hero-image.webp',
    '/fonts/inter-var.woff2'
  ];

  criticalResources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource;
    link.as = resource.includes('.woff') ? 'font' : 'image';
    link.type = resource.includes('.woff') ? 'font/woff2' : '';
    link.crossOrigin = resource.includes('.woff') ? 'anonymous' : '';
    document.head.appendChild(link);
  });
};
```

### First Input Delay (FID)
```jsx
import { Suspense, lazy } from 'react';

// Code splitting for non-critical components
const LazyGallery = lazy(() => import('./Gallery'));
const LazyTestimonials = lazy(() => import('./Testimonials'));

const OptimizedPage = () => (
  <div>
    {/* Critical above-fold content loads immediately */}
    <HeroSection />
    <KeyFeatures />
    
    {/* Non-critical content loads later */}
    <Suspense fallback={<div>Loading gallery...</div>}>
      <LazyGallery />
    </Suspense>
    
    <Suspense fallback={<div>Loading testimonials...</div>}>
      <LazyTestimonials />
    </Suspense>
  </div>
);
```

### Cumulative Layout Shift (CLS)
```jsx
// Prevent layout shift with defined dimensions
const ImageWithPlaceholder = ({ src, alt, width, height }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div 
      className="relative bg-gray-200"
      style={{ width, height, aspectRatio: `${width}/${height}` }}
    >
      <img
        src={src}
        alt={alt}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
        onLoad={() => setLoaded(true)}
        width={width}
        height={height}
      />
      {!loaded && (
        <div className="absolute inset-0 animate-pulse bg-gray-300" />
      )}
    </div>
  );
};
```

## Image Optimization

### Modern Image Formats
```jsx
const OptimizedImage = ({ src, alt, width, height, className }) => (
  <picture>
    <source srcSet={`${src}.avif`} type="image/avif" />
    <source srcSet={`${src}.webp`} type="image/webp" />
    <img
      src={`${src}.jpg`}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading="lazy"
    />
  </picture>
);
```

### Responsive Images
```jsx
const ResponsiveScreenshot = ({ extension }) => (
  <picture>
    <source
      media="(min-width: 1024px)"
      srcSet={`${extension.screenshot}-lg.webp 1200w, ${extension.screenshot}-xl.webp 1600w`}
    />
    <source
      media="(min-width: 768px)"
      srcSet={`${extension.screenshot}-md.webp 800w`}
    />
    <img
      src={`${extension.screenshot}-sm.webp`}
      alt={`${extension.name} screenshot`}
      className="w-full h-auto rounded-lg shadow-lg"
      fetchPriority="low"
      loading="lazy"
    />
  </picture>
);
```

### Image Lazy Loading with Intersection Observer
```jsx
import { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt, className }) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={imgRef} className={className}>
      {inView && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setLoaded(true)}
          className={`transition-opacity ${loaded ? 'opacity-100' : 'opacity-0'}`}
        />
      )}
    </div>
  );
};
```

## SEO Optimization

### Meta Tags for Extension Pages
```jsx
import Head from 'next/head';

const ExtensionSEO = ({ extension }) => (
  <Head>
    <title>{extension.name} - Professional SketchUp Extension | ML Extensions</title>
    <meta 
      name="description" 
      content={`${extension.name}: ${extension.description}. Save hours on SketchUp modeling with our professional extension. Instant download, 30-day guarantee.`} 
    />
    
    {/* Open Graph */}
    <meta property="og:title" content={`${extension.name} - SketchUp Extension`} />
    <meta property="og:description" content={extension.description} />
    <meta property="og:image" content={extension.ogImage} />
    <meta property="og:type" content="product" />
    
    {/* Product Schema */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": extension.name,
          "description": extension.description,
          "image": extension.screenshot,
          "offers": {
            "@type": "Offer",
            "price": extension.price,
            "priceCurrency": "USD",
            "availability": "https://schema.org/InStock",
            "url": `https://mlextensions.com/extensions/${extension.slug}`
          },
          "brand": {
            "@type": "Brand",
            "name": "ML Extensions"
          },
          "category": "SketchUp Extension"
        })
      }}
    />
  </Head>
);
```

### Sitemap Generation
```jsx
// utils/generateSitemap.js
const extensions = [
  { slug: 'ml-kitchens', lastmod: '2026-02-06' },
  { slug: 'ml-doors', lastmod: '2026-02-06' }
];

export const generateSitemap = () => {
  const staticPages = [
    '',
    'extensions',
    'support',
    'about'
  ];

  const urls = [
    ...staticPages.map(page => ({
      url: `https://mlextensions.com/${page}`,
      lastmod: '2026-02-06',
      priority: page === '' ? '1.0' : '0.8'
    })),
    ...extensions.map(ext => ({
      url: `https://mlextensions.com/extensions/${ext.slug}`,
      lastmod: ext.lastmod,
      priority: '0.9'
    }))
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(({ url, lastmod, priority }) => `
    <url>
      <loc>${url}</loc>
      <lastmod>${lastmod}</lastmod>
      <priority>${priority}</priority>
    </url>
  `).join('')}
</urlset>`;

  return sitemap;
};
```

## Vite-Specific Optimizations

### Build Configuration
```javascript
// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: 'dist/stats.html',
      open: true
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@heroicons/react'],
          animations: ['framer-motion']
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    gzip: true,
    brotli: true
  }
});
```

### Asset Optimization
```javascript
// vite.config.js - Asset handling
export default defineConfig({
  build: {
    assetsInlineLimit: 4096, // Inline assets < 4kb
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name.split('.');
          const ext = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
            return `images/[name]-[hash][extname]`;
          }
          if (/woff|woff2|eot|ttf|otf/i.test(ext)) {
            return `fonts/[name]-[hash][extname]`;
          }
          return `assets/[name]-[hash][extname]`;
        }
      }
    }
  }
});
```

## Performance Monitoring

### Web Vitals Tracking
```jsx
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

const sendToAnalytics = ({ name, value, id }) => {
  gtag('event', name, {
    value: Math.round(name === 'CLS' ? value * 1000 : value),
    event_category: 'Web Vitals',
    event_label: id,
    non_interaction: true
  });
};

// Track all Core Web Vitals
getCLS(sendToAnalytics);
getFID(sendToAnalytics);
getFCP(sendToAnalytics);
getLCP(sendToAnalytics);
getTTFB(sendToAnalytics);
```

### Performance Budget
```javascript
// lighthouse.config.js
module.exports = {
  ci: {
    assert: {
      assertions: {
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['error', { maxNumericValue: 3000 }]
      }
    }
  }
};
```

## Caching Strategy

### Service Worker for Extension Assets
```javascript
// sw.js
const CACHE_NAME = 'ml-extensions-v1';
const urlsToCache = [
  '/',
  '/extensions',
  '/static/js/vendor.js',
  '/static/css/main.css'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.destination === 'image') {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) return response;
          
          return fetch(event.request)
            .then(response => {
              const responseClone = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => cache.put(event.request, responseClone));
              return response;
            });
        })
    );
  }
});
```

## Performance Checklist

### Before Launch:
- [ ] Run Lighthouse audit (score > 90)
- [ ] Test Core Web Vitals
- [ ] Validate structured data
- [ ] Check mobile responsiveness
- [ ] Test offline functionality
- [ ] Verify image optimization
- [ ] Check bundle sizes
- [ ] Test loading performance on 3G

### Ongoing Monitoring:
- [ ] Weekly Lighthouse CI runs
- [ ] Core Web Vitals alerts
- [ ] Bundle size regression checks
- [ ] Image optimization validation
- [ ] CDN performance monitoring