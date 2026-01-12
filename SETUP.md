# Setup Instructions

## Redis Setup (Required for Request Submissions)

The "Request Infographic" feature uses Redis to store submissions and implement rate limiting.

### Setup Steps:

1. **Packages are already installed:**
   ```bash
   npm install redis  # Already done
   ```

2. **Create Redis database on Vercel:**
   ```bash
   vercel storage create redis
   ```

   Or via Vercel Dashboard:
   - Go to your project → Storage → Create Database → Redis (Upstash)

3. **Get your Redis URL:**
   ```bash
   vercel link
   vercel env pull .env.local
   ```

   This will create `.env.local` with:
   ```
   REDIS_URL="redis://default:xxxxx@region.upstash.io:6379"
   ```

4. **The API route is already configured:**

   The route at `app/api/submit-request/route.ts` uses:
   ```typescript
   import { createClient } from 'redis';
   const redis = await createClient({ url: process.env.REDIS_URL }).connect();
   ```

### Free Tier Limits (Upstash Redis):
- **Storage:** 256MB
- **Max commands/day:** 10,000
- **Max concurrent connections:** 100

For this use case (simple request submissions), the free tier is more than sufficient.

### Viewing Stored Requests:

**Option 1: Upstash Console**
- Go to Upstash Dashboard → Your Database → Data Browser
- Search for key: `infographic-requests`
- Use command: `LRANGE infographic-requests 0 -1`

**Option 2: Via Script**
Create a simple script to download all requests:

```typescript
// scripts/download-requests.ts
import { createClient } from 'redis';

const redis = await createClient({
  url: process.env.REDIS_URL
}).connect();

async function downloadRequests() {
  const requests = await redis.lRange('infographic-requests', 0, -1);
  console.log(JSON.stringify(requests.map(r => JSON.parse(r)), null, 2));
  await redis.quit();
}

downloadRequests();
```

## Google Analytics Setup

The site includes Google Analytics 4 (GA4) tracking for key user interactions.

### Setup Steps:

1. **Create a GA4 property:**
   - Go to [Google Analytics](https://analytics.google.com/)
   - Create a new GA4 property
   - Get your Measurement ID (format: `G-XXXXXXXXXX`)

2. **Add to environment variables:**
   ```bash
   # Add to .env.local (local development)
   NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

   # Add to Vercel (production)
   vercel env add NEXT_PUBLIC_GA_MEASUREMENT_ID
   ```

3. **Tracked events:**
   The following user interactions are automatically tracked:
   - `brick_click` - Homepage brick clicks
   - `topic_read` - Topic viewed for 3+ seconds
   - `verify_click` - AI verification button clicks (ChatGPT, Gemini, Grok)
   - `passcode_attempt` - Secret passcode attempts (success/fail)
   - `secret_unlocked` - Secret section unlocked
   - `infographic_request` - Request submissions (success/error)
   - `share` - Share button clicks (native/clipboard)
   - `language_change` - Language selector changes (when implemented)

4. **View events in GA4:**
   - Go to Reports → Engagement → Events
   - Create custom reports for specific event types
   - Set up conversion events for key actions

### Privacy Note:
No personally identifiable information (PII) is tracked. IP addresses are hashed before being stored in Redis for rate limiting.

## Multi-language Setup (Future)

When adding translations:

1. Create language folders in `dev/native-png/`:
   ```
   dev/native-png/
   ├── english/
   ├── spanish/
   ├── mandarin/
   └── russian/
   ```

2. Run conversion script:
   ```bash
   npm run convert-images
   ```

3. Update topic data model to include language-specific image names

## Secret Section

The passcode for unlocking secret content is: **6739**

Users discover this through social media hints or by guessing. Once unlocked, localStorage persists the unlock state.
