"use client";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import React, { useState, useEffect, useRef, useCallback } from "react";

interface CarouselProps {
  images: string[];
}

const AboutCarousel: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  }, [images.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);

    return () => clearInterval(interval);
  }, [nextImage]);

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

  if (images.length === 0) return null;

  return (
    <Box
      ref={carouselRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "400px",
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

      <IconButton
        onClick={prevImage}
        sx={{
          position: "absolute",
          top: "50%",
          left: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={nextImage}
        sx={{
          position: "absolute",
          top: "50%",
          right: "10px",
          transform: "translateY(-50%)",
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          color: "#fff",
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.7)",
          },
        }}
      >
        <ChevronRight />
      </IconButton>

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
              width: 10,
              height: 10,
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

export default AboutCarousel;
