// src/flows/_devbar/DevBar.styles.ts
//
// Style objects for the DevBar, kept out of the JSX. This is the kit
// convention: presentational style objects live in a co-located *.styles.ts,
// never scattered inline.
//
// The type is `SxProps<Theme>`, not `CSSProperties` — in MUI these objects are
// handed to the `sx` prop, which resolves theme-aware shorthands (`p: 1.5`
// means 1.5 × theme spacing, `bgcolor: "background.paper"` means the palette
// entry). Anything that needs the full theme is written as a callback; `sx`
// passes the theme in, so there is no getStyles(token) factory here.

import type { SxProps, Theme } from "@mui/material/styles";

const BAR_HEIGHT = 44;

export const styles = {
  bar: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: (theme) => theme.zIndex.appBar + 1,
    height: BAR_HEIGHT,
    px: 1.5,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 1.5,
    bgcolor: "background.paper",
    borderBottom: 1,
    borderColor: "divider",
    boxShadow: 1,
  },

  /** Pushes the app's own header clear of the fixed bar. */
  spacer: { height: BAR_HEIGHT },

  hiddenToggle: {
    position: "fixed",
    top: 8,
    left: 8,
    zIndex: (theme) => theme.zIndex.appBar + 1,
  },

  screenPicker: { width: 340 },

  pathChip: { fontFamily: "monospace" },

  group: { display: "flex", alignItems: "center", gap: 1 },
} satisfies Record<string, SxProps<Theme>>;
