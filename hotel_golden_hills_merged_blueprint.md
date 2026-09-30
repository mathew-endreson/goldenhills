# Merged Blueprint: Hotel Golden Hills (Sétif)

This document merges the two provided blueprints into a single, consolidated design-to-code reference for the Hotel Golden Hills website.

---

## 1. Brand Direction

Hotel Golden Hills is positioned as a boutique luxury property in Sétif, Algeria, combining Algerian hospitality, heritage cues, and contemporary premium design. The site should feel calm, elegant, and highly structured, with slow motion, generous spacing, and an intimate residential atmosphere.

The merged direction combines the first blueprint’s stronger asset mapping and section breakdown with the second blueprint’s clearer layout rules, animation guidance, and code sandbox framing.

---

## 2. Visual System

### 2.1 Color Palette

| Color Name | Hex Code | Primary Usage |
| :--- | :--- | :--- |
| Golden Hills Green | `#002D1D` | Primary brand anchor, footers, call-to-actions, active navigation, loading screens |
| Luxury Brass/Gold | `#C5A880` | Subheaders, highlight borders, active indicators, luxury detailing |
| Warm Off-White | `#FBF9F6` | Main background color for an airy luxury feel |
| Charcoal Black | `#1C1C1C` | Body copy and labels |
| Warm Gray | `#F4F2EE` | Inner containers, dividers, secondary card backdrops |

### 2.2 Typography

- **Primary headings:** Didot, Bodoni, or Playfair Display.
- **Body/UI text:** Montserrat, Jost, or Inter.
- **Heading style:** Uppercase, medium weight, wide tracking (`0.15em` to `0.25em`).
- **Body style:** Light to regular sans-serif with relaxed line height.

### 2.3 Layout Rules

- Use a `max-w-7xl` desktop container.
- Keep padding generous, especially in hero and feature sections.
- Favor asymmetric two-column layouts for storytelling blocks.
- Use slow hover and reveal transitions rather than sharp motion.

---

## 3. Asset Map

Use these image assets in `/public/images/`:

| File Name | Role |
| :--- | :--- |
| `logo-white.png` | Header branding, loader, footer branding |
| `facade-night.jpg` | Main homepage hero slide, footer background |
| `entrance-day.jpg` | Alternate hero slide, about page visual |
| `lobby-reception.jpg` | Contact header, lobby overview card |
| `lobby-lounge.jpg` | Welcome section background image |
| `cafe-lounge.jpg` | Coffee shop / lounge card and contact nook |
| `suite-king.jpg` | Senior suite showcase |
| `suite-king-detail.jpg` | Standard room card image |
| `room-twin.jpg` | Twin room showcase |
| `bathroom-marble.jpg` | Bathroom detail, amenities block |
| `dining-restaurant.jpg` | Dining section backdrop |
| `spa-pool.jpg` | Spa hero / wellness feature |
| `spa-sauna.jpg` | Spa gallery card |
| `spa-hammam.jpg` | Spa gallery card |

---

## 4. Full Page Structure

### 4.1 Global Header

- Centered logo with split navigation.
- Left nav: Rooms & Suites, Fine Dining, Wellness & Spa.
- Right nav: Contact, language selector, Book Now CTA.
- Sticky state changes after scroll past 50px from transparent to `#002D1D`.
- Active links and accents use brass/gold.

### 4.2 Hero Section

- Full-screen cross-fading carousel using `facade-night.jpg` and `entrance-day.jpg`.
- Centered overlay text:
  - Subtitle: “EXPERIENCE ALGERIAN HOSPITALITY”.
  - Title: “THE PERFECT BLEND OF HERITAGE AND LUXURY IN SÉTIF”.
- Add a floating booking widget at the base of the hero.
- Booking widget should include check-in, check-out, guests, and a bold green CTA.

### 4.3 Welcome Story

- Use a two-column asymmetric layout.
- Image side: `lobby-lounge.jpg`.
- Copy side: introduce the hotel as Sétif’s premium retreat, emphasizing calm, elegance, newly renovated rooms, and proximity to historical landmarks.

### 4.4 Rooms & Suites

Create a horizontal carousel or card grid depending on implementation choice.

