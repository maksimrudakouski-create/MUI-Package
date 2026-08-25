import { useState } from "react";
import { Link as RouterLink } from "@tanstack/react-router";
import MarkEmailReadOutlinedIcon from "@mui/icons-material/MarkEmailReadOutlined";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { styles } from "./ForgotPasswordScreen.styles";

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showEmailError, setShowEmailError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setShowEmailError(true);
      return;
    }

    setIsSubmitted(true);
  };

  return (
    <Box component="main" sx={styles.page}>
      <Card sx={styles.card}>
        <CardContent sx={styles.content}>
          {isSubmitted ? (
            <Box sx={styles.confirmation}>
              <Alert severity="success">
                If an account exists for {email}, recovery instructions will be sent there.
              </Alert>
              <Typography color="text.secondary">
                This same recovery step can be used to set an initial password.
              </Typography>
              <Button component={RouterLink} to="/" variant="contained">
                Return to log in
              </Button>
            </Box>
          ) : (
            <>
              <MarkEmailReadOutlinedIcon fontSize="large" sx={styles.icon} />
              <Typography variant="h4" gutterBottom>
                Reset your password
              </Typography>
              <Typography color="text.secondary" sx={styles.description}>
                Enter your email address and we&apos;ll send recovery instructions.
              </Typography>

              <Box component="form" noValidate onSubmit={handleSubmit} sx={styles.form}>
                <TextField
                  autoComplete="email"
                  autoFocus
                  error={showEmailError}
                  helperText={showEmailError ? "Enter a valid email address." : undefined}
                  label="Email address"
                  name="email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setShowEmailError(false);
                  }}
                  required
                  type="email"
                  value={email}
                />
                <Button fullWidth sx={styles.action} type="submit" variant="contained">
                  Send recovery instructions
                </Button>
              </Box>

              <Button component={RouterLink} sx={styles.back} to="/">
                Back to log in
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
}
