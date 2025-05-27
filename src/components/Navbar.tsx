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
  const { t }: { t: (key: string) => string } = useTranslation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);
  const location = useLocation();

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { key: "home", path: "/" },
    { key: "about", path: "/about" },
    { key: "contact", path: "/contact" },
    { key: "service", path: "/service" },
    { key: "price", path: "/price" },
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
              <img src={Logo} alt="Company Logo" style={{ height: "100px" }} />
            </Box>
          </NavLink>

          {/* Navigation Links (Hidden on Mobile) */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 4 }}>
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

          {/* Booking */}
          {/* {!isMobile && (
            <Button
              component={RouterLink}
              to="/booking"
              variant="contained"
              color="primary"
              sx={{ borderRadius: 2 }}
            >
              {t("book_now")}
            </Button>
          )} */}

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
          onClick={toggleDrawer(false)}
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
              <IconButton onClick={toggleDrawer(false)}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Մենյուի ցանկը */}
            <List>
              {navItems.map(({ key, path }) => (
                <ListItem disablePadding key={key}>
                  <ListItemButton
                    component={NavLink}
                    to={path}
                    selected={location.pathname === path}
                  >
                    <ListItemText primary={t(`navbar.${key}`)} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>

          {/* Booking */}
          {/* <Box sx={{ p: 2 }}>
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
          </Box> */}
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
