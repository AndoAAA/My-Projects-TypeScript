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
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navItems = ["Home", "About", "Contact", "Service"];

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
          <NavLink to="/home" style={{ display: "flex", alignItems: "center" }}>
            <Box>
              <img src={Logo} alt="Company Logo" style={{ height: "80px" }} />
            </Box>
          </NavLink>

          {/* Navigation Links (Hidden on Mobile) */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3 }}>
              {navItems.map((item) => (
                <Typography
                  key={item}
                  component={Link}
                  to={item.toLowerCase().replace(/\s+/g, "-")}
                  sx={{
                    textDecoration: "none",
                    color: "#333",
                    "&:hover": { color: theme.palette.primary.main },
                  }}
                >
                  {item}
                </Typography>
              ))}
            </Box>
          )}

          {/* Contact Button */}
          {!isMobile && (
            <Button
              variant="contained"
              sx={{
                background: theme.palette.primary.main,
                color: "#fff",
                "&:hover": { background: theme.palette.primary.dark },
              }}
            >
              Contact
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
        <Box sx={{ width: 250 }}>
          <List>
            {navItems.map((item) => (
              <ListItem disablePadding key={item}>
                <ListItemButton
                  component={Link}
                  to={item.toLowerCase().replace(/\s+/g, "-")}
                  onClick={toggleDrawer(false)}
                >
                  <ListItemText primary={item} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button
            fullWidth
            component={Link}
            to="/contact"
            variant="contained"
            sx={{
              mt: 2,
              background: theme.palette.primary.main,
              color: "#fff",
            }}
            onClick={toggleDrawer(false)}
          >
            Contact
          </Button>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;
