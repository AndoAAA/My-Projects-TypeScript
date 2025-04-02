import React from "react";
import { Box, Typography } from "@mui/material";
import { colors } from "../assets/colors/colors";

type ServiceItemProps = {
  id: string;
  title: string;
  image: string;
};

const ServiceItem: React.FC<ServiceItemProps> = ({ id, title, image }) => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        boxShadow: 3,
        cursor: "pointer",
        borderRadius: 4,
      }}
    >
      <Box
        sx={{
          width: 200,
          height: 250,
          overflow: "hidden",
        }}
      >
        <img
          src={image}
          alt={title}
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
      </Box>
      <Typography
        variant="h6"
        sx={{
          mt: 2,
          fontWeight: "bold",
          color: colors.lightBlue,
          textAlign: "center",
        }}
      >
        {title}
      </Typography>
    </Box>
  );
};

export default ServiceItem;
