# ML Extensions Website – PRD / Build Guide

## 1. Purpose of This Document
This document defines **what mlextensions.com is**, what it should include, and how it should behave. It is intended to be handed directly to an AI coding agent (GitHub Copilot or similar) to design and build the website with minimal ambiguity.

The website’s role is:
- To act as the **official home of ML Extensions**
- To professionally showcase current and future SketchUp extensions
- To position ML Extensions as a serious, long‑term extensions studio
- To redirect purchases to Gumroad (no direct checkout in v1)

This is **not** a marketing landing page only, and **not** an e‑commerce platform (for now).

---

## 2. Core Principles
These principles should guide every design and implementation decision:

1. **Product‑first** – Extensions are the heroes, not the person.
2. **Professional & calm** – No flashy SaaS clichés or stock imagery.
3. **Visual clarity** – Real screenshots, animations, diagrams.
4. **Scalable structure** – Easy to add new products later.
5. **Static-first** – Fast, SEO‑friendly, low maintenance.

---

## 3. Global Site Outline (Sitemap)

### 3.1 Top-Level Pages

- Home (`/`)
- Products (`/products`)
- Product Detail Pages
  - ML Kitchens (`/products/ml-kitchens`)
  - ML Doors (`/products/ml-doors`)
  - Future products (same pattern)
- Learn / Docs (`/learn`)
- Roadmap / Labs (`/labs`) *(optional but recommended)*
- About (`/about`)
- Contact (`/contact`)

---

## 4. Page-by-Page Outline

### 4.1 Home Page
**Goal:** Position ML Extensions and direct users to products.

Sections:
1. Hero section
   - Headline: Professional SketchUp Extensions
   - Subheadline: Productivity, customization, manufacturing‑aware workflows
   - Primary CTA: View Products

2. Products Overview
   - Product cards:
     - ML Kitchens
     - ML Doors
   - Each card includes:
     - Short description (1 line)
     - Visual (animation or render)
     - Link to product page

3. Who It’s For
   - Interior Designers
   - Architects
   - Manufacturers
   - Studios / Freelancers

4. Key Values
   - Speed
   - Accuracy
   - Customization
   - Production readiness

5. Footer CTA
   - Explore products or documentation

---

### 4.2 Products Index (`/products`)
**Goal:** Give a clear overview of all extensions.

For each product:
- Name
- Status (Released / In Development)
- One‑sentence value proposition
- Supported SketchUp versions
- Link to product detail page

No pricing here.

---

### 4.3 Product Detail Page (Template)
This structure applies to **every extension**.

Sections:

1. Product Hero
   - Product name
   - One strong positioning sentence
   - Large visual / animation

2. Problem Statement
   - What manual or painful workflow this product replaces

3. Core Capabilities
   - Grouped feature sections (not long lists)
   - Each group paired with visuals

4. Typical Workflow
   - Step-by-step usage flow

5. Who This Is For
   - Clear target users

6. Compatibility
   - SketchUp versions
   - OS support
   - Units (metric / imperial)

7. Documentation & Learning
   - Link to Learn / Docs section

8. Roadmap Hint
   - Short paragraph on future direction (no dates)

9. Purchase CTA
   - Button: Buy on Gumroad
   - External link to the official Gumroad page

---

### 4.4 Learn / Docs (`/learn`)
**Goal:** Centralized learning and documentation hub.

Content types:
- User manuals (per product)
- Video tutorials (embedded)
- FAQs
- Tips & workflows

Structure:
- Filter by product
- Searchable content

---

### 4.5 Labs / Roadmap (`/labs`)
**Goal:** Show long‑term commitment and experimentation.

Includes:
- Upcoming extensions
- Experimental features
- Concept previews

No promises or timelines.

---

### 4.6 About Page
**Goal:** Explain the philosophy behind ML Extensions.

Focus on:
- Design‑to‑manufacturing thinking
- Productivity and precision
- Long‑term vision

Avoid personal biography tone.

---

### 4.7 Contact Page
**Goal:** Clear communication channel.

Includes:
- Contact form
- Business email
- Optional: social or YouTube links

---

## 5. Navigation Structure

Header Navigation:
- Home
- Products
- Learn
- Labs
- About
- Contact

