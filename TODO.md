# Is This Heresy - TODO List

## High Priority

### 1. Homepage Redesign - Gold Styling
- [ ] Invert gold styling: make the font/text gold instead of background fill
- [ ] Current: gold background with black text
- [ ] Target: transparent/dark background with gold text

### 2. Homepage Brick Styling
- [ ] Reduce font weight on homepage bricks - currently too bold and hard to read
- [ ] Font looks "fat" and difficult to parse
- [ ] Adjust to more readable weight (maybe 500 or 600 instead of 700)

### 3. Favicon
- [ ] Design and add favicon for the website
- [ ] Add to `public/` directory
- [ ] Update `app/layout.tsx` to include favicon link

### 4. Homepage Footer
- [ ] Add footer to homepage with text: "the only constant is change"
- [ ] Style to match the minimalist aesthetic

### 5. Fix Rail Flashing Animation
- [ ] SECRET button appears briefly then disappears on navigation
- [ ] Causes REQUEST button to shift down (layout jump)
- [ ] Likely caused by localStorage check delay on mount
- [ ] Fix: either pre-render with correct state or prevent flash with CSS

### 6. OpenGraph Meta Tags
- [ ] Add OpenGraph tags for rich link previews
- [ ] Each topic page should show:
  - Topic title (og:title)
  - Share snippet description (og:description)
  - Thumbnail image (og:image) - need to generate preview images
  - URL (og:url)
- [ ] Add to dynamic `[topic]/page.tsx`
- [ ] Generate social preview images for each infographic

### 7. SEO Improvements
- [ ] Add proper meta descriptions for each page
- [ ] Add structured data (JSON-LD) for articles
- [ ] Optimize page titles
- [ ] Add sitemap.xml
- [ ] Add robots.txt
- [ ] Improve semantic HTML structure

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
