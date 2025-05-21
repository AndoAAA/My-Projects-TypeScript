import CountUp from "react-countup";
import { Box, Card, CardContent, Typography } from "@mui/material";
import GroupsIcon from "@mui/icons-material/Groups";
import ImplantIcon from "../assets/icons/implant.png";
import DentalCrown from "../assets/icons/dental-crown.png";
import { useTranslation } from "react-i18next";
import { colors } from "../assets/colors/colors";

interface StatsCardProps {
  title: string;
  end: number;
  icon: React.ReactNode;
  isVisible: boolean;
}

const StatsCard: React.FC<StatsCardProps> = ({
  title,
  end,
  icon,
  isVisible,
}) => {
  return (
    <Card
      sx={{
        minWidth: 250,
        textAlign: "center",
        p: 3,
        borderRadius: "16px",
        background: colors.lightBlue,
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
          {isVisible ? (
            <CountUp
              key={Date.now()}
              start={0}
              end={end}
              duration={2.5}
              separator=","
            />
          ) : (
            0
          )}
        </Typography>
        <Typography variant="subtitle1" sx={{ opacity: 0.9 }}>
          {title}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface StatsSectionProps {
  isVisible: boolean;
}

const StatsSection: React.FC<StatsSectionProps> = ({ isVisible }) => {
  const { t } = useTranslation();

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
        end={44000}
        icon={<GroupsIcon fontSize="large" sx={{ width: 100, height: 100 }} />}
        isVisible={isVisible}
      />
      <StatsCard
        title={t("stats.implants")}
        end={1200}
        icon={
          <img
            src={ImplantIcon}
            alt="Implants"
            style={{ width: 100, height: 100 }}
          />
        }
        isVisible={isVisible}
      />
      <StatsCard
        title={t("stats.crowns")}
        end={19000}
        icon={
          <img
            src={DentalCrown}
            alt="Crowns"
            style={{ width: 100, height: 100 }}
          />
        }
        isVisible={isVisible}
      />
    </Box>
  );
};

export default StatsSection;
