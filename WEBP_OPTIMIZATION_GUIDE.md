# WebP Image Optimization Guide

This guide will help you optimize your ML Extensions website images by converting them to WebP format, which typically reduces file sizes by 25-50% compared to JPEG.

## Current Image Inventory

Your website currently uses these images:
- **doors-hero/**: 2 JPEG files (~carousel backgrounds)
- **kitchens-hero/**: 5 JPEG files (~carousel backgrounds)  
- **kitchens-gallery/**: 17 JPEG files (~gallery display)
- **SVG files**: Already optimized (ml_extensions_logo.svg, favicon.svg)

## Option 1: Automated Node.js Conversion (Recommended)

### Step 1: Install Sharp
```bash
npm install sharp
```

### Step 2: Run the conversion script
```bash
node scripts/convert-to-webp.js
```

This script will:
- Convert all JPEG files to WebP format
- Show file size savings for each image
- Keep original files for fallback compatibility
- Display total savings summary

## Option 2: Manual Conversion Tools

### Online Tools (Easy)
1. **Squoosh.app** (Google): https://squoosh.app
2. **CloudConvert**: https://cloudconvert.com/jpg-to-webp
3. **TinyPNG** (also does WebP): https://tinypng.com

### Local Tools (Batch Processing)
1. **XnConvert** (Free): https://www.xnview.com/en/xnconvert/
2. **GIMP** (Free): File > Export As > Select WebP
3. **Photoshop**: File > Export > Export As > WebP

## Option 3: Build-Time Conversion (Advanced)

If npm is working properly, you can set up automated build-time conversion:

### Install Vite plugins:
```bash
npm install --save-dev vite-plugin-imagemin @vite-imagemin/webp
```

### Update vite.config.ts:
```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { ViteImageOptimize } from 'vite-plugin-imagemin'

export default defineConfig({
  plugins: [
    react(),
    ViteImageOptimize({
      gifsicle: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      pngquant: { quality: [0.8, 0.9] },
      webp: { quality: 80 }
    })
  ],
})
```

## Step 3: Update Your React Components

I've created a `SmartImage` component that automatically uses WebP with JPEG fallbacks. Here's how to implement it:

### Option A: Replace img tags with SmartImage (Recommended)
Update your Hero component background images:
```tsx
// Instead of:
backgroundImages={["/kitchens-hero/kit04.jpg"]}

// Use:
backgroundImages={["/kitchens-hero/kit04.webp"]}
```

The SmartImage component will handle fallbacks automatically.

### Option B: Update existing img elements to use picture element
```tsx
<picture>
  <source srcSet="/kitchens-hero/kit04.webp" type="image/webp" />
  <img src="/kitchens-hero/kit04.jpg" alt="Kitchen design" />
</picture>
```

## Step 4: Test Your Implementation

After converting images:

1. **Check file sizes**: WebP files should be 25-50% smaller
2. **Test in different browsers**: Chrome, Firefox, Safari, Edge
3. **Verify fallbacks work**: Disable WebP support in DevTools
4. **Check page speed**: Use Google PageSpeed Insights

## Expected Results

Based on typical conversion rates:
- **File size reduction**: 25-50% smaller than JPEG
- **Loading speed**: Faster page loads, especially on mobile
- **Bandwidth savings**: Reduced data usage for users
- **SEO improvement**: Better Core Web Vitals scores

## Troubleshooting

### If images don't display:
1. Check file paths are correct (case sensitive)
2. Verify WebP files were created successfully
3. Clear browser cache
4. Check browser console for errors

### If conversion script fails:
1. Make sure you're in the project root directory
2. Install sharp: `npm install sharp`
3. Check that image directories exist

## Browser Support

WebP is supported by:
- ✅ Chrome 23+
- ✅ Firefox 65+
- ✅ Safari 14+
- ✅ Edge 18+

Coverage: 95.4% of users (as of 2024)

## Next Steps After Conversion

1. Update all image references in your React components
2. Test the website thoroughly
3. Consider implementing progressive loading
4. Monitor Core Web Vitals improvements
5. Consider WebP for any future images

## Files to Update After Conversion

Once you have WebP versions, update these files:
- `/src/pages/MLKitchens.tsx` (Gallery images + Hero backgrounds)
- `/src/pages/MLDoors.tsx` (Hero backgrounds)
- `/src/pages/HomePage.tsx` (Hero backgrounds)

Would you like me to help you update these files once you've converted the images?