Footer:
- Products list
- Documentation
- Gumroad links
- Copyright

---

## 6. Out of Scope (v1)

- Direct payments or checkout
- User accounts
- Licensing system
- Subscriptions

---

## 7. Notes for Implementation

- Static site preferred (Next.js / Astro / Vite)
- SEO‑friendly URLs
- Easy content updates (MDX or CMS optional)
- Designed to scale with more extensions

---

---

## 8. Visual Design System (Dark Theme)

This section defines the **official dark theme design language** for mlextensions.com. It must be followed exactly to ensure consistency across all pages and future products.

### 8.1 Design Tone
- Professional, calm, premium
- Dark, desaturated base colors
- Warm accent color for emphasis and CTAs
- No harsh contrasts, no pure black backgrounds
- Subtle depth using gradients, soft shadows, and blur

---

### 8.2 Color Palette

**Primary (Dark Teal / Green Base)**
- Hex: `#0B3A3E` (primary background, nav bars, cards)
- Usage:
  - Main background gradients
  - Navigation bar background
  - Cards and containers

**Secondary (White)**
- Hex: `#FFFFFF`
- Usage:
  - Primary text
  - Headlines

**Accent (Gold / Warm Yellow)**
- Hex: `#DAA520`
- Usage:
  - Primary CTA buttons
  - Active navigation items
  - Icons (highlighted states)

**Neutral / Gray**
- Hex: `#333333`
- Usage:
  - Disabled states
  - Secondary text
  - Borders and separators

Optional supporting dark tone:
- Hex: `#084640` (slightly darker teal for gradients)

---

### 8.3 Typography System

**Font Style Direction**
- Modern, clean, professional
- Sans-serif preferred
- Examples (implementation choice):
  - Inter
  - Satoshi
  - Geist

**Hierarchy**
- H1: Large, bold
  - Example: "Professional SketchUp Extensions"
- H2: Section headers
  - Example: "Key Features & Benefits"
- H3: Sub-sections
  - Example: "Productivity & Customization"
- Body:
  - Clear, readable, medium weight
- Caption / Label:
  - Small text, muted color
  - Used for tags like "New"

---

### 8.4 Navigation Bar

**Layout**
- Left: ML Extensions logo / text
- Center: Navigation links
  - Home
  - Extensions
  - Docs
  - About
  - Blog
- Right:
  - Search icon
  - Cart icon (future-proof, non-functional in v1)
  - User icon (future-proof)

**States**
- Default: white text
- Active page: accent color (`#DAA520`)
- Hover: subtle glow or underline

Navigation container should have:
- Rounded corners
- Slight blur or glass effect (optional)

---

### 8.5 Buttons

**Primary Button**
- Background: `#DAA520`
- Text: Dark or white depending on contrast
- Rounded corners
- Used for main CTAs (View Products, Buy on Gumroad)

**Secondary Button**
- Transparent background
- Accent border
- Accent text
- Used for "Learn More"

**Tertiary / Disabled Button**
- Muted gray
- No hover animation

Example (CSS-like):
```css
.btn-primary {
  background: #DAA520;
  color: #0B3A3E;
  border-radius: 999px;
  padding: 12px 24px;
}
```

---

### 8.6 Cards & Layout Components

**Content Cards**
- Rounded corners
- Dark teal background
- Soft shadow
- Image or animation on top
- Text + CTA below

Used for:
- Product cards
- Blog posts
- Docs previews

---

### 8.7 Grid & Spacing

**Grid**
- 12-column grid (desktop)
- 6-column (tablet)
- 1–2 column (mobile)

**Spacing Scale (example)**
- 8px
- 16px
- 24px
- 32px
- 48px

Spacing must feel breathable, not dense.

---

### 8.8 Icons

**Style**
- Outline or solid, consistent stroke
- Accent color for active states

**Icon Types**
- Search
- Products
- User
- Settings
- Measurements / tools (ruler, gear, grid)

---

### 8.9 Visual Elements

- Subtle gradients in backgrounds
- Soft inner glows
- Light glassmorphism allowed (very subtle)
- Real product imagery preferred over abstract graphics

---

**End of Visual Design System**

---
