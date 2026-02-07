import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.join(__dirname, '..');

// Check if sharp is available, if not provide install instructions
let sharp;
try {
  sharp = (await import('sharp')).default;
} catch (error) {
  console.log('Sharp is not installed. Please run: npm install sharp');
  console.log('Or install globally: npm install -g sharp-cli');
  process.exit(1);
}

// Configuration
const inputDirs = [
  path.join(rootDir, 'public/doors-hero'), 
  path.join(rootDir, 'public/kitchens-hero'), 
  path.join(rootDir, 'public/kitchens-gallery')
];

const webpQuality = 80; // Adjust quality (0-100)

async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: webpQuality })
      .toFile(outputPath);
    
    // Get file sizes for comparison
    const originalSize = fs.statSync(inputPath).size;
    const webpSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - webpSize) / originalSize * 100).toFixed(1);
    
    console.log(`✅ ${path.basename(inputPath)} → ${path.basename(outputPath)}`);
    console.log(`   Original: ${(originalSize / 1024).toFixed(1)}KB | WebP: ${(webpSize / 1024).toFixed(1)}KB | Saved: ${savings}%`);
  } catch (error) {
    console.error(`❌ Error converting ${inputPath}:`, error.message);
  }
}

async function convertAllImages() {
  console.log('🔄 Starting WebP conversion...\n');
  
  let totalOriginalSize = 0;
  let totalWebpSize = 0;
  let convertedCount = 0;

  for (const dir of inputDirs) {
    if (!fs.existsSync(dir)) {
      console.log(`⚠️  Directory ${dir} not found, skipping...`);
      continue;
    }

    console.log(`📁 Processing directory: ${dir}`);
    const files = fs.readdirSync(dir).filter(file => 
      /\.(jpg|jpeg|png)$/i.test(file)
    );

    for (const file of files) {
      const inputPath = path.join(dir, file);
      const outputPath = path.join(dir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'));
      
      // Track file sizes
      const originalSize = fs.statSync(inputPath).size;
      totalOriginalSize += originalSize;
      
      await convertToWebP(inputPath, outputPath);
      
      if (fs.existsSync(outputPath)) {
        totalWebpSize += fs.statSync(outputPath).size;
        convertedCount++;
      }
    }
    console.log('');
  }

  // Summary
  const totalSavings = ((totalOriginalSize - totalWebpSize) / totalOriginalSize * 100).toFixed(1);
  console.log(`🎉 Conversion completed!`);
  console.log(`📊 Summary:`);
  console.log(`   Images converted: ${convertedCount}`);
  console.log(`   Original size: ${(totalOriginalSize / 1024).toFixed(1)}KB`);
  console.log(`   WebP size: ${(totalWebpSize / 1024).toFixed(1)}KB`);
  console.log(`   Total saved: ${totalSavings}%`);
  console.log('\n💡 Next steps:');
  console.log('   1. Update your React components to use .webp extensions');
  console.log('   2. Consider keeping original files as fallbacks');
  console.log('   3. Test that all images display correctly');
}

convertAllImages().catch(console.error);