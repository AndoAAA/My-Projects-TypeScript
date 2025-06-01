import React, { useEffect, useState } from "react";
import {
  Box,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Alert,
  IconButton,
  Tooltip,
  Button,
  Snackbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { collection, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from '@mui/icons-material/Logout';
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface Booking {
  id: string;
  name: string;
  phone?: string;
  note?: string;
}

const AdminPanel = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);  // <-- նոր state
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      collection(db, "bookings"),
      (snapshot) => {
        const data = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Booking, "id">),
        }));
        setBookings(data);
        setLoading(false);
      },
      (err) => {
        console.error(err);
        setError(t("admin.error_load") || "Failed to load bookings");
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [t]);

  const handleDelete = async (id: string) => {
    if (!window.confirm(t("admin.confirm_delete"))) return;
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (err) {
      alert(t("admin.error_delete") || "Failed to delete booking");
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    setSnackbarOpen(true);   // <-- ցույց տա snackbar
    setTimeout(() => {
      navigate("/admin-login");
    }, 1500); // 1.5 վայրկյան հետո նավիգացիա
  };

  const handleCloseSnackbar = (
    _?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setSnackbarOpen(false);
  };

  return (
    <Box sx={{ maxWidth: "100%", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Typography variant="h5">{t("admin.panel_title")}</Typography>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          {t("admin.logout")}
        </Button>
      </Box>

      {loading && (
        <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && bookings.length === 0 && (
        <Alert severity="info">{t("admin.no_bookings")}</Alert>
      )}

      {!loading && !error && bookings.length > 0 && (
        <Box sx={{ overflowX: "auto" }}>
          <TableContainer
            component={Paper}
            sx={{ maxHeight: isMobile ? 400 : 600, minWidth: 650 }}
          >
            <Table stickyHeader aria-label="bookings table" size="small">
              <TableHead>
                <TableRow>
                  <TableCell>{t("admin.name")}</TableCell>
                  <TableCell>{t("admin.phone")}</TableCell>
                  <TableCell>{t("admin.note")}</TableCell>
                  <TableCell align="center">{t("admin.actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b.id} hover>
                    <TableCell>{b.name}</TableCell>
                    <TableCell>{b.phone || "-"}</TableCell>
                    <TableCell>{b.note || "-"}</TableCell>
                    <TableCell align="center">
                      <Tooltip title={t("admin.delete")} arrow>
                        <IconButton
                          color="error"
                          onClick={() => handleDelete(b.id)}
                          size="small"
                        >
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {t("admin.logout_success") || "Logged out successfully"}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminPanel;
