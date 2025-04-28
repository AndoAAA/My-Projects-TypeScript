import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import StatsSection from "../components/Stats";
import ServicesSection from "../components/ServicesSection";
import DoctorsSection from "../components/DoctorsSection";
import useInView from "../hooks/useInView";
import HomeCarousel from "../components/HomeCarousel";

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
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 3 }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {t("home.title")}
            </Typography>
            <Typography variant="h6">{t("home.text")}</Typography>
          </motion.div>
        </Box>

        {/* Նկարը՝ img-ով */}
        <Box sx={{ width: "100%", maxWidth: "1100px" }}>
          <HomeCarousel />
        </Box>
      </Box>

      {/* Մնացած բաժինները */}
      <Box sx={{ px: 4, py: 6 }}>
        <Box ref={statsRef}>{statsVisible && <StatsSection />}</Box>
        <ServicesSection />
        <DoctorsSection />
      </Box>
    </>
  );
};

export default Home;
