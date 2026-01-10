# Is This Heresy?

A minimalist infographic site for health information. No headers, no footers, no newsletter captures—just the content.

## Quick Start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Adding New Infographics

### Step 1: Add the PNG file

Drop your PNG file into the `dev/native-png/` folder:

```
dev/native-png/
  glyphosate.png    ← your 8K PNG files go here
  pufa.png
  fluoride.png
  ...
```

**Important:** The filename becomes the `imageName` in the data model. Use lowercase, no spaces (use hyphens if needed).

### Step 2: Convert to WebP

Run the conversion script:

```bash
npm run convert-images
```

This creates 4 sizes for each PNG in `public/images/`:

| Size | Width | Purpose | ~File Size |
|------|-------|---------|------------|
| thumb | 200px | Next preview thumbnail | ~10KB |
| medium | 1200px | Default load | ~200KB |
| large | 2400px | Retina/zoom | ~500KB |
| original | 4800px | Deep zoom | ~1.5MB |

Example output:
```
public/images/
  glyphosate-thumb.webp
  glyphosate-medium.webp
  glyphosate-large.webp
  glyphosate-original.webp
```

### Step 3: Add the topic data

Edit `data/topics.ts` and add a new entry:

```typescript
{
  id: 'glyphosate',           // URL slug (/glyphosate)
  brickTitle: 'GLYPHOSATE',   // One word for homepage (uppercase)
  longTitle: 'Glyphosate: The Antibiotic in Your Food',
  shareSnippet: 'Glyphosate is a patented antibiotic...',  // <160 chars
  imageName: 'glyphosate',    // Must match PNG filename
  verifyPrompt: `Verify these claims...`  // For AI verification
}
```

### Step 4: Done

The new infographic will appear on the homepage and have its own URL.

---

## Project Structure

```
isthisheresy/
├── app/
│   ├── page.tsx              # Homepage with brick mosaic
│   ├── [topic]/page.tsx      # Dynamic infographic pages
│   ├── layout.tsx            # Root layout, fonts, meta
│   └── globals.css           # Global styles
├── components/
│   ├── Brick.tsx             # Homepage brick button
│   ├── LeftRail.tsx          # Left sidebar with topic list
│   ├── InfographicViewer.tsx # Zoomable/pannable image viewer
│   └── BottomBar.tsx         # Verify buttons, share, next preview
├── data/
│   └── topics.ts             # All topic data (single source of truth)
├── dev/
│   └── native-png/           # Source PNGs (gitignored, not committed)
├── public/
│   └── images/               # Generated WebP files (committed)
├── scripts/
│   └── convert-images.mjs    # PNG → WebP conversion script
└── package.json
```

---

## Data Model

Each topic in `data/topics.ts`:

| Field | Description |
|-------|-------------|
| `id` | URL slug and unique identifier |
| `brickTitle` | One word for homepage mosaic (uppercase) |
| `longTitle` | Full title for page and OpenGraph |
| `shareSnippet` | Short description for sharing (<160 chars) |
| `imageName` | Base filename (must match PNG name) |
| `verifyPrompt` | Full prompt for AI fact-checking |

---

## Image Workflow

### Why this setup?

- **Source PNGs in `dev/native-png/`**: Your 30MB 8K originals. Gitignored because they're huge.
- **WebP in `public/images/`**: Optimized versions. Committed to git. Served to users.
- **One command converts all**: `npm run convert-images`

### Manual conversion (if needed)

If you need to convert manually or customize:

```bash
# Install sharp globally (optional)
npm install -g sharp-cli

# Or use ImageMagick
convert input.png -resize 1200x -quality 85 output-medium.webp
```

---

## Deployment

### Vercel (recommended)

```bash
npm install -g vercel
vercel
```

### Environment

No environment variables needed. Everything is static.

---

## OpenGraph / Social Sharing

Each topic page has OpenGraph meta tags automatically generated from the topic data:

- Title: `longTitle`
- Description: `shareSnippet`  
- Image: `{imageName}-medium.webp`

When someone shares a link to `/glyphosate`, iMessage/Twitter/etc will show the infographic preview.

---

## AI Verification URLs

The "Verify with ChatGPT/Gemini/Grok" buttons open each AI with a pre-filled prompt:

- **ChatGPT**: `https://chatgpt.com/?q={encoded_prompt}`
- **Gemini**: `https://gemini.google.com/app?q={encoded_prompt}`
- **Grok**: `https://x.com/i/grok?text={encoded_prompt}`

The prompt comes from the `verifyPrompt` field in each topic.

---

## Customization

### Adding more AI platforms

Edit `components/BottomBar.tsx`:

```typescript
const aiPlatforms = [
  { name: 'ChatGPT', baseUrl: 'https://chatgpt.com/', param: 'q' },
  { name: 'Gemini', baseUrl: 'https://gemini.google.com/app', param: 'q' },
  { name: 'Grok', baseUrl: 'https://x.com/i/grok', param: 'text' },
  // Add more here
];
```

### Changing the red accent color

Search for `#dc2626` in the codebase and replace.

### Changing the font

Edit `app/globals.css` to import a different font from Google Fonts, then update `font-family` references throughout.
