import { Box, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { styles } from "./AppHeader.styles";

export type AppSection = "settings" | "campaigns" | "contacts";

type AppHeaderProps = {
  activeSection: AppSection;
  onSectionSelect?: (section: AppSection) => void;
};

const sections: { label: string; value: AppSection }[] = [
  { label: "Settings", value: "settings" },
  { label: "Campaigns", value: "campaigns" },
  { label: "Contacts", value: "contacts" },
];

export function AppHeader({ activeSection, onSectionSelect }: AppHeaderProps) {
  return (
    <Box component="header" sx={styles.header}>
      <Toolbar disableGutters sx={styles.toolbar}>
        <Typography variant="h6">Stanleys AI</Typography>
        <Box component="nav" aria-label="Primary navigation" sx={styles.navigation}>
          <Tabs
            allowScrollButtonsMobile
            aria-label="Primary navigation"
            onChange={(_, section: AppSection) => onSectionSelect?.(section)}
            scrollButtons="auto"
            value={activeSection}
            variant="scrollable"
          >
            {sections.map((section) => (
              <Tab key={section.value} label={section.label} value={section.value} />
            ))}
          </Tabs>
        </Box>
      </Toolbar>
    </Box>
  );
}
