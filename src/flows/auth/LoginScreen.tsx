import { useState } from "react";
import { Link as RouterLink, useNavigate } from "@tanstack/react-router";
import {
  Box,
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { styles } from "./LoginScreen.styles";

export default function LoginScreen() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const hasPassword = password.trim().length > 0;

    setShowEmailError(!hasValidEmail);
    setShowPasswordError(!hasPassword);

    if (!hasValidEmail || !hasPassword) {
      return;
    }

    navigate({ to: "/campaigns" });
  };

  return (
    <Box component="main" sx={styles.page}>
      <Card sx={styles.card}>
        <CardContent sx={styles.content}>
          <>
            <Typography variant="h4" sx={styles.heading}>
              Stanleys AI
            </Typography>
            <Typography color="text.secondary" sx={styles.description}>
              Sign in to continue with your email address and password.
            </Typography>

            <Box component="form" noValidate onSubmit={handleSubmit} sx={styles.form}>
              <TextField
                autoComplete="email"
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
              <TextField
                autoComplete="current-password"
                error={showPasswordError}
                helperText={showPasswordError ? "Enter your password." : undefined}
                label="Password"
                name="password"
                onChange={(event) => {
                  setPassword(event.target.value);
                  setShowPasswordError(false);
                }}
                required
                type="password"
                value={password}
              />
              <Box sx={styles.supportingRow}>
                <FormControlLabel control={<Checkbox />} label="Remember me" />
                <Button component={RouterLink} size="small" to="/forgot-password">
                  Forgot password?
                </Button>
              </Box>
              <Button fullWidth sx={styles.submit} type="submit" variant="contained">
                Log in
              </Button>
            </Box>

            <Typography color="text.secondary" sx={styles.footer} variant="body2">
              Need to set your first password? Use the recovery option above.
            </Typography>
          </>
        </CardContent>
      </Card>
    </Box>
  );
}
