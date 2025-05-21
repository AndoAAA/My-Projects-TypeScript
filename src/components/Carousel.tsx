import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { colors } from "../assets/colors/colors";

interface CarouselProps {
  images: string[];
  altTexts?: string[];
  height?: number;
  interval?: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  height = 600,
  altTexts,
  interval = 4000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [images.length]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const diff = touchStartX.current - touchEndX;
      if (diff > 50) {
        nextImage();
      } else if (diff < -50) {
        prevImage();
      }
      touchStartX.current = null;
    }
  };

  return (
    <Box
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "1000px",
        mx: "auto",
        overflow: "hidden",
        borderRadius: "16px",
        height: { xs: 350, sm: height },
      }}
    >
      <img
        src={images[currentIndex]}
        alt={altTexts?.[currentIndex] ?? `Slide ${currentIndex + 1}`}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "16px",
          userSelect: "none",
          pointerEvents: "none",
        }}
        draggable={false}
      />

      {/* Left Arrow */}
      <IconButton
        onClick={prevImage}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          p: { xs: "4px", sm: "8px" },
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <ChevronLeft />
      </IconButton>

      {/* Right Arrow */}
      <IconButton
        onClick={nextImage}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          p: { xs: "4px", sm: "8px" },
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <ChevronRight />
      </IconButton>

      {/* Dots */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          position: "absolute",
          bottom: "10px",
          width: "100%",
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={() => setCurrentIndex(index)}
            sx={{
              width: { xs: 8, sm: 10 },
              height: { xs: 8, sm: 10 },
              borderRadius: "50%",
              backgroundColor: currentIndex === index ? colors.lightBlue : "#ccc",
              cursor: "pointer",
              mx: 0.5,
              transition: "background-color 0.3s",
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Carousel;
