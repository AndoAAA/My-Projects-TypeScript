import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { services } from "../data";
import { colors } from "../assets/colors/colors";
import { motion } from "framer-motion";
import Seo from "./Seo";

interface Service {
  id: string;
  title: string;
  image: string;
  price?: string;
}

const ServiceSinglePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const service = useMemo(
    () => services.find((s: Service) => s.id === id),
    [id]
  );

  useEffect(() => {
    if (!service) {
      const timer = setTimeout(() => navigate("/service"), 3000);
      return () => clearTimeout(timer);
    }
  }, [service, navigate]);

  if (!service) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4">
          {t("service.notFound", "Service not found")}
        </Typography>
        <Typography variant="body2" sx={{ mt: 2 }}>
          {t(
            "service.redirectMessage",
            "Redirecting to services page in 3 seconds..."
          )}
        </Typography>
      </Box>
    );
  }

  // Հաստատել, որ t()-ն վերադարձնում է string
  const title = String(
    t(`services.${service.title}.title`, {
      defaultValue: service.title,
    })
  );

  const description = String(
    t(`services.${service.title}.description`, {
      defaultValue: "Detailed info about our service",
    })
  );

  const alt = String(
    t(`services.${service.title}.imageAlt`, {
      defaultValue: title,
    })
  );

  return (
    <>
      <Seo
        titleKey={`services.${service.title}.title`}
        descriptionKey={`services.${service.title}.description`}
        titleFallback={service.title}
        descriptionFallback="Detailed info about our service"
        image={service.image}
        canonical={`https://spectra.tarverdyan-projects.com/service/${service.id}`}
      />

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
        <motion.img
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
          src={service.image}
          alt={alt}
          style={{
            width: "100%",
            maxWidth: "500px",
            height: "auto",
            borderRadius: "8px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        />

        <motion.div
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
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
              sx={{
                mt: 2,
                fontWeight: "bold",
                textAlign: "center",
                wordWrap: "break-word",
                overflowWrap: "break-word",
                hyphens: "auto",
                maxWidth: { xs: "90vw", md: "500px" },
                fontSize: { xs: "1.8rem", md: "2.5rem" },
              }}
            >
              {title}
            </Typography>

            <Typography
              variant="body1"
              sx={{
                mt: 2,
                color: "#555",
                textAlign: "center",
                lineHeight: 1.6,
              }}
            >
              {description}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              aria-label={t("about.back", "Back to services")}
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
        </motion.div>
      </Box>
    </>
  );
};

export default ServiceSinglePage;
