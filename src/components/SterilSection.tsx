import { Box, Typography } from "@mui/material";
import React from "react";
import sterilImg1 from "../assets/steril1.JPG";
import sterilImg2 from "../assets/steril2.JPG";
import { useTranslation } from "react-i18next";

const SterilSection = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  return (

    <Box sx={{ px: 4, py: 8, backgroundColor: "#f7f7f7" }}>

      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        {t("about.sterilization")}
      </Typography>


      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          mt: 4,
        }}
      >
        <Box
          sx={{
            flex: 1,
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <img
            src={sterilImg1}
            alt="Sterilization 1"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            borderRadius: 6,
            overflow: "hidden",
          }}
        >
          <img
            src={sterilImg2}
            alt="Sterilization 2"
            style={{ width: "100%", height: "auto" }}
          />
        </Box>
      </Box>


      <Box sx={{ mt: 6, maxWidth: "900px", mx: "auto" }}>
        <Typography variant="body1" fontSize="18px" textAlign="center">
          
          {t("sterilization")}
        </Typography>
      </Box>
    </Box>
  );
};

export default SterilSection;
