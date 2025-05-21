import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import StatsSection from "../components/Stats";
import ServicesSection from "../components/ServicesSection";
import DoctorsSection from "../components/DoctorsSection";
import useInView from "../hooks/useInView";
import { colors } from "../assets/colors/colors";
import Carousel from "../components/Carousel";
import mainImg1 from "../assets/main1.JPG";
import mainImg2 from "../assets/main2.jpg";
import mainImg3 from "../assets/main3.JPG";
import mainImg4 from "../assets/main4.JPG";
import mainImg5 from "../assets/main5.JPG";
import mainImg6 from "../assets/main6.JPG";
import mainImg7 from "../assets/main7.JPG";
import mainImg8 from "../assets/main8.JPG";

import { Helmet } from "react-helmet-async";
import { doctors } from "../data";
import Loader from "../components/Loader";

const images = [
  { src: mainImg1, alt: "Clinic Hall" },
  { src: mainImg2, alt: "Doctor with patient" },
  { src: mainImg3, alt: "Clinic Hall" },
  { src: mainImg4, alt: "Clinic Hall" },
  { src: mainImg5, alt: "Clinic Hall" },
  { src: mainImg6, alt: "Clinic Hall" },
  { src: mainImg7, alt: "Clinic Hall" },
  { src: mainImg8, alt: "Clinic Hall" },
];

const Home: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const [statsRef, statsVisible] = useInView({ threshold: 0.1 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Helmet>
        <title>
          {t("meta.homeTitle") || "Welcome to Spectra Dental Clinic"}
        </title>

        <meta
          name="description"
          content={
            t("meta.homeDescription") ||
            "Experience quality healthcare services at our trusted clinic."
          }
        />
        <meta
          name="keywords"
          content="clinic, healthcare, medical services, doctors, health"
        />
        <link rel="canonical" href="https://yourdomain.com/about" />

        <meta
          property="og:title"
          content={t("meta.homeTitle") || "Welcome to Spectra Dental Clinic"}
        />
        <meta
          property="og:description"
          content={
            t("meta.homeDescription") ||
            "Experience quality healthcare services at our trusted clinic."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yourwebsite.com/" />
        <meta property="og:image" content="https://yourwebsite.com/cover.jpg" />

        <meta
          name="twitter:title"
          content={t("meta.homeTitle") || "Welcome to Spectra Dental Clinic"}
        />
        <meta
          name="twitter:description"
          content={
            t("meta.homeDescription") ||
            "Experience quality healthcare services at our trusted clinic."
          }
        />
        <meta
          name="twitter:image"
          content="https://yourwebsite.com/cover.jpg"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "Spectra Dental Clinic",
            url: "https://yourwebsite.com",
            description:
              t("meta.homeDescription") ||
              "Experience quality healthcare services at our trusted clinic.",
            image: "https://yourwebsite.com/logo.jpg",
            sameAs: [
              "https://www.facebook.com/people/Spectra-Dental-Clinic/61564332775099/?_rdr",
              "https://www.instagram.com/spectradental.clinic/",
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "Spectra Dental Clinic",
            url: "https://yourdomain.com/about",
            description: "Experienced dentists providing personalized care.",
            medicalSpecialty: "Dentistry",
            member: doctors.map((doc) => ({
              "@type": "Person",
              name: t(`about.names.${doc.key}.name`),
              jobTitle: "Dentist",
            })),
          })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <Box
        sx={{
          px: 4,
          py: 5,
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
          <Carousel
            images={images.map((img) => img.src)}
            altTexts={images.map((img) => img.alt)}
            height={600}
            interval={4000}
          />
        </Box>
      </Box>

      {/* Stats, Services, Doctors */}
      <Box sx={{ px: 4, py: 0 }}>
        <Box ref={statsRef}>
          <StatsSection isVisible={statsVisible} />
        </Box>

        <ServicesSection />
        <DoctorsSection />
      </Box>
    </>
  );
};

export default Home;
