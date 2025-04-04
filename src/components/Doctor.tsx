import { Box, Typography } from "@mui/material";
import React from "react";

type DoctorProps = {
  id: string;
  name: string;
  image: string;
  description: string;
};

const Doctor: React.FC<DoctorProps> = ({ id, image, name, description }) => {
  return (
    <Box
      sx={{
        maxWidth: "300px",
        margin: "20px",
        padding: "20px",
        boxShadow: 3,
        borderRadius: "10px",
        backgroundColor: "#fff",
        textAlign: "center",
        transition: "transform 0.3s ease",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <img
        src={image}
        alt={name}
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "50%",
          marginBottom: "15px",
        }}
      />
      <Typography
        variant="h6"
        sx={{
          fontWeight: "bold",
          fontSize: { xs: "1.2rem", sm: "1.5rem" },
          color: "#333",
          marginBottom: "10px",
        }}
      >
        {name}
      </Typography>
      <Typography
        variant="body2"
        sx={{
          color: "#777",
          fontSize: { xs: "0.9rem", sm: "1rem" },
          lineHeight: 1.5,
        }}
      >
        {description}
      </Typography>
    </Box>
  );
};

export default Doctor;
