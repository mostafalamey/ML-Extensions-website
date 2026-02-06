Perfect — here’s a fully **Vite + regular CSS technical stack document**, rewritten to be **Copilot-ready**, aligned with your PRD and dark theme design. I kept it structured so an AI can scaffold the site with minimal guidance.

---

# ML Extensions Website – Technical Stack & Build Guide (Vite + CSS)

## 1. General Approach

* **Static-first, SEO-friendly**: Pre-render all pages where possible.
* **Component-driven**: Reusable React components (buttons, cards, headers, sections).
* **Dark theme default**: Follow the PRD color palette strictly.
* **Scalable & extendable**: Easy to add new products, docs, and pages.
* **No direct checkout**: Gumroad links only.

---

## 2. Recommended Tech Stack

| Layer                  | Tool / Choice                          | Notes                                                                                         |
| ---------------------- | -------------------------------------- | --------------------------------------------------------------------------------------------- |
| **Frontend Framework** | **Vite + React + TypeScript**          | Lightweight, fast development, fully static-friendly.                                         |
| **Styling**            | **Regular CSS / SCSS**                 | Use CSS variables for colors and theme consistency; fully responsive with CSS Grid & Flexbox. |
| **Animations**         | Framer Motion / Lottie                 | For hero animations, product visuals, and card interactions.                                  |
| **Routing**            | React Router v6 or `vite-plugin-pages` | Dynamic routes for products and docs: `/products/[slug]`.                                     |
| **Icons**              | Lucide React                           | Consistent outlined/solid icons; use accent color for active states.                          |
| **Content**            | JSON + MDX                             | Product info and Learn docs are JSON/MDX-driven; AI-friendly structure.                       |
| **Search / Filtering** | Fuse.js                                | Client-side search for docs and tutorials.                                                    |
| **Forms**              | React Hook Form + EmailJS              | Contact page submissions without backend.                                                     |
| **State Management**   | React Context / Zustand                | Minimal, for UI state (theme toggle, modal visibility).                                       |
| **SEO & Metadata**     | React Helmet                           | Manually set `<title>`, `<meta>` tags, OG images per page.                                    |
| **Deployment**         | Vercel / Netlify                       | Static-friendly, automatic preview builds, global CDN.                                        |

---

## 3. Project Structure (Vite + React)

```
mlextensions.com/
│
├─ public/                  # Static assets: images, fonts, videos
│   ├─ products/
│   ├─ icons/
│   └─ videos/
│
├─ src/
│   ├─ components/
│   │   ├─ Header.tsx
│   │   ├─ Footer.tsx
│   │   ├─ Button.tsx
│   │   ├─ Card.tsx
│   │   ├─ HeroSection.tsx
│   │   ├─ ProductFeatures.tsx
│   │   └─ Layout.tsx
│   │
│   ├─ pages/
│   │   ├─ Home.tsx
│   │   ├─ Products/
│   │   │   ├─ Index.tsx
│   │   │   └─ [slug].tsx
│   │   ├─ Learn/
│   │   │   └─ Index.tsx
│   │   ├─ Labs.tsx
│   │   ├─ About.tsx
│   │   └─ Contact.tsx
│   │
│   ├─ styles/
│   │   ├─ globals.css
│   │   ├─ variables.css
│   │   └─ components/         # Individual component CSS
│   │       ├─ Button.css
│   │       ├─ Card.css
│   │       └─ Header.css
│   │
│   ├─ data/
│   │   ├─ products.json
│   │   └─ docs.json
│   │
│   ├─ hooks/
│   │   └─ useTheme.ts
│   │
│   └─ utils/
│       └─ seo.ts
│
├─ index.html
├─ package.json
├─ tsconfig.json
└─ vite.config.ts
```

---

## 4. Styling Guidelines

### 4.1 Dark Theme (CSS Variables)

```css
:root {
  --color-primary: #0B3A3E;
  --color-accent: #DAA520;
  --color-white: #FFFFFF;
  --color-neutral: #333333;
  --color-dark-teal: #084640;

  --font-family: 'Inter', sans-serif;
  --border-radius: 12px;
  --spacing-xs: 8px;
  --spacing-sm: 16px;
  --spacing-md: 24px;
  --spacing-lg: 32px;
  --spacing-xl: 48px;
}
```

