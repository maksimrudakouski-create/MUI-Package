import type { SxProps, Theme } from "@mui/material/styles";

export const styles = {
  page: {
    py: { xs: 3, md: 5 },
  },
  container: {
    px: { xs: 2, sm: 3, md: 3 },
  },
  header: {
    display: "grid",
    gap: 1,
    mb: { xs: 4, md: 6 },
  },
  titleRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 2,
  },
  titleActions: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 1,
  },
  summaryRow: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) minmax(360px, 1fr)" },
    alignItems: "start",
    gap: { xs: 2, md: 4 },
  },
  description: {
    maxWidth: 620,
    fontWeight: "fontWeightLight",
  },
  search: {
    width: "100%",
    maxWidth: 730,
    justifySelf: { md: "end" },
  },
  card: {
    minHeight: 340,
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    display: "grid",
    gap: 2,
    flexGrow: 1,
    p: 3,
  },
  metadata: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  },
  actions: {
    justifyContent: "space-between",
    px: 3,
    pb: 3,
  },
  empty: {
    py: 8,
    textAlign: "center",
  },
} satisfies Record<string, SxProps<Theme>>;
