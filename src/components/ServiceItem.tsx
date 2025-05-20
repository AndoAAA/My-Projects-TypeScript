import React from "react";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { colors } from "../assets/colors/colors";
import { useTranslation } from "react-i18next";

type ServiceItemProps = {
  id: string;
  title: string;
  image: string;
  price?: string;
  alt?: string;
};

const ServiceItem: React.FC<ServiceItemProps> = ({
  id,
  title,
  image,
  price,
  alt,
}) => {
  const fallbackImage = "path/to/fallback-image.jpg";
  const { t } = useTranslation();

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
        aria-label={`Service: ${title}`}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <CardMedia
          component="img"
          image={image?.trim() ? image : fallbackImage}
          alt={alt || title}
          loading="lazy"
          sx={{
            width: "100%",
            height: 260,
            objectFit: "cover",
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        />
        <CardContent
          sx={{
            flexGrow: 1,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
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
              mb: 1,
            }}
          >
            {title}
          </Typography>

          {price && (
            <Typography variant="body1" color="textSecondary">
              ({t("price.start")}) {price}
            </Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ServiceItem;
