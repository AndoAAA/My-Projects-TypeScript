import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { services } from "../data";
import BckImg from "../assets/main3.JPG";

const PriceList: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        minHeight: "100vh",
      }}
    >
      <Box
        sx={{
          flex: 1,
          px: { xs: 3, md: 6 },
          py: 10,
          backgroundColor: "#f4f6f8",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <Typography variant="h4" fontWeight="bold" mb={6} textAlign="center">
            {t("price.title")}
          </Typography>
        </motion.div>

        <Box>
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  py: 2,
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <img
                    src={service.icon}
                    alt={service.title}
                    style={{ width: 32, height: 32 }}
                  />
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: "0.95rem", sm: "1rem", md: "1.25rem" },
                    }}
                  >
                    {t(`services.${service.title}.title`)} ({t("price.start")})
                  </Typography>
                </Box>
                <Typography
                  variant="h6"
                  fontWeight="medium"
                  sx={{
                    fontSize: { xs: "0.95rem", sm: "1rem", md: "1.25rem" },
                  }}
                >
                  {service.price}
                </Typography>
              </Box>
              <Divider />
            </motion.div>
          ))}
        </Box>
      </Box>

      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
          backgroundImage: `url(${BckImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
    </Box>
  );
};

export default PriceList;
