import React from "react";
import { Box, Typography, Card, CardContent, CardMedia } from "@mui/material";
import { doctors } from "../data";
import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";

interface Doctor {
  id: string | number;
  key: string;
  images: string[];
}

const DoctorsSection: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  return (
    <Box sx={{ padding: "20px 20px", textAlign: "center" }}>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        {t("about.doctors")}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 4,
          justifyContent: "center",
        }}
      >
        {doctors.slice(0, 3).map((doctor: Doctor) => (
          <NavLink
            key={doctor.id}
            to={`/about/${doctor.id}`}
            style={{ textDecoration: "none" }}
          >
            <Card
              sx={{
                width: { xs: 280, sm: 300 },
                height: "auto",
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
                height="300"
                image={doctor.images[0]}
                alt={t(`about.names.${doctor.key}.name`)}
              />
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {t(`about.names.${doctor.key}.name`)}
                </Typography>
              </CardContent>
            </Card>
          </NavLink>
        ))}
      </Box>
    </Box>
  );
};

export default DoctorsSection;
