import React from "react";
import CountUp from "react-countup";
import { Box, Card, CardContent, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ImplantIcon from "../assets/icons/implant.png";
import DentalCrown from "../assets/icons/dental-crown.png";
import { useTranslation } from "react-i18next";

interface StatsCardProps {
  title: string;
  end: number;
  icon: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, end, icon }) => {
  return (
    <Card
      sx={{
        minWidth: 250,
        textAlign: "center",
        p: 3,
        borderRadius: "16px",
        background: "linear-gradient(135deg, #1e10e0 0%, #2575fc 100%)",
        color: "white",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
    >
      <CardContent>
        <Box sx={{ fontSize: 40, mb: 2 }}>{icon}</Box>
        <Typography variant="h4" fontWeight="bold">
          <CountUp start={0} end={end} duration={2.5} separator="," />
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

const StatsSection = () => {
  const { t }: { t: (key: string) => string } = useTranslation();
  return (
    <Box
      sx={{
        display: "flex",
        gap: 3,
        justifyContent: "center",
        mt: 4,
        flexWrap: "wrap",
      }}
    >
      <StatsCard
        title={t("stats.patients")}
        end={100000}
        icon={<GroupsIcon fontSize="large" sx={{ width: 100, height: 100 }} />}
      />
      <StatsCard
        title={t("stats.implants")}
        end={15000}
        icon={
          <img
            src={ImplantIcon}
            alt="Implants"
            style={{ width: 100, height: 100 }}
          />
        }
      />
      <StatsCard
        title={t("stats.crowns")}
        end={60000}
        icon={
          <img
            src={DentalCrown}
            alt="Crowns"
            style={{ width: 100, height: 100 }}
          />
        }
      />
    </Box>
  );
};

export default StatsSection;
