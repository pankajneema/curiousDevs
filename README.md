# CuriousDevs

CuriousDevs is an AI engineering and intelligent-systems studio website built around one idea: **build AI for production**.

The site connects production AI engineering with intelligent systems, robotics, and DeepTech. It also introduces two product directions:

- **Noema** — a multimodal intelligence layer for perception, grounded reasoning, planning, evaluation, and action.
- **Soma** — an embodied intelligence layer for humanoid robotics, edge compute, perception, safe control, manipulation, and real-world autonomy.

## Experience map

| Area       | Route               | Purpose                                                     |
| ---------- | ------------------- | ----------------------------------------------------------- |
| Home       | `/`                 | Company story, hero, technology thesis, products, and CTA   |
| Technology | `/technology`       | AI Engineering, Intelligent Systems, Robotics, and DeepTech |
| Noema      | `/technology/noema` | Intelligence-layer product direction                        |
| Soma       | `/technology/soma`  | Humanoid robotics and embodied-intelligence direction       |
| Systems    | `/systems`          | Production AI and intelligent-system flows                  |
| Work       | `/work`             | Research, engineering, and product work                     |
| Research   | `/research`         | Research directions and technical areas                     |
| Contact    | `/contact`          | Contact form and direct email fallback                      |
| Product    | `/product`          | Build, Audit, Fix, and Scale service model                  |
| Blog       | `/blog/`            | Technical writing and articles                              |

## Stack

- React 19 with [TanStack Start](https://tanstack.com/start)
- Vite 8 and file-based TanStack Router routes
- Tailwind CSS v4 with custom CuriousDevs design tokens
- Radix UI primitives and Lucide icons
- Nitro build output targeting the `cloudflare-module` preset
- Nodemailer for server-side contact email delivery

## Local development

Requirements: Bun, Node.js, and a current Chromium-based browser.

```sh
bun install
bun run dev
```

The development server runs at [http://localhost:8080](http://localhost:8080).

### Useful commands

```sh
bun run build      # Production build
bun run build:dev  # Development-mode production build
bun run preview    # Preview the production build
bun run lint       # ESLint checks
bun run format     # Format the repository with Prettier
```

## Environment

Create a local `.env.local` file for server-side contact email delivery. Do not commit this file or expose the SMTP password in client-side code.

```env
SMTP_SERVER="smtp.gmail.com"
SMTP_PORT="587"
SMTP_EMAIL="your-sending-address@example.com"
SMTP_PASSWORD="your-provider-app-password"
CONTACT_EMAIL="your-team-inbox@example.com"
```

The contact form validates the visitor's name and email, sends the message to `CONTACT_EMAIL`, and sets the visitor's address as `Reply-To`. If sending fails, the UI provides a direct `mailto:` fallback.

For Gmail, use an App Password rather than a normal account password. After changing environment variables, restart the development server.

## Project structure

```text
src/
  components/landing/          Shared page sections and visual system
  components/landing/visuals/  Vector diagrams and technical illustrations
  components/ui/                Reusable Radix/shadcn-style primitives
  content/site.ts               Technology areas, system flows, and core story
  content/faq.ts                FAQ content
  lib/actions.ts                Server functions for contact, booking, and applications
  lib/email.ts                  SMTP transport and email delivery
  routes/                       TanStack Start file-based routes
public/
  brand/                        Brand marks used by the site and favicon
  brand/curiousdevs-mark-128.png Browser favicon mark
  manifest.webmanifest          Web app metadata and icons
output/pdf/                     Generated product PDF artifacts
```

## Visual system

The visual language uses a dark navy technical canvas, warm orange signal color, cool blue system highlights, grid fields, and restrained engineering diagrams. Key visual components include:

- Noema multimodal intelligence flow
- Soma humanoid perception-to-actuation diagram
- Technology-domain diagrams for AI Engineering, Intelligent Systems, Robotics, and DeepTech
- Research-to-product continuum
- Architecture, system-flow, and product visualizations

The diagrams are implemented as responsive SVG/React components so they remain sharp at different screen sizes and do not depend on external image URLs.

## Product PDF

The current customer-facing product overview is generated at:

```text
output/pdf/CuriousDevs_Product_Overview_2026.pdf
```

It covers Noema, Soma, their shared architecture, the safety boundary between decisions and actuation, and the research-to-product workflow. The PDF is a six-page landscape document with vector diagrams.

## Quality checks

Before shipping a change:

```sh
bun run lint
bun run build
```

For visual changes, check desktop and mobile layouts at `/`, `/technology`, `/technology/noema`, `/technology/soma`, `/work`, and `/contact`. Confirm that diagrams remain legible, anchors scroll correctly, the contact form has a visible fallback, and the favicon is loaded after a hard refresh.

## Content principles

- Describe current capabilities separately from future product direction.
- Avoid invented customers, deployments, performance numbers, or research claims.
- Keep product, technology, and service language aligned with the current site.
- Prefer measurable engineering language over generic AI marketing language.
