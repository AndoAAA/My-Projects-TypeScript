import React from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { colors } from "../assets/colors/colors";
import { useTranslation } from "react-i18next";

type DoctorProps = {
  id: string;
  name: string;
  image: string;
};

const Doctor: React.FC<DoctorProps> = ({ id, image, name }) => {
  const { t } = useTranslation();
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Box
        sx={{
          maxWidth: "300px",
          margin: "20px",
          padding: "20px",
          boxShadow: 3,
          borderRadius: "10px",
          backgroundColor: "#fff",
          textAlign: "center",
        }}
      >
        <img
          src={image}
          alt={name}
          style={{
            width: "250px",
            height: "250px",
            objectFit: "cover",
            borderRadius: "50%",
            marginBottom: "15px",
          }}
          draggable={false}
        />
        <Typography
          variant="h6"
          sx={{
            fontWeight: "bold",
            fontSize: { xs: "1.2rem", sm: "1.5rem" },
            color: "text.primary",
            marginBottom: "10px",
          }}
        >
          {name}
        </Typography>
        <NavLink to={`/about/${id}`}>
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
        </NavLink>
      </Box>
    </motion.div>
  );
};

export default Doctor;
