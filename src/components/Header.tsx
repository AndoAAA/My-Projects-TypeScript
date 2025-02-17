import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import Search from "./Search";
import Categories from "./Categories";
import libraryImage from "../assets/library.jpg";

const Header: React.FC = () => {
  return (
    <>
      <AppBar
        position="static"
        sx={{
          bgcolor: "transparent",
          backgroundImage: `url(${libraryImage})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          minHeight: "80vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Toolbar sx={{ flexDirection: "column", textAlign: "center" }}>
          <Typography
            variant="h3"
            sx={{
              color: "#fff",
              mb: 2,
              fontFamily: "Literata",
              textTransform: "uppercase",
            }}
          >
            El Clot Library
          </Typography>
          <Search />
          <Categories />
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
