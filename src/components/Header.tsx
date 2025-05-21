import Select from "react-select";
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
import { colors } from "../assets/colors/colors";
import { useEffect, useCallback } from "react";

const LanguageOption = ({ src, alt }: { src: string; alt: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
    <img src={src} alt={alt} width="20" height="15" />
  </div>
);

const languageOptions = [
  {
    value: "en",
    label: (
      <LanguageOption src="https://flagcdn.com/w40/gb.png" alt="English" />
    ),
  },
  {
    value: "hy",
    label: (
      <LanguageOption src="https://flagcdn.com/w40/am.png" alt="Armenian" />
    ),
  },
  {
    value: "ru",
    label: (
      <LanguageOption src="https://flagcdn.com/w40/ru.png" alt="Russian" />
    ),
  },
];

const Header = () => {
  const { t }: { t: (key: string) => string } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const fontSize = isMobile ? 12 : 14;
  const iconSize = isMobile ? 30 : isTablet ? 40 : 40;

  const handleLanguageChange = useCallback((selectedOption: any) => {
    i18n.changeLanguage(selectedOption.value);
    localStorage.setItem("selectedLanguage", selectedOption.value);
  }, []);

  useEffect(() => {
    const savedLang = localStorage.getItem("selectedLanguage");
    if (savedLang && savedLang !== i18n.language) {
      i18n.changeLanguage(savedLang);
    }
  }, []);

  return (
    <AppBar position="static" sx={{ p: 1.5, background: colors.lightBlue }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 2 : 2,
          textAlign: "center",
        }}
      >
        {/* Contact Info */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 2,
          }}
        >
          {[
            {
              icon: <LocalPhoneIcon sx={{ color: "#25D366" }} />,
              text: "+374 (93) 39-14-81",
            },
            {
              icon: <WhatsAppIcon sx={{ color: "#25D366" }} />,
              text: "+374 (93) 39-14-81",
            },
            {
              icon: <LocationOnIcon sx={{ color: "#EA4335" }} />,
              text: t("header.address"),
            },
            {
              icon: <EmailIcon sx={{ color: "orange" }} />,
              text: "mmm@mmm.com",
            },
          ].map((item, index) => (
            <Box
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                backgroundColor: "#ffffff30",
                px: 2,
                py: 1,
                borderRadius: "12px",
                boxShadow: "0 2px 6px rgba(0, 0, 0, 0.08)",
                backdropFilter: "blur(6px)",
                minWidth: isMobile ? "170px" : "200px",
                justifyContent: "center",
                transition: "all 0.2s ease-in-out",
                "&:hover": {
                  transform: "scale(1.02)",
                  backgroundColor: "#ffffff50",
                },
              }}
            >
              <Box
                sx={{
                  backgroundColor: colors.white,
                  borderRadius: "50%",
                  p: 0.7,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 1px 4px rgba(0,0,0,0.15)",
                }}
              >
                {item.icon}
              </Box>
              <Typography sx={{ fontSize: isMobile ? 12 : 14 }}>
                {item.text}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Language Selector */}
        <Box sx={{ minWidth: isMobile ? "" : "80px" }}>
          <Select
            options={languageOptions}
            defaultValue={languageOptions.find(
              (lang) => lang.value === i18n.language
            )}
            onChange={handleLanguageChange}
            isSearchable={false}
            styles={{
              control: (base) => ({
                ...base,
                borderRadius: "8px",
                border: "1px solid #ddd",
                cursor: "pointer",
                fontSize,
              }),
              menu: (base) => ({ ...base, zIndex: 9999 }),
            }}
          />
        </Box>

        {/* Social Media Links */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: isMobile ? 1.5 : 3,
          }}
        >
          {[
            {
              href: "https://www.facebook.com/people/Spectra-Dental-Clinic/61564332775099/?_rdr",
              icon: FacebookIcon,
              alt: "Facebook",
            },
            {
              href: "https://www.instagram.com/spectradental.clinic/",
              icon: InstagramIcon,
              alt: "Instagram",
            },
          ].map((item, index) => (
            <Link
              key={index}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.alt}
              sx={{
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.15)" },
              }}
            >
              <img
                src={item.icon}
                alt={item.alt}
                style={{ width: iconSize, height: iconSize }}
              />
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
