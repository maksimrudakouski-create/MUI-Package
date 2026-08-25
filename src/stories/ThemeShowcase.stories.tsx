// src/stories/ThemeShowcase.stories.tsx
//
// The COMPLETE kitchen sink: one instance of (nearly) every Material UI
// component, grouped by MUI's own doc categories, with a palette and type-scale
// board on top. Because MUI is themed from a single theme object, this page is
// where a designer verifies that a change in /src/theme/tokens.ts landed
// EVERYWHERE. Change a token, reload this story, scan top to bottom — then flip
// the color scheme and scan again.
//
// Requires the ThemeProvider decorator in .storybook/preview (see SETUP.md) so
// this reflects the real theme rather than MUI's defaults.
//
// Overlay components (Dialog, Drawer, Menu, Snackbar, Popover) are behind
// trigger buttons — click to theme-check them.
//
// MUI X (DataGrid, DatePicker, Charts) is NOT included: it's a separate,
// commercially licensed package and this kit doesn't install it. If your
// project adds it, add a section here too — an unthemed grid is exactly the
// kind of drift this story exists to catch.

import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/tanstack-react";
import {
  Accordion, AccordionDetails, AccordionSummary, Alert, AlertTitle, Autocomplete,
  Avatar, AvatarGroup, Backdrop, Badge, Box, Breadcrumbs, Button, ButtonGroup,
  Card, CardActions, CardContent, CardHeader, Checkbox, Chip, CircularProgress,
  Container, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer,
  Fab, FormControl, FormControlLabel, FormGroup, FormLabel, Grid, IconButton,
  InputLabel, LinearProgress, Link, List, ListItem, ListItemButton, ListItemIcon,
  ListItemText, Menu, MenuItem, Pagination, Paper, Radio, RadioGroup, Rating,
  Select, Skeleton, Slider, Snackbar, Stack, Step, StepLabel, Stepper, Switch,
  Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs,
  TextField, ToggleButton, ToggleButtonGroup, Tooltip, Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HomeIcon from "@mui/icons-material/Home";
import InboxIcon from "@mui/icons-material/Inbox";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";

// ---- shared demo data (mock only; nothing here calls a network) ----
const selectOptions = ["Option one", "Option two", "Option three"];
const rows = [
  { id: 1, name: "Row one", status: "active", amount: "1,200" },
  { id: 2, name: "Row two", status: "active", amount: "3,400" },
];

const PALETTE_ROLES = [
  "primary", "secondary", "error", "warning", "info", "success",
] as const;

const TYPE_VARIANTS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "subtitle1", "subtitle2", "body1", "body2",
  "button", "caption", "overline",
] as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <Box>
      <Divider textAlign="left" sx={{ my: 2 }}>
        <Typography variant="subtitle2">{title}</Typography>
      </Divider>
      <Stack direction="row" spacing={2} useFlexGap sx={{ flexWrap: "wrap", alignItems: "flex-start" }}>
        {children}
      </Stack>
    </Box>
  );
}

