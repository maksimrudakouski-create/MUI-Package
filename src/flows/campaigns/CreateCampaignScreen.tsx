import { useState } from "react";
import { Link as RouterLink, useNavigate } from "@tanstack/react-router";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { AppHeader } from "../../shared/ui/AppHeader";
import { styles } from "./CreateCampaignScreen.styles";

const steps = ["Campaign details", "Campaign brief", "Assets & formats"];

const formatOptions = [
  "Social portrait",
  "Social landscape",
  "Story",
  "Display banner",
  "Email header",
  "Landing page hero",
  "Video cover",
  "Print poster",
];

type AssetName = "Brand assets" | "Policy document" | "Hero artwork" | "CTA spreadsheet";

export default function CreateCampaignScreen() {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [attachedAssets, setAttachedAssets] = useState<AssetName[]>([]);
  const [formats, setFormats] = useState<string[]>(["Social portrait", "Story"]);
  const [isComplete, setIsComplete] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [isExitDialogOpen, setIsExitDialogOpen] = useState(false);

  const toggleFormat = (format: string) => {
    setIsDirty(true);
    setFormats((current) => (
      current.includes(format)
        ? current.filter((item) => item !== format)
        : [...current, format]
    ));
  };

  const attachAsset = (asset: AssetName) => {
    setIsDirty(true);
    setAttachedAssets((current) => (
      current.includes(asset) ? current : [...current, asset]
    ));
  };

  const assetControl = (asset: AssetName, detail: string) => {
    const isAttached = attachedAssets.includes(asset);

    return (
      <Paper sx={styles.assetCard} variant="outlined">
        <Typography variant="subtitle1">{asset}</Typography>
        <Typography color="text.secondary" variant="body2">
          {detail}
        </Typography>
        <Box sx={styles.assetState}>
          <Button
            onClick={() => attachAsset(asset)}
            startIcon={<UploadFileIcon />}
            variant="outlined"
          >
            {isAttached ? "Replace mock file" : "Attach file"}
          </Button>
          {isAttached && <Chip color="success" label="Mock file attached" size="small" />}
        </Box>
      </Paper>
    );
  };

  const nextStep = () => {
    if (activeStep === steps.length - 1) {
      setIsComplete(true);
      setIsDirty(false);
      return;
    }
    setActiveStep((current) => current + 1);
  };

  const requestExit = () => {
    if (isDirty) {
      setIsExitDialogOpen(true);
      return;
    }

    navigate({ to: "/campaigns" });
  };

  const leaveWithoutSaving = () => {
    setIsExitDialogOpen(false);
    navigate({ to: "/campaigns" });
  };

  return (
    <>
      <AppHeader activeSection="campaigns" onLogoClick={requestExit} />
      <Box component="main" sx={styles.page}>
      <Container maxWidth={false} sx={styles.container}>
        {isComplete ? (
          <Box sx={styles.successArea}>
            <Box sx={styles.success}>
              <Box sx={styles.successTitle}>
                <CheckCircleOutlinedIcon color="success" fontSize="large" />
                <Typography variant="h3">
                  Campaign draft created
                </Typography>
              </Box>
              <Typography color="text.secondary" sx={styles.successDescription}>
                Your campaign details, brief, output formats, and mock attachments are ready for review.
              </Typography>
              <Alert severity="info">
                This is a design-mode confirmation. Integrations and file processing will be added by Front-end development.
              </Alert>
              <Button component={RouterLink} to="/campaigns" variant="contained">
                View my campaigns
              </Button>
            </Box>
          </Box>
        ) : (
            <Box sx={styles.content}>
              <Box sx={styles.intro}>
              <Box sx={styles.titleRow}>
                <Tooltip title="Back to campaigns">
                  <IconButton
                    aria-label="Back to campaigns"
                    component={RouterLink}
                    onClick={(event) => {
                      event.preventDefault();
                      requestExit();
                    }}
                    to="/campaigns"
                  >
                    <ArrowBackIcon />
                  </IconButton>
                </Tooltip>
                <Typography variant="h2">Create campaign</Typography>
              </Box>
              <Typography color="text.secondary" sx={styles.introDescription} variant="h6">
                Set the campaign foundation, creative brief, output formats, and source assets in one guided flow.
              </Typography>
            </Box>

            <Stepper activeStep={activeStep} sx={styles.stepper}>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Card elevation={1} sx={styles.card}>
              <CardContent onChange={() => setIsDirty(true)} sx={styles.cardContent}>
                {activeStep === 0 && (
                  <Box sx={styles.section}>
                    <Box>
                      <Typography sx={styles.sectionHeading} variant="h5">
                        Campaign details
                      </Typography>
                      <Typography color="text.secondary" sx={styles.sectionDescription}>
                        Start with the core information that identifies this campaign.
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          placeholder="Campaign name *"
                          required
                          slotProps={{ htmlInput: { "aria-label": "Campaign name" } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          placeholder="Author *"
                          required
                          slotProps={{ htmlInput: { "aria-label": "Author" } }}
                        />
                      </Grid>
                      <Grid size={12}>
                        <TextField
                          fullWidth
                          multiline
                          placeholder="Campaign description *"
                          required
                          rows={4}
                          slotProps={{ htmlInput: { "aria-label": "Campaign description" } }}
                        />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField defaultValue="Awareness" fullWidth label="Campaign goal" select>
                          <MenuItem value="Awareness">Awareness</MenuItem>
                          <MenuItem value="Conversion">Conversion</MenuItem>
                          <MenuItem value="Retargeting">Retargeting</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField
                          fullWidth
                          placeholder="Primary audience segment"
                          slotProps={{ htmlInput: { "aria-label": "Primary audience segment" } }}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {activeStep === 1 && (
                  <Box sx={styles.section}>
                    <Box>
                      <Typography sx={styles.sectionHeading} variant="h5">
                        Campaign brief
                      </Typography>
                      <Typography color="text.secondary" sx={styles.sectionDescription}>
                        Give Stanleys AI the visual, legal, and creative context needed for this campaign.
                      </Typography>
                    </Box>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Brand colors and fonts" multiline rows={3} />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Logo clearspace guidance" multiline rows={3} />
                      </Grid>
                      <Grid size={12}>
                        <TextField fullWidth label="Approved calls to action" placeholder="For example: Shop now, Learn more" />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Landing page URLs" multiline rows={3} />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Creative angle" multiline placeholder="Tone, emotions, headline direction, and desired length" rows={3} />
                      </Grid>
                      <Grid size={12}>
                        <TextField fullWidth label="Figma brand-kit link" placeholder="Paste the relevant Figma file or page URL" />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        {assetControl("Brand assets", "Visual templates, images, logo files, and other approved brand materials.")}
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        {assetControl("Policy document", "Advertising policies and required financial, health, or legal disclosures.")}
                      </Grid>
                    </Grid>
                  </Box>
                )}

                {activeStep === 2 && (
                  <Box sx={styles.section}>
                    <Box>
                      <Typography sx={styles.sectionHeading} variant="h5">
                        Assets &amp; output formats
                      </Typography>
                      <Typography color="text.secondary" sx={styles.sectionDescription}>
                        Select the formats to generate, then attach the artwork and CTA source material for this mock flow.
                      </Typography>
                    </Box>
                    <Box sx={styles.formatGrid}>
                      {formatOptions.map((format) => (
                        <FormControlLabel
                          control={(
                            <Checkbox
                              checked={formats.includes(format)}
                              onChange={() => toggleFormat(format)}
                            />
                          )}
                          key={format}
                          label={format}
                        />
                      ))}
                    </Box>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField fullWidth label="Character limit per format" placeholder="For example: 90 headline characters" />
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        <TextField defaultValue="Static artwork" fullWidth label="Artwork type" select>
                          <MenuItem value="Static artwork">Static artwork</MenuItem>
                          <MenuItem value="Animated GIF">Animated GIF</MenuItem>
                        </TextField>
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        {assetControl("Hero artwork", "Key hero artwork supplied in a layered format.")}
                      </Grid>
                      <Grid size={{ xs: 12, md: 6 }}>
                        {assetControl("CTA spreadsheet", "CTA variations, body copy, translations, and output-size mapping.")}
                      </Grid>
                    </Grid>
                  </Box>
                )}

              </CardContent>
              <CardActions sx={styles.actions}>
                <Box sx={styles.actionGroup}>
                  {activeStep > 0 && (
                    <Button onClick={() => setActiveStep((current) => current - 1)}>
                      Back
                    </Button>
                  )}
                  <Button onClick={nextStep} variant="contained">
                    {activeStep === steps.length - 1 ? "Create campaign" : "Continue"}
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Box>
        )}
      </Container>
      </Box>
      <Dialog onClose={() => setIsExitDialogOpen(false)} open={isExitDialogOpen}>
        <DialogTitle>Leave this campaign?</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to leave this screen? All unsaved changes will be lost.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsExitDialogOpen(false)}>Stay</Button>
          <Button color="error" onClick={leaveWithoutSaving} variant="contained">
            Leave without saving
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
