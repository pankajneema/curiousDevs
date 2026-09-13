---
name: curiousdevs-visual-system
description: Create and maintain realistic, premium technical visuals for CuriousDevs websites without changing product content.
---

# CuriousDevs Visual System

Use this skill when upgrading CuriousDevs diagrams, product visuals, technical illustrations, hero graphics, icons, or visual motion.

## Non-negotiables

- Preserve existing copy, product names, section order, links, information architecture and technical meaning unless the user explicitly asks for content changes.
- Treat every visual as part of one system: warm ivory editorial surfaces, deep navy technical surfaces, restrained burnt-orange signal accents, crisp geometry and deliberate negative space.
- Use the format that best communicates the existing meaning. Use native SVG/HTML/CSS for diagrams, flows and interface graphics; use raster imagery only for genuine product/environment imagery when a suitable generation or licensed asset path is available.
- Do not use generic AI-brain imagery, random glowing objects, cartoon robots, stock-looking renders, excessive gradients, or decorative graphics without a communication purpose.

## Visual quality bar

- Technical diagrams must have a clear reading order, real relationships, legible labels, consistent stroke weights and an obvious input → processing → output model.
- Physical systems should use credible proportions, articulated joints, sensors, actuators, materials, occlusion and restrained lighting. Humanoid robotics must read as an engineered platform, not a mascot or sci-fi character.
- Keep depth consistent across the site: one perspective, one edge language, one shadow/glow approach, one annotation system and one motion vocabulary.
- Make the visual the primary focus of product hero sections. Text supports the visual; it should not compete with it.
- Recompose complex graphics at mobile breakpoints rather than simply shrinking them. Avoid clipped labels, unreadable annotations and horizontal overflow.

## Workflow

1. Inventory routes and visual components before editing. Identify every hero visual, diagram, SVG, icon, image, card visual, background, animation and interactive graphic.
2. Record what each visual communicates, then improve hierarchy and realism without changing that meaning.
3. Upgrade shared primitives first so all downstream visuals inherit the same surfaces, borders, shadows, type and motion.
4. Build or edit the visual in the most appropriate format. Prefer project-native assets and deterministic code for diagrams; never introduce a remote image dependency without checking its license and failure mode.
5. Test desktop and mobile routes in the live browser. Check visual presence, readable labels, overflow, reduced-motion behavior, broken assets and console errors.
6. Run the project build and lint before handoff. Report any pre-existing warnings separately from new errors.

## Product visual guidance

- Noema/intelligence visuals should communicate multimodal inputs, perception, understanding, reasoning, planning and decisions through a structured computational system—not an abstract brain.
- Soma/embodiment visuals should communicate a believable humanoid body, sensing, edge compute, balance, actuation, dexterous hands, safety and physical action—not a generic robot icon.
- A Noema × Soma relationship should be shown as a readable system connection from intelligence to embodiment to action, with motion that explains the relationship.

## Verification checklist

- The visual matches the section's existing claim and labels.
- SVGs use accessible `role="img"` and meaningful `aria-label` text where appropriate.
- Cards and hero visuals share consistent padding, edge contrast, radius and elevation.
- Animations are subtle, purposeful and disabled or reduced for `prefers-reduced-motion`.
- Desktop, tablet and mobile have no clipped graphics or horizontal overflow.
