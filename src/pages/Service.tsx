import React from "react";
import { services } from "../data";
import { useTranslation } from "react-i18next";
import { Box, Typography } from "@mui/material";
import { colors } from "../assets/colors/colors";
import ServiceItem from "../components/ServiceItem";
import { NavLink } from "react-router-dom";

const Service: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();

  return (
    <Box
      sx={{
        padding: "60px 20px",
        backgroundColor: colors.lightBlue,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: "bold",
          color: "white",
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
          <Box key={service.id}>
            <NavLink
              to={`/service/${service.id}`}
              style={{ textDecoration: "none" }}
            >
              <ServiceItem
                id={service.id.toString()}
                title={t(`services.${service.title}`)}
                image={service.icon}
              />
            </NavLink>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Service;
