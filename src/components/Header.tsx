import React, { useState } from "react";
import Select, { SingleValue } from "react-select";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "../assets/icons/instagram.png";
import FacebookIcon from "../assets/icons/facebook.png";
import { useTranslation } from "react-i18next";
import i18n from "i18next";

const languageOptions = [
  {
    value: "en",
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
      >
        <img
          src="https://flagcdn.com/w40/gb.png"
          alt="English"
          width="20"
          height="15"
        />
      </div>
    ),
  },
  {
    value: "hy",
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
      >
        <img
          src="https://flagcdn.com/w40/am.png"
          alt="Armenian"
          width="20"
          height="15"
        />
      </div>
    ),
  },
  {
    value: "ru",
    label: (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          cursor: "pointer",
        }}
      >
        <img
          src="https://flagcdn.com/w40/ru.png"
          alt="Russian"
          width="20"
          height="15"
        />
      </div>
    ),
  },
];

const Header = () => {
  const { t }: { t: (key: string) => string } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [selectedLanguage, setSelectedLanguage] = useState(
    languageOptions.find((lang) => lang.value === i18n.language) ||
      languageOptions[0]
  );

  const handleLanguageChange = (
    newValue: SingleValue<(typeof languageOptions)[0]>
  ) => {
    if (newValue) {
      setSelectedLanguage(newValue);
      i18n.changeLanguage(newValue.value);
    }
  };

  return (
    <AppBar position="static" sx={{ p: isMobile ? 1 : 2 }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: isMobile ? "center" : "space-between",
          gap: isMobile ? 1.5 : 3,
        }}
      >
        {/* Contact Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? 1 : 3,
            textAlign: "center",
          }}
        >
          <Typography
            variant={isMobile ? "body2" : "body1"}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <LocalPhoneIcon
              sx={{ color: "#25D366", fontSize: isMobile ? 18 : 24 }}
            />{" "}
            +374 (93) 39-14-81
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <WhatsAppIcon
              sx={{ color: "#25D366", fontSize: isMobile ? 18 : 24 }}
            />{" "}
            +374 (93) 39-14-81
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <LocationOnIcon
              sx={{ color: "#EA4335", fontSize: isMobile ? 18 : 24 }}
            />
            {t("header.address")}
          </Typography>
          <Typography
            variant={isMobile ? "body2" : "body1"}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            <EmailIcon
              sx={{ color: "#4285F4", fontSize: isMobile ? 18 : 24 }}
            />{" "}
            mmm@mmm.com
          </Typography>
        </Box>

        {/* Language Selector */}
        <Box>
          <Select
            options={languageOptions}
            value={selectedLanguage}
            onChange={handleLanguageChange}
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "5px",
                border: "1px solid #ccc",
                boxShadow: "none",
                cursor: "pointer",
              }),
              menu: (base) => ({
                ...base,
                zIndex: 9999,
              }),
            }}
          />
        </Box>

        {/* Social Media Links */}
        <Box
          sx={{ display: "flex", alignItems: "center", gap: isMobile ? 2 : 3 }}
        >
          <Link
            href="https://www.facebook.com/people/Spectra-Dental-Clinic/61564332775099/?_rdr"
            target="_blank"
          >
            <img
              src={FacebookIcon}
              alt="facebook"
              style={{ width: isMobile ? 25 : 30, height: isMobile ? 25 : 30 }}
            />
          </Link>
          <Link
            href="https://www.instagram.com/spectradental.clinic/"
            target="_blank"
          >
            <img
              src={InstagramIcon}
              alt="instagram"
              style={{ width: isMobile ? 25 : 30, height: isMobile ? 25 : 30 }}
            />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
