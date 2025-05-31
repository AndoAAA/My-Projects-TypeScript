import { Box, Typography, keyframes } from "@mui/material";
import { colors } from "../assets/colors/colors";


const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const Loader = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        bgcolor: "#f9fcff",
      }}
    >
      <Box
        sx={{
          width: 60,
          height: 60,
          border: `6px solid #cde1f9`,
          borderTop: `6px solid ${colors.darkBlue}`,
          borderRadius: "50%",
          animation: `${spin} 1s linear infinite`,
        }}
      />
      <Typography
        sx={{
          mt: 3,
          fontSize: 18,
          fontWeight: 500,
          color: colors.darkBlue,
          userSelect: "none",
        }}
      >
        Loading...
      </Typography>
    </Box>
  );
};

export default Loader;
