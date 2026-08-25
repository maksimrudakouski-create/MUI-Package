// eslint.presentation.js
//
// The Design-in-Code guardrails for Material UI, as a flat-config FRAGMENT.
//
// This file is APPENDED to the eslint.config.js that SETUP creates — it never
// replaces it. The current Vite react-ts template ships oxlint (an
// .oxlintrc.json), NOT eslint, so SETUP removes oxlint and installs the eslint
// baseline (typescript-eslint + react-hooks + react-refresh) this fragment sits
// on top of. Those baseline rules must survive: react-hooks is what catches
// conditional-hook bugs, and `--max-warnings=0` against a config with no real
// rules is a green check that means nothing.
//
// Wiring (see SETUP.md step 9):
//   import { presentationRules } from "./eslint.presentation.js";
//   export default tseslint.config([ ...existing, ...presentationRules ]);
//
// Requires: npm i -D eslint-plugin-react
//
// ---------------------------------------------------------------------------
// NOTE FOR ANYONE PORTING THIS TO ANOTHER DESIGN SYSTEM
//
// `no-restricted-imports` is declared exactly ONCE below, on purpose. ESLint
// flat config does not merge options for the same rule ID across config
// objects — the last matching config wins outright. Splitting the import bans
// into a "no logic" block and a "one library" block (as the previous kit did)
// silently deletes whichever one is declared first. If you add more import
// bans, add them to the single block; do not create a second one.
// ---------------------------------------------------------------------------

import react from "eslint-plugin-react";

/** Everything a designer owns. Kept in one place — also mirrored in lint-staged. */
const PRESENTATION = [
  "src/shared/ui/**/*.{ts,tsx}",
  "src/features/*/ui/**/*.{ts,tsx}",
  "src/flows/**/*.{ts,tsx}",
  "src/theme/**/*.{ts,tsx}",
  "src/stories/**/*.{ts,tsx}",
];

/**
 * Material UI already ships all of these. Hand-rolling them is the exact thing
 * this kit exists to prevent, so it's an error, not a code-review conversation.
 *
 * Pruned against MUI's ACTUAL component list — an element only appears here if
 * MUI has something to replace it with. `<dl>` is absent because MUI has no
 * Descriptions equivalent; banning it would point designers at a component that
 * doesn't exist. Semantic landmarks (`header`, `nav`, `main`, `aside`,
 * `section`, `footer`) are absent too: they carry accessibility meaning and MUI
 * expects you to reach them via `<Box component="nav">`, which this rule allows.
 *
 * `div` and `span` are deliberately NOT here — they're the layout escape hatch.
 * Prefer `Box` / `Stack` / `Grid`; reach for a bare div only when there's
 * genuinely nothing to compose.
 */
const HAND_ROLLED = [
  { element: "button", message: "Use MUI <Button> / <IconButton>." },
  { element: "input", message: "Use MUI <TextField> / <Checkbox> / <Radio> / <Switch> / <Slider>." },
  { element: "select", message: "Use MUI <Select> or <Autocomplete>." },
  { element: "textarea", message: "Use MUI <TextField multiline>." },
  { element: "form", message: 'Use <Box component="form"> so it participates in the theme.' },
  { element: "label", message: "Use MUI <FormLabel> / <FormControlLabel> / <InputLabel>." },
  { element: "fieldset", message: "Use MUI <FormControl> / <FormGroup>." },
  { element: "legend", message: "Use MUI <FormLabel>." },
  { element: "table", message: "Use MUI <Table> (or <DataGrid> if MUI X is installed)." },
  { element: "thead", message: "Use MUI <TableHead>." },
  { element: "tbody", message: "Use MUI <TableBody>." },
  { element: "tfoot", message: "Use MUI <TableFooter>." },
  { element: "tr", message: "Use MUI <TableRow>." },
  { element: "td", message: "Use MUI <TableCell>." },
  { element: "th", message: "Use MUI <TableCell>." },
  { element: "ul", message: "Use MUI <List>." },
  { element: "ol", message: "Use MUI <List>." },
  { element: "li", message: "Use MUI <ListItem>." },
  { element: "h1", message: 'Use MUI <Typography variant="h1">.' },
  { element: "h2", message: 'Use MUI <Typography variant="h2">.' },
  { element: "h3", message: 'Use MUI <Typography variant="h3">.' },
  { element: "h4", message: 'Use MUI <Typography variant="h4">.' },
  { element: "h5", message: 'Use MUI <Typography variant="h5">.' },
  { element: "h6", message: 'Use MUI <Typography variant="h6">.' },
  { element: "p", message: 'Use MUI <Typography variant="body1">.' },
  { element: "a", message: "Use MUI <Link>, or router <Link> for in-app navigation." },
  { element: "img", message: 'Use MUI <Avatar>, or <Box component="img"> for a plain image.' },
  { element: "hr", message: "Use MUI <Divider>." },
  { element: "progress", message: "Use MUI <LinearProgress> / <CircularProgress>." },
  { element: "dialog", message: "Use MUI <Dialog> / <Drawer>." },
];

