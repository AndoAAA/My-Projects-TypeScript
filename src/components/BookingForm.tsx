import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "./firebase";
import { useNavigate } from "react-router-dom";

interface FormState {
  name: string;
  phone: string;
  note: string;
}

const BookingForm = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    note: "",
  });

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleCloseSnackbar = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbar((prev) => ({ ...prev, open: false }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValidPhone = (phone: string) =>
    /^[0-9+\s()-]{6,20}$/.test(phone.trim());

  const showError = (message: string) =>
    setSnackbar({ open: true, message, severity: "error" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, phone, note } = form;

    if (!name.trim()) {
      return showError(t("please_enter_name"));
    }

    if (!isValidPhone(phone)) {
      return showError(t("please_enter_valid_phone"));
    }

    try {
      await addDoc(collection(db, "bookings"), {
        name: name.trim(),
        phone: phone.trim(),
        note: note.trim(),
        createdAt: Timestamp.now(),
      });

      setSnackbar({
        open: true,
        message: t("booking_success"),
        severity: "success",
      });

      setForm({ name: "", phone: "", note: "" });

      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("Booking error:", err);
      showError(t("booking_error"));
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: isMobile ? "100%" : 600,
        mx: isMobile ? 1 : "auto",
        mt: 6,
        mb: 6,
        p: isMobile ? 2 : 3,
        display: "flex",
        flexDirection: "column",
        gap: 3,
        bgcolor: "background.paper",
        borderRadius: 3,
        boxShadow: 3,
        minHeight: isMobile ? "100vh" : undefined,
      }}
    >
      <Typography variant={isMobile ? "h6" : "h5"} align="center" mb={2}>
        {t("booking_form_title")}
      </Typography>

      <TextField
        name="name"
        label={t("name")!}
        value={form.name}
        onChange={handleChange}
        fullWidth
        required
        size={isMobile ? "small" : "medium"}
      />

      <TextField
        name="phone"
        label={t("phone")!}
        value={form.phone}
        onChange={handleChange}
        fullWidth
        required
        size={isMobile ? "small" : "medium"}
      />

      <TextField
        name="note"
        label={t("notes")!}
        value={form.note}
        onChange={handleChange}
        multiline
        rows={isMobile ? 3 : 4}
        fullWidth
        size={isMobile ? "small" : "medium"}
      />

      <Button
        type="submit"
        variant="contained"
        size={isMobile ? "large" : "medium"}
        fullWidth
        sx={{
          py: isMobile ? 1.8 : 1.5,
          fontSize: isMobile ? "1.1rem" : "1rem",
        }}
      >
        {t("book_now")}
      </Button>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookingForm;
