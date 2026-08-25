# AGENTS.md – Frontend Architecture & Design-in-Code Workflow (Material UI)

> This file is written to be loaded as **agent instructions**. If you are an AI assistant (Claude Code, Cursor, Copilot, v0, etc.) working in this repo, read this whole file before writing a single line. The first thing you do in a session is the **role gate** below — no exceptions.

## 0. Role gate — do this before anything else

Interfaces here are built **in code, skipping the mockup stage**. Two different people touch this repo with two completely different mandates. Before you help anyone "vibe-code" a screen, you must know which one you're talking to.

**First action of every session, ask:**
> **Are you working as the _Designer_ (UI only) or the _Front-end developer_ (integration, logic, state, API)?**

Then operate in exactly one mode until told otherwise:

- **Designer — Design Mode.** Pure presentation **plus navigable flows**. You compose Material UI components, theme values, layout, and states; you create "dumb" presentational components in `src/shared/ui/` or `src/features/*/ui/`; and you assemble them into **navigable user-flows on mock data** in `src/flows/` (route-group folders + a declarative route tree). You navigate with `Link` / `useNavigate` / `useParams`. You do **not** write data fetching (TanStack Query), business logic, global state (Zustand), **routing logic** (loaders, guards, redirects, data-on-route-entry), or models/validators (Zod). If a task seems to require any of that, you stop and explain why instead of doing it.
- **Front-end — Integration Mode.** You own the wiring: real data hooks (`src/features/*/api`), state (`src/features/*/store`), smart components (`src/features/*/controllers`), Zod schemas (`src/features/*/models`), and the **router instance + routing logic** (`src/app`) — you consume the Designer's route tree from `src/flows/` and attach loaders, guards, redirects, and code-splitting. You leave presentation, flows, and theme alone unless a real gap forces a change.

If the person hasn't answered yet, assume **Design Mode** and say so — it's the safe default, because Design Mode can never break logic that isn't there.

**If the project folder is empty (first run):** follow `SETUP.md` to scaffold the app and its guardrails, end on the readiness screen, then wait for the designer's first screen prompt. Don't build product UI during init.

## 1. Pipeline

1. **UX/UI** builds the interface directly in code: presentational components assembled from Material UI + a shared theme (data via Props), then wired into **navigable user-flows on mock data** (`src/flows/`) so the whole thing is clickable end to end.
2. **Dev** picks up the flows, creates "smart" controllers, wires them to TanStack Query (API) and Zustand (State), converts the flow route tree into the real router (loaders/guards/redirects in `src/app`), and passes real data into the Designer's components — the screens themselves don't change.
3. Stakeholder/client review happens against the **running app**, not static mocks. Design and implementation are the same artifact.

## 2. What "building in code" means with Material UI

