import Select from "react-select";
import {
  AppBar,
  Toolbar,
  Box,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import InstagramIcon from "../assets/icons/instagram.png";
import FacebookIcon from "../assets/icons/facebook.png";
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
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 2 : 2,
          textAlign: "center",
        }}
      >
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
