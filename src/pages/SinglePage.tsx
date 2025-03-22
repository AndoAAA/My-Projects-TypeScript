import { Box, Button, Typography, CircularProgress } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";

const SinglePage: React.FC = () => {
  const [pizza, setPizza] = useState<{
    imageUrl: string;
    name: string;
    price: number;
  } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPizzas() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          `https://66dc505a47d749b72acb471f.mockapi.io/pizzas/${id}`
        );
        setPizza(data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch pizza...");
        setLoading(false);
        navigate("/");
      }
    }
    fetchPizzas();
  }, [id, navigate]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ textAlign: "center" }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box
      sx={{
        padding: { xs: 2, sm: 3, md: 4 },
        maxWidth: "600px",
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      {pizza ? (
        <>
          <img
            src={pizza.imageUrl}
            alt={pizza.name}
            style={{
              width: "100%",
              maxWidth: "500px",
              marginBottom: "20px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{ fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" } }}
            mt={2}
          >
            {pizza.name}
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{
              fontSize: { xs: "1rem", sm: "1.2rem" },
              marginBottom: "20px",
            }}
          >
            ${pizza.price.toFixed(2)}
          </Typography>
          <NavLink to="/">
            <Button
              variant="contained"
              sx={{
                mt: 2,
                fontSize: { xs: "0.9rem", sm: "1rem" },
                padding: { xs: "8px 16px", sm: "10px 20px" },
                width: { xs: "100%", sm: "auto" },
                bgcolor: "orange",
                "&:hover": { bgcolor: "darkorange" },
              }}
            >
              Back to Home
            </Button>
          </NavLink>
        </>
      ) : (
        <Typography color="error" sx={{ textAlign: "center" }}>
          Pizza not found
        </Typography>
      )}
    </Box>
  );
};

export default SinglePage;
