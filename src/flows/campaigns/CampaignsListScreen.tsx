import { useMemo, useState } from "react";
import { Link as RouterLink, useNavigate } from "@tanstack/react-router";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import SearchIcon from "@mui/icons-material/Search";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  IconButton,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { AppHeader } from "../../shared/ui/AppHeader";
import { mockCampaigns, type MockCampaign } from "./mockCampaigns";
import { styles } from "./CampaignsListScreen.styles";

export default function CampaignsListScreen() {
  const navigate = useNavigate();
  const [campaigns, setCampaigns] = useState(mockCampaigns);
  const [query, setQuery] = useState("");
  const [campaignToDelete, setCampaignToDelete] = useState<MockCampaign | null>(null);
  const [deletedCampaignName, setDeletedCampaignName] = useState("");

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
      <AppHeader activeSection="campaigns" />
      <Box component="main" sx={styles.page}>
      <Container maxWidth={false} sx={styles.container}>
        <Box sx={styles.header}>
          <Box sx={styles.titleRow}>
            <Typography variant="h2">
              My campaigns
            </Typography>
            <Box sx={styles.titleActions}>
              <Button component={RouterLink} startIcon={<AddIcon />} to="/campaigns/new" variant="contained">
                New campaign
              </Button>
              <Button onClick={() => navigate({ to: "/" })} variant="outlined">
                Log out
              </Button>
            </Box>
          </Box>
          <Box sx={styles.summaryRow}>
            <Typography color="text.secondary" sx={styles.description} variant="h6">
              Browse the campaigns you&apos;re working on and open one for more detail.
            </Typography>
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
          </Box>
        </Box>

        {visibleCampaigns.length > 0 ? (
          <Grid container spacing={3}>
            {visibleCampaigns.map((campaign) => (
              <Grid key={campaign.id} size={{ xs: 12, md: 6, lg: 4 }}>
                <Card sx={styles.card} variant="outlined">
                  <CardContent sx={styles.cardContent}>
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
                  <CardActions sx={styles.actions}>
                    <Button component={RouterLink} to={`/campaigns/${campaign.id}`}>
                      View details
                    </Button>
                    <IconButton
                      aria-label={`Delete ${campaign.name}`}
                      color="error"
                      onClick={() => setCampaignToDelete(campaign)}
                    >
                      <DeleteOutlinedIcon />
                    </IconButton>
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