- **MUI-only, by default. This is a rule, not a preference — and ESLint enforces it.** Every UI element is built from Material UI (`Box`, `Stack`, `Grid`, `Table`, `TextField`, `Card`, `Dialog`, etc.) and `@mui/icons-material`. **Do not hand-roll UI that MUI already provides.** `react/forbid-elements` errors on `<button>`, `<input>`, `<table>`, `<ul>`, `<h1>`, `<p>`, `<a>`, `<img>`, `<form>` and friends inside presentation folders — reach for the MUI component named in the error.
- **`<div>` and `<span>` are the escape hatch**, but you should rarely need them: `Box` is a div that reads the theme, and `Box component="nav"` (or `"section"`, `"form"`, `"img"`) gets you any semantic element you want with `sx` attached. Use bare div/span only for something genuinely style-free.
- **Custom is the exception, and it must be earned.** Only build custom UI when MUI genuinely has no component for it. First try to **compose** it from existing MUI primitives. If you must build custom, read values from the theme, never hardcoded hex/rgb or raw pixel spacing.
- **Theme through the theme object, not one-off overrides.** Visual identity lives in a single `createTheme` call (`src/theme/tokens.ts`) — palette, typography, shape, spacing, and `components` defaults/overrides. If you find yourself repeating the same `sx` on every Button, that belongs in `components.MuiButton` instead.
- **`sx` is the styling system.** MUI runs on Emotion; `sx` and `styled` from `@mui/material/styles` are the sanctioned idiom and are fully allowed. What's banned is reaching *past* MUI — importing `@emotion/styled` directly, adding styled-components, or using CSS modules. There is one styling engine and MUI owns it.
- **Style objects go in a co-located `*.styles.ts`, not scattered inline.** When a component needs more than a trivial one-off, put the objects in a sibling `ComponentName.styles.ts` typed as `SxProps<Theme>` and import them: `sx={styles.wrap}`. Values that need the full theme are written as callbacks (`(theme) => ({ ... })`) — `sx` passes the theme in, so there's no factory function to call. A short inline `sx={{ mt: 1 }}` is fine.
- **Use theme units, not raw lengths.** `p: 2` is two spacing units; `padding: "16px"` is a magic number that stops responding to the theme. Same for colors: `bgcolor: "primary.main"` or `theme.vars.palette.primary.main`, never `#1976d2`.
- **Use MUI's own state props, presentationally.** `loading`, `disabled`, `error`, `Skeleton`, `LinearProgress` — drive them from props, never from a real network request during Design Mode.
- **Responsive is a prop, not a media query.** Every `sx` value takes a breakpoint object: `sx={{ p: { xs: 2, md: 4 } }}`, `<Grid size={{ xs: 12, md: 4 }}>`. Reach for `useMediaQuery` only when layout must actually branch, not to fake what breakpoint props already do.

## 3. Project structure (Domain-Driven Design)

```text
/src
  /app                  # Dev only: router INSTANCE + routing logic (loaders, guards,
                        #   redirects, code-splitting), global providers.
    router.tsx          #   The BRIDGE: consumes flows/routes.tsx generically and builds
                        #   the real route tree from it. Created once, at init, already
                        #   generic — adding a flow must never require editing this.
  /flows                # Designer: navigable user-flows on mock data.
                        #   Route-group folders + a declarative route tree. NO logic.
    /home
      HomeScreen.tsx    #   Composes ui/ components, holds inline mock data, links out.
    /loans
      LoansListScreen.tsx
      /loan-details
        LoanDetailsScreen.tsx   # route: /loans/:id  (reads id via useParams)
    routes.tsx          #   { path, component, children, meta? } tree. Structure + nav
                        #   only — no loaders, no guards, no data fetching.
    /_ready             #   ReadyView.tsx — the init status screen. Designer-owned so
                        #   the first real prompt can delete it. Gone after that.
    /_devbar            #   Dev-only nav bar (DevBar.tsx) + flatten.ts + devUrls.ts.
                        #   Reads routes.tsx to build a jump-to-screen switcher.
                        #   Never ships to production.
  /shared
    /ui                 # Designer: Reusable "dumb" UI elements, layout primitives
  /features
    /FeatureName
      /ui               # Designer: Feature-specific "dumb" UI elements
      /controllers      # Dev: "Smart" components (orchestrate UI, queries, state)
      /models           # Dev: Zod schemas and derived TS types
      /api              # Dev: TanStack Query hooks (useQuery, useMutation)
      /store            # Dev: Zustand client state
      index.ts          # Public API for the feature
  /theme                # Designer: tokens.ts, ThemeProvider.tsx
                        #   tokens.ts is the ONLY file allowed to contain raw color values.
  /stories              # Designer: ThemeShowcase.stories.tsx, FlowMap.stories.tsx
```

**Component styles:** a presentational component or flow screen may keep a
co-located `ComponentName.styles.ts` next to it — objects typed
`SxProps<Theme>`, theme-aware via `sx` callbacks. Style objects live there, not
inline in the JSX (see §2). It's designer-owned, same as the component.

**Route `meta` (optional, design annotation only):** a route may carry
`meta?: { role?, flow?, label?, sampleParams? }` — used to group and label screens
in the DevBar and flow overviews, and to supply a sample `:id` so detail screens
are clickable. It is **documentation, not enforcement**: `meta.role: 'admin'`
does not restrict anything. Real role guards are Dev's, in `/app`.

