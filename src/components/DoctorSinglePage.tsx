import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../data";
import { useTranslation } from "react-i18next";
import { colors } from "../assets/colors/colors";
import { motion } from "framer-motion";

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
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-around",
        alignItems: "center",
        py: 4,
        gap: 4,
        px: 2,
        textAlign: "center",
      }}
    >
      <motion.img
        src={doctor.image}
        alt={doctor.key}
        style={{
          width: "100%",
          maxWidth: "500px",
          height: "auto",
          borderRadius: "8px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5 }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          maxWidth: "500px",
          gap: 4,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Typography variant="h4" sx={{ mt: 2, fontWeight: "bold" }}>
            {t(`about.names.${doctor.key}.name`)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ mt: 2, color: "#555", textAlign: "center" }}
          >
            {t(`about.names.${doctor.key}.description`)}
          </Typography>
        </motion.div>

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
    </Box>
  );
};

export default DoctorSinglePage;
