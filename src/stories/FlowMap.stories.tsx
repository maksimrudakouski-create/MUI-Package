// src/stories/FlowMap.stories.tsx
//
// The Flow Map the DevBar links to. The story ID is load-bearing:
//   title "System/Flow Map" + export `AllFlows` -> system-flow-map--all-flows
// which is exactly the URL built in src/flows/_devbar/devUrls.ts. Rename either
// side and the DevBar's "Flow map" button 404s.
//
// Reads the designer's route tree and renders every screen, grouped by flow,
// filterable by role, with a click-through into the running app. Pure data —
// no fetching, no state, no guards.

import { useMemo, useState } from "react";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import {
  Accordion, AccordionDetails, AccordionSummary, Alert, Box, Button, Chip,
  Container, Paper, Stack, Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, ToggleButton, ToggleButtonGroup, Tooltip, Typography,
} from "@mui/material";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LaunchIcon from "@mui/icons-material/Launch";
import { flattenRoutes, groupByFlow, resolvePath } from "../flows/_devbar/flatten";
import { APP_URL } from "../flows/_devbar/devUrls";

function FlowMap() {
  const [role, setRole] = useState<string>("all");

  const all = useMemo(() => flattenRoutes(), []);
  const roles = useMemo(
    () => ["all", ...Array.from(new Set(all.map((r) => r.role)))],
    [all]
  );

  const visible = role === "all" ? all : all.filter((r) => r.role === role);
  const groups = groupByFlow(visible);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 1 }}>
        <AccountTreeIcon color="primary" />
        <Typography variant="h5">Flow map</Typography>
        <Chip size="small" label={`${all.length} screens`} />
      </Stack>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Every screen declared in src/flows/routes.tsx, grouped by flow. Roles
        here are design annotation — labels for navigating the prototype, not
        access control.
      </Typography>

      {all.length === 0 ? (
        <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="body2" color="text.secondary">
            No flows yet. Add an entry to src/flows/routes.tsx and this fills in
            automatically.
          </Typography>
        </Paper>
      ) : (
        <>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", mb: 2 }}>
            <Typography variant="body2" color="text.secondary">Role:</Typography>
            <ToggleButtonGroup
              exclusive
              size="small"
              value={role}
              onChange={(_, next: string | null) => next && setRole(next)}
            >
              {roles.map((r) => (
                <ToggleButton key={r} value={r}>{r}</ToggleButton>
              ))}
            </ToggleButtonGroup>
          </Stack>

          <Alert severity="info" sx={{ mb: 2 }}>
            &quot;Open&quot; links assume the app is running at {APP_URL}.
          </Alert>

          {groups.map(([flow, items]) => (
            <Accordion key={flow} defaultExpanded disableGutters>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
                  <Typography variant="subtitle2">{flow}</Typography>
                  <Chip size="small" label={items.length} />
                </Stack>
              </AccordionSummary>
              <AccordionDetails sx={{ p: 0 }}>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Screen</TableCell>
                        <TableCell>Path</TableCell>
                        <TableCell>Role</TableCell>
                        <TableCell align="right" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {items.map((row) => (
                        <TableRow key={row.path} hover>
                          <TableCell>
                            <Typography variant="body2">{row.label}</Typography>
                          </TableCell>
                          <TableCell>
                            <Box component="code" sx={{ fontFamily: "monospace" }}>
                              {row.path}
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip
                              size="small"
                              label={row.role}
                              color={row.role === "unassigned" ? "default" : "primary"}
                              variant={row.role === "unassigned" ? "filled" : "outlined"}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Tooltip
                              title={`Open ${resolvePath(row.path, row.samples)} in the running app`}
                            >
                              <Button
                                size="small"
                                startIcon={<LaunchIcon />}
                                href={`${APP_URL}${resolvePath(row.path, row.samples)}`}
                                target="_blank"
                                rel="noreferrer"
                              >
                                Open
                              </Button>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          ))}
        </>
      )}
    </Container>
  );
}

const meta: Meta<typeof FlowMap> = {
  title: "System/Flow Map",
  component: FlowMap,
  parameters: { layout: "fullscreen" },
};

export default meta;

// Export name is load-bearing — see the header comment.
export const AllFlows: StoryObj<typeof FlowMap> = {};
