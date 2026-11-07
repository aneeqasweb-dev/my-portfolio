# Aneeqa Pervaiz | Portfolio

Personal portfolio built with Next.js 16, React 19, Tailwind CSS 4 and hand-written
WebGL and CSS animation. There are no animation libraries, so the page stays light.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Change the content

Nearly everything visitors read lives in one file: **`content/portfolio.ts`**.
Edit it and the whole site follows.

| To change | Do this |
| --- | --- |
| Email, GitHub, LinkedIn | Edit `profile` |
| Animated title | Edit `profile.titles` (add as many as you like) |
| Project links | Set `liveUrl` and `repoUrl`. While `liveUrl` is `null`, the card has no live site button. `hideRepo` removes the GitHub button |
| Project picture | Save a screenshot in `content/projects/`, import it at the top of `portfolio.ts`, and use it as `image` in place of `art`. Full-page screenshots scroll inside the card on hover |
| Featured project | Set `featured: true` to show a project full width. `tech` adds logos to any card |
| Resume | Edit `resume/resume.html`, then run `./resume/build.sh` to rebuild `public/resume.pdf` (needs Google Chrome). Or replace `public/resume.pdf` with your own file |
| Add a technology, concept or qualification | Add an entry to its list. Logos are in `components/brands.ts` |

To reorder the sections, move their lines in `app/page.tsx`, update each `index` number, and match `navigation` in `content/portfolio.ts`.

Colours are set as variables at the top of `app/globals.css`, one block per theme. The
artwork has its own colours: the silk in `components/silk-canvas.tsx`, the 3D symbol in
`components/code-scene.tsx`, and the laptop and project art in their components.

## Deploy

Vercel works with no setup, including the image shown when your link is shared. On any
other host, set `metadataBase` to your site's address in `app/layout.tsx`, or the share
image will point at `localhost`.

## How the motion works

- **Silk background:** a small WebGL shader (`components/silk-canvas.tsx`). It pauses when
  off screen, lowers its resolution on slower machines, and falls back to a plain gradient
  where WebGL isn't available.
- **Scroll reveals, card tilt and spotlight:** one component (`components/effects.tsx`)
  driven by `data-*` attributes, so the sections can stay Server Components.
- **Everything else:** CSS in `app/globals.css`. All of it respects the visitor's
  "reduce motion" setting, and all content still shows with JavaScript turned off.
