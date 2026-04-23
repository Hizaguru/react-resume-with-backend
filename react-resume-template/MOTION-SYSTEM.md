# Motion System

Site-wide animation language for the resume. Designed to feel like a premium
product site: restrained, cohesive, hardware-accelerated, accessible.

> All animations animate **only** `transform` and `opacity`. No layout-shifting
> properties (height/width/margin/top/left) are ever animated. Everything is
> overridden to a no-op when the user prefers reduced motion.

---

## 1. Where to look

| File | What it owns |
|---|---|
| [src/components/motion/tokens.ts](src/components/motion/tokens.ts) | Easings, durations, distances, stagger timings, reusable variants |
| [src/components/motion/Reveal.tsx](src/components/motion/Reveal.tsx) | Single-element scroll reveal (fade + translate / scale) |
| [src/components/motion/Stagger.tsx](src/components/motion/Stagger.tsx) | `<StaggerGroup>` parent + `<StaggerItem>` children |
| [src/components/motion/Parallax.tsx](src/components/motion/Parallax.tsx) | Scroll-linked Y / scale parallax wrapper |
| [src/components/motion/HoverLift.tsx](src/components/motion/HoverLift.tsx) | Spring-based card hover (lift + soft scale) |
| [src/components/motion/MagneticButton.tsx](src/components/motion/MagneticButton.tsx) | Pointer-tracking CTA button (existing, kept) |
| [src/components/motion/MotionFadeIn.tsx](src/components/motion/MotionFadeIn.tsx) | Legacy fade-up — kept for back-compat, now routed through tokens |
| [src/components/motion/index.ts](src/components/motion/index.ts) | Barrel export |
| [src/globals.css](src/globals.css) | CSS-only fallback keyframes + global reduced-motion kill-switch |

---

## 2. Animation choices (why each effect exists)

| Effect | Where | Why |
|---|---|---|
| **Layered hero entrance** (stagger fade-up of headline → CTAs) | `Hero/index.tsx` | Above-the-fold first impression; sequencing creates focus and rhythm. |
| **Scroll-linked parallax on hero photo + mist** | `Hero/AnimatedGradientBg.tsx` | Adds depth without distraction; bound to the hero's own scroll progress (not page scroll) so it fades cleanly when the hero leaves view. |
| **Soft scale-in on portrait** | `About.tsx` | A scale entrance feels more "intentional" than a slide for a focal image. |
| **Stagger fade-up on tile grid** | `Expertise/index.tsx`, `Projects/index.tsx`, About items, Contact items, Contact form | Repeated elements feel coordinated rather than chaotic — the eye reads them in order. |
| **Card HoverLift (spring)** | `Projects/ProjectCard.tsx` | Replaces ad-hoc `hover:-translate-y-1` with a spring transition for "weight" — the card feels physical. Tap-back gives tactile feedback. |
| **Image zoom on hover** | `ProjectCard` (CSS transition) | Pure CSS — cheap, smooth, no JS overhead per card. |
| **Magnetic CTA buttons** | Hero CTAs (existing) | Subtle pointer-tracking on primary action. Already in place. |
| **Re-stagger on tab change** | `Projects/index.tsx` (`key={filter}`) | Forces remount of the StaggerGroup when category changes → cards re-enter staggered, reinforcing the filter action. |
| **Sliding nav underline** (`layoutId`) | `Header.tsx` | Active section indicator slides between items instead of fading — characteristic of premium sites. |
| **Scroll-progress accent line** | `Header.tsx` | Thin gradient bar at header's bottom edge, scaled by spring-smoothed `scrollYProgress`. Calm, ambient, informative. |
| **Header slide-down + fade on mount** | `Header.tsx` | The nav settles in after content has loaded, not before. |
| **Mobile menu spring slide-in** | `Header.tsx` | Springs (rather than linear) read as "physical" panels on touch devices. |
| **Animated dot indicator** | `Testimonials.tsx` | Active dot widens and glows; inactive dots scale on hover — far more affordant than a flat color swap. |
| **Testimonial card scale + fade** | `Testimonials.tsx` | Soft scale (0.98 → 1.0) alongside opacity makes transitions feel like layered cards rather than crossfade. |
| **Magnetic back-to-top button** | `Footer.tsx` | Mirrors hero CTA personality at the bottom — bookends the experience. |
| **Form field stagger + focus glow** | `Contact/ContactForm.tsx` | Field-by-field reveal on entry; subtle violet glow on focus reinforces brand. |

---

## 3. The token-driven design system

Edit [tokens.ts](src/components/motion/tokens.ts) to retune the entire site:

```ts
EASE_OUT      = [0.22, 1, 0.36, 1]   // primary easing (snappy in, soft out)
EASE_IN_OUT   = [0.65, 0, 0.35, 1]   // ambient/looping motion
DURATION      = { fast: 0.18, base: 0.45, slow: 0.7 }
DISTANCE      = { sm: 8, md: 16, lg: 32 }   // translate offsets in px
STAGGER       = { tight: 0.04, base: 0.08, loose: 0.12 }   // seconds between siblings
VIEWPORT_DEFAULT = { once: true, margin: '-80px 0px -80px 0px', amount: 'some' }
```

