import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { services } from "../data";
import { useTranslation } from "react-i18next";
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
        {services.slice(0, 3).map((service, index) => (
          <Card
            key={index}
            sx={{
              width: 300,
              mx: "auto",
              flex: "1 1 300px",
            }}
          >
            <CardMedia
              component="img"
              height="180"
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
        ))}
      </Box>
    </Box>
  );
};

export default ServicesSection;
