# Logo Placement Guide — Code9 Fitness v3.0

**Date:** 2026-10-21  
**Status:** ✅ COMPLETE

---

## 📍 Logo Placements

### **Light Theme Pages** (Warm-Sand: Light Cream Backgrounds)
Use: `code9-logo-dark.svg`

| Page | Location | Component | Size |
|------|----------|-----------|------|
| **Header** | Top Left | `/src/components/HeaderNav.tsx` | 32px |
| **Resources Hub** | Hero Section Left | `/src/app/resources/page.tsx` | 80px |
| **Wellness Guide** | Header Section | `/src/app/resources/wellness-guide/page.tsx` | 56px |
| **Fascia Guide** | Header Section | `/src/app/resources/fascia-guide/page.tsx` | 56px |

---

### **Dark Theme Pages** (Signature: Dark Green Backgrounds)
Use: `code9-logo-cream-transparent.svg`

| Page | Location | Component | Size |
|------|----------|-----------|------|
| **Login Form** | Header Center | `/src/app/login/page.tsx` | 56px |
| **Onboarding** | Top Left | `/src/app/onboarding/page.tsx` | 40px |
| **Coaching Preferences** | Header Section | `/src/components/CoachingPreferencesForm.tsx` | 56px |

---

## 🎯 Theme Strategy

### Warm-Sand Theme (Light)
- **Background:** #f5f1e8 (cream)
- **Logo:** `code9-logo-dark.svg` (dark logo on light background)
- **Pages:** Homepage, Resources, Guides, Marketing
- **Style:** Professional, readable, high contrast

### Signature Theme (Dark)
- **Background:** #03110d (very dark green)
- **Logo:** `code9-logo-cream-transparent.svg` (light logo on dark background)
- **Pages:** Login, Onboarding, Dashboard, Product
- **Style:** Premium, branded, cohesive

---

## 🖼️ Logo Asset Details

### Available Logos (in `/public/`)

**Dark Logos:**
- `code9-logo-dark.svg` — Full dark logo, light background
- `code9-logo-ink-transparent.svg` — Dark logo with transparency
- `code9-logo-horizontal.svg` — Horizontal format (dark)

**Light Logos:**
- `code9-logo-cream-transparent.svg` — Light/cream logo, dark background
- `code9-logo-horizontal-cream.svg` — Horizontal format (cream)

**Alternative:**
- `code9-logo-primary.svg` — Brand primary color

---

## ✨ Implementation Details

### Header Navigation
- **File:** `/src/components/HeaderNav.tsx`
- **Logo:** Dark (32px)
- **Position:** Top left, next to navigation
- **Behavior:** Clickable link to homepage
- **Theme:** Warm-sand (light background)

### Resources Hub
- **File:** `/src/app/resources/page.tsx`
- **Logo:** Dark (80px)
- **Position:** Hero section, left of title
- **Alignment:** Flex layout with 8px gap
- **Theme:** Warm-sand (light background)

### Resource Guides
- **Files:** 
  - `/src/app/resources/wellness-guide/page.tsx`
  - `/src/app/resources/fascia-guide/page.tsx`
- **Logo:** Dark (56px)
- **Position:** Header section, left of title
- **Alignment:** Flex layout with 6px gap
- **Theme:** Warm-sand (light background)

### Login Form
- **File:** `/src/app/login/page.tsx`
- **Logo:** Cream (56px)
- **Position:** Header center, above title
- **Alignment:** Centered with image
- **Theme:** Signature (dark background)
- **Form Theme:** `data-theme="signature"`

### Onboarding Flow
- **File:** `/src/app/onboarding/page.tsx`
- **Logo:** Cream (40px)
- **Position:** Top left, clickable link to homepage
- **Theme:** Signature (dark background)
- **Theme Controller:** `<ThemeController theme="signature" />`

### Coaching Preferences
- **File:** `/src/components/CoachingPreferencesForm.tsx`
- **Logo:** Dark (56px)
- **Position:** Header section, left of title (when showHeader={true})
- **Alignment:** Flex layout with 6px gap
- **Theme:** Warm-sand (light background)
- **Note:** Used in both onboarding and account settings

---

## 📝 Code Pattern

### Standard Logo Implementation

```typescript
import Image from 'next/image';

// In JSX
<Link href="/">
  <Image 
    src="/code9-logo-dark.svg" 
    alt="Code9 Fitness" 
    width={56} 
    height={56}
    style={{ height: '56px', width: 'auto' }}
  />
</Link>
```

**Key Points:**
- Always use `next/image` (optimized, lazy-loaded)
- Set `height: 56px, width: 'auto'` to maintain aspect ratio
- Include `alt` text for accessibility
- `width`/`height` props define image dimensions (can be placeholder)

---

## 🎨 Logo Selection Decision Tree

```
Is background light (cream, white)?
  ├─ YES → Use code9-logo-dark.svg
  └─ NO → Use code9-logo-cream-transparent.svg

Is this a text-only area?
  ├─ YES → Consider adding logo
  └─ NO → Logo already integrated

Is logo clickable?
  ├─ YES → Wrap in <Link href="/">
  └─ NO → Just display image
```

---

## ✅ Checklist

- [x] Header Navigation logo added
- [x] Resources hub logo added
- [x] Wellness guide logo added
- [x] Fascia guide logo added
- [x] Login form logo added
- [x] Onboarding flow logo added
- [x] Coaching preferences logo added
- [x] All logos copied to `/public/`
- [x] All imports updated to use `next/image`
- [x] Theme-aware logo selection applied
- [x] Professional sizing and alignment
- [x] Accessibility (alt text) included

---

## 🚀 Testing

**Visual Checks:**
- [ ] Logos display correctly on light backgrounds
- [ ] Logos display correctly on dark backgrounds
- [ ] No distortion or sizing issues
- [ ] Professional spacing and alignment
- [ ] Clickable logos work (navigation)
- [ ] Mobile responsive (logos scale well)

**URL Testing:**
- [ ] http://localhost:3000 (homepage with header)
- [ ] http://localhost:3000/resources (resources hub)
- [ ] http://localhost:3000/resources/wellness-guide
- [ ] http://localhost:3000/resources/fascia-guide
- [ ] http://localhost:3000/login (dark form)
- [ ] http://localhost:3000/onboarding (dark flow)

---

## 📱 Responsive Behavior

All logos use responsive sizing:
- **Header:** 32px (stays small for navigation)
- **Page Headers:** 56-80px (scales on larger screens)
- **Forms:** 56px (centered and prominent)

The `width: auto` approach ensures aspect ratio is preserved at any size.

---

## 🔄 Brand Consistency

✅ **Light backgrounds** → Dark logo (maximum contrast)  
✅ **Dark backgrounds** → Cream/light logo (professional appearance)  
✅ **Consistent sizing** → 32px to 80px depending on context  
✅ **Professional spacing** → Gap-based layouts for alignment  
✅ **Clickable branding** → Logos link to homepage  
✅ **Accessibility** → Alt text on all images  

**Result:** Cohesive, professional brand experience across all pages.

