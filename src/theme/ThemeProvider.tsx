// src/theme/ThemeProvider.tsx
//
// DESIGNER-OWNED. Wraps the app (and every Storybook story) in the theme from
// tokens.ts.
//
// Exported as a NAMED export on purpose — `src/app/router.tsx` and
// `.storybook/preview.tsx` both import it as `{ ThemeProvider }`. MUI's own
// provider is aliased on import so the two names don't collide.
//
// `CssBaseline enableColorScheme` is not optional. It normalizes the document
// and, with `enableColorScheme`, sets the CSS `color-scheme` property so the
// page background, scrollbars, and form controls follow the active scheme.
// Without it, dark mode renders on a white page — which reads as a broken theme
// rather than a missing line of setup.

import type { ReactNode } from "react";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./tokens";

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
