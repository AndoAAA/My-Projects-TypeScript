import React, { useState, useEffect, useRef } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import mainImg1 from "../assets/main1.JPG";
import mainImg2 from "../assets/main2.jpg";
import mainImg3 from "../assets/main3.JPG";
import mainImg4 from "../assets/main4.JPG";
import mainImg5 from "../assets/main5.JPG";
import mainImg6 from "../assets/main6.JPG";
import mainImg7 from "../assets/main7.JPG";

const images = [
  mainImg1,
  mainImg2,
  mainImg3,
  mainImg4,
  mainImg5,
  mainImg6,
  mainImg7,
];

const HomeCarousel = () => {
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
      nextImage();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

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
      }}
    >
      <img
        src={images[currentIndex]}
        alt="Carousel"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          transition: "transform 0.5s ease",
        }}
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
          mt: 2,
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
              backgroundColor: currentIndex === index ? "#1976d2" : "#ccc",
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

export default HomeCarousel;
