import { NextRequest, NextResponse } from 'next/server';
import { createHash } from 'crypto';
import { createClient } from 'redis';

// Yorùbá: ibi tí a ti ń fi àwọn ìbéèrè pamọ́
interface RequestData {
  timestamp: number;
  message: string;
  ipHash?: string;
}

// Create Redis client connection
const redis = await createClient({
  url: process.env.REDIS_URL
}).connect();

// Helper to get IP from request
function getClientIp(request: NextRequest): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  const realIp = request.headers.get('x-real-ip');
  const ip = forwardedFor?.split(',')[0] || realIp || 'unknown';
  return ip;
}

// Helper to hash IP for privacy
function hashIp(ip: string): string {
  return createHash('sha256').update(ip).digest('hex').slice(0, 16);
}

// Helper to hash content for deduplication
function hashContent(content: string): string {
  return createHash('sha256').update(content.trim().toLowerCase()).digest('hex');
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Please enter a valid request' },
        { status: 400 }
      );
    }

    if (message.length > 500) {
      return NextResponse.json(
        { error: 'Request too long (max 500 characters)' },
        { status: 400 }
      );
    }

    // Get IP and create hash
    const clientIp = getClientIp(request);
    const ipHash = hashIp(clientIp);

    // LAYER 1: Client-side throttle (handled in frontend with localStorage)

    // LAYER 2: IP-based rate limiting (3 requests per hour)
    const rateLimitKey = `ratelimit:${ipHash}`;
    const currentCount = await redis.get(rateLimitKey);

    if (currentCount && Number(currentCount) >= 3) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Please wait before submitting another request.' },
        { status: 429 }
      );
    }

    // Increment rate limit counter with 1-hour expiry
    await redis.incr(rateLimitKey);
    await redis.expire(rateLimitKey, 3600);

    // LAYER 3: Content deduplication (24 hours)
    const contentHash = hashContent(message);
    const dedupKey = `dedup:${contentHash}`;
    const isDuplicate = await redis.get(dedupKey);

    if (isDuplicate) {
      return NextResponse.json(
        { error: 'This request was already submitted recently' },
        { status: 409 }
      );
    }

    // Mark content as seen for 24 hours
    await redis.set(dedupKey, 'true', { EX: 86400 });

    // Store the request
    const requestData: RequestData = {
      timestamp: Date.now(),
      message: message.trim(),
      ipHash,
    };

    await redis.lPush('infographic-requests', JSON.stringify(requestData));

    // Igbo: ihe ịchọrọ enwetara nke ọma
    return NextResponse.json(
      { success: true, message: 'Request submitted successfully' },
      { status: 200 }
    );

  } catch (error: any) {
    console.error('[submit-request] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
