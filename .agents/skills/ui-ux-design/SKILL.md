---
name: ui-ux-design
description: >
  Use this skill whenever designing, building, or refining frontend UI/UX, portfolio layouts,
  typography, color systems, micro-animations, component styling, or mobile responsiveness.
  Combines visual frontend design, recruiter portfolio standards, and clean CSS design tokens into a single unified system.
---

# UI/UX & Portfolio Design System

This skill combines **Frontend Visual Aesthetics**, **Interactive Portfolio Optimization**, and **Clean CSS Design Tokens** into a single comprehensive design guide.

---

## 🎨 1. Visual & Frontend Design Principles
- **Bold Aesthetic Choices**: Avoid generic layouts, default purple gradients, or plain browser fallback fonts.
- **Typography System**:
  - Headings/Accents: `Outfit`, `Plus Jakarta Sans`
  - Body Text: `Inter`, `DM Sans`
  - Code/Metrics: `Fira Code`, `JetBrains Mono`
- **Dark Mode Palette & Surfaces**:
  - Base Background: Deep obsidian/navy (`#0b0f17`, `#0f172a`)
  - Glassmorphism Cards: Translucent backdrop blur (`background: rgba(30, 41, 59, 0.7); backdrop-filter: blur(12px)`)
  - Accent Gradients: Vibrant blue-to-purple blends (`linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)`)
- **Micro-Animations**:
  - Smooth transitions (`transition: all 0.3s cubic-bezier(0.22, 1, 0.36, 1)`)
  - Card hover elevation (`transform: translateY(-4px)` with box-shadow glow)
  - Scroll-triggered reveal animations via IntersectionObserver (`.reveal.visible`)

---

## 💼 2. Recruiter & Portfolio UX Strategy (30-Second Recruiter Test)
- **Top Fold Hero Hook**: Immediately display Name, Title ("Software Engineer & AI Developer"), Tech Stack Badges, and prominent CTAs (`View Projects`, `Contact Me`, Social Links).
- **Structured Skills Grid**:
  - Full-width `Languages` card with animated progress bars arranged in 3 columns.
  - Balanced 3-column bottom row (`ML & Data`, `Design Tools`, `Tools & Platforms`) with `align-items: start` to prevent box stretching.
- **High-Conversion Contact Flow**:
  - Direct Email card (`mailto:alveeza0109@gmail.com`) with subtext and hover arrow.
  - Interactive GitHub & LinkedIn link cards.
  - Real-time client-side validated contact form.

---

## 🛠️ 3. CSS Tokens & Modular Code Standards
- **Design Tokens Mapping**:
  - Map all colors, fonts, radii, shadows, and transitions to CSS custom properties (`:root`).
- **No Unused Inline Styles**:
  - Keep presentation logic inside `styles.css`.
- **Responsive Layouts**:
  - Desktop: 3-column layout.
  - Tablet (<900px): 1 or 2 columns.
  - Mobile (<640px): 1 column with touch-friendly tap targets (`min-height: 44px`).
