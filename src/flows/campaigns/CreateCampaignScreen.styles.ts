import type { SxProps, Theme } from "@mui/material/styles";

export const styles = {
  page: {
    minHeight: "100%",
    bgcolor: "background.default",
    py: { xs: 3, md: 4 },
  },
  container: {
    px: { xs: 2, sm: 3, md: 4 },
  },
  intro: {
    mb: { xs: 4, md: 6 },
  },
  titleRow: {
    display: "flex",
    alignItems: "center",
    gap: 1,
    mb: 1,
  },
  introDescription: {
    fontWeight: "fontWeightLight",
  },
  content: {
    width: "100%",
    mx: "auto",
    maxWidth: { lg: "50%" },
  },
  stepper: {
    mb: { xs: 4, md: 6 },
  },
  card: {
    overflow: "hidden",
  },
  cardContent: {
    p: { xs: 3, md: 7 },
  },
  section: {
    display: "grid",
    gap: 2,
  },
  sectionHeading: {
    mb: 1,
  },
  sectionDescription: {
    fontWeight: "fontWeightLight",
  },
  assetCard: {
    display: "grid",
    gap: 1,
    p: 2,
    height: "100%",
  },
  assetState: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 1,
  },
  formatGrid: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
    gap: 1,
  },
  actions: {
    display: "flex",
    borderTop: 1,
    borderColor: "divider",
    px: { xs: 3, md: 7 },
    py: { xs: 2, md: 4 },
  },
  actionGroup: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
    ml: "auto",
  },
  success: {
    display: "grid",
    gap: 3,
    width: "100%",
    maxWidth: 640,
    textAlign: "center",
  },
  successArea: {
    minHeight: "calc(100vh - 160px)",
    display: "grid",
    placeItems: "center",
  },
  successTitle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 1.5,
  },
  successDescription: {
    fontWeight: "fontWeightLight",
  },
} satisfies Record<string, SxProps<Theme>>;