- Standard Guest Room: `suite-king-detail.jpg`, 26 m², 1 King Bed.
- Twin Deluxe Room: `room-twin.jpg`, 26 m², 2 Single Beds, City View.
- Senior Suite: `suite-king.jpg`, 56 m², 1 King Bed + Lounge Area.
- Bathroom Detail: `bathroom-marble.jpg`, Travertine Marble, Glass Rain-Shower.

Additional room structure from the second blueprint can also be used:

- Standard Room: 26 m², 1 Single Bed.
- Standard Twin Room with City View: 26 m², 2 Single Beds.
- Junior Suite: 40 m², 1 Queen Bed + 1 Sofa Bed.
- Classic Suite: 53 m², 1 Queen Bed + 1 Single Bed.
- Senior Suite: 56 m², 1 King Bed + 1 Sofa Bed.

### 4.5 Fine Dining

- Use `dining-restaurant.jpg` as a full-width immersive panel.
- Overlay title: “GASTRONOMY AT GOLDEN HILLS”.
- Include references to Le Gastronome, La Pizzeria Italiana, and The Breakfast Club.
- Use a subtle dark overlay and a clean outline CTA.

### 4.6 Wellness & Spa

- Build a spa/wellness section using a masonry or split layout.
- Feature `spa-pool.jpg` as the hero image for wellness.
- Add `spa-sauna.jpg` and `spa-hammam.jpg` as supporting cards.
- Mention indoor pool, cedar sauna, Turkish bath, and traditional Hammam treatments.

### 4.7 Contact Detail Nook

- Use `cafe-lounge.jpg` for a refined contact or arrival block.
- Include map/location details for Sétif Railway Station and Kawthar Mosque proximity.
- Keep the layout asymmetrical and premium.

### 4.8 Footer

- Background: `#002D1D`.
- Accent: `#C5A880`.
- Text: cream/off-white.
- Include logo, address, phone numbers, email, and newsletter signup.
- Address: Rue Champs d'azur, Sétif, 19000, Algeria.
- Contacts: `+213 (0) 30 79 30 30`, `+213 (0) 770 51 53 59`, `contact@hotelgoldenhills.dz`.

---

## 5. Motion and Interaction

- Header transitions should be smooth and deliberate when scrolling.
- Reveal animations should fade in and move upward slightly.
- Image hover should scale slowly to around `1.04`.
- Use a luxury-feeling easing curve rather than fast UI motion.
- Booking controls and CTAs should feel restrained, elegant, and responsive.

Recommended motion settings:

```js
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, margin: "-10%" }}
transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
```

---

## 6. Suggested Component Architecture

A practical Next.js / Tailwind structure:

- `GlobalHeader`
- `HeroSlider`
- `BookingWidget`
- `WelcomeSection`
- `RoomsCarousel`
- `DiningFeature`
- `SpaSection`
- `ContactNook`
- `GlobalFooter`

Tailwind theme tokens should mirror the palette above, especially the green and brass identity.

---

## 7. Example Hero Component

```tsx
// components/GoldenHillsHero.tsx
import { motion } from 'framer-motion';

export default function GoldenHillsHero() {
  return (
    <section className="relative h-screen w-full bg-angleterre-cream overflow-hidden flex flex-col justify-between">
      <div className="absolute inset-0 z-0">
        <motion.img
          src="/images/facade-night.jpg"
          alt="Hotel Golden Hills Sétif"
          className="w-full h-full object-cover"
          initial={{ scale: 1.05, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="relative z-10 m-auto text-center max-w-4xl px-6 flex flex-col items-center">
        <motion.span
          className="text-angleterre-gold font-sans text-xs tracking-extreme uppercase mb-4"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Newly Renovated & Intimately Residential
        </motion.span>

        <motion.h1
          className="text-white font-serif text-4xl md:text-6xl tracking-widest uppercase leading-tight mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
        >
          Traditional Algerian Hospitality Meets Modern Luxury
        </motion.h1>
      </div>
    </section>
  );
}
```

---

## 8. Final Merge Notes

If you want a cleaner implementation, use the first blueprint for visual asset mapping and section content, and the second blueprint for layout rules, spacing, animation behavior, and developer-ready component framing. That combination gives the strongest practical foundation for building the site.

If you want, I can also turn this merged blueprint into a more polished production-ready version with cleaner wording and a tighter structure.
