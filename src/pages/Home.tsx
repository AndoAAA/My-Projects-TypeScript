import React from "react";
import StatsSection from "../components/Stats";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ServicesSection from "../components/ServicesSection";

const Home: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          padding: "80px",
          backgroundImage: "url('/images/clinic-hero.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          {t("home.title")}
        </Typography>
        <Typography variant="h6" mb={4}>
          {t("home.text")}
        </Typography>
      </Box>

      {/* Stats Section */}
      <Box sx={{ padding: "50px" }}>
        <StatsSection />
        <ServicesSection/>
      </Box>
    </>
  );
};

export default Home;
