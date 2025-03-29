import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import InstagramIcon from "../assets/icons/instagram.png";
import FacebookIcon from "../assets/icons/facebook.png";

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <AppBar position="sticky" sx={{ p: isMobile ? 1 : 2 }}>
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
              />{" "}
              5 Dro St, Yerevan, Armenia
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

          {/* Social Media Links */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: isMobile ? 2 : 3,
            }}
          >
            <Link
              href="https://www.facebook.com/people/Spectra-Dental-Clinic/61564332775099/?_rdr"
              target="_blank"
            >
              <img
                src={FacebookIcon}
                alt="facebook"
                style={{
                  width: isMobile ? 25 : 30,
                  height: isMobile ? 25 : 30,
                }}
              />
            </Link>
            <Link
              href="https://www.instagram.com/spectradental.clinic/"
              target="_blank"
            >
              <img
                src={InstagramIcon}
                alt="instagram"
                style={{
                  width: isMobile ? 25 : 30,
                  height: isMobile ? 25 : 30,
                }}
              />
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
