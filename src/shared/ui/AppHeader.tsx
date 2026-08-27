import type { ReactNode } from "react";
import { Link as RouterLink } from "@tanstack/react-router";
import { Box, Tab, Tabs, Toolbar, Typography, useScrollTrigger } from "@mui/material";
import { styles } from "./AppHeader.styles";

export type AppSection = "settings" | "campaigns" | "contacts";

type AppHeaderProps = {
  activeSection: AppSection;
  action?: ReactNode;
  onLogoClick?: () => void;
  onSectionSelect?: (section: AppSection) => void;
};

const sections: { label: string; value: AppSection }[] = [
  { label: "Settings", value: "settings" },
  { label: "Campaigns", value: "campaigns" },
  { label: "Contacts", value: "contacts" },
];

export function AppHeader({ activeSection, action, onLogoClick, onSectionSelect }: AppHeaderProps) {
  const isScrolled = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
  });

  return (
    <Box component="header" sx={isScrolled ? [styles.header, styles.headerScrolled] : styles.header}>
      <Toolbar disableGutters sx={styles.toolbar}>
        <Typography
          component={RouterLink}
          onClick={(event) => {
            if (onLogoClick) {
              event.preventDefault();
              onLogoClick();
            }
          }}
          sx={styles.logo}
          to="/campaigns"
          variant="h6"
        >
          Stanleys AI
        </Typography>
        <Box sx={styles.actions}>
          <Box component="nav" aria-label="Primary navigation" sx={styles.navigation}>
            <Tabs
              allowScrollButtonsMobile
              aria-label="Primary navigation"
              onChange={(_, section: AppSection) => onSectionSelect?.(section)}
              scrollButtons="auto"
              sx={styles.tabs}
              value={activeSection}
              variant="scrollable"
            >
              {sections.map((section) => (
                <Tab key={section.value} label={section.label} value={section.value} />
              ))}
            </Tabs>
          </Box>
          {action}
        </Box>
      </Toolbar>
    </Box>
  );
}
