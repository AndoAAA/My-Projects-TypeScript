import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../data";
import { useTranslation } from "react-i18next";
import { colors } from "../assets/colors/colors";
import { motion } from "framer-motion";
import Carousel from "./Carousel";
import Seo from "./Seo";

interface Doctor {
  id: string;
  key: string;
  images: string[];
  // Add other properties if needed
}

const DoctorSinglePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const doctor = doctors.find((d: Doctor) => d.id === id);

  if (!doctor) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4">
          {t("doctor.notFound", "Doctor not found")}
        </Typography>
      </Box>
    );
  }

  // Use fallback "" to detect if translation exists
  const founderText = t(`about.names.${doctor.key}.founder`, {
    defaultValue: "",
  });
  const hasFounderText = founderText.trim().length > 0;

  // Prepare alt texts with fallback
  const altTexts = doctor.images.map((_, idx) => {
    const alt = t(`about.names.${doctor.key}.imageAlt${idx + 1}`, {
      defaultValue: t("about.defaultDoctorImageAlt", "Doctor image"),
    });
    return alt;
  });

  return (
    <>
      <Seo
        titleKey={`about.names.${doctor.key}.name`}
        descriptionKey={`about.names.${doctor.key}.description`}
        canonical={`https://spectradentalclinic.com/about/doctor/${doctor.id}`}
        image={doctor.images[0]}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          px: 2,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: "600px" },
            height: { xs: 280, sm: 500, md: 600 },
          }}
        >
          <Carousel
            images={doctor.images}
            altTexts={altTexts}
            height={600}
            objectFit="contain"
            borderRadius={20}
          />
        </Box>

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
            <br />
            {hasFounderText && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, color: colors.darkBlue }}
              >
                {founderText}
              </Typography>
            )}
            <br />

            <Typography
              variant="body1"
              sx={{ color: "#555", textAlign: "center" }}
            >
              {t(`about.names.${doctor.key}.description`)}
            </Typography>
          </motion.div>

          <Button
            variant="contained"
            aria-label={t("about.back")}
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
            onClick={() => {
              if (window.history.length > 2) {
                navigate(-1);
              } else {
                navigate("/about");
              }
            }}
          >
            {t("about.back")}
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default DoctorSinglePage;
