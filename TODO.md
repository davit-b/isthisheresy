# Is This Heresy - TODO List

## High Priority

### 1. Homepage Redesign - Gold Styling
- [x] Invert gold styling: make the font/text gold instead of background fill
- [x] Current: gold background with black text
- [x] Target: transparent/dark background with gold text

### 2. Homepage Brick Styling
- [x] Reduce font weight on homepage bricks - currently too bold and hard to read
- [x] Font looks "fat" and difficult to parse
- [x] Adjust to more readable weight (maybe 500 or 600 instead of 700)

### 3. Favicon
- [x] Design and add favicon for the website
- [x] Add to `public/` directory
- [x] Update `app/layout.tsx` to include favicon link
- [x] Simple SVG: black circle with white "H"

### 4. Homepage Footer
- [x] Add footer to homepage with text: "the only constant is change"
- [x] Style to match the minimalist aesthetic

### 5. Fix Rail Flashing Animation
- [x] SECRET button appears briefly then disappears on navigation
- [x] Causes REQUEST button to shift down (layout jump)
- [x] Likely caused by localStorage check delay on mount
- [x] Fix: Use null loading state, only render SECRET after localStorage check

### 6. OpenGraph Meta Tags
- [x] Add OpenGraph tags for rich link previews
- [x] Each topic page should show:
  - Topic title (og:title)
  - Share snippet description (og:description)
  - Thumbnail image (og:image) - using infographic images
  - URL (og:url)
- [x] Add to dynamic `[topic]/page.tsx`
- [x] Fixed image paths to use -en-medium.webp with absolute URLs

### 7. SEO Improvements
- [x] Add proper meta descriptions for each page
- [x] Add structured data (JSON-LD) for articles
- [x] Optimize page titles
- [x] Add sitemap.xml (dynamic sitemap.ts)
- [x] Add robots.txt
- [x] Added canonical URLs
- [x] Homepage: WebSite schema
- [x] Topic pages: Article schema

### 8. Google Analytics
- [x] Google Analytics already set up and tracking
- [x] Events: brick clicks, topic reads, verify clicks, passcode attempts, requests, shares

## Completed
- [x] Add Google Analytics script to layout
- [x] Create analytics utility for event tracking
- [x] Add event tracking throughout the app
- [x] Fix top-level await build error (Redis singleton)
- [x] Fix BottomBar native share detection
- [x] Add section grouping to left rail
- [x] Rename "SALT SCAM" to "PINK SALT"
- [x] Add zoom controls to infographic viewer
- [x] Add verify button dropdown menu
- [x] Add padding (top/bottom) to infographic viewer

## Future / Low Priority
- [ ] Update data model to support language-specific image names
- [ ] Add language selector dropdown (hidden until translations exist)
- [ ] Implement language persistence and URL params (?lang=es)
- [ ] Secret section with passcode (already implemented)
- [ ] Request infographic feature (already implemented)
