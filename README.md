<div align="center">

# CuriousDevs

### We build Physical AI.

CuriousDevs builds the intelligence and the robotic systems that let machines
understand and act in the physical world.

**Noida, Uttar Pradesh, India**

[Website](https://www.curiousdevs.com) · [Intelligence](https://www.curiousdevs.com/intelligence) · [Robotics](https://www.curiousdevs.com/robotics) · [Research](https://www.curiousdevs.com/research) · [Contact](https://www.curiousdevs.com/contact)

</div>

---

## Why we exist

Models are published openly every month. Almost none of them can operate real
hardware.

The unglamorous part — running a model continuously next to a machine, with
authority, memory and a record of what it did — is where deployments actually
fail. The teams releasing models are not the teams who will solve it.

So we build the execution layer first, and a body designed around that layer
rather than around a demonstration.

---

## What we are building

```
CuriousDevs
   │
   └── Physical AI
         │
         ├── Intelligence ──────── builds the mind
         │      └── OJAS ───────── current flagship system
         │
         ├── Robotics ──────────── builds the body
         │      └── PARTH ──────── current flagship platform
         │
         └── Research ──────────── asks what is next
```

Two engineering divisions, and the research that feeds them.

| Division | What it builds | Current project |
| :--- | :--- | :--- |
| **Intelligence** | The models, systems and runtimes that let machines perceive, understand, reason, plan and act. | **OJAS** — the intelligence system |
| **Robotics** | The platforms, mechanics, actuation, sensing and control that carry intelligence into the real world. | **PARTH** — a human-scale humanoid robot |
| **Research** | Open questions about model behaviour, world representation, embodiment and evaluation — each with a method attached. | Published exactly as measured |

Neither division is defined by its current project. Both are built for the
ones that follow.

---

## How we think

> **The model proposes; the system decides.**
> Model output is a proposal, authorised against world state and explicit rules
> before anything moves.

> **Safety is architecture, not a feature.**
> Independent hardware sits below every software layer, and lower layers always
> hold more authority.

> **A number without a method is a slogan.**
> Every figure we publish carries how it was measured. Missed targets are
> published as measured.

> **Close to the machine.**
> Deployed robotics needs physical presence. Being near the hardware is part of
> the product, not an overhead.

---

## How we talk about our work

Nothing is described as available before it has recorded, repeatable evidence.

- Simulation results are labelled as simulation.
- Design intent is labelled as design intent.
- Figures on our site are engineering targets with stated methods, published as
  results only once measured.
- PARTH is at architecture-definition stage. No capability is claimed as
  demonstrated and no specification is final.

We have no published papers and no benchmark tables, and we will not claim
otherwise.

---

## Work with us

Tell us what you're building, exploring, or trying to solve.

The most useful first message names a machine, a task, and what happens today
when the task fails. If a conventional integrator is the better answer for your
task, we will say so.

**[hello@curiousdevs.com](mailto:hello@curiousdevs.com)** · [curiousdevs.com/contact](https://www.curiousdevs.com/contact)

The company is deliberately small, and the people building it are the people
you will talk to.

---

<details>
<summary><strong>Running this site locally</strong></summary>

<br>

This repository contains the CuriousDevs website.

```sh
bun install
bun run dev     # http://localhost:8080
bun run build
```

| Where | What |
| :--- | :--- |
| `src/lib/copy.ts` | Public page copy |
| `src/lib/content.ts` | The technical model behind the deep pages |
| `src/styles/tokens.css` | Design tokens — colour, type, space, motion |
| `src/lib/actions.ts` | Contact form delivery (see `.env.local.example`) |

Built with TanStack Start, React and Tailwind CSS. Deployed to Cloudflare via
Nitro.

</details>

<div align="center">

<br>

**CuriousDevs** — intelligence, embodied.

</div>
