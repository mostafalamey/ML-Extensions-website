# ML Extensions Website - Design Language System

## 1. Design Philosophy

### Core Principles
- **Professional First**: Clean, sophisticated interface that builds trust with architects, designers, and manufacturers
- **Dark & Modern**: Sophisticated dark theme that reduces eye strain and emphasizes content
- **Purposeful Minimalism**: Every element serves a function; remove visual noise
- **Manufacturing-Aware**: Visual language that reflects precision, engineering, and production quality
- **Speed & Clarity**: Fast-loading, scannable layouts that respect professional workflows

### Visual Personality
- **Confident** - Not flashy, but authoritative
- **Technical** - Precision-focused, engineering-minded
- **Accessible** - Professional but not intimidating
- **Consistent** - Predictable patterns and behaviors

---

## 2. Color Palette

### Primary Colors
```css
--color-primary: #0B3A3E;          /* Deep Teal - main brand color */
--color-primary-hover: #084640;    /* Darker teal for hover states */
--color-accent: #DAA520;           /* Gold - CTAs, highlights, active states */
--color-accent-hover: #B8941C;     /* Darker gold for hover */
--color-accent-light: #F4E4A6;     /* Light gold for subtle highlights */
```

### Neutrals & Backgrounds
```css
--color-background: #111111;       /* Rich charcoal background */
--color-background-alt: #0D0D0D;   /* Deeper sections */
--color-surface: #1C1C1C;          /* Card/section backgrounds */
--color-surface-elevated: #252525; /* Modal, dropdown backgrounds */
--color-surface-glass: rgba(28, 28, 28, 0.8); /* Glassmorphism surfaces */
--color-border: #2A2A2A;           /* Subtle borders, dividers */
--color-border-accent: #3A3A3A;    /* Hover borders */
--color-overlay: rgba(0, 0, 0, 0.6); /* Image overlays for text readability */
```

### Text Colors
```css
--color-text-primary: #FFFFFF;     /* Main headings, important text */
--color-text-secondary: #B3B3B3;   /* Body text, descriptions */
--color-text-tertiary: #808080;    /* Captions, meta text */
--color-text-accent: #DAA520;      /* Links, highlighted text */
```

### Status Colors
```css
--color-success: #10B981;          /* Success states, positive feedback */
--color-warning: #F59E0B;          /* Warnings, attention */
--color-error: #EF4444;            /* Errors, destructive actions */
--color-info: #3B82F6;             /* Information, neutral feedback */
```

### Usage Rules
- **Primary Teal**: Logo, primary CTAs, brand moments
- **Accent Gold**: Secondary CTAs, active states, highlights, links
- **Background Black**: Main page background
- **Surface Gray**: Cards, sections, content containers
- **Text White**: Primary headings, navigation, important copy
- **Text Light Gray**: Body text, descriptions, secondary content

---

## 3. Typography

### Font Stack
```css
--font-primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'SF Mono', Consolas, monospace;
```

### Type Scale
```css
--font-size-xs: 12px;    /* Captions, meta info */
--font-size-sm: 14px;    /* Small text, labels */
--font-size-base: 16px;  /* Body text baseline */
--font-size-lg: 18px;    /* Large body text */
--font-size-xl: 20px;    /* Subheadings */
--font-size-2xl: 24px;   /* Section headings */
--font-size-3xl: 32px;   /* Page titles */
--font-size-4xl: 40px;   /* Hero headlines */
--font-size-5xl: 48px;   /* Large hero text */
--font-size-6xl: 64px;   /* Display headlines */

--font-weight-normal: 400;
--font-weight-medium: 500;
--font-weight-semibold: 600;
--font-weight-bold: 700;
```

### Typography Hierarchy
- **H1 (Hero)**: 48px/56px, Bold, Primary text color
- **H1 (Page)**: 32px/40px, Bold, Primary text color
- **H2**: 24px/32px, Semibold, Primary text color
- **H3**: 20px/28px, Semibold, Primary text color
- **Body Large**: 18px/28px, Normal, Secondary text color
- **Body**: 16px/24px, Normal, Secondary text color
- **Small**: 14px/20px, Normal, Tertiary text color
- **Caption**: 12px/16px, Medium, Tertiary text color

