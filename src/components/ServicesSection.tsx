import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { services } from "../data";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
const ServicesSection: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  return (
    <Box sx={{ padding: "50px 20px", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        {t("navbar.service")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {services.slice(0, 6).map((service, index) => (
          <NavLink
            to={`/service/${service.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              key={index}
              sx={{
                width: 300,
                height: 320,
                borderRadius: 4,
                boxShadow: 3,
                transition: "transform 0.3s, box-shadow 0.3s",
                "&:hover": {
                  transform: "scale(1.03)",
                  boxShadow: 6,
                },
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={service.image}
                alt={service.title}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {t(`services.${service.title}`)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {service.description}
                </Typography>
              </CardContent>
            </Card>
          </NavLink>
        ))}
      </Box>
    </Box>
  );
};

export default ServicesSection;
