import React, { useState, ChangeEvent, FormEvent } from "react";
import { Box, Button, TextField, Typography, Link } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import emailjs from "@emailjs/browser";
import { useTranslation } from "react-i18next";
import FacebookIcon from "../assets/icons/facebook.png";
import InstagramIcon from "../assets/icons/instagram.png";
import { colors } from "../assets/colors/colors";

type FormDataType = {
  name: string;
  email: string;
  tel: string;
  message: string;
};

const contactLinks = [
  {
    icon: <EmailIcon fontSize="large" aria-hidden="true" />,
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
        "service_mo2qbbv",
        "template_dyqb11p",
        {
          from_name: formData.name,
          from_tel: formData.tel,
          message: formData.message,
        },
        "W_R8qr82NdANY4Wtl"
      );

      alert(t("contactForm.success") || "");
      setFormData({ name: "", email: "", tel: "", message: "" });
    } catch (error) {
      console.error("Email sending failed:", error);
      alert(t("contactForm.failure") || "");
    }
    setLoading(false);
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
              "&:hover": { transform: "scale(1.05)", background: "#6f8bbd" },
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
          type="number"
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
            "&:hover": { background: "#6f8bbd" },
          }}
        >
          {t("contactForm.sendBtn")}
        </Button>
      </Box>
    </Box>
  );
};

export default Contact;
