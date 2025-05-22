import { Box, Typography, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Trans, useTranslation } from "react-i18next";
import { doctors } from "../data";
import { colors } from "../assets/colors/colors";
import SterilSection from "../components/SterilSection";
import Carousel from "../components/Carousel";
import aboutImg1 from "../assets/about1.JPG";
import aboutImg2 from "../assets/about2.JPG";
import aboutImg3 from "../assets/about3.JPG";
import aboutImg4 from "../assets/about4.JPG";
import Doctor from "../components/Doctor";
import Loader from "../components/Loader";
import Seo from "../components/Seo";

const images = [
  { src: aboutImg1, alt: "Clinic Hall" },
  { src: aboutImg2, alt: "Doctor with patient" },
  { src: aboutImg3, alt: "Clinic Hall" },
  { src: aboutImg4, alt: "Clinic Hall" },
];

const About: React.FC = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        py: { xs: 4, sm: 6, md: 8 },
        minHeight: "100vh",
      }}
    >
      <Seo
        titleKey="meta.aboutTitle"
        descriptionKey="meta.aboutDescription"
        canonical="https://spectradentalclinic.com/about"
        doctors={doctors}
      />

      <Container
        maxWidth="lg"
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: { xs: 0, sm: 3, md: 5 },
        }}
      >
        {/* About Text Section */}
        <Box sx={{ flex: 1, textAlign: "center" }}>
          <Typography
            variant="h4"
            fontWeight="bold"
            gutterBottom
            sx={{
              mt: 2,
              textAlign: "center",
              fontSize: {
                xs: "1.2rem",
                sm: "1.5rem",
                md: "1.8rem",
                lg: "2rem",
                xl: "2.2rem",
              },
              lineHeight: 1.6,
              "& .highlight": {
                color: colors.darkBlue,
                fontWeight: "bold",
              },
            }}
          >
            <Trans
              i18nKey="about.paragraph"
              components={{ span: <span className="highlight" /> }}
            />
          </Typography>
        </Box>

        {/* About Carousel with all doctor images */}
        <Carousel
          images={images.map((img) => img.src)}
          altTexts={images.map((img) => img.alt)}
          height={600}
          interval={4000}
        />

        {/* Doctors Section */}
        <Box textAlign="center">
          <Typography
            variant="h2"
            sx={{
              mb: 4,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
              fontWeight: "bold",
              color: "#333",
            }}
          >
            {t("about.doctors")}
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "center",
              gap: 4,
            }}
          >
            {doctors.map((doctor) => (
              <Doctor
                key={doctor.id}
                id={doctor.id}
                name={t(`about.names.${doctor.key}.name`)}
                image={doctor.images[0]}
              />
            ))}
          </Box>
        </Box>

        {/* Sterilization Section */}
        <SterilSection />
      </Container>
    </Box>
  );
};

export default About;
