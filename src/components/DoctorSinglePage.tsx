import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../data";
import { useTranslation } from "react-i18next";
import { colors } from "../assets/colors/colors";

const DoctorSinglePage: React.FC = () => {
  const { id } = useParams();
  const { t }: { t: (key: string) => string } = useTranslation();
  const doctor = doctors.find((d) => d.id === id);
  const navigate = useNavigate();

  if (!doctor) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4">Doctor not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        py: 4,
      }}
    >
      <img
        src={doctor.image}
        alt={doctor.key}
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      />
      <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
        {t(`about.names.${doctor.key}`)}
      </Typography>
      <Typography
        variant="body1"
        sx={{ mt: 2, color: "#555", textAlign: "center" }}
      >
        {doctor.description}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{
          display: "inline-block",
          px: 3,
          py: 1,
          borderRadius: "20px",
          backgroundColor: colors.darkBlue,
          color: "white",
          fontSize: "0.9rem",
          fontWeight: 500,
          cursor: "pointer",
          transition: "background-color 0.3s",
          "&:hover": {
            backgroundColor: colors.lightBlue,
          },
        }}
        onClick={() => navigate("/about")}
      >
        {t("about.back")}
      </Button>
    </Box>
  );
};

export default DoctorSinglePage;
