import React from "react";
import { services } from "../data";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Container,
  Grid,
} from "@mui/material";
import { colors } from "../assets/colors/colors";

const Service: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();

  return (
    <Box
      sx={{
        padding: "40px 20px",
        textAlign: "center",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Typography
        variant="h4"
        sx={{ mb: 4, fontWeight: "bold", color: colors.darkBlue }}
      >
        {t("navbar.service")}
      </Typography>
      <Container>
        <Grid container spacing={4} justifyContent="center">
          {services.map((service) => (
            <Grid item xs={12} sm={6} md={4} key={service.id}>
              <Card
                sx={{
                  maxWidth: 345,
                  margin: "auto",
                  boxShadow: 3,
                  borderRadius: 2,
                }}
              >
                <CardMedia
                  sx={{ height: 180 }}
                  image={service.image || "https://via.placeholder.com/300"}
                  title={t(`services.${service.title}`)}
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="div"
                    color={colors.darkBlue}
                    sx={{ fontWeight: "bold" }}
                  >
                    {t(`services.${service.title}`)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Service;
