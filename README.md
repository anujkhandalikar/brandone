# Mokobara Products Viewer

React app with responsive product carousel - mobile optimized with desktop fallback.

## Quick Start

```bash
npm install
npm run dev
```

Opens at `http://localhost:5173/`

## Scripts

- `npm run dev` — Start dev server
- `npm run build` — Build for production
- `npm run preview` — Preview production build

## Files

- **App.jsx** — Main app (responsive router)
- **products-mobile.jsx** — Mobile-optimized viewer with swipe gestures
- **index.css** — Tailwind + global styles
- **vite.config.js** — Vite configuration
- **tailwind.config.js** — Tailwind configuration

## Features

### Mobile
- Swipe left/right navigation
- Haptic feedback
- Fullscreen image + bottom card layout
- Progress dots (clickable)
- Touch-optimized buttons (44px+ targets)
- Image lazy loading with skeleton

### Desktop
- Larger layout (max-w-sm)
- Traditional button navigation
- Same visual design

## Responsive Breakpoint

- < 768px: Mobile viewer
- ≥ 768px: Desktop viewer

## Deployment

Push to GitHub and connect to Vercel. Build command: `npm run build`. Output: `dist/`

See [MOBILE_IMPLEMENTATION_PLAN.md](./MOBILE_IMPLEMENTATION_PLAN.md) for full feature details.
