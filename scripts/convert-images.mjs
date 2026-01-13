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
 * Usage: npm run convert-images          # Incremental (only new/changed)
 *        npm run convert-images -- --force  # Force reconvert all
 */

// Yorùbá: ìṣẹ́ tí ó ń yí àwọn àwòrán padà
import sharp from 'sharp';
import { readdir, mkdir, stat } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Check if we should force reconversion of all images
const FORCE_ALL = process.argv.includes('--force');

const INPUT_DIR = './dev/native-png';
const OUTPUT_DIR = './public/images';

// AVIF is primary format (better compression, larger dimension support)
// WebP generated as fallback for older browsers
const SIZES = [
  { name: 'thumb', width: 200, quality: 80 },
  { name: 'medium', width: 1200, quality: 85 },
  { name: 'large', width: 2400, quality: 85 },
  { name: 'original', width: 4800, quality: 90 },
];

// Generate both AVIF and WebP for each size
const FORMATS = ['avif', 'webp'];

// OpenGraph image dimensions (standard: 1200x630)
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

// WebP max dimension (libwebp limit)
const WEBP_MAX_DIMENSION = 16383;

// Language code mapping
const LANGUAGE_CODES = {
  'english': 'en',
  'spanish': 'es',
  'mandarin': 'zh',
  'russian': 'ru',
};

/**
 * Check if conversion is needed by comparing modification times.
 * Returns true if output doesn't exist or source is newer than output.
 */
async function needsConversion(inputPath, outputPath) {
  if (FORCE_ALL) return true;
  if (!existsSync(outputPath)) return true;

  try {
    const [inputStat, outputStat] = await Promise.all([
      stat(inputPath),
      stat(outputPath)
    ]);
    // Convert if source PNG is newer than output WebP
    return inputStat.mtimeMs > outputStat.mtimeMs;
  } catch {
    return true; // If we can't check, convert anyway
  }
}

/**
 * Check if resizing to targetWidth would exceed WebP's max dimension.
 * Returns true if the resize would be valid, false if it would exceed limits.
 */
async function wouldExceedWebPLimit(inputPath, targetWidth) {
  try {
    const metadata = await sharp(inputPath).metadata();
    if (!metadata.width || !metadata.height) return false;

    // Calculate what the height would be at targetWidth
    const scaleFactor = targetWidth / metadata.width;
    const resultHeight = Math.round(metadata.height * scaleFactor);

    return resultHeight > WEBP_MAX_DIMENSION || targetWidth > WEBP_MAX_DIMENSION;
  } catch {
    return false; // If we can't check, try anyway
  }
}

/**
 * Generate OpenGraph image by cropping top portion of infographic.
 * Resizes to OG_WIDTH, then crops to OG_HEIGHT from the top.
 */
