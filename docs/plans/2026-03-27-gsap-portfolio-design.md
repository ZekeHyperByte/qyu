# GSAP-Powered Portfolio Design Document

## Overview
This document outlines the design for a clean, modern portfolio utilizing GSAP for advanced animations. The design will be based on the reference image showing a hero section with animated text and layered visual elements.

## Core Design Principles
1. **Minimalist Layout**: Clean whitespace with focus on content hierarchy
2. **GSAP-Powered Animations**: Advanced scroll-triggered and timeline animations
3. **Layered Visual Depth**: Multiple overlapping elements creating dimension
4. **Interactive Typography**: Animated text elements with GSAP
5. **Performance Optimized**: Efficient GSAP usage with proper cleanup

## Architecture Approach: GSAP with React via @gsap/react
We'll use the existing @gsap/react dependency to leverage GSAP's React expertise while maintaining Svelte as the primary framework.

### Component Structure
```
/src
  /lib
    /components
      /hero
        - AnimatedHero.svelte (new - replaces SwissHero)
        - AnimatedText.svelte (new - GSAP text animations)
        - LayeredBackground.svelte (new - visual depth elements)
      /about
        - AboutSection.svelte
      /projects
        - ProjectsGrid.svelte
        - ProjectCard.svelte
      /skills
        - SkillsSection.svelte
      /contact
        - ContactForm.svelte
  /routes
    +page.svelte (home)
    /about
      +page.svelte
    /projects
      +page.svelte
    /skills
      +page.svelte
    /contact
      +page.svelte
```

## Hero Section Design (Based on Reference)
The hero will feature:
1. **Centered Animated Text**: "QIU" or similar identifier with GSAP text animations
2. **Layered Background Elements**: Subtle geometric shapes with parallax
3. **GSAP ScrollTrigger**: Animations triggered on scroll
4. **Interactive Elements**: Hover states and micro-interactions

### Visual Elements:
- Primary text: Animated letter-by-letter or word-by-word appearance
- Secondary text: Fade-in/slide-up animations
- Background: Abstract shapes with slow drift animations
- Accent: Thin lines or dots with GSAP motion paths

## Animation Specifications
### Text Animations
- SplitText effect for character-level control
- Staggered reveal on load
- Subtle pulse/breathing animations when idle
- Hover effects for interactive text elements

### Scroll Animations
- ScrollTrigger-based reveal animations for sections
- Parallax effects for background elements
- Staggered animations for project cards/skills
- Smooth scroll behavior with GSAP

### Interactive Animations
- Button hover states with GSAP
- Card lift effects on hover
- Menu animations
- Form input focus animations

## Color Scheme & Typography
- **Primary**: Monochromatic with accent color (reference showed red accents)
- **Background**: Clean white or very light gray
- **Text**: Dark gray/black for readability
- **Accent**: Single brand color for highlights (to be determined)
- **Typography**: Clean, modern sans-serif (likely system fonts or similar to reference)

## Performance Considerations
1. **GSAP Optimization**: 
   - Use `gsap.context()` for proper cleanup
   - Limit concurrent animations
   - Use `requestAnimationFrame` where appropriate
2. **Lazy Loading**: Images and non-critical content
3. **CSS Containment**: Where applicable for layout performance
4. **Minimal DOM Operations**: GSAP properties over direct style manipulation

## Implementation Plan
1. Create new AnimatedHero component replacing SwissHero
2. Implement GSAP text animations using @gsap/react
3. Add layered background elements with subtle motion
4. Create additional sections (About, Projects, Skills, Contact)
5. Implement consistent GSAP animations across all sections
6. Add smooth scroll behavior and ScrollTrigger effects
7. Optimize for performance and cleanup

## Next Steps
After design approval, we'll:
1. Create the detailed implementation plan using writing-plans skill
2. Begin implementation with the AnimatedHero component
3. Progress through each section systematically