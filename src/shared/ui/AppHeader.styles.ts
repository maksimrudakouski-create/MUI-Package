import type { SxProps, Theme } from "@mui/material/styles";

export const styles = {
  header: {},
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    gap: 2,
    px: { xs: 2, sm: 3, md: 4 },
  },
  navigation: {
    minWidth: 0,
  },
} satisfies Record<string, SxProps<Theme>>;