**Want everything snappier?** Drop `DURATION.base` to `0.32`.
**Want reveals sooner?** Change `VIEWPORT_DEFAULT.margin` to `'-40px'` (smaller = trigger later, larger = trigger earlier).
**Want everything to re-animate on every scroll back?** Change `once: true` → `false`.
**Want a different feel?** Swap `EASE_OUT`. Common alternatives:
  - `[0.16, 1, 0.3, 1]` — softer
  - `[0.4, 0, 0.2, 1]` — Material standard
  - `[0.34, 1.56, 0.64, 1]` — playful overshoot

---

## 4. How to add motion to new components

```tsx
import {Reveal, StaggerGroup, StaggerItem, HoverLift, Parallax} from '@/components/motion';

// Single element scroll reveal:
<Reveal direction="up" delay={0.1}>
  <h2>Hello</h2>
</Reveal>

// Stagger a list:
<StaggerGroup as="ul" stagger={0.06}>
  {items.map(item => (
    <StaggerItem as="li" key={item.id}>
      <Card item={item} />
    </StaggerItem>
  ))}
</StaggerGroup>

// Premium card hover:
<HoverLift>
  <Card>…</Card>
</HoverLift>

// Scroll-linked parallax:
<Parallax offset={40} withScale>
  <Image src="/hero.jpg" alt="" />
</Parallax>
```

### Rules

1. Don't put `initial` / `whileInView` on `<StaggerItem>` — its parent orchestrates the trigger.
2. Don't nest `<Reveal>` inside another `<Reveal>` — only the outer one's viewport check fires.
3. Avoid animating elements taller than the viewport — they may never trigger `once: true`.
4. For above-the-fold elements, animate on mount (`initial` + `animate`) instead of `whileInView`.

---

## 5. Performance notes

- **GPU-only properties.** Every animated property is `transform` (translate/scale/rotate) or `opacity`. Browsers composite these on the GPU without a layout/paint pass.
- **`will-change` is used sparingly.** Only added where transitions are guaranteed (e.g. testimonial cards). Overusing `will-change` actually hurts performance.
- **`viewport.once: true`** by default — animations fire once, then are inert. No scroll listeners running per element.
- **`useScroll` is element-scoped** in `<Parallax>` and `AnimatedGradientBg` — a single `IntersectionObserver` per element rather than a global scroll listener.
- **Springs are configured for short settle times** (`damping: 22–32`) to avoid the lingering "wobble" that feels unprofessional.
- **No layout shift.** Reveals always animate to the element's natural position. The element occupies its space immediately; only opacity/transform change.

---

## 6. Accessibility

- `useReducedMotion()` is checked inside every motion component — under reduced-motion preference, components render their children inline with **no animation, no transform, no opacity transition**.
- A global CSS rule in [globals.css](src/globals.css) cancels every CSS animation/transition site-wide under `prefers-reduced-motion: reduce`. This catches anything that bypassed framer-motion (3rd-party libraries, ad-hoc Tailwind transitions).
- Focus rings are preserved on all interactive elements — animations never remove focus indicators.
- `aria-hidden` on decorative motion (parallax wrappers, progress bar, animated underlines).

---

## 7. CSS-only fallback

If you ever need to animate something **without framer-motion** (server-rendered content before JS boots, an extracted snippet, or a totally JS-free deployment), use the data-attribute API defined in [globals.css](src/globals.css):

```html
<div data-anim="fade-up">…</div>
<div data-anim="fade-up" style="animation-delay: 120ms">…</div>
<div data-anim="fade-down">…</div>
<div data-anim="scale-in">…</div>
```

The keyframes use the same `cubic-bezier(0.22, 1, 0.36, 1)` curve and the same 450ms duration as the framer-motion `Reveal` component, so they look identical.

To stagger a list with CSS only:

```html
<ul>
  <li data-anim="fade-up" style="animation-delay: 0ms">First</li>
  <li data-anim="fade-up" style="animation-delay: 60ms">Second</li>
  <li data-anim="fade-up" style="animation-delay: 120ms">Third</li>
</ul>
```

The fallback **does not** scroll-trigger (CSS can't observe viewport without JS). It plays on first paint. For above-the-fold content this is identical to the framer-motion behaviour. For below-the-fold content the framer-motion version will be more polished — the CSS fallback simply shows everything immediately on load.

The whole `[data-anim]` block is wrapped in `@media (prefers-reduced-motion: no-preference)`, and the global reduced-motion kill-switch nukes any straggling animations.

---

## 8. Customization recipes

**Make hero feel more dramatic:**
- `Hero/index.tsx`: increase `staggerChildren` from `STAGGER.loose` (0.12) to `0.2`, and child duration from `0.7` to `0.9`.

**Make project cards more aggressive on hover:**
- `ProjectCard.tsx`: `<HoverLift lift={-8} scale={1.02}>`.

**Calmer parallax on hero:**
- `AnimatedGradientBg.tsx`: change `photoY` range `'12%'` → `'5%'`, `photoScale` `1.08` → `1.03`.

**Disable parallax entirely:**
- Replace the `<motion.div style={{y: photoY, scale: photoScale}}>` wrapper with a plain `<div>`.

**More delicate testimonial transitions:**
- `Testimonials.tsx` `TestimonialCard`: change `scale-[0.98]` → `scale-[0.995]` and `duration-700` → `duration-500`.