function Showcase() {
  const theme = useTheme();
  const [dialog, setDialog] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [snack, setSnack] = useState(false);
  const [backdrop, setBackdrop] = useState(false);
  const [tab, setTab] = useState(0);
  const [toggle, setToggle] = useState("left");
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Typography variant="h4" gutterBottom>
        Theme showcase — all components
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Themed from src/theme/tokens.ts. Change a value, reload, and scan for
        anything that didn&apos;t update. Then flip the color scheme in the
        toolbar and scan again — half of all theming bugs only show in dark mode.
      </Typography>

      <Section title="Palette — every role, with its contrast text">
        {PALETTE_ROLES.map((role) => (
          <Paper key={role} variant="outlined" sx={{ width: 150, overflow: "hidden" }}>
            <Box sx={{ bgcolor: `${role}.main`, color: `${role}.contrastText`, p: 1.5 }}>
              <Typography variant="body2">{role}.main</Typography>
            </Box>
            <Box sx={{ bgcolor: `${role}.light`, color: `${role}.contrastText`, p: 1 }}>
              <Typography variant="caption">light</Typography>
            </Box>
            <Box sx={{ bgcolor: `${role}.dark`, color: `${role}.contrastText`, p: 1 }}>
              <Typography variant="caption">dark</Typography>
            </Box>
          </Paper>
        ))}
        <Paper variant="outlined" sx={{ width: 150, overflow: "hidden" }}>
          <Box sx={{ bgcolor: "background.paper", color: "text.primary", p: 1.5 }}>
            <Typography variant="body2">paper</Typography>
          </Box>
          <Box sx={{ bgcolor: "background.default", color: "text.secondary", p: 1.5 }}>
            <Typography variant="caption">default</Typography>
          </Box>
        </Paper>
      </Section>

      <Section title="Typography — the full variant scale">
        <Stack spacing={0.5} sx={{ width: "100%" }}>
          {TYPE_VARIANTS.map((v) => (
            <Stack key={v} direction="row" spacing={2} sx={{ alignItems: "baseline" }}>
              <Typography variant="caption" color="text.secondary" sx={{ width: 90 }}>
                {v}
              </Typography>
              <Typography variant={v}>The quick brown fox</Typography>
            </Stack>
          ))}
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1 }}>
            Base spacing unit: {theme.spacing(1)} · Base radius:{" "}
            {String(theme.shape.borderRadius)}
          </Typography>
        </Stack>
      </Section>

      <Section title="Inputs — Button, Fab, ToggleButton">
        <Button variant="contained">Contained</Button>
        <Button variant="outlined">Outlined</Button>
        <Button variant="text">Text</Button>
        <Button variant="contained" color="error">Error</Button>
        <Button variant="contained" disabled>Disabled</Button>
        <Button variant="contained" startIcon={<AddIcon />}>With icon</Button>
        <ButtonGroup variant="outlined">
          <Button>One</Button>
          <Button>Two</Button>
        </ButtonGroup>
        <IconButton color="primary"><DeleteIcon /></IconButton>
        <Fab size="small" color="primary"><AddIcon /></Fab>
        <ToggleButtonGroup
          exclusive
          size="small"
          value={toggle}
          onChange={(_, v: string | null) => v && setToggle(v)}
        >
          <ToggleButton value="left">Left</ToggleButton>
          <ToggleButton value="right">Right</ToggleButton>
        </ToggleButtonGroup>
      </Section>

      <Section title="Inputs — text, select, autocomplete">
        <TextField label="Standard" size="small" />
        <TextField label="Outlined" size="small" defaultValue="Value" />
        <TextField label="Error" size="small" error helperText="Looks invalid" />
        <TextField label="Multiline" size="small" multiline rows={2} sx={{ width: 220 }} />
        <TextField label="Password" size="small" type="password" />
        <FormControl size="small" sx={{ width: 200 }}>
          <InputLabel id="demo-select">Select</InputLabel>
          <Select labelId="demo-select" label="Select" defaultValue={selectOptions[0]}>
            {selectOptions.map((o) => (
              <MenuItem key={o} value={o}>{o}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Autocomplete
          size="small"
          sx={{ width: 220 }}
          options={selectOptions}
          renderInput={(params) => <TextField {...params} label="Autocomplete" />}
        />
      </Section>

      <Section title="Inputs — selection controls">
        <FormGroup>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Checkbox" />
          <FormControlLabel control={<Switch defaultChecked />} label="Switch" />
        </FormGroup>
        <FormControl>
          <FormLabel>Radio group</FormLabel>
          <RadioGroup row defaultValue="a">
            <FormControlLabel value="a" control={<Radio />} label="A" />
            <FormControlLabel value="b" control={<Radio />} label="B" />
          </RadioGroup>
        </FormControl>
        <Box sx={{ width: 200 }}>
          <Slider defaultValue={40} valueLabelDisplay="auto" />
        </Box>
        <Rating defaultValue={3} />
      </Section>

      <Section title="Data display — Avatar, Badge, Chip, List, Table">
        <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
          <Avatar><PersonIcon /></Avatar>
          <Avatar sx={{ bgcolor: "primary.main" }}>DK</Avatar>
          <AvatarGroup max={3}>
            <Avatar>A</Avatar><Avatar>B</Avatar><Avatar>C</Avatar><Avatar>D</Avatar>
          </AvatarGroup>
          <Badge badgeContent={5} color="primary"><InboxIcon /></Badge>
        </Stack>
        <Stack direction="row" spacing={1}>
          <Chip label="default" />
          <Chip label="primary" color="primary" />
          <Chip label="outlined" variant="outlined" />
          <Chip label="deletable" onDelete={() => {}} />
        </Stack>
        <Paper variant="outlined" sx={{ width: 240 }}>
          <List dense>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon><InboxIcon /></ListItemIcon>
                <ListItemText primary="List item one" secondary="Secondary text" />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              <ListItemButton selected>
                <ListItemIcon><SettingsIcon /></ListItemIcon>
                <ListItemText primary="List item two (selected)" />
              </ListItemButton>
            </ListItem>
          </List>
        </Paper>
        <TableContainer component={Paper} variant="outlined" sx={{ width: 360 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((r) => (
                <TableRow key={r.id} hover>
                  <TableCell>{r.name}</TableCell>
                  <TableCell><Chip size="small" color="success" label={r.status} /></TableCell>
                  <TableCell align="right">{r.amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Section>

      <Section title="Surfaces — Card, Paper, Accordion, elevation">
        <Card sx={{ width: 280 }}>
          <CardHeader title="Card title" subheader="Subheader" />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Card body content.
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">Action</Button>
          </CardActions>
        </Card>
        <Box sx={{ width: 280 }}>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Panel one</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">Content one</Typography>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Panel two</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2">Content two</Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
        <Stack direction="row" spacing={1}>
          {[0, 1, 3, 6, 12, 24].map((e) => (
            <Paper key={e} elevation={e} sx={{ p: 1.5, minWidth: 56, textAlign: "center" }}>
              <Typography variant="caption">{e}</Typography>
            </Paper>
          ))}
        </Stack>
      </Section>

      <Section title="Navigation — Tabs, Stepper, Breadcrumbs, Pagination, Menu">
        <Box sx={{ width: 320 }}>
          <Tabs value={tab} onChange={(_, v: number) => setTab(v)}>
            <Tab label="Tab one" />
            <Tab label="Tab two" />
          </Tabs>
        </Box>
        <Box sx={{ width: 360 }}>
          <Stepper activeStep={1}>
            <Step><StepLabel>Start</StepLabel></Step>
            <Step><StepLabel>Doing</StepLabel></Step>
            <Step><StepLabel>Done</StepLabel></Step>
          </Stepper>
        </Box>
        <Breadcrumbs>
          <Link href="#" underline="hover"><HomeIcon fontSize="inherit" /></Link>
          <Link href="#" underline="hover">Section</Link>
          <Typography color="text.primary">Page</Typography>
        </Breadcrumbs>
        <Pagination count={5} size="small" />
        <Button onClick={(e) => setMenuAnchor(e.currentTarget)}>Open menu</Button>
        <Menu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={() => setMenuAnchor(null)}
        >
          <MenuItem onClick={() => setMenuAnchor(null)}>Action one</MenuItem>
          <MenuItem onClick={() => setMenuAnchor(null)}>Action two</MenuItem>
        </Menu>
      </Section>

      <Section title="Layout — Grid, Stack">
        <Grid container spacing={2} sx={{ width: "100%" }}>
          {[1, 2, 3].map((n) => (
            <Grid key={n} size={{ xs: 12, sm: 4 }}>
              <Paper variant="outlined" sx={{ p: 2, textAlign: "center" }}>
                <Typography variant="body2">col {n}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Section>

      <Section title="Feedback — Alert, Progress, Skeleton">
        <Stack spacing={1} sx={{ width: 320 }}>
          <Alert severity="info">Info</Alert>
          <Alert severity="success">Success</Alert>
          <Alert severity="warning">Warning</Alert>
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            With a title and description.
          </Alert>
        </Stack>
        <Stack spacing={1} sx={{ width: 220 }}>
          <LinearProgress />
          <LinearProgress variant="determinate" value={60} />
          <Skeleton variant="text" />
          <Skeleton variant="rectangular" height={60} />
        </Stack>
        <CircularProgress />
        <Tooltip title="Tooltip text"><Button>Hover: Tooltip</Button></Tooltip>
      </Section>

      <Section title="Overlays — click to theme-check">
        <Button variant="outlined" onClick={() => setDialog(true)}>Dialog</Button>
        <Button variant="outlined" onClick={() => setDrawer(true)}>Drawer</Button>
        <Button variant="outlined" onClick={() => setSnack(true)}>Snackbar</Button>
        <Button variant="outlined" onClick={() => setBackdrop(true)}>Backdrop</Button>

        <Dialog open={dialog} onClose={() => setDialog(false)}>
          <DialogTitle>Themed dialog</DialogTitle>
          <DialogContent>
            <Typography variant="body2">Dialog body content.</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialog(false)}>Cancel</Button>
            <Button variant="contained" onClick={() => setDialog(false)}>Confirm</Button>
          </DialogActions>
        </Dialog>

        <Drawer anchor="right" open={drawer} onClose={() => setDrawer(false)}>
          <Box sx={{ width: 280, p: 2 }}>
            <Typography variant="h6">Themed drawer</Typography>
          </Box>
        </Drawer>

        <Snackbar
          open={snack}
          autoHideDuration={2500}
          onClose={() => setSnack(false)}
          message="Themed snackbar"
        />

        <Backdrop open={backdrop} onClick={() => setBackdrop(false)}>
          <CircularProgress color="inherit" />
        </Backdrop>
      </Section>
    </Container>
  );
}

const meta: Meta<typeof Showcase> = {
  title: "System/Theme Showcase",
  component: Showcase,
  parameters: { layout: "fullscreen" },
};
export default meta;

export const AllComponents: StoryObj<typeof Showcase> = {};
