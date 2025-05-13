import React from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import StatsSection from "../components/Stats";
import ServicesSection from "../components/ServicesSection";
import DoctorsSection from "../components/DoctorsSection";
import HomeCarousel from "../components/HomeCarousel";
import useInView from "../hooks/useInView";
import { colors } from "../assets/colors/colors";

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
        <Box>
          {/* Animated Title */}
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
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "center",
                justifyContent: "center",
                gap: 1,
              }}
            >
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  textAlign: "center",
                }}
              >
                {t("home.title")}
              </Typography>
              <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{
                  color: colors.darkBlue,
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  textAlign: "center",
                }}
              >
                SPECTRA
              </Typography>
            </Box>
          </motion.div>

          {/* Animated Subtitle */}
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

        {/* Carousel Section */}
        <Box sx={{ width: "100%", maxWidth: "1100px" }}>
          <HomeCarousel />
        </Box>
      </Box>

      {/* Stats, Services, Doctors */}
      <Box sx={{ px: 4, py: 0 }}>
        <Box ref={statsRef}>{statsVisible && <StatsSection />}</Box>
        <ServicesSection />
        <DoctorsSection />
      </Box>
    </>
  );
};

export default Home;
