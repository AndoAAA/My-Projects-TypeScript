import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { services } from "../data";

const PriceList: React.FC = () => {
  const { t }: { t: (key: string) => string } = useTranslation();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
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
        {services.map((service, index) => {
          const hasSubPrices = Object.entries(service).some(
            ([key, value]) =>
              typeof value === "object" && value !== null && "price" in value
          );

          return (
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
                      width: { xs: "200px", sm: "auto" },
                      whiteSpace: { xs: "normal", sm: "nowrap" },
                      fontSize: { xs: "0.95rem", sm: "1rem", md: "1.25rem" },
                    }}
                  >
                    {t(`services.${service.title}.title`)}
                  </Typography>
                </Box>

                {!hasSubPrices && (
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Typography>({t("price.start")})</Typography>
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
                )}
              </Box>

              {hasSubPrices &&
                Object.entries(service)
                  .filter(
                    ([key, value]) =>
                      typeof value === "object" &&
                      value !== null &&
                      "label" in value &&
                      "price" in value
                  )
                  .map(([key, sub]) => (
                    <Box
                      key={key}
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        px: 4,
                        py: 1,
                      }}
                    >
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                      >
                        {t(`services.${service.title}.${key}.label`)}
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{ fontSize: { xs: "0.85rem", sm: "0.95rem" } }}
                      >
                        {t(`services.${service.title}.${key}.price`)}
                      </Typography>
                    </Box>
                  ))}

              <Divider />
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default PriceList;
