import type { SxProps, Theme } from "@mui/material/styles";

export const styles = {
  page: {
    minHeight: "100%",
    display: "grid",
    placeItems: "center",
    bgcolor: "background.default",
    px: { xs: 2, sm: 3 },
    py: { xs: 4, sm: 8 },
  },
  card: {
    width: "100%",
    maxWidth: 440,
  },
  content: {
    p: { xs: 3, sm: 4 },
  },
  icon: {
    mb: 2,
    color: "primary.main",
  },
  description: {
    mb: 4,
    fontWeight: "fontWeightLight",
  },
  form: {
    display: "grid",
    gap: 2,
  },
  action: {
    mt: 1,
  },
  back: {
    mt: 3,
  },
  confirmation: {
    display: "grid",
    gap: 3,
  },
} satisfies Record<string, SxProps<Theme>>;
