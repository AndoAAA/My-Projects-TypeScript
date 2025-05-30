import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { services } from "../data";
import { colors } from "../assets/colors/colors";
import Loader from "../components/Loader";

interface SubPrice {
  label: string;
  price: string | number;
}

interface Service {
  id: string;
  title: string;
  icon: string;
  price?: string | number;
  [key: string]: any;
}

function isSubPrice(value: any): value is SubPrice {
  return (
    typeof value === "object" &&
    value !== null &&
    "label" in value &&
    "price" in value
  );
}

const PriceList: React.FC = () => {
  const { t }: { t: (key: string, fallback?: string) => string } =
    useTranslation();
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
        minHeight: "100vh",
        px: { xs: 2, md: 6 },
        py: 10,
        backgroundColor: "#e9f2fc",
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

      <Box display="flex" flexDirection="column" gap={4}>
        {(services as Service[]).map((service, index) => {
          const hasSubPrices = Object.values(service).some(isSubPrice);

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
                  px: { xs: 2, sm: 4 },
                  py: 2,
                  borderLeft: `4px solid ${colors.darkBlue}`,
                  borderRadius: 2,
                  backgroundColor: colors.white,
                  boxShadow: "0 1px 5px rgba(0,0,0,0.08)",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0 6px 14px rgba(0,0,0,0.1)",
                    transform: "translateY(-1px)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <img
                      src={service.icon}
                      alt={t(`services.${service.title}.title`, service.title)}
                      style={{
                        width: 40,
                        height: 40,
                        borderRadius: 4,
                        objectFit: "cover",
                      }}
                    />

                    <Typography
                      variant="h6"
                      sx={{
                        fontWeight: 600,
                        fontSize: { xs: "1rem", sm: "1.1rem" },
                        lineHeight: 1.4,
                        flexShrink: 1,
                      }}
                    >
                      {t(`services.${service.title}.title`, service.title)}
                    </Typography>
                  </Box>

                  {!hasSubPrices && (
                    <Typography
                      variant="body1"
                      sx={{ fontWeight: 500, whiteSpace: "nowrap" }}
                    >
                      {t("price.start")} {service.price?.toString()}
                    </Typography>
                  )}
                </Box>

                {hasSubPrices && (
                  <Box mt={2}>
                    {Object.entries(service)
                      .filter(([, value]) => isSubPrice(value))
                      .map(([key]) => (
                        <Box
                          key={`${service.id}-${key}`}
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            py: 1,
                            borderBottom: "1px dashed #ccc",
                          }}
                        >
                          <Typography
                            variant="body1"
                            sx={{
                              fontSize: "0.95rem",
                              wordBreak: "break-word",
                              whiteSpace: "normal",
                              flex: 1,
                              mb: { xs: 0.5, sm: 0 },
                            }}
                          >
                            {t(`services.${service.title}.${key}.label`, key)}
                          </Typography>

                          <Typography variant="body1">
                            {t(`services.${service.title}.${key}.price`, "")}
                          </Typography>
                        </Box>
                      ))}
                  </Box>
                )}
              </Box>
            </motion.div>
          );
        })}
      </Box>
    </Box>
  );
};

export default PriceList;