---

## 4. Spacing System

### Scale (8px base unit)
```css
--spacing-0: 0;
--spacing-1: 4px;     /* 0.5 units - tight spacing */
--spacing-2: 8px;     /* 1 unit - base unit */
--spacing-3: 12px;    /* 1.5 units */
--spacing-4: 16px;    /* 2 units - small spacing */
--spacing-5: 20px;    /* 2.5 units */
--spacing-6: 24px;    /* 3 units - medium spacing */
--spacing-8: 32px;    /* 4 units - large spacing */
--spacing-10: 40px;   /* 5 units */
--spacing-12: 48px;   /* 6 units - section spacing */
--spacing-16: 64px;   /* 8 units - large section spacing */
--spacing-20: 80px;   /* 10 units */
--spacing-24: 96px;   /* 12 units - hero spacing */
--spacing-32: 128px;  /* 16 units - major section spacing */
```

### Layout Spacing
- **Component padding**: 16px - 24px
- **Section spacing**: 48px - 96px
- **Container max-width**: 1200px
- **Container padding**: 24px (mobile), 48px (desktop)

---

## 5. Navigation Design

### Premium Navigation Bar
```css
.navbar {
  background: rgba(17, 17, 17, 0.95);
  backdrop-filter: blur(20px);
  border-bottom: 1px solid var(--color-border);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 16px 0;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.3);
}

.navbar-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar-links {
  display: flex;
  gap: 32px;
  list-style: none;
  margin: 0;
}

.navbar-link {
  color: var(--color-text-primary);
  text-decoration: none;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: 0.02em;
  transition: color 200ms ease;
  position: relative;
}

.navbar-link:hover,
.navbar-link.active {
  color: var(--color-accent);
}

.navbar-link.active::after {
  content: '';
  position: absolute;
  bottom: -8px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-accent);
  border-radius: 1px;
}
```

### Navigation Elements
- **Logo**: Left-aligned, brand colors with subtle glow effect
- **Navigation Links**: Evenly spaced, premium typography
- **Active State**: Gold accent with bottom border indicator
- **Hover State**: Smooth gold color transition (200ms)
- **CTA Button**: Right-aligned, primary button style
- **Mobile**: Elegant slide-in menu with backdrop blur

---

## 6. Button System

### Primary Button
```css
.btn-primary {
  background: var(--color-accent);
  color: var(--color-primary);
  border: none;
  border-radius: 999px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 200ms ease;
  box-shadow: 0 2px 8px rgba(218, 165, 32, 0.2);
}

.btn-primary:hover {
  background: var(--color-accent-hover);
  transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(218, 165, 32, 0.3);
}
```

### Secondary Button
```css
.btn-secondary {
  background: transparent;
  color: var(--color-accent);
  border: 2px solid var(--color-accent);
  border-radius: 999px;
  padding: 10px 22px;
  font-size: 16px;
  font-weight: 600;
}

.btn-secondary:hover {
  background: var(--color-accent);
  color: var(--color-primary);
}
```

### Ghost Button
```css
.btn-ghost {
  background: transparent;
  color: var(--color-text-primary);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 8px 16px;
}

.btn-ghost:hover {
  border-color: var(--color-accent);
  color: var(--color-accent);
}
```

---

## 7. Card Components

