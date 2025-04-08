import { Box, Typography } from "@mui/material";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Logo from "../assets/logo.jpg";
import { useTranslation } from "react-i18next";
import { colors } from "../assets/colors/colors";

const Footer = () => {
  const { t }: { t: (key: string) => string } = useTranslation();

  return (
    <Box
      sx={{
        padding: "40px 20px",
        backgroundColor: colors.darkBlue,
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Contact Information */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 4,
          maxWidth: "1000px",
          textAlign: "center",
          borderBottom: "1px solid rgba(255,255,255,0.3)",
          paddingBottom: "20px",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <PhoneInTalkIcon sx={{ color: "#4caf50" }} /> +374(93) 39-14-81
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <WhatsAppIcon sx={{ color: "#25D366" }} /> +374(93) 39-14-81
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <MailIcon sx={{ color: "#ff9800" }} />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography>{t("footer.email")}</Typography>
            <Typography>mmm@mmm.mm</Typography>
          </Box>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeIcon sx={{ color: "#f44336" }} />
          <Box>
            <Typography>{t("footer.workDays")}</Typography>
            <Typography>{t("footer.workingHours")}</Typography>
          </Box>
        </Box>
      </Box>

      {/* Address & Logo */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          marginTop: "20px",
        }}
      >
        <img
          src={Logo}
          alt="Logo"
          style={{ maxWidth: "120px", marginBottom: "10px" }}
        />
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon /> {t("footer.address")}
        </Typography>
      </Box>

      {/* Google Maps Embed */}
      <Box sx={{ margin: "20px 0", width: "100%", textAlign: "center" }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3047.3679887813514!2d44.535513875293326!3d40.200876568749784!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x406abd2ad1bdb32b%3A0x65544151cba22e9a!2s5%20Dro%20St%2C%20Yerevan%200069!5e0!3m2!1sru!2sam!4v1743417180970!5m2!1sru!2sam"
          width="100%"
          height="300"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Clinic Location on Google Maps"
        />
      </Box>

      {/* Copyright */}
      <Box sx={{ textAlign: "center", marginTop: "20px", fontSize: "14px" }}>
        &copy; 2025 www.tarverdyan-projects.com
      </Box>
    </Box>
  );
};

export default Footer;
