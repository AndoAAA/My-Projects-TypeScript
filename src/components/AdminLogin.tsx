// AdminLogin.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

const ADMIN_CREDENTIALS = {
  username: process.env.REACT_APP_ADMIN_USERNAME,
  password: process.env.REACT_APP_ADMIN_PASSWORD,
};

const AdminLogin = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { username, password } = form;

    if (
      username === ADMIN_CREDENTIALS.username &&
      password === ADMIN_CREDENTIALS.password
    ) {
      setError("");
      localStorage.setItem("isAdmin", "true");
      navigate("/admin");
    } else {
      setError(t("admin.login_error", "Incorrect username or password"));
      setSnackbarOpen(true);
    }
  };

  const handleCloseSnackbar = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: isMobile ? "90%" : 400,
        mx: "auto",
        mt: 8,
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant={isMobile ? "h5" : "h4"} align="center" mb={2}>
        {t("admin.login")}
      </Typography>

      <TextField
        name="username"
        label={t("admin.username", "Username")}
        value={form.username}
        onChange={handleChange}
        required
        fullWidth
        autoComplete="username"
      />

      <TextField
        name="password"
        label={t("admin.password", "Password")}
        type="password"
        value={form.password}
        onChange={handleChange}
        required
        fullWidth
        autoComplete="current-password"
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>
        {t("admin.login")}
      </Button>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ width: "100%" }}
        >
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminLogin;
