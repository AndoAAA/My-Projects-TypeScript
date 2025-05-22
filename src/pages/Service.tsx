import React, { useEffect, useState } from "react";
import { services } from "../data";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { colors } from "../assets/colors/colors";
import ServiceItem from "../components/ServiceItem";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Seo from "../components/Seo";

const Service: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Box
      sx={{
        padding: { xs: "40px 16px", sm: "60px 32px" },
        backgroundColor: colors.lightBlue,
      }}
    >
      {/* ✅ SEO Metadata */}
      <Seo
        titleKey="meta.servicesTitle"
        descriptionKey="meta.servicesDescription"
        canonical="https://spectradentalclinic.com/services"
        keywords="dental services, teeth cleaning, whitening, dental implants, orthodontics"
      />

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
            aria-label={`View details for ${
              t(`services.${service.title}.title`) || service.title
            }`}
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
