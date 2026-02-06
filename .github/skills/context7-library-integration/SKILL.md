---
name: context7-library-integration
description: Uses Context7 MCP to get the latest code examples, documentation, and best practices for React, Vite, and frontend libraries. Use when you need up-to-date library information or code examples.
---

# Context7 Library Integration

Leverage Context7 MCP to access the latest documentation and code examples for modern web development.

## Core Libraries for ML Extensions Website

### React + Vite Integration
```javascript
// When you need React/Vite specific guidance, use Context7 MCP:
// This skill will help you get the most current React patterns and Vite configurations

// Example Context7 query patterns:
"React functional components with hooks best practices 2026"
"Vite build optimization techniques for production"
"React Router v6 setup with Vite"
"Modern React state management patterns"
```

### UI Component Libraries
```javascript
// Get latest component examples and patterns:
"Tailwind CSS responsive design components"
"Headless UI React components with Tailwind"
"Framer Motion animation examples for React"
"React Hook Form validation patterns"
```

## Context7 MCP Integration Patterns

### 1. Library Documentation Lookup
```jsx
// Use this pattern when integrating new libraries
const getLibraryInfo = async (libraryName, topic) => {
  // Context7 MCP will be called to get latest docs for:
  // - Installation instructions
  // - Best practices
  // - Code examples
  // - Breaking changes
  
  console.log(`Getting latest ${libraryName} information for ${topic}`);
  // The MCP will provide up-to-date documentation
};

// Examples:
// getLibraryInfo('react-router', 'nested routing')
// getLibraryInfo('framer-motion', 'scroll animations')
// getLibraryInfo('react-hook-form', 'validation schema')
```

### 2. Code Example Generation
```jsx
// When you need modern, up-to-date code examples:

// For extension product pages:
const ProductPage = () => {
  // Context7 MCP will provide latest React patterns for:
  // - Image galleries with lazy loading
  // - Purchase button components
  // - Responsive design patterns
  // - Performance optimization
  
  return (
    <div>
      {/* Latest React patterns will be provided here */}
    </div>
  );
};
```

### 3. Build Configuration Updates
```javascript
// vite.config.js - Get latest Vite configurations
// Context7 MCP will provide current best practices for:

export default {
  // Latest Vite plugin configurations
  // Performance optimization settings
  // Build output configurations
  // Development server settings
};
```

## Specific Use Cases for ML Extensions Website

### 1. E-commerce Integration
```javascript
// Query Context7 for latest e-commerce patterns:
// "React e-commerce components with payment integration"
// "Gumroad integration best practices React"
// "Shopping cart state management React 2026"

const EcommerceHelper = {
  getLatestPatterns: (component) => {
    // Context7 MCP will provide current patterns for:
    switch(component) {
      case 'purchase-button':
        // Latest purchase button implementations
        break;
      case 'product-gallery':
        // Modern image gallery patterns
        break;
      case 'checkout-flow':
        // Current checkout UX patterns
        break;
    }
  }
};
```

### 2. Performance Optimization
```javascript
// Get latest performance patterns:
// "React performance optimization techniques 2026"
// "Vite bundle optimization strategies"
// "Web Vitals improvement React applications"

const PerformanceHelper = {
  getOptimizationTips: (area) => {
    // Context7 MCP will provide latest techniques for:
    // - Code splitting
    // - Image optimization
    // - Lazy loading
    // - Bundle analysis
  }
};
```

### 3. SEO and Meta Management
```javascript
// Query for latest SEO practices:
// "React SEO best practices 2026"
// "Meta tags for e-commerce React apps"
// "Structured data implementation React"

const SEOHelper = {
  getLatestSEOPatterns: () => {
    // Context7 MCP provides current SEO techniques:
    // - Dynamic meta tag generation
    // - Structured data patterns
    // - Open Graph optimization
    // - Core Web Vitals improvement
  }
};
```

## Integration Workflow

### Step 1: Identify Information Need
```javascript
// Before implementing any feature, identify what you need:
const informationNeeds = [
  'library-setup',          // How to install and configure
  'best-practices',         // Current recommended patterns
  'code-examples',          // Working implementations
  'performance-tips',       // Optimization techniques
  'breaking-changes',       // What's changed recently
  'security-practices'      // Latest security recommendations
];
```

### Step 2: Context7 Query Strategy
```javascript
// Structure your queries for best results:
const queryPatterns = {
  specific: "React Router v6 nested routes with lazy loading",
  functional: "Image gallery component with touch gestures React",
  comparative: "React state management: Context vs Zustand vs Redux 2026",
  troubleshooting: "Vite build errors with React components solutions"
};
```

### Step 3: Implementation Verification
```javascript
// After getting Context7 information, verify implementation:
const verifyImplementation = (feature) => {
  // Check against latest best practices from Context7
  // Validate with current React/Vite patterns
  // Ensure compatibility with target browsers
  // Test performance implications
};
```

## Context7 Query Examples for ML Extensions

### For Product Pages:
```
"React product showcase component with image carousel and purchase integration 2026"
"Responsive product grid layout React Tailwind CSS"
"Product comparison table component React best practices"
```

### For Performance:
```
"React application bundle size optimization Vite 2026"
"Image lazy loading techniques React Intersection Observer"
"React component code splitting dynamic imports"
```

### For E-commerce:
```
"React shopping cart implementation with local storage"
"Payment button integration React third-party services"
"Product search and filtering React performance optimization"
```

### For SEO:
```
"React meta tag management dynamic content"
"Sitemap generation static site React applications"
"JSON-LD structured data React e-commerce"
```

## Best Practices for Context7 Usage

### 1. Query Specificity
- Include technology stack (React, Vite, Tailwind)
- Specify year/version when relevant
- Include use case context (e-commerce, SketchUp extensions)

### 2. Information Validation
- Cross-reference multiple sources
- Test implementations thoroughly
- Check browser compatibility
- Verify performance impact

### 3. Documentation Updates
- Keep track of library versions used
- Document custom implementations
- Note any deviations from standard patterns
- Update based on Context7 recommendations

## Common Context7 Queries for This Project

```javascript
// Save these for quick reference:
const commonQueries = [
  "React Vite project structure best practices 2026",
  "Tailwind CSS component library setup React", 
  "React image optimization techniques modern browsers",
  "Vite build configuration production deployment",
  "React SEO optimization single page application",
  "Modern React form handling validation patterns",
  "React animation library comparison Framer Motion alternatives",
  "React state management lightweight solutions 2026"
];
```

Remember: Always query Context7 MCP when you need the most current information about libraries, frameworks, or implementation patterns. The web development landscape changes rapidly, and Context7 ensures you're using the latest best practices.