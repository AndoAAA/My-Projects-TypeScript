import React from "react";
import { Helmet } from "react-helmet-async";
import { services } from "../data";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { colors } from "../assets/colors/colors";
import ServiceItem from "../components/ServiceItem";
import { Link } from "react-router-dom";

const Service: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();

  return (
    <Box
      sx={{
        padding: { xs: "40px 16px", sm: "60px 32px" },
        backgroundColor: colors.lightBlue,
      }}
    >
      {/* ✅ SEO Metadata */}
      <Helmet>
        <title>
          {t("meta.servicesTitle") || "Our Services - Spectra Dental Clinic"}
        </title>

        <meta
          name="description"
          content={
            t("meta.servicesDescription") ||
            "Discover our professional services tailored for your health needs."
          }
        />

        <meta
          property="og:title"
          content={
            t("meta.servicesTitle") || "Our Services - Spectra Dental Clinic"
          }
        />
        <meta
          property="og:description"
          content={
            t("meta.servicesDescription") ||
            "Discover our professional services tailored for your health needs."
          }
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/service" />
        <meta property="og:image" content="https://yourwebsite.com/cover.jpg" />

        <meta
          name="twitter:title"
          content={
            t("meta.servicesTitle") || "Our Services - Spectra Dental Clinic"
          }
        />
        <meta
          name="twitter:description"
          content={
            t("meta.servicesDescription") ||
            "Discover our professional services tailored for your health needs."
          }
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/cover.jpg"
        />

        {/* Schema.org structured data */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Spectra Dental Clinic",
            url: "https://yourwebsite.com/service",
            description:
              t("meta.servicesDescription") ||
              "Discover our professional services tailored for your health needs.",
            image: "https://yourwebsite.com/logo.jpg",
            sameAs: [
              "https://www.facebook.com/yourpage",
              "https://www.instagram.com/yourpage",
            ],
          })}
        </script>
      </Helmet>

      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: colors.white,
          textAlign: "center",
          fontSize: { xs: "2rem", sm: "2.5rem" },
        }}
      >
        {t("navbar.service")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        {services.map((service) => (
          <Link
            key={service.id}
            to={`/service/${service.id}`}
            style={{ textDecoration: "none" }}
          >
            <ServiceItem
              id={service.id.toString()}
              title={t(`services.${service.title}.title`) || service.title}
              image={service.icon}
              price={service.price}
            />
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default Service;
