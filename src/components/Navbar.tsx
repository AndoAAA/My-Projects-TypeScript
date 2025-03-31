import React, { useState } from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Logo from "../assets/logo.jpg";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "contact", path: "/contact" },
    { key: "service", path: "/service" },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{ background: "#fff", boxShadow: "0px 4px 10px rgba(0,0,0,0.1)" }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          {/* Logo */}
          <NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <img src={Logo} alt="Company Logo" style={{ height: "120px" }} />
            </Box>
          </NavLink>

          {/* Navigation Links (Hidden on Mobile) */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navItems.map(({ key, path }) => (
                <Typography
                  key={key}
                  component={NavLink}
                  to={path}
                  sx={{
                    textDecoration: "none",
                    color: "#333",
                    "&.active": {
                      color: theme.palette.primary.main,
                      fontWeight: "bold",
                    },
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  {t(`navbar.${key}`)}
                </Typography>
              ))}
            </Box>
          )}

          {/* Contact Button */}
          {!isMobile && (
            <Button
              variant="outlined"
              component={NavLink}
              to="/contact"
              sx={{
                background: "white",
                color: theme.palette.primary.main,
                "&:hover": {
                  background: theme.palette.primary.main,
                  color: "white",
                },
              }}
            >
              {t("navbar.contact")}
            </Button>
          )}

          {/* Hamburger Menu (Visible on Mobile) */}
          {isMobile && (
            <IconButton
              aria-label="Open navigation menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar Menu for Mobile) */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box sx={{ width: 250 }} onClick={toggleDrawer(false)}>
          <List>
            {navItems.map(({ key, path }) => (
              <ListItem disablePadding key={key}>
                <ListItemButton component={NavLink} to={path}>
                  <ListItemText primary={t(`navbar.${key}`)} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button
            fullWidth
            component={NavLink}
            to="/contact"
            variant="contained"
            sx={{
              mt: 2,
              background: theme.palette.primary.main,
              color: "#fff",
            }}
          >
            {t("navbar.contact")}
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
