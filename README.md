# CuriosDevs

The accountability layer for autonomous systems — AgentGuard (AI agent security),
CurioComply (DPDP compliance automation) and AeroOS (autonomous fleet OS).

## Stack

- [TanStack Start](https://tanstack.com/start) (React 19, file-based routing, SSR)
- Vite + Tailwind CSS v4
- [shadcn/ui](https://ui.shadcn.com) component primitives
- Nitro, targeting Cloudflare Workers (`cloudflare-module` preset)

## Development

```sh
bun install
bun run dev      # http://localhost:8080
```

Other scripts:

```sh
bun run build    # production build (.output/)
bun run preview  # preview the production build
bun run lint
bun run format
```

## Project structure

- `src/routes/` — file-based routes (see `src/routes/README.md` for conventions)
- `src/components/landing/` — page sections and shared landing-page components
- `src/components/ui/` — shadcn/ui primitives
- `src/content/site.ts` — copy, pricing, roadmap, doctrine, FAQ data
