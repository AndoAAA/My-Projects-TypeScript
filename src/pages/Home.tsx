import React from "react";
import StatsSection from "../components/Stats";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import ServicesSection from "../components/ServicesSection";
import DoctorsSection from "../components/DoctorsSection";
import MainImage from "../assets/main-img.JPG";
import useInView from "../hooks/useInView";

const Home: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const [statsRef, statsVisible] = useInView({ threshold: 0.1 });

  return (
    <>
      {/* Hero Section */}
      <Box
        sx={{
          px: 4,
          py: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 4,
        }}
      >
        {/* Տեքստային հատված */}
        <Box>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            {t("home.title")}
          </Typography>
          <Typography variant="h6">{t("home.text")}</Typography>
        </Box>

        {/* Նկարը՝ img-ով */}
        <Box sx={{ width: "100%", maxWidth: "1100px" }}>
          <img
            src={MainImage}
            alt="Hero"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "16px",
              boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
            }}
          />
        </Box>
      </Box>

      {/* Մնացած բաժինները */}
      <Box sx={{ padding: "50px" }}>
        <Box ref={statsRef}>{statsVisible && <StatsSection />}</Box>
        <ServicesSection />
        <DoctorsSection />
      </Box>
    </>
  );
};

export default Home;
