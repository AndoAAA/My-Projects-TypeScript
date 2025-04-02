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
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handleLanguageChange = (selectedOption: any) => {
    i18n.changeLanguage(selectedOption.value);
    localStorage.setItem("selectedLanguage", selectedOption.value);
  };

  return (
    <AppBar position="static" sx={{ p: 1.5, background: colors.lightBlue }}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          alignItems: "center",
          justifyContent: "space-between",
          gap: isMobile ? 1 : 2,
          textAlign: "center",
        }}
      >
        {/* Contact Info */}
        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: isMobile ? 0.8 : 3,
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
            <Typography
              key={index}
              variant={isMobile ? "body2" : isTablet ? "body1" : "h6"}
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                fontSize: isMobile ? 12 : 14,
              }}
            >
              {item.icon} {item.text}
            </Typography>
          ))}
        </Box>

        {/* Language Selector */}
        <Box sx={{ minWidth: isMobile ? "" : isTablet ? "80px" : "80px" }}>
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
                fontSize: isMobile ? 12 : 14,
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
              sx={{
                transition: "transform 0.2s ease-in-out",
                "&:hover": { transform: "scale(1.15)" },
              }}
            >
              <img
                src={item.icon}
                alt={item.alt}
                style={{
                  width: isMobile ? 22 : isTablet ? 26 : 30,
                  height: isMobile ? 22 : isTablet ? 26 : 30,
                }}
              />
            </Link>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
