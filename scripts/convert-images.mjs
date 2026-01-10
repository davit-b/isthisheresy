/**
 * Image Conversion Script
 * 
 * Converts PNG files in dev/native-png/ to WebP at multiple sizes
 * and outputs them to public/images/
 * 
 * Usage: npm run convert-images
 * 
 * Input:  dev/native-png/glyphosate.png
 * Output: public/images/glyphosate-thumb.webp   (200px wide, ~10KB)
 *         public/images/glyphosate-medium.webp  (1200px wide, ~200KB)
 *         public/images/glyphosate-large.webp   (2400px wide, ~500KB)
 *         public/images/glyphosate-original.webp (4800px wide, ~1.5MB)
 */

import sharp from 'sharp';
import { readdir, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const INPUT_DIR = './dev/native-png';
const OUTPUT_DIR = './public/images';

const SIZES = [
  { name: 'thumb', width: 200, quality: 80 },
  { name: 'medium', width: 1200, quality: 85 },
  { name: 'large', width: 2400, quality: 85 },
  { name: 'original', width: 4800, quality: 90 },
];

async function convertImages() {
  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  // Check if input directory exists
  if (!existsSync(INPUT_DIR)) {
    console.log(`\n❌ Input directory not found: ${INPUT_DIR}`);
    console.log(`\nCreate the directory and add your PNG files:`);
    console.log(`  mkdir -p ${INPUT_DIR}`);
    console.log(`  # Then drag your PNG files into ${INPUT_DIR}/\n`);
    process.exit(1);
  }

  // Get all PNG files
  const files = await readdir(INPUT_DIR);
  const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));

  if (pngFiles.length === 0) {
    console.log(`\n⚠️  No PNG files found in ${INPUT_DIR}`);
    console.log(`Add your infographic PNG files to that folder and run again.\n`);
    process.exit(0);
  }

  console.log(`\n🖼️  Found ${pngFiles.length} PNG file(s) to convert:\n`);

  for (const file of pngFiles) {
    const baseName = path.basename(file, '.png').toLowerCase().replace(/\s+/g, '-');
    const inputPath = path.join(INPUT_DIR, file);
    
    console.log(`  Converting: ${file}`);

    for (const size of SIZES) {
      const outputPath = path.join(OUTPUT_DIR, `${baseName}-${size.name}.webp`);
      
      try {
        await sharp(inputPath)
          .resize(size.width, null, { 
            withoutEnlargement: true,
            fit: 'inside'
          })
          .webp({ quality: size.quality })
          .toFile(outputPath);
        
        console.log(`    ✓ ${baseName}-${size.name}.webp (${size.width}px)`);
      } catch (err) {
        console.log(`    ✗ ${size.name}: ${err.message}`);
      }
    }
    console.log('');
  }

  console.log(`✅ Done! WebP files saved to ${OUTPUT_DIR}/\n`);
  
  // Remind about data/topics.ts
  console.log(`📝 Remember to update data/topics.ts with your new topics.`);
  console.log(`   Each topic needs an imageName that matches the base filename.`);
  console.log(`   Example: glyphosate.png → imageName: 'glyphosate'\n`);
}

convertImages().catch(console.error);