### Premium Product Card
```css
.product-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 20px;
  overflow: hidden;
  transition: all 400ms cubic-bezier(0.25, 0.46, 0.45, 0.94);
  cursor: pointer;
  position: relative;
  height: 400px;
}

.product-card:hover {
  transform: translateY(-8px) scale(1.02);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  border-color: var(--color-accent-light);
}

.product-card-image {
  width: 100%;
  height: 60%;
  object-fit: cover;
  background: linear-gradient(135deg, var(--color-primary), var(--color-primary-hover));
  position: relative;
}

.product-card-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 100%);
  opacity: 0;
  transition: opacity 300ms ease;
}

.product-card:hover .product-card-overlay {
  opacity: 1;
}

.product-card-content {
  padding: 32px 24px;
  height: 40%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.product-card-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--color-text-primary);
  margin-bottom: 8px;
}

.product-card-description {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 16px;
  flex-grow: 1;
}

.product-card-cta {
  color: var(--color-accent);
  font-weight: 600;
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  transition: color 200ms ease;
}

.product-card:hover .product-card-cta {
  color: var(--color-accent-light);
}
```

### Feature Card
```css
.feature-card {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 12px;
  padding: 24px;
  text-align: center;
}

.feature-icon {
  width: 48px;
  height: 48px;
  margin: 0 auto 16px;
  color: var(--color-accent);
}
```

---

## 8. Layout System

### Grid System
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

@media (min-width: 768px) {
  .container {
    padding: 0 48px;
  }
}

.grid-2 { display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px; }
.grid-3 { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
.grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px; }

@media (max-width: 768px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}
```

### Hero Section Layout
```css
.hero-section {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: var(--color-overlay);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  max-width: 800px;
  padding: 0 24px;
}

.hero-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  font-weight: 700;
  line-height: 1.1;
  margin-bottom: 24px;
  color: var(--color-text-primary);
  text-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.25rem);
  color: var(--color-text-secondary);
  margin-bottom: 32px;
  line-height: 1.6;
}
```

### Section Layouts
```css
.section {
  padding: 120px 0;
}

.section-alt {
  background: var(--color-background-alt);
}

.section-feature {
  background: var(--color-surface);
  position: relative;
}
```

---

## 9. Animations & Interactions

### Hover States
- **Subtle lift**: `transform: translateY(-2px)` for cards
- **Color transitions**: 200ms ease for text/background changes
- **Shadow enhancement**: Elevated shadow states on hover
- **Scale effects**: `transform: scale(1.02)` for interactive elements

### Page Transitions
```css
.page-enter {
  opacity: 0;
  transform: translateY(20px);
}

