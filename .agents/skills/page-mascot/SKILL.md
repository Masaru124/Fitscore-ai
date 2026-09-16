---
name: page-mascot
description: Put a cursor-tracking mascot on a page -- a chibi character that turns its head toward the pointer and reacts when clicked. Picks one of the fifty-two drawn characters and wires up the React component, or draws a new one (with your own image tool, the OpenAI images API, or from a photo of the user), builds its two sprite sheets into aligned atlases and verifies they do not jump. Use when the user asks for a mascot, a character that watches the cursor, a portfolio head, wants one of the existing characters on their page, or wants a new character drawn.
---

# Mascot

Turns "put a fox on my page" or "draw me a chibi otter" into a working `<Mascot />`.

Each character is two 3×3 sprite sheets: nine head directions, and nine expressions. The
component swaps between them by moving `background-position`, so there is no per-frame
JavaScript and no animation library. A character is its two files -- there is no registry
and nothing has to know its name.

## Which route

- **The user names a character, or would take one that exists** -- *Use one that is
  drawn*. No Python, no API key, works in any React project. This is the common case.
- **The user wants something new, or their own likeness** -- *Draw a new one*, then
  finish with *Put it on the page*.

Both routes end in *Put it on the page*. Do not stop at files and a snippet.

## Use one that is drawn

1. **Pick.** `reference/characters.md` lists the fifty-two. If the user did not name one,
   pick the one that fits the site, and say which you picked and why.

2. **Fetch the two sheets** into wherever this project serves static files -- `public/`
   for Next, Vite, CRA and Astro, `static/` for SvelteKit -- or next to the component to
   import them:

   ```bash
   mkdir -p public/mascots
   curl -fsSL -o public/mascots/fox-directions.webp https://koboyo.com/page-mascot/mascots/fox-directions.webp
   curl -fsSL -o public/mascots/fox-reactions.webp  https://koboyo.com/page-mascot/mascots/fox-reactions.webp
   ```

3. **Put it on the page** (below).

## Put it on the page

**Install the component.** Use whichever package manager the lockfile points at:
`npm i page-mascot`, `pnpm add page-mascot`, `yarn add page-mascot`, or
`bun add page-mascot`. If this is not a package-managed React project, copy `mascot.tsx`
from beside this SKILL.md into the project instead -- it is one file, needs only React,
and uses inline styles.

**Render it:**

```tsx
import { Mascot } from 'page-mascot'

<Mascot
  directions="/mascots/fox-directions.webp"
  reactions="/mascots/fox-reactions.webp"
/>
```

`directions` and `reactions` are the served paths of the two sheets, or imported images.
Both required. The other props are `size` (default 140), `label` (what a screen reader
calls it) and `className`.

**Put it where the user asked.** If they did not say, the top of the page -- the header or
hero, above or beside the title, which is where a head that watches the cursor reads best.
Edit the actual component; then tell the user what you changed and where.
