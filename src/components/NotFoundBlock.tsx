import { Box, Typography } from "@mui/material";
import React from "react";

const NotFoundBlock: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
        textAlign: "center",
        color: "gray",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem" }}>
        <span role="img" aria-label="Confused face">
          😕
        </span>
        <br />
        Nothing found
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: "300", color: "#888" }}>
        Unfortunately, this page is not available in our online store.
      </Typography>
    </Box>
  );
};

export default NotFoundBlock;
