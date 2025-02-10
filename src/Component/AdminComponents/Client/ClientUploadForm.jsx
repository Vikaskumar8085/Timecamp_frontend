import {useState} from "react";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid2";
import FileUploadIcon from "@mui/icons-material/FileUpload";

import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Papa from "papaparse";
import DownloadIcon from "@mui/icons-material/Download";

function ClientUploadForm() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);

  const formik = useFormik({
    initialValues: {
      file: null,
    },
    onSubmit: (values) => {
      const formik = useFormik({
        initialValues: {
          file: null,
        },
        onSubmit: (values) => {
          if (values.file) {
            Papa.parse(values.file, {
              complete: (result) => {
                setData(result.data);
                setOpen(true);
                console.log("Parsed Data:", result.data);
              },
              header: true,
            });
          }
        },
      });
    },
  });

  // download client csv
  const getclientcsvformate = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/csv-upload/client-csv-download",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "text/csv",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download CSV");
      }
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "client.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error?.message);
    }
  };

  // download client csv

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Container maxWidth="sm" fullWidth>
      <Box sx={{mt: 2, p: 1}}>
        <Typography
          style={{fontSize: "20px", fontWeight: "bold", marginBottom: "16px"}}
        >
          Upload Client CSV
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={1}>
            <Grid size={{sm: 12}}>
              <TextField
                type="file"
                inputProps={{accept: ".csv"}}
                onChange={(event) =>
                  formik.setFieldValue("file", event.currentTarget.files[0])
                }
                fullWidth
              />
            </Grid>
            <Grid size={{sm: 12}}>
              <Button
                startIcon={<DownloadIcon />}
                onClick={() => getclientcsvformate()}
                sx={{
                  background: "#2c3e50",
                  padding: "8px 10px",
                  margin: "10px 10px",
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                Client Csv formate
              </Button>
            </Grid>
            <Grid size={{sm: 12}}>
              <Button
                type="submit"
                startIcon={<FileUploadIcon />}
                sx={{
                  background: "#2c3e50",
                  padding: "8px 10px",
                  margin: "10px 10px",
                  color: "white",
                  width: "100%",
                }}
                // disabled={!formik.values.file}
              >
                Upload
              </Button>
            </Grid>
          </Grid>
        </form>
        {open && (
          <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
            <DialogTitle>Parsed Data</DialogTitle>
            <DialogContent>
              <pre
                style={{
                  backgroundColor: "#f5f5f5",
                  padding: "8px",
                  borderRadius: "4px",
                  overflow: "auto",
                }}
              >
                {JSON.stringify(data, null, 2)}
              </pre>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Box>
    </Container>
  );
}

export default ClientUploadForm;
