import React, { useState } from "react";
import {
  TextField,
  Select,
  MenuItem,
  Button,
  Box,
  Typography,
  InputLabel,
  FormControl,
  Snackbar,
  Alert,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import {
  collection,
  addDoc,
  Timestamp,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "./firebase";
import { doctors, services } from "../data";
import { DatePicker, TimePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useNavigate } from "react-router-dom";

interface FormState {
  name: string;
  email: string;
  phone: string;
  doctor: string;
  service: string;
  date: Dayjs | null;
  time: Dayjs | null;
  note: string;
}

const BookingForm = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    doctor: "",
    service: "",
    date: null,
    time: null,
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | any
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone: string) =>
    /^[0-9+\s()-]{6,20}$/.test(phone.trim());
  const isValidDate = (date: Dayjs | null) =>
    date && (date.isSame(dayjs(), "day") || date.isAfter(dayjs(), "day"));
  const isWorkday = (date: Dayjs | null) =>
    date && date.day() >= 1 && date.day() <= 6;
  const isValidTime = (time: Dayjs | null) =>
    time && time.hour() >= 9 && time.hour() <= 20;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { name, email, phone, doctor, service, date, time, note } = form;
    if (!name.trim()) return showError(t("please_enter_name"));
    if (!isValidEmail(email)) return showError(t("please_enter_valid_email"));
    if (!isValidPhone(phone)) return showError(t("please_enter_valid_phone"));
    if (!doctor) return showError(t("please_select_doctor"));
    if (!service) return showError(t("please_select_service"));
    if (!isValidDate(date)) return showError(t("please_select_valid_date"));
    if (!isWorkday(date)) return showError(t("please_select_workday"));
    if (!isValidTime(time))
      return showError(t("please_select_valid_time_range"));

    try {
      const dateTime = date
        ?.hour(time?.hour() || 0)
        .minute(time?.minute() || 0)
        .second(0)
        .millisecond(0);
      if (!dateTime) throw new Error("Invalid date/time");

      const start = Timestamp.fromDate(dateTime.toDate());
      const end = Timestamp.fromDate(dateTime.add(1, "minute").toDate());

      const q = query(
        collection(db, "bookings"),
        where("doctor", "==", doctor),
        where("dateTime", ">=", start),
        where("dateTime", "<", end)
      );

      const existing = await getDocs(q);
      if (!existing.empty)
        return showError(t("already_booked_same_time_doctor"));

      await addDoc(collection(db, "bookings"), {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        doctor,
        service,
        dateTime: start,
        note: note.trim(),
        createdAt: Timestamp.now(),
      });

      setSnackbar({
        open: true,
        message: t("booking_success"),
        severity: "success",
      });
      setForm({
        name: "",
        email: "",
        phone: "",
        doctor: "",
        service: "",
        date: null,
        time: null,
        note: "",
      });
      setTimeout(() => navigate("/"), 3000);
    } catch (err) {
      console.error("Booking error:", err);
      showError(t("booking_error"));
    }
  };

  const showError = (message: string) =>
    setSnackbar({ open: true, message, severity: "error" });

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          maxWidth: isMobile ? "100%" : 600,
          mx: isMobile ? 1 : "auto",
          mt: isMobile ? 6 : 6,
          mb: isMobile ? 6 : 6,
          p: isMobile ? 2 : 3,
          display: "flex",
          flexDirection: "column",
          gap: isMobile ? 2 : 3,
          bgcolor: "background.paper",
          borderRadius: 3,
          boxShadow: 3,
          minHeight: isMobile ? "100vh" : undefined,
        }}
      >
        <Typography
          variant={isMobile ? "h6" : "h5"}
          align="center"
          sx={{ mb: isMobile ? 1 : 2 }}
        >
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
          name="email"
          label={t("email")!}
          value={form.email}
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

        <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
          <InputLabel>{t("select_doctor")}</InputLabel>
          <Select
            name="doctor"
            value={form.doctor}
            onChange={handleChange}
            label={t("select_doctor")!}
          >
            <MenuItem value="">
              <em>{t("none")}</em>
            </MenuItem>
            {doctors.map((doc) => (
              <MenuItem key={doc.id} value={doc.key}>
                {t(`about.names.${doc.key}.name`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth required size={isMobile ? "small" : "medium"}>
          <InputLabel>{t("select_service")}</InputLabel>
          <Select
            name="service"
            value={form.service}
            onChange={handleChange}
            label={t("select_service")!}
          >
            <MenuItem value="">
              <em>{t("none")}</em>
            </MenuItem>
            {services.map((srv) => (
              <MenuItem key={srv.id} value={srv.title}>
                {t(`services.${srv.title}.title`)}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <DatePicker
          label={t("date")}
          value={form.date}
          onChange={(newDate) =>
            setForm((prev) => ({ ...prev, date: newDate }))
          }
          shouldDisableDate={(date) => date.day() === 0}
          disablePast
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              size: isMobile ? "small" : "medium",
            },
          }}
        />

        <TimePicker
          label={t("time")}
          value={form.time}
          onChange={(newTime) =>
            setForm((prev) => ({ ...prev, time: newTime }))
          }
          minTime={dayjs().hour(9).minute(0)}
          maxTime={dayjs().hour(21).minute(0)}
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
              size: isMobile ? "small" : "medium",
            },
          }}
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
    </LocalizationProvider>
  );
};

export default BookingForm;
