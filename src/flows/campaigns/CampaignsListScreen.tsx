import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "@tanstack/react-router";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import GridViewIcon from "@mui/icons-material/GridView";
import SearchIcon from "@mui/icons-material/Search";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { AppHeader } from "../../shared/ui/AppHeader";
import cityAtBlueHour from "../../assets/campaigns/city-at-blue-hour.png";
import springEditorial from "../../assets/campaigns/spring-editorial.png";
import weekendBreakfast from "../../assets/campaigns/weekend-breakfast.png";
import { mockCampaigns, type MockCampaign } from "./mockCampaigns";
import { styles } from "./CampaignsListScreen.styles";

const campaignImages = [springEditorial, cityAtBlueHour, weekendBreakfast];

type CampaignView = "grid" | "list";

export default function CampaignsListScreen() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [query, setQuery] = useState("");
  const [campaignToDelete, setCampaignToDelete] = useState<MockCampaign | null>(null);
  const [deletedCampaignName, setDeletedCampaignName] = useState("");
  const [viewMode, setViewMode] = useState<CampaignView>("grid");

  const visibleCampaigns = useMemo(
    () => campaigns.filter((campaign) => (
      campaign.name.toLowerCase().includes(query.trim().toLowerCase())
    )),
    [campaigns, query]
  );

  const deleteCampaign = () => {
    if (!campaignToDelete) return;
    setCampaigns((current) => current.filter((campaign) => campaign.id !== campaignToDelete.id));
    setDeletedCampaignName(campaignToDelete.name);
    setCampaignToDelete(null);
  };

  return (
    <>
      <AppHeader
        activeSection="campaigns"
        action={(
          <Button onClick={() => navigate({ to: "/" })} variant="outlined">
            Log out
          </Button>
        )}
      />
      <Box component="main" sx={styles.page}>
      <Container maxWidth={false} sx={styles.container}>
        <Box sx={styles.header}>
          <Box sx={styles.titleRow}>
            <Typography variant="h2">
              My campaigns
            </Typography>
          </Box>
          <Box sx={styles.summaryRow}>
            <Typography color="text.secondary" sx={styles.description} variant="h6">
              Browse the campaigns you&apos;re working on and open one for more detail.
            </Typography>
            <Box sx={styles.searchActions}>
              <TextField
                label="Search campaigns"
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search by campaign name"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon color="action" />
                      </InputAdornment>
                    ),
                  },
                }}
                sx={styles.search}
                value={query}
              />
              <Button
                component={RouterLink}
                startIcon={<AddIcon />}
                sx={styles.newCampaignButton}
                to="/campaigns/new"
                variant="contained"
              >
                New campaign
              </Button>
              <ToggleButtonGroup
                aria-label="Campaign display mode"
                exclusive
                onChange={(_, nextView: CampaignView | null) => {
                  if (nextView) setViewMode(nextView);
                }}
                size="small"
                sx={styles.viewToggle}
                value={viewMode}
              >
                <ToggleButton aria-label="Show as grid" value="grid">
                  <GridViewIcon fontSize="small" />
                  Show as grid
                </ToggleButton>
                <ToggleButton aria-label="Show as list" value="list">
                  <ViewListIcon fontSize="small" />
                  Show as list
                </ToggleButton>
              </ToggleButtonGroup>
            </Box>
          </Box>
        </Box>

        {visibleCampaigns.length > 0 ? (
          <Grid container spacing={3}>
            {visibleCampaigns.map((campaign, index) => (
              <Grid key={campaign.id} size={viewMode === "grid" ? { xs: 12, md: 6, lg: 2.4 } : 12}>
                <Card elevation={2} sx={viewMode === "grid" ? styles.card : [styles.card, styles.listCard]}>
                  <Box
                    aria-label={`View details for ${campaign.name}`}
                    component={RouterLink}
                    sx={viewMode === "grid" ? styles.imageLink : [styles.imageLink, styles.listImageLink]}
                    to={`/campaigns/${campaign.id}`}
                  >
                    <CardMedia
                      alt={`Campaign artwork for ${campaign.name}`}
                      component="img"
                      image={campaignImages[index % campaignImages.length]}
                      sx={viewMode === "grid" ? styles.cardImage : [styles.cardImage, styles.listCardImage]}
                    />
                  </Box>
                  <CardContent sx={viewMode === "grid" ? styles.cardContent : [styles.cardContent, styles.listCardContent]}>
                    <Box>
                      <Typography variant="h6" gutterBottom>
                        {campaign.name}
                      </Typography>
                      <Typography color="text.secondary" variant="body2">
                        {campaign.description}
                      </Typography>
                    </Box>
                    <Box sx={styles.metadata}>
                      <Chip label={campaign.author} size="small" />
                      <Chip label={`Created ${campaign.createdAt}`} size="small" variant="outlined" />
                      <Chip label={`${campaign.artworkCount} artworks`} size="small" variant="outlined" />
                    </Box>
                  </CardContent>
                  <CardActions sx={viewMode === "grid" ? styles.actions : [styles.actions, styles.listActions]}>
                    <Button component={RouterLink} to={`/campaigns/${campaign.id}`}>
                      View details
                    </Button>
                    <Button
                      onClick={() => setCampaignToDelete(campaign)}
                      startIcon={<DeleteOutlinedIcon />}
                      sx={styles.deleteButton}
                    >
                      Delete campaign
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card sx={styles.empty} variant="outlined">
            <Typography variant="h6" gutterBottom>
              No campaigns found
            </Typography>
            <Typography color="text.secondary">
              Try a different campaign name.
            </Typography>
          </Card>
        )}
      </Container>

      <Dialog
        onClose={() => setCampaignToDelete(null)}
        open={Boolean(campaignToDelete)}
      >
        <DialogTitle>Delete campaign?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {campaignToDelete?.name} will be removed from this mock campaign list.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCampaignToDelete(null)}>Cancel</Button>
          <Button color="error" onClick={deleteCampaign} variant="contained">
            Delete campaign
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        autoHideDuration={3000}
        message={deletedCampaignName ? `${deletedCampaignName} deleted` : ""}
        onClose={() => setDeletedCampaignName("")}
        open={Boolean(deletedCampaignName)}
      />
      </Box>
    </>
  );
}
