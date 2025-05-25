import React from "react";
import { Box, Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../data";
import { useTranslation } from "react-i18next";
import { colors } from "../assets/colors/colors";
import { motion } from "framer-motion";
import Carousel from "./Carousel";
import Seo from "./Seo";

const DoctorSinglePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const doctor = doctors.find((d) => d.id === id);
  const navigate = useNavigate();

  if (!doctor) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4">
          {t("doctor.notFound", "Doctor not found")}
        </Typography>
      </Box>
    );
  }

  const founderText = t(`about.names.${doctor.key}.founder`);
  const hasFounderText =
    founderText && founderText !== `about.names.${doctor.key}.founder`;

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
          gap: 4,
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", md: "600px" },
            height: { xs: 350, sm: 500, md: 600 },
          }}
        >
          <Carousel
            images={doctor.images}
            altTexts={doctor.images.map((_, idx) =>
              t(
                `about.names.${doctor.key}.imageAlt${idx + 1}`,
                `Image ${idx + 1}`
              )
            )}
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

            {hasFounderText && (
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 500, color: colors.darkBlue }}
              >
                {founderText}
              </Typography>
            )}

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
