# Swiss Style Hero Redesign - Design Document

## Overview
Redesign the current hero section to follow Swiss Style (International Typographic Style) principles while incorporating the existing image carousel functionality and all user requirements.

## Design Principles Applied
- **Grid System**: 12-column asymmetric grid layout
- **Typography**: Bold, condensed sans-serif (Inter with tight kerning)
- **Color Palette**: Black (#1A1A1A), White, Swiss Red (#E60012)
- **White Space**: Generous use as a design element
- **Asymmetry**: Information distributed across grid with visual hierarchy

---

## Layout Structure (12-Column Grid)

```
┌─────────────────────────────────────────────────────────────────────────┐
│ Header Row (Cols 1-12)                                                  │
│ ┌─────────────┬─────────────┬─────────────┬─────────────────────────┐   │
│ │ Selected    │ Local Time  │ Archive     │ Navigation              │   │
│ │ Works       │ 00:00:00    │ Nº 41       │ • Home                  │   │
│ │ 2020—2024   │ [INDONESIA] │             │ • Projects              │   │
│ │             │ #fullstack  │             │ • About                 │   │
│ │             │ #ML         │             │ • Contact               │   │
│ └─────────────┴─────────────┴─────────────┴─────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│ Hero Section                                                            │
│ ┌──────────────────────┬────────────────────────┬───────────────────┐  │
│ │                      │                        │                   │  │
│ │ MHMMD                │    [IMAGE CAROUSEL]    │  Description      │  │
│ │ FQ                   │                        │  ─────────        │  │
│ │ FRMNSYH              │    4:3 Aspect Ratio    │  "Code that       │  │
│ │                      │    Black pill frame    │   works on the    │  │
│ │   Red accent dot     │    White inner frame   │   first try is    │  │
│ │   on name            │    Cycling 41 images   │   suspicious.     │  │
│ │                      │    Counter: 01/41      │   Code that       │  │
│ │                      │                        │   works on the    │  │
│ │                      │                        │   41st try is     │  │
│ │                      │                        │   production."    │  │
│ │                      │                        │                   │  │
│ │                      │                        │                   │  │
│ └──────────────────────┴────────────────────────┴───────────────────┘  │
│                                                                         │
│                                          ┌─────────┐                   │
│                                          │    Q    │ ← Long shadow     │
│                                          │  (red)  │   letter in       │
│                                          └─────────┘   corner          │
├─────────────────────────────────────────────────────────────────────────┤
│ Footer                                                                  │
│ ┌─────────────┬─────────────┬─────────────────────┬─────────────────┐  │
│ │ Format      │ Typography  │ Social Hub          │ Status          │  │
│ │ 4:3 Swiss   │ Inter       │ IG • TW • LI • GH   │ [Red dot]       │  │
│ │ Grid        │ Neo-Grotesk │                     │ Available       │  │
│ └─────────────┴─────────────┴─────────────────────┴─────────────────┘  │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Detailed Specifications

### 1. Header Section

**Column 1-3 (Identity)**
- "Selected Works" label
- "2020 — 2024" date range (lighter weight)

**Column 4-6 (Status Info)**
- Live digital clock: `HH:MM:SS`
- Location: "INDONESIA" in Swiss Red
- Tags: "#fullstack #ML" in lighter weight

**Column 7-9 (Archive Counter)**
- "Archive" label
- "Nº 41" counter referencing the 41 images

**Column 10-12 (Navigation)**
- Right-aligned vertical stack:
  - Home
  - Projects
  - About
  - Contact
- Hover: Swiss Red color transition
- Active state: Star indicator (migrated from current implementation)

### 2. Hero Section

**Column 1-4 (Name)**
- Text: "MHMMD FQ FRMNSYH"
- Style: Ultra-bold, tight kerning, uppercase
- Size: Responsive (text-7xl md:text-8xl lg:text-[10rem])
- Line height: 0.85
- Swiss Red dot accent after name or integrated

**Column 5-9 (Image Frame)**
- Maintain current 3-layer pill frame:
  - Outer: Black pill (2px padding)
  - Middle: White pill (4px gap)
  - Inner: Image container with 4:3 aspect ratio
- Image cycling every 2 seconds (41 images)
- Counter positioned outside right: "01/41" with slide animation
- Grayscale filter that removes on hover (optional enhancement)

**Column 10-12 (Description)**
- Horizontal rule (hairline) above
- "About" header (small, uppercase, tracking-wide)
- Humorous bio text:
  > "Code that works on the first try is suspicious. Code that works on the 41st try is production."
  > 
  > Building things that shouldn't work but do. Fullstack developer with ML experiments on the side. Probably debugging something right now.

### 3. Corner Element

**Position**: Bottom-right of viewport, overlapping grid
- Large 'Q' letter in Swiss Red
- Long shadow extending diagonally (CSS box-shadow technique)
- Acts as both decorative element and signature
- Size: ~8rem on desktop

### 4. Footer Section

Four columns:
1. **Format**: "4:3 Variable Swiss Grid"
2. **Typography**: "Inter / Neo-Grotesque"
3. **Social Hub**: Instagram, Twitter/X, LinkedIn, GitHub icons/links
4. **Status**: Green/red availability indicator with "Available for work" text

---

## Typography Scale

| Element | Size | Weight | Tracking | Notes |
|---------|------|--------|----------|-------|
| Hero Name | 10rem (desktop) | 900 (Black) | -0.06em | Tight kerning |
| Nav Items | 10px | 700 | 0.15em | Uppercase |
| Labels | 9-10px | 700 | 0.15em | Uppercase, often muted |
| Clock | 12px | 700 | Monospace | Live updating |
| Body Text | 12px | 400 | -0.02em | Line-height 1.4 |
| Tags | 10px | 500 | 0.1em | Lowercase with # |

---

## Color Palette

- **Primary Black**: `#1A1A1A` (text, borders)
- **Swiss Red**: `#E60012` (accents, hover states, Q letter)
- **White**: `#FFFFFF` (background)
- **Muted**: `opacity: 0.4-0.6` (secondary info)
- **Hairline**: `border-color: rgba(0,0,0,0.1)`

---

## Responsive Behavior

**Mobile (< 768px)**:
- Stack to single column
- Hide archive column
- Name takes full width
- Image frame maintains 4:3, centered
- Description below image
- Q letter smaller, positioned bottom-right
- Navigation becomes hamburger or horizontal

**Tablet (768px - 1024px)**:
- 2-column layout
- Name + Image side by side
- Description below

**Desktop (> 1024px)**:
- Full 12-column grid
- All elements visible
- Large Q letter in corner

---

## Animation Specifications

1. **Image Carousel**:
   - Hard cut transition (no fade)
   - 2-second interval
   - Preload all 41 images
   - Counter slides up/down with number change

2. **Clock**:
   - Updates every second
   - No animation (instant update)

3. **Hover States**:
   - Nav: Color transition to Swiss Red (300ms)
   - Image: Optional grayscale removal (1000ms)
   - Links: Opacity or color shift

4. **Q Letter Shadow**:
   - Static long shadow using CSS
   - Multiple box-shadow layers for depth

---

## Files to Modify

1. `/home/qiu/Work/Web Portfolio/src/routes/+page.svelte` - Replace Hero component import with new SwissHero
2. `/home/qiu/Work/Web Portfolio/src/lib/components/hero/Hero.svelte` - Complete redesign
3. `/home/qiu/Work/Web Portfolio/src/lib/components/hero/TransparentNav.svelte` - Adapt for Swiss style
4. `/home/qiu/Work/Web Portfolio/src/lib/components/hero/RandomName.svelte` - Keep image logic, update layout
5. `/home/qiu/Work/Web Portfolio/src/lib/components/hero/LiveTime.svelte` - Update styling
6. `/home/qiu/Work/Web Portfolio/src/lib/components/hero/Location.svelte` - Update styling
7. `/home/qiu/Work/Web Portfolio/src/app.css` - Add Swiss style utilities

---

## New Components to Create

1. `SwissHero.svelte` - Main container with 12-column grid
2. `HeroHeader.svelte` - Top row with clock/location/archive/nav
3. `HeroName.svelte` - Large typography component
4. `HeroDescription.svelte` - Bio section
5. `HeroFooter.svelte` - Bottom info bar
6. `QLetter.svelte` - Decorative Q with long shadow
7. `SwissNav.svelte` - Redesigned navigation for grid layout

---

## Migration Strategy

1. Keep existing image carousel logic from `RandomName.svelte`
2. Keep star navigation animation from `TransparentNav.svelte`
3. Keep live time from `LiveTime.svelte`
4. Keep location from `Location.svelte`
5. Reposition all elements into 12-column grid
6. Apply Swiss style typography and spacing
7. Add new Q letter component
8. Update color scheme to Swiss Red accent

---

## Success Criteria

- [ ] 12-column grid layout implemented
- [ ] "MHMMD FQ FRMNSYH" displayed in large bold typography
- [ ] Q letter with long shadow visible in bottom-right corner
- [ ] All 41 images cycling in 4:3 frame with counter
- [ ] Live clock displaying current time
- [ ] Location showing "INDONESIA" in Swiss Red
- [ ] Tags "#fullstack #ML" visible
- [ ] Humorous bio description present
- [ ] 4 navigation items (Home/Projects/About/Contact) working
- [ ] Social links in footer
- [ ] Responsive on mobile/tablet/desktop
- [ ] Swiss Red (#E60012) used for accents
- [ ] Inter font with tight kerning applied

---

*Design approved by user on 2025-03-18*