**How `/flows` stays logic-free (the seam):** designers declare routes as plain
structure in `flows/routes.tsx` — `{ path, component, children, meta? }` and
nothing else. There is no field for a loader or guard, so there's nowhere to put
logic.
A screen is a **dumb component**: it composes `ui/` parts, holds **inline mock
data** (or takes props with mock defaults), navigates with `Link` / `useNavigate`,
and reads params with `useParams`. During integration, Dev builds the real router
in `/app` from that route tree (attaching loaders/guards/redirects) and swaps each
screen's mock defaults for a controller that feeds real props. The screen file
itself doesn't change.

**Route syntax (read this before your first detail screen):** designers write
params as `:id` — readable, and it's what the DevBar and Flow Map render.
`/app/router.tsx` translates to TanStack's `$id` on the way in. Never write `$id`
in `/flows`. Read params with `useParams({ strict: false })`: the tree is built
at runtime from your file, so TanStack can't literal-type the routes, and `strict`
mode would demand a `from` you don't have.

**Nesting:** a node with `children` becomes a layout, and its own `component`
becomes that layout's index route. So `{ path: "loans", component: List,
children: [{ path: ":id", component: Details }] }` gives you `/loans` → List and
`/loans/1001` → Details, which is what you'd expect. You don't need an `<Outlet/>`
in List.

## 4. The core rule: Smart vs. Dumb

UI components (`shared/ui` or `features/*/ui`) **never** know where their data comes from. They receive data strictly through `Props` and emit actions strictly through `Callbacks`.

Smart controllers (`features/*/controllers`) fetch data using TanStack Query hooks from `features/*/api` and pass that data down to the UI components.

**Flow screens (`src/flows/*`) are dumb too.** They compose `ui/` components, hold inline mock data (or take props with mock defaults), and move between screens with `Link` / `useNavigate` / `useParams`. They contain no fetching, no state stores, no loaders, no guards.

**Who owns the Props contract:** a UI component or flow screen owns **its own Props interface** — that's the presentation contract. Dev's controller adapts models → those props. Designers define the shape they need and never wait on (or import) dev-owned `/models`.

## 5. Who owns what

| Area | Owner | Notes |
|---|---|---|
| `/theme` | UX/UI | Required reviewer on any visual/theme change. |
| `/shared/ui`, `/features/*/ui` | UX/UI | Pure markup, MUI composition, styles, prop contracts. |
| `/flows` | UX/UI | Navigable screens, route tree (`routes.tsx`), nav links. Mock data only, no routing logic. |
| `/flows/_ready` | UX/UI | Init status screen. Delete it with your first real flow. |
| `/flows/_devbar` | UX/UI | Dev-only nav bar. Dev mounts it once in `/app`; designers own its contents. |
| `/app` (router instance + routing logic) | Dev | Builds the real router from `/flows`, attaches loaders/guards/redirects, global providers. **Written once at init and generic** — if adding a flow makes you want to edit `/app`, that's a bug in the bridge, not a reason to switch modes. |
| `/features/*/controllers` | Dev | Smart logic. Wraps UI components with queries and state. |
| `/features/*/api`, `/store` | Dev | TanStack Query and Zustand implementations. |
| `/features/*/models` | Dev | Zod schemas and validations. |
| `/stories` | UX/UI | Presentation review. |

## 6. Design Mode guardrails

When operating in Design Mode (helping a **designer**), you may touch **presentation and flows**: `src/shared/ui/`, `src/features/*/ui/`, `src/flows/`, `src/theme/`, and `src/stories/`.

**You MAY** build interactive, navigable prototypes-that-become-the-app:
- Open/close dialogs, drawers, menus, tabs, steppers — local UI state (`useState`).
- **Navigate between screens** with `Link` / `useNavigate`, read route params with `useParams`, and declare the route tree in `src/flows/routes.tsx` (paths incl. `:id`, hierarchy, nav links).
- **Simulate** a submit: show a snackbar, close the dialog, flip to a "submitted" state — with the real work stubbed.
- Feed screens from **inline mock data** or props with mock defaults.
- Use `sx` and `styled` from `@mui/material/styles` freely; use `<Box component="…">` for semantic elements. Everything else comes from MUI — ESLint will tell you which component.

**You MUST NOT — stop and explain instead:**
- Write data fetching of any kind: `fetch`, `axios`, `useQuery`, `useMutation`.
- Add global/business state (`zustand`), or **routing logic**: loaders, guards, `beforeLoad`, `redirect`, or loading data on route entry. Those live in `/app`.
- Wire real behavior into interactions: an `onSubmit` that mutates data, a submit that calls a service. Stub these as `console.log` for Dev to wire.
- Modify anything in `api/`, `controllers/`, `store/`, `models/`, or `app/`.
- Hand-roll UI MUI already provides (`<button>`, `<table>`, `<ul>`, `<h2>`, `<a>`, `<img>`, `<form>`…) — compose from MUI instead.
- Hardcode colours (`#1976d2`, `rgb(25,118,210)`) or raw spacing (`padding: "16px"`). Use palette paths, `theme.vars`, and spacing units — or add the value to `/src/theme/tokens.ts`, the one file where raw colors are allowed.
- Reach for another styling system or component library: styled-components, `@emotion/styled` directly, CSS modules, a second component library. MUI's theme + `sx` is the styling system, full stop.
- **Flip `.workflow-mode` to `dev` to get a commit through.** If the guard blocks you, that IS the answer — report what you hit and stop. Mode changes are a human decision.

