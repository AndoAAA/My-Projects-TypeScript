import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../data";
import { useTranslation } from "react-i18next";
import { colors } from "../assets/colors/colors";
import { motion } from "framer-motion";
import Carousel from "./Carousel";

const DoctorSinglePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
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
        alignItems: "center",
        justifyContent: "center",
        py: 4,
        px: 2,
        gap: 4,
      }}
    >
      {/* Carousel container with responsive fixed height */}
      <Box
        sx={{
          width: "100%",
          maxWidth: { xs: "100%", md: "600px" },
          height: { xs: 400, sm: 500, md: 600 },
        }}
      >
        <Carousel images={Object.values(doctor.images)} />
      </Box>

      {/* Doctor info */}
      <Box
        sx={{
          maxWidth: "700px",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {t(`about.names.${doctor.key}.name`)}
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "#555", textAlign: "center" }}
          >
            {t(`about.names.${doctor.key}.description`)}
          </Typography>
        </motion.div>

        <Button
          variant="contained"
          sx={{
            px: 3,
            py: 1,
            borderRadius: "20px",
            backgroundColor: colors.darkBlue,
            color: "white",
            fontSize: "0.9rem",
            fontWeight: 500,
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
