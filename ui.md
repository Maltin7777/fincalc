# UI Coding Standards

## Use shadcn/ui only

- **Every UI element must be a shadcn/ui component.** Use the existing components; do not hand-roll replacements.
- **Do not create custom components.** No bespoke buttons, inputs, dialogs, cards, etc. If a pattern is needed, find the shadcn/ui equivalent instead of building it from scratch.

## Setup status

shadcn/ui is **not installed in this app yet** — there is no `components.json` and no generated components. Initialize it before adding UI:

```bash
npx shadcn@latest init
```

## Adding components

- Before building any UI, **check the shadcn registry for an appropriate component and install it** rather than writing new code:
  ```bash
  npx shadcn@latest search <query>   # browse the registry
  npx shadcn@latest add <component>  # install a component
  ```
- Prefer composing installed shadcn/ui components over creating new ones.
- Only reach for a custom component if the shadcn registry has no match, and flag it for review first.

## Conventions

- Generated components live in `src/components/ui/`.
- Import via the `@/` alias, e.g. `import { Button } from "@/components/ui/button"`.
- Keep Tailwind (v4) utility styles and the theme tokens from shadcn; do not override them with ad-hoc styling.

## Global style

- The app background must always be **pink** (see `AGENTS.md`).
