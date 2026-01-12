/**
 * Image Conversion Script
 *
 * Converts PNG files in dev/native-png/ to WebP at multiple sizes
 * and outputs them to public/images/
 *
 * Supports multi-language structure:
 *   dev/native-png/english/glyphosate.png    → public/images/glyphosate-en-medium.webp
 *   dev/native-png/spanish/glifosato.png     → public/images/glifosato-es-medium.webp
 *   dev/native-png/mandarin/草甘膦.png         → public/images/glyphosate-zh-medium.webp
 *   dev/native-png/russian/глифосат.png      → public/images/glyphosate-ru-medium.webp
 *
 * Falls back to root directory for backward compatibility:
 *   dev/native-png/glyphosate.png            → public/images/glyphosate-medium.webp
 *
 * Usage: npm run convert-images
 */

// Yorùbá: ìṣẹ́ tí ó ń yí àwọn àwòrán padà
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
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

// Language code mapping
const LANGUAGE_CODES = {
  'english': 'en',
  'spanish': 'es',
  'mandarin': 'zh',
  'russian': 'ru',
};

async function convertImages() {
  // Ensure output directory exists
  if (!existsSync(OUTPUT_DIR)) {
    await mkdir(OUTPUT_DIR, { recursive: true });
  }

  // Check if input directory exists
  if (!existsSync(INPUT_DIR)) {
    console.log(`\n❌ Input directory not found: ${INPUT_DIR}`);
    console.log(`\nCreate the directory and add your PNG files:`);
    console.log(`  mkdir -p ${INPUT_DIR}/english`);
    console.log(`  # Then drag your PNG files into ${INPUT_DIR}/english/\n`);
    process.exit(1);
  }

  let totalConverted = 0;

  // Process language subdirectories
  const entries = await readdir(INPUT_DIR, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory() && LANGUAGE_CODES[entry.name]) {
      const langFolder = entry.name;
      const langCode = LANGUAGE_CODES[langFolder];
      const langPath = path.join(INPUT_DIR, langFolder);

      console.log(`\n📁 Processing ${langFolder} (${langCode})...`);

      const files = await readdir(langPath);
      const pngFiles = files.filter(f => f.toLowerCase().endsWith('.png'));

      if (pngFiles.length === 0) {
        console.log(`   ⚠️  No PNG files found in ${langFolder}/`);
        continue;
      }

      for (const file of pngFiles) {
        const baseName = path.basename(file, '.png').toLowerCase().replace(/\s+/g, '-');
        const inputPath = path.join(langPath, file);

        console.log(`\n   Converting: ${file}`);

        for (const size of SIZES) {
          const outputFilename = `${baseName}-${langCode}-${size.name}.webp`;
          const outputPath = path.join(OUTPUT_DIR, outputFilename);

          try {
            await sharp(inputPath)
              .resize(size.width, null, {
                withoutEnlargement: true,
                fit: 'inside'
              })
              .webp({ quality: size.quality })
              .toFile(outputPath);

            console.log(`     ✓ ${outputFilename} (${size.width}px)`);
            totalConverted++;
          } catch (err) {
            console.log(`     ✗ ${size.name}: ${err.message}`);
          }
        }
      }
    }
  }

  // Also process root-level PNGs for backward compatibility (no language code)
  const rootFiles = await readdir(INPUT_DIR);
  const rootPngFiles = [];

  for (const file of rootFiles) {
    const filePath = path.join(INPUT_DIR, file);
    const stats = await stat(filePath);
    if (stats.isFile() && file.toLowerCase().endsWith('.png')) {
      rootPngFiles.push(file);
    }
  }

  if (rootPngFiles.length > 0) {
    console.log(`\n📁 Processing root-level PNGs (default/English)...`);

    for (const file of rootPngFiles) {
      const baseName = path.basename(file, '.png').toLowerCase().replace(/\s+/g, '-');
      const inputPath = path.join(INPUT_DIR, file);

      console.log(`\n   Converting: ${file}`);

      for (const size of SIZES) {
        const outputFilename = `${baseName}-${size.name}.webp`;
        const outputPath = path.join(OUTPUT_DIR, outputFilename);

        try {
          await sharp(inputPath)
            .resize(size.width, null, {
              withoutEnlargement: true,
              fit: 'inside'
            })
            .webp({ quality: size.quality })
            .toFile(outputPath);

          console.log(`     ✓ ${outputFilename} (${size.width}px)`);
          totalConverted++;
        } catch (err) {
          console.log(`     ✗ ${size.name}: ${err.message}`);
        }
      }
    }
  }

  if (totalConverted === 0) {
    console.log(`\n⚠️  No images were converted.`);
    console.log(`\nAdd PNG files to language folders:`);
    console.log(`  ${INPUT_DIR}/english/`);
    console.log(`  ${INPUT_DIR}/spanish/`);
    console.log(`  ${INPUT_DIR}/mandarin/`);
    console.log(`  ${INPUT_DIR}/russian/\n`);
  } else {
    console.log(`\n✅ Done! ${totalConverted} WebP files saved to ${OUTPUT_DIR}/\n`);

    console.log(`📝 Remember to update data/topics.ts:`);
    console.log(`   - imageName should be the base filename without language code`);
    console.log(`   - Example: glyphosate-en-medium.webp → imageName: 'glyphosate'\n`);
  }
}

convertImages().catch(console.error);
