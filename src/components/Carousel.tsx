import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import { Box, useMediaQuery, useTheme } from "@mui/material";

interface CarouselProps {
  images: string[];
  altTexts?: string[];
  height?: number;
  interval?: number;
  objectFit?: "cover" | "contain";
  borderRadius?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  altTexts,
  height = 600,
  interval = 2000,
  objectFit = "cover",
  borderRadius = 16,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "1000px",
        mx: "auto",
        borderRadius: `${borderRadius}px`,
        overflow: "hidden",
        height: isMobile ? 250 : height,
        backgroundColor: "#ffffff",
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.08)",
        position: "relative",
      }}
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        navigation={!isMobile}
        pagination={{ clickable: true }}
        autoplay={{ delay: interval, disableOnInteraction: false }}
        loop
        effect="fade"
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {images.map((src, index) => (
          <SwiperSlide 
            key={index} 
            style={{ position: "relative", width: "100%", height: "100%" }}
          >
            <Box
              component="img"
              src={src}
              alt={altTexts?.[index] ?? `Slide ${index + 1}`}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: objectFit,
                userSelect: "none",
                pointerEvents: "none",
                display: "block",
                borderRadius: `${borderRadius}px`,

                position: "absolute",
                top: 0,
                left: 0,
              }}
              draggable={false}
              loading="lazy"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default Carousel;
