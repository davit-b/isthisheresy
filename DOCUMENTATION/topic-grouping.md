# Topic Grouping System

This document explains the virtual anchors system for grouping multiple rail entries under a single infographic image.

## Overview

The grouping system allows multiple topics to appear in the left rail while sharing a single image file. This improves **discoverability** (users see keywords like "ALKALOIDS", "LECTINS" in the rail) while maintaining a **seamless scrolling experience** (one tall stitched image).

## How It Works

### Data Model

Topics have these optional fields for grouping:

```typescript
interface Topic {
  // ... standard fields ...

  groupHost?: string;    // ID of the parent topic this belongs to
  groupOrder?: number;   // Order in the group (1, 2, 3...)
  scrollOffset?: number; // 0-1 percentage offset within the image
}
```

### Example: Antinutrients with 9 Slides

```typescript
// Parent topic - has the actual image
{
  id: 'antinutrients',
  brickTitle: 'ANTINUTRIENTS',
  imageName: 'plant_antinutrient_master',  // One tall stitched image
  section: 'Health Basics',
  // ... other fields
},

// Virtual anchor topics - no imageName, just scroll positions
{
  id: 'alkaloids',
  brickTitle: 'ALKALOIDS',
  groupHost: 'antinutrients',
  groupOrder: 1,
  scrollOffset: 0.111,  // 11.1% down (slide 2 of 9)
  section: 'Health Basics',
  // ... other fields (longTitle, shareSnippet, verifyPrompt, tags)
},
{
  id: 'lectins',
  brickTitle: 'LECTINS',
  groupHost: 'antinutrients',
  groupOrder: 2,
  scrollOffset: 0.222,  // 22.2% down (slide 3 of 9)
  section: 'Health Basics',
  // ...
},
// ... more virtual anchors
```

### Calculating scrollOffset

For equal-height slides:
- 9 slides = each is ~11.1% (0.111)
- Slide 2 starts at 11.1%, Slide 3 at 22.2%, etc.

For unequal-height slides, calculate based on actual pixel positions:
```
scrollOffset = pixelsFromTop / totalImageHeight
```

## Behavior

### Left Rail
- All topics (host + grouped) appear in the rail
- Grouped topics are **indented** and slightly smaller font
- Clicking a grouped topic navigates to `/{hostId}#{topicId}`

### Page Navigation
- Visiting `/alkaloids` redirects to `/antinutrients#alkaloids`
- The page scrolls to the percentage position within the image

### Next Button
- Navigates through grouped topics in order
- After the last grouped topic, moves to the next standalone topic

### Sharing
- Share button shares the host topic URL (not individual anchors)
- This keeps sharing simple - recipients see the full infographic

## Files Involved

| File | Purpose |
|------|---------|
| `data/topics.ts` | Topic interface and helper functions |
| `components/LeftRail.tsx` | Rail rendering with indentation |
| `components/MultiInfographicViewer.tsx` | Image + virtual anchors |
| `app/[topic]/page.tsx` | Redirect logic and viewer selection |
| `components/BottomBar.tsx` | Next button navigation |

## Helper Functions (topics.ts)

```typescript
isGroupHost(topicId)      // Returns true if other topics reference this as groupHost
getGroupedTopics(hostId)  // Returns [host, ...members] in order
getTopicUrl(topic)        // Returns "/{id}" or "/{hostId}#{id}"
getHostTopic(topic)       // Returns the host topic (or self if standalone)
getNextTopic(currentId)   // Group-aware next navigation
```

---

## Future: Separate Images System (Not Implemented)

If you need multiple **separate image files** stacked on one page (not stitched), here's how it would work:

### Concept
Each grouped topic would have its own `imageName`. The viewer would render them vertically with section dividers between.

### Data Model Change
```typescript
{
  id: 'glue-finish',
  brickTitle: 'GLUE & FINISH',
  imageName: 'glue_finish',      // Has its own image
  groupHost: 'wood-bamboo',
  groupOrder: 1,
  // NO scrollOffset - uses separate image
}
```

### Implementation Notes
1. Detect mode: if grouped topics have `imageName` → separate images mode
2. Render each image with `id={topic.id}` for native anchor scrolling
3. Add section labels between images
4. Track loading state per image

### When You'd Want This
- Keeping source files separate (easier updates)
- Images have different widths/formats
- Don't want to re-stitch when updating one section

To implement, modify `MultiInfographicViewer.tsx` to detect the mode and render accordingly.