### 4.2 Buttons

```css
.btn-primary {
  background-color: var(--color-accent);
  color: var(--color-primary);
  border-radius: 999px;
  padding: 12px 24px;
  font-weight: 600;
}

.btn-secondary {
  background: transparent;
  border: 2px solid var(--color-accent);
  color: var(--color-accent);
  border-radius: 999px;
  padding: 10px 22px;
}

.btn-disabled {
  background: var(--color-neutral);
  color: var(--color-white);
  cursor: not-allowed;
}
```

### 4.3 Cards

```css
.card {
  background: var(--color-primary);
  border-radius: var(--border-radius);
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
  overflow: hidden;
}

.card img {
  width: 100%;
  display: block;
}

.card-content {
  padding: var(--spacing-md);
}
```

---

## 5. Components & Layouts

* **Header**: Logo (left), navigation links (center), search/user/cart (right). Active link: accent color.
* **Footer**: Product links, docs links, Gumroad links, copyright.
* **HeroSection**: H1 headline, H2 subheadline, primary CTA button, optional animation.
* **Cards**: Product preview, docs preview, blog posts.
* **Layout.tsx**: Wraps all pages with consistent header/footer and dark background.

---

## 6. Pages & Behavior

| Page                              | Type    | Notes                                            |
| --------------------------------- | ------- | ------------------------------------------------ |
| Home `/`                          | Static  | Hero, product overview, Who It’s For, Values.    |
| Products `/products`              | Static  | List all products from `products.json`.          |
| Product Detail `/products/[slug]` | Dynamic | Load content from JSON/MDX, pre-render at build. |
| Learn `/learn`                    | Static  | Filterable/searchable docs, video embeds.        |
| Labs `/labs`                      | Static  | Upcoming products, experimental features.        |
| About `/about`                    | Static  | Philosophy & vision.                             |
| Contact `/contact`                | Static  | Contact form with React Hook Form + EmailJS.     |

---

## 7. Data Structure

### Product JSON

```json
[
  {
    "name": "ML Kitchens",
    "slug": "ml-kitchens",
    "status": "Released",
    "description": "Design kitchens faster and smarter",
    "supportedVersions": ["2024", "2025"],
    "images": ["/products/ml-kitchens/hero.png"],
    "video": "/products/ml-kitchens/demo.mp4",
    "purchaseUrl": "https://gumroad.com/ml-kitchens",
    "features": [
      {
        "title": "Smart Layout",
        "description": "Automatically aligns cabinets",
        "image": "/products/ml-kitchens/features/layout.png"
      }
    ]
  }
]
```

---

## 8. SEO & Accessibility

* Semantic HTML (`<header>`, `<main>`, `<section>`).
* JSON-LD for products.
* `alt` attributes for all images.
* Responsive design: mobile, tablet, desktop.
* Meta tags per page: title, description, OG image, Twitter card.
* Keyboard focus-visible states.

---

## 9. Animations

* Hero animations: Framer Motion (fade, slide, scale).
* Product card hover: scale + shadow.
* Lottie / WebM demos for products.
* Avoid heavy 3D assets on page load.

---

## 10. Build & Deployment

* **Dev**: `npm run dev` → localhost.
* **Build**: `npm run build` → optimized static site.
* **Preview**: `npm run preview`.
* **Deployment**: Push to GitHub → Vercel / Netlify auto-deploy.
* **Env Variables**:

  * `CONTACT_FORM_API_KEY` for EmailJS
  * `ANALYTICS_ID` optional

---

## 11. AI / Copilot Workflow

1. Scaffold Vite + React + TypeScript project.
2. Create folder structure (`components`, `pages`, `data`, `styles`).
3. Generate JSON/MDX templates for products/docs.
4. Build Header, Footer, Hero, Card components with CSS variables.
5. Generate pages: Home, Products index, Product Detail, Learn, Labs, About, Contact.
6. Integrate animations (Framer Motion / Lottie) for hero/cards.
7. Add SEO metadata via React Helmet.
8. Test responsiveness on desktop/tablet/mobile.
9. Deploy to Vercel / Netlify.

---
