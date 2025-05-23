import { Box, Typography, Button } from "@mui/material";
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import MailIcon from "@mui/icons-material/Mail";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Logo from "../assets/logo.jpg";
import ViberIcon from "../assets/icons/viber.png";
import { useTranslation } from "react-i18next";
import { colors } from "../assets/colors/colors";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        padding: "40px 20px",
        backgroundColor: colors.darkBlue,
        color: colors.white,
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
        {/* Phone */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <PhoneInTalkIcon sx={{ color: "#4caf50" }} /> +374(93) 39-14-81
          </Box>
          <Button
            variant="outlined"
            size="small"
            href="tel:+37493391481"
            sx={{ mt: 1, color: colors.white, borderColor: colors.white }}
          >
            {t("footer.callUs")}
          </Button>
        </Box>

        {/* WhatsApp */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <WhatsAppIcon sx={{ color: "#25D366" }} /> +374(93) 39-14-81
          </Box>
          <Button
            variant="outlined"
            size="small"
            href="https://wa.me/37493391481"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 1, color: colors.white, borderColor: colors.white }}
          >
            {t("footer.writeOnWhatsApp")}
          </Button>
        </Box>

        {/* Viber */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <img
              src={ViberIcon}
              alt="Viber"
              style={{ width: 24, height: 24 }}
            />
            +374(93) 39-14-81
          </Box>
          <Button
            variant="outlined"
            size="small"
            href="viber://chat?number=%2B37493391481"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ mt: 1, color: colors.white, borderColor: colors.white }}
          >
            {t("footer.writeOnViber")}
          </Button>
        </Box>

        {/* Email */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <MailIcon sx={{ color: "#ff9800" }} />
            <Typography>{t("footer.email")}։</Typography>
          </Box>
          <Button
            variant="outlined"
            size="small"
            href="mailto:spectraclinicarmenia@gmail.com"
            sx={{ mt: 1, color: colors.white, borderColor: colors.white }}
          >
            {t("footer.sendEmail")}
          </Button>
        </Box>

        {/* Working Hours */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <AccessTimeIcon sx={{ color: "#f44336" }} />
          <Box>
            <Typography>{t("footer.workDays")}։</Typography>
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
          alt="Spectra Dental Clinic Logo"
          loading="lazy"
          style={{ maxWidth: "120px", marginBottom: "10px" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <LocationOnIcon />
          <Typography>{t("footer.address")}</Typography>
        </Box>
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
        &copy; {new Date().getFullYear()} www.tarverdyan-projects.com
      </Box>
    </Box>
  );
};

export default Footer;