async function generateOgImage(inputPath, outputPath) {
  // First resize to OG_WIDTH, keeping aspect ratio
  const resized = sharp(inputPath).resize(OG_WIDTH, null, {
    withoutEnlargement: true,
    fit: 'inside'
  });

  // Get dimensions after resize
  const metadata = await resized.toBuffer().then(buffer => sharp(buffer).metadata());

  // If image is shorter than OG_HEIGHT after resize, just use it as-is (centered)
  if (metadata.height <= OG_HEIGHT) {
    await sharp(inputPath)
      .resize(OG_WIDTH, OG_HEIGHT, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 1 }
      })
      .webp({ quality: 85 })
      .toFile(outputPath);
  } else {
    // Crop top portion at OG_HEIGHT
    await sharp(inputPath)
      .resize(OG_WIDTH, null, { withoutEnlargement: true, fit: 'inside' })
      .extract({ left: 0, top: 0, width: OG_WIDTH, height: OG_HEIGHT })
      .webp({ quality: 85 })
      .toFile(outputPath);
  }
}

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
  let totalSkipped = 0;

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

        let convertedAny = false;
        let skippedAll = true;

        for (const size of SIZES) {
          for (const format of FORMATS) {
            // Skip WebP if it would exceed dimension limits (AVIF doesn't have this issue)
            if (format === 'webp' && await wouldExceedWebPLimit(inputPath, size.width)) {
              continue;
            }

            const outputFilename = `${baseName}-${langCode}-${size.name}.${format}`;
            const outputPath = path.join(OUTPUT_DIR, outputFilename);

            if (!await needsConversion(inputPath, outputPath)) {
              continue; // Skip - already up to date
            }

            if (!convertedAny) {
              console.log(`\n   Converting: ${file}`);
              convertedAny = true;
            }
            skippedAll = false;

            try {
              const pipeline = sharp(inputPath)
                .resize(size.width, null, {
                  withoutEnlargement: true,
                  fit: 'inside'
                });

              if (format === 'avif') {
                await pipeline.avif({ quality: size.quality }).toFile(outputPath);
              } else {
                await pipeline.webp({ quality: size.quality }).toFile(outputPath);
              }

              console.log(`     ✓ ${outputFilename} (${size.width}px)`);
              totalConverted++;
            } catch (err) {
              console.log(`     ✗ ${size.name}.${format}: ${err.message}`);
            }
          }
        }

        // Generate OG image (top-cropped for social sharing)
        const ogFilename = `${baseName}-${langCode}-og.webp`;
        const ogPath = path.join(OUTPUT_DIR, ogFilename);

        if (await needsConversion(inputPath, ogPath)) {
          if (!convertedAny) {
            console.log(`\n   Converting: ${file}`);
            convertedAny = true;
          }
          skippedAll = false;

          try {
            await generateOgImage(inputPath, ogPath);
            console.log(`     ✓ ${ogFilename} (${OG_WIDTH}x${OG_HEIGHT} OG)`);
            totalConverted++;
          } catch (err) {
            console.log(`     ✗ og: ${err.message}`);
          }
        }

        if (skippedAll) {
          totalSkipped++;
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

      let convertedAny = false;
      let skippedAll = true;

      for (const size of SIZES) {
        for (const format of FORMATS) {
          // Skip WebP if it would exceed dimension limits (AVIF doesn't have this issue)
          if (format === 'webp' && await wouldExceedWebPLimit(inputPath, size.width)) {
            continue;
          }

          const outputFilename = `${baseName}-${size.name}.${format}`;
          const outputPath = path.join(OUTPUT_DIR, outputFilename);

          if (!await needsConversion(inputPath, outputPath)) {
            continue; // Skip - already up to date
          }

          if (!convertedAny) {
            console.log(`\n   Converting: ${file}`);
            convertedAny = true;
          }
          skippedAll = false;

          try {
            const pipeline = sharp(inputPath)
              .resize(size.width, null, {
                withoutEnlargement: true,
                fit: 'inside'
              });

            if (format === 'avif') {
              await pipeline.avif({ quality: size.quality }).toFile(outputPath);
            } else {
              await pipeline.webp({ quality: size.quality }).toFile(outputPath);
            }

            console.log(`     ✓ ${outputFilename} (${size.width}px)`);
            totalConverted++;
          } catch (err) {
            console.log(`     ✗ ${size.name}.${format}: ${err.message}`);
          }
        }
      }

      // Generate OG image (top-cropped for social sharing)
      const ogFilename = `${baseName}-og.webp`;
      const ogPath = path.join(OUTPUT_DIR, ogFilename);

      if (await needsConversion(inputPath, ogPath)) {
        if (!convertedAny) {
          console.log(`\n   Converting: ${file}`);
          convertedAny = true;
        }
        skippedAll = false;

        try {
          await generateOgImage(inputPath, ogPath);
          console.log(`     ✓ ${ogFilename} (${OG_WIDTH}x${OG_HEIGHT} OG)`);
          totalConverted++;
        } catch (err) {
          console.log(`     ✗ og: ${err.message}`);
        }
      }

      if (skippedAll) {
        totalSkipped++;
      }
    }
  }

  if (totalConverted === 0 && totalSkipped === 0) {
    console.log(`\n⚠️  No images were converted.`);
    console.log(`\nAdd PNG files to language folders:`);
    console.log(`  ${INPUT_DIR}/english/`);
    console.log(`  ${INPUT_DIR}/spanish/`);
    console.log(`  ${INPUT_DIR}/mandarin/`);
    console.log(`  ${INPUT_DIR}/russian/\n`);
  } else if (totalConverted === 0 && totalSkipped > 0) {
    console.log(`\n✅ All ${totalSkipped} image(s) already up to date. Nothing to convert.`);
    console.log(`   Use --force to reconvert all images.\n`);
  } else {
    console.log(`\n✅ Done! ${totalConverted} WebP files converted.`);
    if (totalSkipped > 0) {
      console.log(`   ${totalSkipped} image(s) skipped (already up to date).`);
    }
    console.log(`   Use --force to reconvert all images.\n`);

    console.log(`📝 Remember to update data/topics.ts:`);
    console.log(`   - imageName should be the base filename without language code`);
    console.log(`   - Example: glyphosate-en-medium.webp → imageName: 'glyphosate'\n`);
  }
}

convertImages().catch(console.error);
