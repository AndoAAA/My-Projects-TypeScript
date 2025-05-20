import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { services } from "../data";
import { colors } from "../assets/colors/colors";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";

interface Service {
  id: string;
  title: string;
  image: string;
  price?: string;
}

const ServiceSinglePage: React.FC = () => {
  const { id } = useParams();
  const { t }: { t: (key: string) => string } = useTranslation();
  const service = services.find((s: Service) => s.id === id);
  const navigate = useNavigate();

  if (!service) {
    return (
      <Box sx={{ textAlign: "center", py: 4 }}>
        <Typography variant="h4">Service not found</Typography>
      </Box>
    );
  }

  const title = t(`services.${service.title}.title`) || service.title;
  const description =
    t(`services.${service.title}.description`) || "Service description here";
  const url = `https://yourwebsite.com/service/${service.id}`;
  const imageUrl =
    service.image || "https://yourwebsite.com/fallback-image.jpg";

  const translatedDescription = t(`services.${service.title}.description`);
  const hasDescription =
    translatedDescription !== `services.${service.title}.description`;

  return (
    <>
      <Helmet>
        <title>{title} - Spectra Dental Clinic</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={url} />
        <meta property="og:image" content={imageUrl} />

        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Schema.org JSON-LD structured data for service */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: title,
            description: description,
            provider: {
              "@type": "Organization",
              name: "Spectra Dental Clinic",
              url: "https://yourwebsite.com",
            },
            image: imageUrl,
            url: url,
          })}
        </script>
      </Helmet>

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
          alt={t(`services.${service.title}.title`)}
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
              sx={{ mt: 2, fontWeight: "bold", textAlign: "center" }}
            >
              {t(`services.${service.title}.title`)}
            </Typography>

            {hasDescription && (
              <Typography
                variant="body1"
                sx={{
                  mt: 2,
                  color: "#555",
                  textAlign: "center",
                  lineHeight: 1.6,
                }}
              >
                {translatedDescription}
              </Typography>
            )}

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
        </motion.div>
      </Box>
    </>
  );
};

export default ServiceSinglePage;
