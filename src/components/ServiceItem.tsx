import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { colors } from "../assets/colors/colors";

type ServiceItemProps = {
  id: string;
  title: string;
  image: string;
};

const ServiceItem: React.FC<ServiceItemProps> = ({ id, title, image }) => {
  return (
    <Card
      sx={{
        width: 300,
        height: 380,
        borderRadius: 4,
        boxShadow: 3,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)",
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          image={image}
          alt={title}
          loading="lazy"
          sx={{
            width: "100%",
            height: "260px",
            objectFit: "cover",
            borderTopLeftRadius: "16px",
            borderTopRightRadius: "16px",
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "12px",
          }}
        >
          <Typography
            variant="subtitle1"
            sx={{
              fontWeight: "bold",
              fontSize: "1.5rem",
              color: colors.lightBlue,
              textAlign: "center",
              lineHeight: 1.2,
            }}
          >
            {title}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ServiceItem;
