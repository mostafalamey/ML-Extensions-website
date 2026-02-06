---
name: sketchup-extension-product-page
description: Creates consistent product showcase pages for SketchUp extensions with features, screenshots, and Gumroad integration. Use when building product pages for ML Kitchens, ML Doors, or other SketchUp extensions.
---

# SketchUp Extension Product Page Generator

Create comprehensive product pages for SketchUp extensions following this structure and guidelines:

## Reference Products & Documentation

**ML Extensions Products:**
- ML Kitchens: https://mostafalamey1.gumroad.com/l/mlkitchens281
- ML Doors: https://mostafalamey1.gumroad.com/l/MLDoors232?_gl=1*en25w7*_ga*MTYzODg0NzYwOC4xNzY5NDc0NjE3*_ga_6LJN6D94N6*czE3Njk0NzQ2MTckbzEkZzEkdDE3Njk0NzQ3NDMkajQxJGwwJGgw

**Content Guidelines:**
When creating page content, always reference the docs folder for:
- Site content and messaging (`docs/ml_extensions_website_site_content_copy_messaging.md`)
- Product requirements and structure (`docs/ml_extensions_website_product_requirements_site_outline.md`)  
- Technical stack specifications (`docs/ml_extensions_webiste_techstack.md`)

Use the established tone (professional, confident, direct) and messaging patterns from the docs content.

## Page Structure

1. **Hero Section**
   - Extension name with clear branding
   - Compelling tagline/description
   - Primary CTA button linking to Gumroad
   - Hero image/screenshot of the extension in action

2. **Features Section**
   - List 3-5 key features with icons
   - Focus on benefits for architects/designers
   - Use action-oriented language

3. **Screenshots Gallery**
   - Before/after comparisons
   - SketchUp viewport screenshots
   - UI/dialog screenshots
   - Mobile-responsive image gallery

4. **Installation & Requirements**
   - SketchUp version compatibility
   - Step-by-step installation guide
   - System requirements
   - Troubleshooting tips

5. **Pricing & Purchase**
   - Clear pricing display
   - Gumroad purchase button
   - License information
   - Money-back guarantee details

## React Component Template

```jsx
import { useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

export default function ExtensionPage({ extension }) {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          {extension.name}
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          {extension.tagline}
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
          Buy Now - ${extension.price}
        </button>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {extension.features.map((feature, index) => (
          <div key={index} className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              {feature.icon}
            </div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>

      {/* Screenshot Gallery */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-center mb-8">See It In Action</h2>
        <div className="relative max-w-4xl mx-auto">
          <img 
            src={extension.screenshots[currentImage]} 
            alt={`${extension.name} screenshot ${currentImage + 1}`}
            className="w-full rounded-lg shadow-lg"
          />
          {/* Gallery navigation */}
        </div>
      </div>

      {/* Installation */}
      <div className="bg-gray-50 rounded-lg p-8 mb-16">
        <h2 className="text-2xl font-bold mb-6">Installation & Requirements</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="font-semibold mb-4">Requirements:</h3>
            <ul className="space-y-2 text-gray-600">
              <li>• SketchUp {extension.minVersion} or higher</li>
              <li>• Windows 10+ or macOS 10.15+</li>
              <li>• Active internet connection for activation</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-4">Installation Steps:</h3>
            <ol className="space-y-2 text-gray-600">
              <li>1. Download the .rbz file from Gumroad</li>
              <li>2. Open SketchUp Extension Manager</li>
              <li>3. Click "Install Extension" and select the .rbz file</li>
              <li>4. Activate with your license key</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Purchase Section */}
      <div className="text-center bg-blue-50 rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
        <p className="text-gray-600 mb-6">
          Join thousands of architects and designers using {extension.name}
        </p>
        <button className="bg-blue-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
          Purchase for ${extension.price}
        </button>
        <p className="text-sm text-gray-500 mt-4">
          30-day money-back guarantee • Instant download • Email support
        </p>
      </div>
    </div>
  );
}
```

## Content Guidelines

- **Headlines**: Use action verbs and benefits
- **Descriptions**: Focus on time-saving and workflow improvement
- **Screenshots**: Show real architectural/design projects
- **Features**: Maximum 5 key features, prioritize most impactful
- **CTA buttons**: Use urgency and value ("Get It Now", "Start Saving Time")

## SEO Optimization

- Use extension name in page title
- Include "SketchUp extension" in meta description
- Add structured data for products
- Optimize images with descriptive alt text
- Include relevant keywords: "SketchUp", "architecture", "design", "modeling"