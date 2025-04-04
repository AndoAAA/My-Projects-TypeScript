import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { services } from "../data";
import { colors } from "../assets/colors/colors";

const ServiceSinglePage: React.FC = () => {
  const { id } = useParams();
  const { t }: { t: (key: string) => string } = useTranslation();
  const service = services.find((s) => s.id === id);
  const navigate = useNavigate();

  if (!service) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4">Service not found</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-around",
        alignItems: "center",
        py: 4,
        gap: 4,
        px: 2,
      }}
    >
      <img
        src={service.image}
        alt={t(service.title)}
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "500px",
        }}
      >
        <Typography
          variant="h4"
          sx={{ mt: 2, fontWeight: "bold", textAlign: "center" }}
        >
          {t(`services.${service.title}`)}
        </Typography>
        <Typography
          variant="body1"
          sx={{ mt: 2, color: "#555", textAlign: "center" }}
        >
          {t(service.description)}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{
            mt: 3,
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
          onClick={() => navigate("/service")}
        >
          {t("about.back")}
        </Button>
      </Box>
    </Box>
  );
};

export default ServiceSinglePage;
