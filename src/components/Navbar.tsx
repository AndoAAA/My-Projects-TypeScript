import { useState } from "react";
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
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../assets/logo.jpg";
import { NavLink, useLocation, Link as RouterLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { colors } from "../assets/colors/colors";

const Navbar = () => {
  const { t }: { t: (key: string, fallback?: string) => string } =
    useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { key: "home", path: "/", label: "Home" },
    { key: "about", path: "/about", label: "About" },
    { key: "contact", path: "/contact", label: "Contact" },
    { key: "service", path: "/service", label: "Service" },
    { key: "price", path: "/price", label: "Price" },
  ];

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: colors.white,
          boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 16px",
          }}
        >
          {/* Logo */}
          <NavLink to="/" style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <img src={Logo} alt="Company Logo" style={{ height: "80px" }} />
            </Box>
          </NavLink>

          {/* Navigation Links (Hidden on Mobile) */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 4 }}>
              {navItems.map(({ key, path, label }) => (
                <Typography
                  key={key}
                  component={NavLink}
                  to={path}
                  aria-current={location.pathname === path ? "page" : undefined}
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
                  {t(`navbar.${key}`, label)}
                </Typography>
              ))}
            </Box>
          )}

          {/* Booking */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                component={RouterLink}
                to="/booking"
                variant="contained"
                color="primary"
                sx={{ borderRadius: 2 }}
              >
                {t("book_now")}
              </Button>
              <Button
                component={RouterLink}
                to="/admin-login"
                variant="outlined"
                color="primary"
                sx={{ borderRadius: 2 }}
              >
                {t("admin.login")}
              </Button>
            </Box>
          )}

          {/* Hamburger Menu (Visible on Mobile) */}
          {isMobile && (
            <IconButton
              aria-label="Open navigation menu"
              onClick={toggleDrawer(true)}
              size="large"
            >
              <MenuIcon sx={{ color: theme.palette.primary.main }} />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer (Sidebar Menu for Mobile) */}
      <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          {/* Վերևի մաս */}
          <Box>
            {/* Փակելու կոճակ */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 1,
              }}
            >
              <IconButton onClick={toggleDrawer(false)} aria-label="Close menu">
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Մենյուի ցանկը */}
            <List>
              {navItems.map(({ key, path, label }) => (
                <ListItem disablePadding key={key}>
                  <ListItemButton
                    component={NavLink}
                    to={path}
                    selected={location.pathname === path}
                    onClick={toggleDrawer(false)}
                    sx={{
                      "&.Mui-selected": {
                        bgcolor: theme.palette.action.selected,
                        fontWeight: "bold",
                        color: theme.palette.primary.main,
                      },
                    }}
                  >
                    <ListItemText primary={t(`navbar.${key}`, label)} />
                  </ListItemButton>
                </ListItem>
              ))}
              <ListItem disablePadding key="admin-login">
                <ListItemButton
                  component={NavLink}
                  to="/admin-login"
                  selected={location.pathname === "/admin-login"}
                  onClick={toggleDrawer(false)}
                  sx={{
                    "&.Mui-selected": {
                      bgcolor: theme.palette.action.selected,
                      fontWeight: "bold",
                      color: theme.palette.primary.main,
                    },
                  }}
                >
                  <ListItemText primary={t("admin.login", "Admin Login")} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>

          {/* Booking & Admin (Mobile) */}
          <Box
            sx={{
              p: 2,
              display: "flex",
              gap: 2,
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <Button
              component={RouterLink}
              to="/booking"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              {t("book_now")}
            </Button>
            <Button
              component={RouterLink}
              to="/admin-login"
              variant="outlined"
              color="primary"
              fullWidth
              sx={{ borderRadius: 2 }}
            >
              {t("admin.login")}
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