## 7. Reviewing the work

`npm run dev` runs the app (`:5173`) and Storybook (`:6006`) together — Storybook isn't optional here, the DevBar links straight into it.

- **Component states:** Storybook.
- **Theme check:** The **Theme Showcase** story verifies that a change in `/src/theme/tokens.ts` propagated everywhere, at a glance. It opens with a palette board and the full type scale, then every component. **Check it in both color schemes** — roughly half of all theming bugs only appear in dark mode.
- **Flow overview:** The **Flow Map** story (`System/Flow Map`) renders every screen in `flows/routes.tsx`, grouped by flow and filterable by role, with click-through into the running app. The DevBar's "Flow map" button opens it directly — its story ID (`system-flow-map--all-flows`) is load-bearing; renaming the story's `title` or export breaks that button.

## 8. Required AI prompt for Design-Mode layout work

When a designer uses AI to build or change UI, use this as the system prefix **every time**:

> ROLE: Designer, Design Mode. Presentation + navigable flows. You may modify only: /src/shared/ui, /src/features/*/ui, /src/flows, /src/theme, and /src/stories.
> Build EVERYTHING from Material UI. Do NOT hand-roll UI that MUI provides. Use `<Box component="…">` for semantic elements.
> Style with the `sx` prop and `styled` from @mui/material/styles. Non-trivial style objects go in a co-located ComponentName.styles.ts typed SxProps<Theme> and are imported as sx={styles.x}. No @emotion/* imports, no styled-components, no CSS modules.
> Colors come from palette paths or theme.vars; spacing from theme units. No hex, no rgb(), no raw px.
> Make it responsive with breakpoint objects (sx={{ p: { xs: 2, md: 4 } }}, Grid size={{ xs: 12, md: 4 }}), not media queries.
> UI components and flow screens must be "dumb" — data via Props (mock defaults are fine), events via Callbacks.
> You MAY build navigation: Link, useNavigate, useParams, and the route tree in /src/flows/routes.tsx (paths incl. :id, hierarchy, nav links). You MAY open dialogs/drawers and simulate submits (stub the real work as console.log).
> Do NOT modify /src/features/*/api, /controllers, /store, /models, or /src/app.
> Do NOT write data fetching (React Query, axios, fetch), global state (Zustand), or routing LOGIC (loaders, guards, redirect, data-on-route-entry). Those belong to Dev.

## 9. Making agents read this first

For the role gate to actually fire, save/symlink this file's content under conventions your tools use:
- **`AGENTS.md`** — emerging cross-tool convention.
- **`CLAUDE.md`** — Claude Code.
- **`.cursorrules`** — Cursor's per-repo rules.
- **`.github/copilot-instructions.md`** — GitHub Copilot.

## 10. Enforcement — deterministic, no AI required

These checks read the diff and block violations. No agent judgement involved.

