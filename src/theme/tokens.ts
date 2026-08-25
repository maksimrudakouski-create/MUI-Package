// src/theme/tokens.ts
//
// DESIGNER-OWNED. The single source of visual truth, and **the only file in the
// project allowed to contain raw color values** — the ESLint fragment exempts
// this path and nothing else.
//
// Everything visual is decided here: palette, typography, shape, spacing, and
// per-component defaults. If you find yourself repeating the same `sx` on every
// Button, that repetition belongs in `components.MuiButton` below instead.
//
// Three settings are STRUCTURAL, not taste. Don't remove them:
//   1. `cssVariables` — emits real CSS custom properties and makes `theme.vars`
//      available. Without it, `theme.vars` is undefined and half the styling
//      guidance in AGENTS.md stops working.
//   2. `colorSchemeSelector: "class"` — lets the scheme switch by toggling a
//      class on <html> instead of re-rendering the tree.
//   3. `colorSchemes: { light, dark }` — DevBar's `useColorScheme()` toggle
//      hides itself if the theme has no schemes, and you lose the dark-mode
//      pass over the Theme Showcase, where roughly half of all theming bugs
//      surface.

import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  cssVariables: { colorSchemeSelector: "class" },

  colorSchemes: {
    // `true` means "use MUI's default palette for this scheme". Replace either
    // one with a `{ palette: { ... } }` object when you have brand colors.
    light: {
      palette: {
        background: { default: "#f7f8fb" },
        primary: { main: "#1976d2" },
        secondary: { main: "#9c27b0" },
      },
    },
    dark: true,
  },

  shape: {
    // One number drives every corner in the app. Raise it for a softer product,
    // drop it to 0 for a denser, more utilitarian one.
    borderRadius: 8,
  },

  // The base unit behind every spacing shorthand: `p: 2` is 16px at spacing 8.
  // Change this and the whole app breathes differently — that's the point.
  spacing: 8,

  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },

  components: {
    // Per-component defaults and overrides live here. Two examples of the two
    // shapes you'll use — delete or extend them.
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { textTransform: "none" } },
    },
    MuiTextField: {
      defaultProps: { size: "small" },
    },
  },
});

export default theme;
