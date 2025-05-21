import React, { useState, ChangeEvent, FormEvent } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import FacebookIcon from "../assets/icons/facebook.png";
import InstagramIcon from "../assets/icons/instagram.png";
import { colors } from "../assets/colors/colors";
import { Helmet } from "react-helmet-async";

type FormDataType = {
  name: string;
  email: string;
  tel: string;
  message: string;
};

const contactLinks = [
  {
    icon: <EmailIcon fontSize="large" aria-label="Email icon" />,
    label: "Email",
    link: "mailto:tarverdyan070@gmail.com",
  },
  {
    icon: <img src={FacebookIcon} alt="Facebook" width="30px" />,
    label: "Facebook",
    link: "https://www.facebook.com/people/Spectra-Dental-Clinic/61564332775099/?_rdr",
  },
  {
    icon: <img src={InstagramIcon} alt="Instagram" width="30px" />,
    label: "Instagram",
    link: "https://www.instagram.com/spectradental.clinic/",
  },
];

const Contact: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    email: "",
    tel: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<FormDataType>>({});
  const [loading, setLoading] = useState(false);

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState<
    "success" | "error"
  >("success");

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = (): boolean => {
    let tempErrors: Partial<FormDataType> = {};

    if (!formData.name.trim()) {
      tempErrors.name = t("contactForm.nameRequired") || "";
    }
    if (!formData.tel.trim()) {
      tempErrors.tel = t("contactForm.telRequired") || "";
    } else if (!/^[0-9+\-\s]+$/.test(formData.tel)) {
      tempErrors.tel = t("contactForm.telInvalid") || "";
    }

    if (!formData.email.trim()) {
      tempErrors.email = t("contactForm.emailRequired") || "";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      tempErrors.email = t("contactForm.emailInvalid") || "";
    }
    if (!formData.message.trim()) {
      tempErrors.message = t("contactForm.messageRequired") || "";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      await emailjs.send(
        "service_fe4vkph",
        "template_9y6k2g9",
        {
          name: formData.name,
          email: formData.email,
          tel: formData.tel,
          message: formData.message,
        },
        "W_R8qr82NdANY4Wtl"
      );

      setSnackbarMessage(t("contactForm.success") || "Հաղորդագրությունը հաջողությամբ ուղարկվեց");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      setFormData({ name: "", email: "", tel: "", message: "" });
      setErrors({});
    } catch (error) {
      console.error("Email sending failed:", error);
      setSnackbarMessage(t("contactForm.failure") || "Սխալ առաջացավ, փորձեք կրկին");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
    setLoading(false);
  };

  const handleCloseSnackbar = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <Box
      id="contact"
      sx={{
        padding: "80px 5%",
        textAlign: "center",
        background: colors.darkBlue,
        color: "white",
      }}
    >
      <Helmet>
        <title>{t("meta.contactTitle")}</title>
        <meta name="description" content={t("meta.contactDescription")} />
        {/* Open Graph */}
        <meta property="og:title" content={t("meta.contactTitle")} />
        <meta property="og:description" content={t("meta.contactDescription")} />
        <meta property="og:type" content="website" />
        {/* Twitter */}
        <meta name="twitter:title" content={t("meta.contactTitle")} />
        <meta name="twitter:description" content={t("meta.contactDescription")} />
      </Helmet>
      <Typography
        variant="h2"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "2.5rem", md: "3.5rem" },
          marginBottom: "20px",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        {t("contactForm.title")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {contactLinks.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            target="_blank"
            underline="none"
            aria-label={item.label}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              padding: "15px 25px",
              borderRadius: "10px",
              background: "rgba(25, 55, 109, 0.2)",
              color: "white",
              textDecoration: "none",
              fontSize: "1.2rem",
              fontWeight: "bold",
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                background: colors.lightBlue,
              },
            }}
          >
            {item.icon} {item.label}
          </Link>
        ))}
      </Box>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "20px",
          maxWidth: "500px",
          margin: "0 auto",
          background: colors.lightBlue,
          padding: "30px",
          borderRadius: "10px",
        }}
      >
        <TextField
          label={t("contactForm.name")}
          name="name"
          value={formData.name}
          onChange={handleChange}
          error={Boolean(errors.name)}
          helperText={errors.name}
          sx={{ background: "white", borderRadius: "5px" }}
          fullWidth
        />
        <TextField
          label={t("contactForm.email")}
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={Boolean(errors.email)}
          helperText={errors.email}
          sx={{ background: "white", borderRadius: "5px" }}
          fullWidth
        />
        <TextField
          label={t("contactForm.tel")}
          name="tel"
          type="tel"
          inputProps={{ pattern: "[0-9+\\- ]*" }}
          value={formData.tel}
          onChange={handleChange}
          error={Boolean(errors.tel)}
          helperText={errors.tel}
          sx={{ background: "white", borderRadius: "5px" }}
          fullWidth
        />
        <TextField
          label={t("contactForm.message")}
          name="message"
          multiline
          rows={4}
          value={formData.message}
          onChange={handleChange}
          error={Boolean(errors.message)}
          helperText={errors.message}
          sx={{ background: "white", borderRadius: "5px" }}
          fullWidth
        />
        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            background: colors.darkBlue,
            color: "white",
            padding: "12px 30px",
            fontSize: "1.1rem",
            fontWeight: "bold",
            borderRadius: "8px",
            transition: "all 0.3s ease",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "10px",
            "&:hover": { background: "#6f8bbd" },
          }}
        >
          {loading && <CircularProgress size={20} color="inherit" />}
          {t("contactForm.sendBtn")}
        </Button>
      </Box>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
          elevation={6}
          variant="filled"
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contact;