**1. ESLint — live, in the editor.**
The rules live in **`eslint.presentation.js`** at the repo root, exported as a flat-config fragment and **appended** to the `eslint.config.js` that init creates. (The current Vite react-ts template ships **oxlint**, not eslint; init removes it so the project has a single linter — the eslint-based toolchain these guardrails run on. See SETUP.md steps 3 and 9.)

```js
// eslint.config.js
import { presentationRules } from "./eslint.presentation.js";

export default tseslint.config([
  globalIgnores(["dist", "storybook-static"]),
  // ...the react-ts baseline init sets up — typescript-eslint, react-hooks,
  //    react-refresh. These MUST survive.
  ...presentationRules,   // last, so its bans win any conflict
]);
```

> **Append, never replace.** Dropping `presentationRules` in as the whole config
> deletes `react-hooks` and `typescript-eslint`, which means `--max-warnings=0`
> in CI passes over a config with no real rules — a green check that proves
> nothing. Verify with
> `npx eslint --print-config src/flows/routes.tsx`: it must list
> `react-hooks/rules-of-hooks` **and** `react/forbid-elements`.

The fragment applies three things to `src/{shared/ui,features/*/ui,flows,theme,stories}`:

| Block | What it does |
|---|---|
| `presentation-imports` | Bans `axios`, `@tanstack/react-query`, `zustand`, `zod`, `fetch`, `XMLHttpRequest`, imports from `**/api`, `**/store`, `**/controllers`, `**/models`, `**/app`, and the routing-logic exports of `@tanstack/react-router` (`redirect`, `useLoaderData`, `createRoute`…). Also bans direct `@emotion/*`, styled-components, CSS modules, and second component libraries. Navigation (`Link` / `useNavigate` / `useParams`) and MUI's own `sx` / `styled` stay allowed. |
| `mui-only` | `react/forbid-elements` errors on every element MUI provides (`button`, `input`, `select`, `textarea`, `form`, `label`, the `table` and `ul`/`li` families, `h1`–`h6`, `p`, `a`, `img`, `hr`…), each with the MUI component to use instead. `div`/`span` stay legal as the layout escape hatch, though `Box` is almost always better. |
| `theme-values-not-raw` | `no-restricted-syntax` errors on hex literals, `rgb()`/`hsl()`/`oklch()` and friends, and raw `px`/`rem` values in padding/margin/gap. `src/theme/tokens.ts` is the sole exemption. |

Needs `eslint-plugin-react` in devDependencies.

> **One rule ID, one declaration.** `no-restricted-imports` is configured
> **once**, in `presentation-imports`. ESLint flat config does not merge options
> for the same rule across config objects — the last one wins outright, so a
> second declaration silently deletes the first one's bans. If you add import
> bans, add them to that block. Don't create a second one.

**2. Scope check — the `.workflow-mode` gate (`scripts/check-scope.mjs`)**
Fails the commit/PR if a `designer` diff touches off-limits DDD areas: `src/features/*/{api,controllers,store,models}`, `src/app/`, and tests.

- Locally it reads `git diff --cached` — only what you're actually committing, so unstaged scratch work can't block an unrelated design commit.
- In CI it reads `git diff ${GITHUB_BASE_REF}...HEAD` — **three-dot**, against the merge base. Two-dot reports commits others landed on `main` as reversed changes and fails PRs that never touched a forbidden path.
- `src/flows/` is intentionally not forbidden — designers own navigable flows. Routing *logic* lives in `src/app/`, which is.

**Known limit, stated plainly:** `.workflow-mode` is a text file in the repo, so the gate is a *seatbelt, not a lock*. It catches the honest mistake — an agent drifting into `/store` mid-task — and it makes the boundary visible in review. It does not stop anyone who decides to flip the file. §6 forbids agents from doing that; if you want it to be a real lock, derive the mode from the branch name or a PR label in CI instead of from the working tree.

**3. Pre-commit & CI**
Husky runs `lint-staged` and `check-scope.mjs` locally. `.github/workflows/scope-guard.yml` runs both in CI, and its **guard-integrity step asserts on rule payloads, not rule IDs** — a rule ID proves a rule is configured, but only its payload proves it's configured with the bans you meant.
