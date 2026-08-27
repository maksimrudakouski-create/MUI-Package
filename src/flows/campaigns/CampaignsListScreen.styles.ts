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
    mb: { xs: 3, md: 2 },
  },
  titleRow: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 2,
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
    width: { xs: "100%", sm: "auto" },
    flexGrow: 1,
    minWidth: 0,
  },
  searchActions: {
    display: "grid",
    gridTemplateColumns: { xs: "1fr", sm: "minmax(0, 1fr) auto" },
    alignItems: "center",
    gap: 1,
  },
  viewToggle: {
    flexShrink: 0,
    justifySelf: { sm: "end" },
    gridColumn: { sm: "1 / -1" },
    mt: { xs: 2, md: 4 },
    "& .MuiToggleButton-root": {
      display: "flex",
      gap: 1,
      whiteSpace: "nowrap",
    },
  },
  newCampaignButton: {
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  card: {
    minHeight: 340,
    display: "flex",
    flexDirection: "column",
  },
  cardImage: {
    aspectRatio: "16 / 6",
    objectFit: "cover",
  },
  imageLink: {
    display: "block",
    lineHeight: 0,
  },
  listCard: {
    minHeight: 0,
    flexDirection: { xs: "column", md: "row" },
  },
  listImageLink: {
    flexBasis: { md: "32%" },
    flexShrink: 0,
  },
  listCardImage: {
    aspectRatio: { xs: "16 / 6", md: "16 / 9" },
  },
  cardContent: {
    display: "grid",
    gap: 2,
    flexGrow: 1,
    p: 3,
  },
  listCardContent: {
    justifyContent: "center",
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
  listActions: {
    alignSelf: { md: "center" },
    flexShrink: 0,
    px: { xs: 3, md: 2 },
    pb: { xs: 3, md: 0 },
  },
  deleteButton: {
    color: "text.secondary",
  },
  empty: {
    py: 8,
    textAlign: "center",
  },
} satisfies Record<string, SxProps<Theme>>;
