#!/usr/bin/env node
/**
 * Redis Request Viewer
 *
 * Simple script to view all infographic requests stored in Redis.
 *
 * Usage:
 *   node scripts/view-redis-requests.mjs
 *
 * Requirements:
 *   - REDIS_URL must be set in .env.local
 *   - redis package installed (already in package.json)
 */

import { createClient } from 'redis';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env.local') });

const REDIS_URL = process.env.REDIS_URL;

if (!REDIS_URL) {
  console.error('❌ Error: REDIS_URL not found in .env.local');
  console.error('   Please add REDIS_URL to your .env.local file');
  process.exit(1);
}

async function main() {
  console.log('🔌 Connecting to Redis...\n');

  const redis = createClient({ url: REDIS_URL });

  redis.on('error', (err) => {
    console.error('❌ Redis connection error:', err);
    process.exit(1);
  });

  await redis.connect();
  console.log('✅ Connected!\n');

  try {
    // Get all requests from the list
    const requests = await redis.lRange('infographic-requests', 0, -1);

    if (requests.length === 0) {
      console.log('📭 No requests found.');
      return;
    }

    console.log(`📬 Found ${requests.length} request(s):\n`);
    console.log('='.repeat(80));

    requests.forEach((requestJson, index) => {
      try {
        const request = JSON.parse(requestJson);
        const date = new Date(request.timestamp);

        console.log(`\n#${index + 1}`);
        console.log(`  Date: ${date.toLocaleString()}`);
        console.log(`  IP Hash: ${request.ipHash || 'N/A'}`);
        console.log(`  Message: ${request.message}`);
        console.log('-'.repeat(80));
      } catch (err) {
        console.error(`  ⚠️  Failed to parse request #${index + 1}:`, err.message);
      }
    });

    console.log(`\n✅ Displayed ${requests.length} request(s)\n`);

  } catch (error) {
    console.error('❌ Error fetching requests:', error);
  } finally {
    await redis.disconnect();
    console.log('🔌 Disconnected from Redis');
  }
}

main().catch((err) => {
  console.error('❌ Fatal error:', err);
  process.exit(1);
});
