import React, { useState } from "react";
import { Box, IconButton } from "@mui/material";
import { ChevronLeft, ChevronRight } from "@mui/icons-material";

const images = [
  "/images/steril1.JPG",
  "/images/steril2.JPG",
  "/images/steril3.JPG",
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + images.length) % images.length
    );
  };

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: "900px", mx: "auto" }}>
      <img
        src={images[currentIndex]}
        alt="Carousel"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: "16px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
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
        }}
      >
        <ChevronRight />
      </IconButton>
    </Box>
  );
};

export default Carousel;
