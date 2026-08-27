import type { SxProps, Theme } from "@mui/material/styles";

export const styles = {
  header: (theme) => ({
    position: "sticky",
    top: 0,
    zIndex: theme.zIndex.appBar,
    transition: theme.transitions.create(["background-color", "box-shadow"]),
  }),
  headerScrolled: {
    bgcolor: "background.paper",
    boxShadow: 3,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    gap: 2,
    px: { xs: 2, sm: 3, md: 4 },
  },
  logo: {
    color: "text.primary",
    textDecoration: "none",
  },
  navigation: {
    minWidth: 0,
    alignSelf: "stretch",
    display: "flex",
  },
  tabs: {
    flex: 1,
    height: "100%",
    "& .MuiTabs-scroller, & .MuiTabs-list": {
      height: "100%",
    },
    "& .MuiTab-root": {
      height: "100%",
      minHeight: 0,
    },
  },
  actions: {
    display: "flex",
    alignSelf: "stretch",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "flex-end",
    gap: 1,
  },
} satisfies Record<string, SxProps<Theme>>;
