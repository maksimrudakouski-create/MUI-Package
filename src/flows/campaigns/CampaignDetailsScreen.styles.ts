import type { SxProps, Theme } from "@mui/material/styles";

export const styles = {
  page: {
    py: { xs: 3, md: 5 },
  },
  back: {
    mb: 3,
  },
  summary: {
    display: "grid",
    gap: 2,
    mb: 4,
  },
  description: {
    fontWeight: "fontWeightLight",
  },
  metadata: {
    display: "flex",
    flexWrap: "wrap",
    gap: 1,
  },
  section: {
    mb: 4,
  },
  artworkCard: {
    height: "100%",
  },
  artworkPreview: {
    aspectRatio: "4 / 3",
    display: "grid",
    placeItems: "center",
    bgcolor: "action.hover",
  },
  artworkContent: {
    display: "grid",
    gap: 1,
  },
  prompt: {
    p: 3,
    bgcolor: "action.hover",
  },
} satisfies Record<string, SxProps<Theme>>;
