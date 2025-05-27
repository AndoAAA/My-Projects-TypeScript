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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "./firebase";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface Booking {
  id: string;
  name: string;
  email: string;
  phone?: string;
  doctor: string;
  service: string;
  note?: string;
  dateTime: any;
  createdAt: any;
}

const AdminPanel = () => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { t } = useTranslation();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  useEffect(() => {
    const fetchBookings = async () => {
      setLoading(true);
      setError(null);
      try {
        const querySnapshot = await getDocs(collection(db, "bookings"));
        const data: Booking[] = querySnapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Booking, "id">),
        }));
        data.sort((a, b) =>
          a.dateTime?.toDate() > b.dateTime?.toDate() ? 1 : -1
        );
        setBookings(data);
      } catch (err) {
        console.error(err);
        setError(t("admin.error_load") || "Failed to load bookings");
      }
      setLoading(false);
    };

    fetchBookings();
  }, [t]);

  const handleDelete = async (id: string) => {
    if (!window.confirm(t("admin.confirm_delete"))) return;
    try {
      await deleteDoc(doc(db, "bookings", id));
      setBookings((prev) => prev.filter((booking) => booking.id !== id));
    } catch (err) {
      alert(t("admin.error_delete"));
      console.error(err);
    }
  };

  return (
    <Box sx={{ maxWidth: "100%", p: 2 }}>
      <Typography variant="h5" mb={2}>
        {t("admin.panel_title")}
      </Typography>

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
                  <TableCell>{t("admin.email")}</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {t("admin.phone")}
                  </TableCell>
                  <TableCell>{t("admin.doctor")}</TableCell>
                  <TableCell>{t("admin.service")}</TableCell>
                  <TableCell>{t("admin.date")}</TableCell>
                  <TableCell>{t("admin.time")}</TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {t("admin.note")}
                  </TableCell>
                  <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                    {t("admin.created_at")}
                  </TableCell>
                  <TableCell align="center">{t("admin.actions")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {bookings.map((b) => (
                  <TableRow key={b.id} hover>
                    <TableCell>{b.name}</TableCell>
                    <TableCell>{b.email}</TableCell>
                    <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                      {b.phone || "-"}
                    </TableCell>
                    <TableCell>{b.doctor}</TableCell>
                    <TableCell>{b.service}</TableCell>
                    <TableCell>
                      {b.dateTime
                        ? dayjs(b.dateTime.toDate()).format("YYYY-MM-DD")
                        : "-"}
                    </TableCell>
                    <TableCell>
                      {b.dateTime
                        ? dayjs(b.dateTime.toDate()).format("HH:mm")
                        : "-"}
                    </TableCell>
                    <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                      {b.note || "-"}
                    </TableCell>
                    <TableCell sx={{ display: { xs: "none", sm: "table-cell" } }}>
                      {b.createdAt
                        ? dayjs(b.createdAt.toDate()).format("YYYY-MM-DD HH:mm")
                        : "-"}
                    </TableCell>
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
    </Box>
  );
};

export default AdminPanel;