.page-enter-active {
  opacity: 1;
  transform: translateY(0);
  transition: all 300ms ease-out;
}
```

### Loading States
```css
.skeleton {
  background: linear-gradient(90deg, var(--color-surface) 25%, var(--color-border) 50%, var(--color-surface) 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

---

## 10. Iconography

### Icon System
- **Style**: Lucide React (outlined, consistent weight)
- **Size**: 16px, 20px, 24px standard sizes
- **Color**: Default text color, accent on hover/active
- **Usage**: Navigation, features, buttons, status indicators

### Icon Examples
- **Products**: Package, Box, Layers
- **Features**: Zap, Settings, Check
- **Navigation**: Home, BookOpen, Mail
- **Actions**: Download, ExternalLink, Play

---

## 11. Forms & Inputs

### Form Elements
```css
.input {
  background: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 12px 16px;
  color: var(--color-text-primary);
  font-size: 16px;
}

.input:focus {
  outline: none;
  border-color: var(--color-accent);
  box-shadow: 0 0 0 3px rgba(218, 165, 32, 0.1);
}

.label {
  color: var(--color-text-secondary);
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 6px;
  display: block;
}
```

---

## 12. Component Library

### Essential Components
1. **Premium Navigation** - Full-width navbar with glassmorphism
2. **Hero Section** - Full-viewport with background imagery and overlay
3. **Trust Indicators** - Achievement badges, years of experience
4. **Product Showcase Cards** - High-quality imagery with elegant hover states
5. **Feature Grid** - Clean icons with professional descriptions
6. **Statistics Section** - Credibility numbers and achievements
7. **Collection Gallery** - Premium project showcases
8. **Footer** - Comprehensive links and brand elements
9. **Modal/Overlays** - Product details with rich media
10. **Loading States** - Sophisticated skeleton screens

### Trust & Credibility Elements
```css
.trust-badge {
  background: var(--color-surface-glass);
  backdrop-filter: blur(12px);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 24px;
  text-align: center;
  position: relative;
}

.trust-number {
  font-size: 3rem;
  font-weight: 700;
  color: var(--color-accent);
  line-height: 1;
  margin-bottom: 8px;
}

.trust-label {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

---

## 13. Responsive Breakpoints

```css
/* Mobile-first approach */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Responsive Behavior
- **Typography**: Scale down on smaller screens
- **Spacing**: Reduce padding/margins on mobile
- **Grid**: Stack columns on mobile
- **Navigation**: Collapse to hamburger menu
- **Hero**: Single-column layout on mobile

---

## 14. Accessibility Guidelines

### WCAG Compliance
- **Color Contrast**: 4.5:1 minimum for normal text
- **Focus States**: Visible focus indicators (accent color outline)
- **Alt Text**: Descriptive alt attributes for images
- **Semantic HTML**: Proper heading hierarchy, landmarks
- **Keyboard Navigation**: Tab order, escape key support

### Implementation
```css
.focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
}
```

## 17. Photography & Visual Content Guidelines

### Image Strategy
- **Hero Backgrounds**: High-quality architectural photography showing finished spaces
- **Product Showcases**: Professional SketchUp model renderings with realistic materials
- **Before/After**: Split-screen comparisons showing workflow improvements
- **Process Shots**: Clean screenshots of the extension interface in action
- **Collection Gallery**: Diverse architectural styles (modern, traditional, commercial)

### Image Treatment
```css
.hero-background {
  filter: brightness(0.7) contrast(1.1);
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.product-image {
  transition: transform 400ms ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.gallery-image {
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}
```

### Content Overlay Patterns
```css
.content-overlay {
  background: linear-gradient(
    135deg,
    rgba(11, 58, 62, 0.9) 0%,
    rgba(8, 70, 64, 0.8) 100%
  );
  padding: 48px;
  border-radius: 20px;
  backdrop-filter: blur(10px);
}
```

---

## 18. Collection & Gallery Layouts

### Collection Grid
```css
.collection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 32px;
  margin-top: 64px;
}

.collection-card {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  aspect-ratio: 4/5;
  cursor: pointer;
  transition: all 400ms ease;
}

.collection-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
}

.collection-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 600ms ease;
}

.collection-card:hover .collection-image {
  transform: scale(1.1);
}

.collection-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    rgba(0, 0, 0, 0.3) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 32px;
  opacity: 0;
  transition: opacity 300ms ease;
}

.collection-card:hover .collection-overlay {
  opacity: 1;
}

.collection-title {
  color: var(--color-text-primary);
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 8px;
}

.collection-subtitle {
  color: var(--color-text-secondary);
  font-size: 0.875rem;
}
```

---

### Optimization Strategy
- **Images**: WebP format, lazy loading, responsive sizes
- **Fonts**: Font-display: swap, preload critical fonts
- **Critical CSS**: Inline above-the-fold styles
- **JavaScript**: Code splitting, tree shaking
- **Animations**: Use transform/opacity for smooth 60fps

### Loading Strategy
1. Critical CSS inline
2. Web fonts with fallbacks
3. Hero image priority loading
4. Remaining content lazy loaded

---

## 16. Performance Considerations

### Writing Style
- **Professional tone**: Confident, direct, no hype
- **Short sentences**: Easy to scan and understand  
- **Active voice**: "Create kitchens" not "Kitchens can be created"
- **Feature benefits**: Focus on time saved, accuracy gained
- **Technical accuracy**: Precise terms for SketchUp users

## 19. Content Guidelines
1. **Headline**: Primary value proposition
2. **Subheadline**: Supporting detail or context
3. **Body**: Key features, benefits, specifics
4. **CTA**: Clear next action

---

This design language system provides a comprehensive foundation for building the ML Extensions website with a sophisticated, professional aesthetic that serves the target audience of architects, designers, and manufacturers while maintaining the requested dark theme and floating navigation preferences.