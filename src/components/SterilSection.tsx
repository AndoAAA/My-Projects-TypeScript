import { Box, Typography } from "@mui/material";
import React from "react";
import sterilImg1 from "../assets/steril1.JPG";
import sterilImg2 from "../assets/steril2.JPG";

const SterilSection = () => {
  return (
    <Box sx={{ px: 4, py: 8, backgroundColor: "#f7f7f7" }}>
      {/* Վերնագիր */}
      <Typography
        variant="h4"
        fontWeight="bold"
        textAlign="center"
        gutterBottom
      >
        Sterilization
      </Typography>

      {/* Նկարներ՝ կողք կողքի կամ բջջայինի վրա՝ մեկը մյուսի տակ */}
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

      {/* Տեքստային մաս */}
      <Box sx={{ mt: 6, maxWidth: "900px", mx: "auto" }}>
        <Typography variant="body1" fontSize="18px" textAlign="center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Est adipisci
          nisi dignissimos, sunt, laboriosam ea reiciendis inventore et tempore
          iusto ipsa officia nihil quae, porro incidunt corrupti excepturi iure
          consequuntur?
        </Typography>
      </Box>
    </Box>
  );
};

export default SterilSection;
