import { Box, Typography, Container, useTheme } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import { doctors } from "../data";
import { colors } from "../assets/colors/colors";

const About: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "#f4f6f8",
        py: { xs: 4, sm: 6, md: 8 },
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="lg" sx={{ display: "flex", flexDirection:"column", gap:5 }}>
        {/* About Section */}
        <Box sx={{ flex: 1, textAlign: { xs: "center", sm: "left" } }}>
          <Typography
            variant="h6"
            sx={{
              fontSize: { xs: "1.2rem", sm: "1.5rem", md: "1.8rem" },
              fontWeight: "medium",
              lineHeight: 1.6,
              color: "#333",
            }}
          >
            {t("about.paragraph")}
          </Typography>
        </Box>

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
              pb: 6,
            }}
          >
            {doctors.map((doctor) => (
              <Box
                key={doctor.id}
                sx={{
                  width: { xs: "100%", sm: "45%", md: "30%" },
                  backgroundColor: "#fff",
                  borderRadius: 3,
                  p: 3,
                  textAlign: "center",
                  transition: "transform 0.3s, box-shadow 0.3s",
                  boxShadow: 2,
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                  },
                }}
              >
                <Box
                  sx={{
                    width: 140,
                    height: 140,
                    mx: "auto",
                    borderRadius: "50%",
                    overflow: "hidden",
                    mb: 2,
                    boxShadow: 1,
                  }}
                >
                  <img
                    src={doctor.image}
                    alt={doctor.key}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </Box>
                <Typography
                  variant="h6"
                  sx={{ fontWeight: 600, fontSize: "1.25rem", mb: 1 }}
                >
                  {t(`about.names.${doctor.key}`)}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ color: "#555", fontSize: "0.95rem", mb: 2 }}
                >
                  {doctor.description}
                </Typography>
                <Box
                  sx={{
                    display: "inline-block",
                    px: 3,
                    py: 1,
                    borderRadius: "20px",
                    backgroundColor: colors.darkBlue,
                    color: "white",
                    fontSize: "0.9rem",
                    fontWeight: 500,
                    cursor: "pointer",
                    transition: "background-color 0.3s",
                    "&:hover": {
                      backgroundColor: colors.lightBlue,
                    },
                  }}
                >
                  {t("about.moreInfo")}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default About;
