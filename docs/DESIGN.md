# DESIGN — Visual system & interaction rules

This document defines the visual identity, tokens, motion rules, and UI principles for `HG Labs — Midnight Space`. Keep this file as the single source of truth for UI designers and AI agents responsible for maintaining visual consistency.

## Visual Identity Summary

- Tone: cinematic, cozy, mysterious, modern.
- Palette: dark, soft neon accents, muted pixel tints.
- Texture: subtle CRT/scanline, soft grain, gentle bloom.
- Layout: clean, minimal, generous negative space.

## Color Palette (tokens)

- `--bg-900`: #0b0c0f (main background)
- `--bg-800`: #0f1114
- `--panel`: rgba(255,255,255,0.03) (glass surfaces)
- `--accent-1`: #6EE7B7 (soft teal)
- `--accent-2`: #7C5CFF (muted violet)
- `--accent-3`: #00D1FF (icy cyan)
- `--text-main`: #E6EDF3
- `--muted`: #99A0A6

Guidelines:
- Use accents sparingly for CTAs and subtle glows.
- Panels use `backdrop-filter` blur and `box-shadow` for depth.

## Typography

- UI / Terminal: JetBrains Mono (preferred), fallbacks: `ui-monospace, SFMono-Regular, Menlo, Monaco, monospace`.
- Headings / UI: Inter or system sans for modern clarity.
- Scale: base 16px, scale steps 1.125x for modular rhythm.

Rules:
- Terminal and code-styled components must use JetBrains Mono.
- Keep font weights light-to-medium for body copy; headings can be slightly heavier.

## Pixel Atmosphere Guidelines

- Pixel aesthetics are used for ambience only (background noise, rain sprites, tiny particles).
- Don't use large pixel fonts for UI labels; keep UI crisp and modern.

## CRT & Scanline Effect

Implementation notes:

- Use an overlay with subtle vertical/horizontal noise and repeating linear-gradient scanlines at very low opacity.
- Provide a `--crt-intensity` variable to tune in CSS.
- Ensure scanline is subtle on mobile; reduce intensity on small viewports.

Accessibility:

- Offer a `Reduce Motion` mode (respects `prefers-reduced-motion`).
- Provide an `Accessibility` toggle to disable CRT and heavy effects.

## Motion Philosophy

- Motion is cinematic and slow: durations ~300-700ms for major transitions, 100-250ms for micro-interactions.
- Use `Framer Motion` spring animations for floating and hover effects with low stiffness and moderate damping.

Animation rules:

- Hover float: translateY -6px, scale 1.01, shadow softens.
- Entrance: fade + subtle upward offset 8-16px.
- Exit: fade + downward offset 8px.

## Spacing and Layout

- Base spacing: 8px. Use multiples for consistent rhythm.
- Container widths: centered max-width 1200px for major content; fluid for immersive full-bleed hero.

## UI Components (primitives)

- FloatingWindow: glassmorphic panel, rounded corners, subtle shadow and lift on hover.
- GlassCard: small content card for guestbook and project entries.
- TerminalLine: monospace line with prompt glyph, command text, and timestamp optional.
- AudioPlayer: minimal floating player with waveform or subtle bars — keep compact.

## Interaction Feel

- Inputs: soft focus glow using `--accent-1` at 12-16% opacity.
- Buttons: subtle glass with accent border on hover and micro-press animation.
- Links: muted by default, glow on hover.

## Glow Behavior

- Use layered box-shadow for deeper glow: outer soft color, inner subtle color wash.
- Keep glow sizes constrained; avoid large harsh neon.

## Iconography and Imagery

- Use simple geometric icons and hand-crafted pixel sprites for ambience.
- Images should be high-quality and color-graded to the palette.

## Component Naming & Folder Structure

- `ui/` — primitives (FloatingWindow, GlassCard, Button)
- `features/<feature>/` — feature-scoped components and hooks
- `lib/` — utilities and API wrappers

## Design Tokens

- Store tokens in `styles/tokens.css` and tailwind config. Tokens include colors, radii, spacing, and animation durations.

## Handoff Rules for AI Agents

- Always consult this file before changing styles or tokens.
- When adding components, add a short component doc in `features/<feature>/README.md` describing behavior, props, and accessibility notes.
