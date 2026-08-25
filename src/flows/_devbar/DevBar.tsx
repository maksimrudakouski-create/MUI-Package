// src/flows/_devbar/DevBar.tsx
//
// Designer's dev-only nav bar (think: WordPress admin bar).
//
// Renders ONLY in development. `import.meta.env.DEV` is statically replaced at
// build time, so the prod branch collapses to `return null` and DevBarPanel —
// along with everything it imports — is tree-shaken out of production bundles.
//
// Note the two-component split: the DEV check has to sit in a component with NO
// hooks, otherwise it's a conditional early-return above useState/useColorScheme
// and react-hooks flags it (correctly).
//
// It reads src/flows/routes.tsx (plain data — no loaders/guards) and builds a
// jump-to-any-screen switcher. Nothing here fetches, stores, or guards.

import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
  Autocomplete,
  Box,
  Button,
  Chip,
  IconButton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
} from "@mui/material";
import { useColorScheme } from "@mui/material/styles";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import BoltIcon from "@mui/icons-material/Bolt";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { flattenRoutes, resolvePath, type FlatRoute } from "./flatten";
import { FLOWMAP_URL, STORYBOOK_URL } from "./devUrls";
import { styles } from "./DevBar.styles";

/** Dev gate only. No hooks in here — that's the whole point of the split. */
export function DevBar() {
  if (!import.meta.env.DEV) return null;
  return <DevBarPanel />;
}

function DevBarPanel() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  // `mode` is undefined if the theme wasn't created with colorSchemes —
  // the toggle just hides itself rather than blowing up.
  const { mode, setMode } = useColorScheme();
  const [role, setRole] = useState<string>("all");
  const [hidden, setHidden] = useState(false);

  const all = useMemo(() => flattenRoutes(), []);
  const roles = useMemo(
    () => ["all", ...Array.from(new Set(all.map((r) => r.role)))],
    [all]
  );

  const options = useMemo(
    () =>
      (role === "all" ? all : all.filter((r) => r.role === role))
        // Autocomplete groups by adjacency, so sort by flow first or a flow
        // that appears twice in routes.tsx renders as two separate groups.
        .slice()
        .sort((a, b) => a.flow.localeCompare(b.flow)),
    [all, role]
  );

  if (hidden) {
    return (
      <Button
        size="small"
        variant="outlined"
        startIcon={<BoltIcon />}
        onClick={() => setHidden(false)}
        sx={styles.hiddenToggle}
      >
        Dev
      </Button>
    );
  }

  return (
    <>
      <Box sx={styles.bar}>
        <Box sx={styles.group}>
          <Chip size="small" color="primary" label="DEV" />

          <ToggleButtonGroup
            exclusive
            size="small"
            value={role}
            onChange={(_, next: string | null) => next && setRole(next)}
          >
            {roles.map((r) => (
              <ToggleButton key={r} value={r}>
                {r}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>

          <Autocomplete<FlatRoute>
            size="small"
            sx={styles.screenPicker}
            options={options}
            groupBy={(o) => o.flow}
            getOptionLabel={(o) => `${o.label}  ·  ${o.path}`}
            isOptionEqualToValue={(a, b) => a.path === b.path}
            // Controlled to null so the field clears after each jump.
            value={null}
            blurOnSelect
            noOptionsText="No screens yet — add one to src/flows/routes.tsx"
            onChange={(_, picked) => {
              if (!picked) return;
              // Dynamic route tree => `to` is not literal-typed. Intentional.
              navigate({ to: resolvePath(picked.path, picked.samples) });
            }}
            renderInput={(params) => (
              <TextField {...params} placeholder="Jump to screen…" />
            )}
          />

          <Chip size="small" variant="outlined" label={pathname} sx={styles.pathChip} />
        </Box>

        <Box sx={styles.group}>
          <Tooltip title="Flow map — how all screens connect">
            <Button
              size="small"
              variant="outlined"
              startIcon={<AccountTreeIcon />}
              href={FLOWMAP_URL}
              target="_blank"
              rel="noreferrer"
            >
              Flow map
            </Button>
          </Tooltip>

          <Tooltip title="Storybook — components & every screen state">
            <Button
              size="small"
              variant="outlined"
              startIcon={<MenuBookIcon />}
              href={STORYBOOK_URL}
              target="_blank"
              rel="noreferrer"
            >
              Storybook
            </Button>
          </Tooltip>

          {mode && (
            <Tooltip title={`Switch to ${mode === "dark" ? "light" : "dark"} mode`}>
              <IconButton
                size="small"
                onClick={() => setMode(mode === "dark" ? "light" : "dark")}
              >
                {mode === "dark" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>
          )}

          <Tooltip title="Hide bar">
            <IconButton size="small" onClick={() => setHidden(true)}>
              <VisibilityOffIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Box sx={styles.spacer} />
    </>
  );
}

export default DevBar;