export const presentationRules = [
  // ---------------------------------------------------------------------------
  // 1. Import bans — ONE rule declaration, two concerns (see the note at the top).
  //    a) No logic in presentation. Data arrives via Props, actions via Callbacks.
  //    b) One component library, one styling engine.
  // ---------------------------------------------------------------------------
  {
    name: "design-in-code/presentation-imports",
    files: PRESENTATION,
    rules: {
      "no-restricted-imports": ["error", {
        paths: [
          // (a) no logic
          { name: "axios", message: "No data fetching in presentation. Use Props." },
          { name: "@tanstack/react-query", message: "No React Query in presentation. Use Props." },
          { name: "zustand", message: "No global state in presentation." },
          { name: "zustand/react", message: "No global state in presentation." },
          { name: "zod", message: "Models are dev-owned. A UI component owns its own Props interface." },
          // Navigation is allowed (Link / useNavigate / useParams). Routing LOGIC is not.
          {
            name: "@tanstack/react-router",
            importNames: ["redirect", "useLoaderData", "createRoute", "createRootRoute", "createRouter", "createFileRoute"],
            message: "Navigation only: Link / useNavigate / useParams. Loaders, guards and route wiring live in /app.",
          },

          // (b) one styling engine.
          // MUI runs ON emotion — `styled` and `sx` from @mui/material are the
          // sanctioned idiom and are NOT banned. What's banned is reaching past
          // MUI to emotion directly (your styles stop seeing the theme) or
          // bolting on a competing engine.
          { name: "@emotion/styled", message: "Use `styled` from @mui/material/styles so styles read the theme." },
          { name: "@emotion/react", message: "Use the `sx` prop or `styled` from @mui/material/styles." },
          { name: "styled-components", message: "MUI-only: use `sx` or `styled` from @mui/material/styles." },
          { name: "@stitches/react", message: "MUI-only: use `sx` or `styled` from @mui/material/styles." },
        ],
        // gitignore-style: `**/` so it catches deep + aliased imports, not just siblings.
        patterns: [
          {
            group: [
              "**/api", "**/api/**",
              "**/store", "**/store/**",
              "**/controllers", "**/controllers/**",
              "**/models", "**/models/**",
              "**/app", "**/app/**",
            ],
            message: "UI/flows cannot import from smart layers. Data comes in via Props.",
          },
          {
            group: ["*.module.css", "*.module.scss", "*.module.less"],
            message: "MUI-only: no CSS modules. Use the `sx` prop and theme values.",
          },
          {
            group: ["antd", "antd/**", "@ant-design/**", "bootstrap", "bootstrap/**", "react-bootstrap", "@chakra-ui/**", "@mantine/**"],
            message: "MUI-only: one component library. Compose from Material UI.",
          },
        ],
      }],
      "no-restricted-globals": [
        "error",
        { name: "fetch", message: "No fetch() in presentation." },
        { name: "XMLHttpRequest", message: "No network calls in presentation." },
      ],
    },
  },

  // ---------------------------------------------------------------------------
  // 2. MUI-only markup.
  // ---------------------------------------------------------------------------
  {
    name: "design-in-code/mui-only",
    files: PRESENTATION,
    plugins: { react },
    rules: {
      "react/forbid-elements": ["error", { forbid: HAND_ROLLED }],
    },
  },

  // ---------------------------------------------------------------------------
  // 3. Theme values, not raw ones. src/theme/tokens.ts is the one exemption.
  //
  //    Widened from the previous kit, which only caught hex — rgb(), hsl() and
  //    the modern color functions walked straight past it. Raw pixel values for
  //    spacing are caught too: MUI's `sx` spacing props take multiples of the
  //    theme spacing unit (`p: 2`, not `padding: "16px"`).
  // ---------------------------------------------------------------------------
  {
    name: "design-in-code/theme-values-not-raw",
    files: PRESENTATION,
    ignores: ["src/theme/tokens.ts"],
    rules: {
      "no-restricted-syntax": ["error",
        {
          selector: "Literal[value=/^#(?:[0-9a-fA-F]{3,4}){1,2}$/]",
          message: "No hardcoded colors. Use a palette path (e.g. `bgcolor: \"primary.main\"`), `theme.vars.palette.*`, or add it to /src/theme/tokens.ts.",
        },
        {
          selector: "Literal[value=/^(?:rgba?|hsla?|hwb|lab|lch|oklab|oklch)\\(/]",
          message: "No hardcoded colors. Use a palette path, `theme.vars.palette.*`, or `alpha(theme.palette.x, n)`.",
        },
        {
          selector: "Property[key.name=/^(padding|margin|gap)(Top|Right|Bottom|Left|X|Y|Block|Inline)?$/] > Literal[value=/^\\d+(px|rem|em)$/]",
          message: "Use MUI spacing shorthands (`p`, `px`, `mt`, `gap` with theme units) instead of raw lengths.",
        },
      ],
    },
  },
];

export default presentationRules;

// ---------------------------------------------------------------------------
// Known limit, stated plainly: a CSS named color written as a bare string
// (`color: "red"`) is indistinguishable from a palette path (`color: "error.main"`)
// at the AST level, so rule 3 cannot catch it. Review catches those; the rule
// catches the ones people actually paste in.
// ---------------------------------------------------------------------------
