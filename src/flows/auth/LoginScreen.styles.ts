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
  heading: {
    mb: 1,
  },
  description: {
    mb: 4,
  },
  form: {
    display: "grid",
    gap: 2,
  },
  supportingRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 1,
  },
  submit: {
    mt: 1,
  },
  footer: {
    mt: 3,
    textAlign: "center",
  },
} satisfies Record<string, SxProps<Theme>>;
