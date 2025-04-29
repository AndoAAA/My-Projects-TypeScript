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
        <Box>
          <motion.div
            initial={{ x: "-100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 25,
              duration: 1.5,
            }}
          >
            <Typography variant="h3" fontWeight="bold" gutterBottom>
              {t("home.title")}
            </Typography>
          </motion.div>

          <motion.div
            initial={{ x: "100vw", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 50,
              damping: 25,
              duration: 1.5,
            }}
          >
            <Typography variant="h6">{t("home.text")}</Typography>
          </motion.div>
        </Box>

        <Box sx={{ width: "100%", maxWidth: "1100px" }}>
          <HomeCarousel />
        </Box>
      </Box>

      <Box sx={{ px: 4, py: 0 }}>
        <Box ref={statsRef}>{statsVisible && <StatsSection />}</Box>
        <ServicesSection />
        <DoctorsSection />
      </Box>
    </>
  );
};

export default Home;
