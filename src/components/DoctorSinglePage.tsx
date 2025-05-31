import React, { useEffect } from "react";
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
}

const DoctorSinglePage: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // Գտնում ենք doctor-ը միայն եթե id կա
  const doctor = id ? doctors.find((d: Doctor) => d.id === id) : undefined;

  // Redirect 3 վայրկյան հետո, եթե doctor չկա կամ id չկա
  useEffect(() => {
    if (!id || !doctor) {
      const timer = setTimeout(() => {
        navigate("/about");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [id, doctor, navigate]);

  if (!id || !doctor) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4" role="alert">
          {t("doctor.notFound", "Doctor not found")}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          Redirecting to About page...
        </Typography>
      </Box>
    );
  }

  const name = t(`about.names.${doctor.key}.name`);
  const founderText = t(`about.names.${doctor.key}.founder`, { defaultValue: "" });
  const description = t(`about.names.${doctor.key}.description`);
  const hasFounderText = founderText.trim().length > 0;

  const altTexts = doctor.images.map((_, idx) =>
    t(`about.names.${doctor.key}.imageAlt${idx + 1}`, {
      defaultValue: `${name} - Doctor image`,
    })
  );

  const firstImage =
    doctor.images[0] ?? "https://cdn.spectradentalclinic.com/default-doctor-image.jpg";

  return (
    <>
      <Seo
        titleKey={`about.names.${doctor.key}.name`}
        descriptionKey={`about.names.${doctor.key}.description`}
        canonical={`https://spectradentalclinic.com/about/doctor/${doctor.id}`}
        image={firstImage}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          justifyContent: "center",
          py: 4,
          px: 2,
          gap: { xs: 4, md: 6 },
        }}
      >
        {doctor.images.length > 0 && (
          <Carousel
            images={doctor.images.length > 0 ? doctor.images : ["/default-doctor-image.jpg"]}
            altTexts={altTexts}
            height={600}
            mobileHeight={400}
          />
        )}

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
            aria-live="polite"
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              {name}
            </Typography>
            <br />
            {hasFounderText && (
              <Typography variant="subtitle1" sx={{ fontWeight: 500, color: colors.darkBlue }}>
                {founderText}
              </Typography>
            )}
            <br />
            <Typography variant="body1" sx={{ color: "#555", textAlign: "center" }}>
              {description}
            </Typography>
          </motion.div>

          <Button
            type="button"
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
