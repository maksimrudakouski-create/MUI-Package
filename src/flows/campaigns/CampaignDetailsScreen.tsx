import { Link as RouterLink, useParams } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { AppHeader } from "../../shared/ui/AppHeader";
import { mockCampaigns } from "./mockCampaigns";
import { styles } from "./CampaignDetailsScreen.styles";

export default function CampaignDetailsScreen() {
  const { id } = useParams({ strict: false }) as { id?: string };
  const campaign = mockCampaigns.find((item) => item.id === id) ?? mockCampaigns[0];

  return (
    <>
      <AppHeader activeSection="campaigns" />
      <Box component="main" sx={styles.page}>
      <Container maxWidth="lg">
        <Button component={RouterLink} startIcon={<ArrowBackIcon />} sx={styles.back} to="/campaigns">
          All campaigns
        </Button>

        <Box sx={styles.summary}>
          <Box>
            <Typography variant="h3" gutterBottom>
              {campaign.name}
            </Typography>
            <Typography color="text.secondary" sx={styles.description} variant="body1">
              {campaign.description}
            </Typography>
          </Box>
          <Box sx={styles.metadata}>
            <Chip label={`Author: ${campaign.author}`} />
            <Chip label={`Created ${campaign.createdAt}`} variant="outlined" />
          </Box>
        </Box>

        <Box sx={styles.section}>
          <Typography variant="h5" gutterBottom>
            Generated artworks
          </Typography>
          <Grid container spacing={2}>
            {Array.from({ length: campaign.artworkCount }, (_, index) => (
              <Grid key={index} size={{ xs: 12, sm: 6, md: 4 }}>
                <Card sx={styles.artworkCard} variant="outlined">
                  <Box sx={styles.artworkPreview}>
                    <ImageOutlinedIcon color={index % 2 === 0 ? "primary" : "secondary"} fontSize="large" />
                  </Box>
                  <CardContent sx={styles.artworkContent}>
                    <Typography variant="subtitle2">Artwork {index + 1}</Typography>
                    <Typography color="text.secondary" variant="body2">
                      Generated for this campaign
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box sx={styles.section}>
          <Typography variant="h5" gutterBottom>
            Latest prompt
          </Typography>
          <Paper sx={styles.prompt} variant="outlined">
            <Typography color="text.secondary" variant="body2">
              {campaign.lastPrompt}
            </Typography>
          </Paper>
        </Box>
      </Container>
      </Box>
    </>
  );
}
