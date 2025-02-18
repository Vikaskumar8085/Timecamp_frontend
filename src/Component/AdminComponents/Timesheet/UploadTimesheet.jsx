import {useState} from "react";
import {useFormik} from "formik";
import Grid from "@mui/material/Grid2";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import Papa from "papaparse";
import DownloadIcon from "@mui/icons-material/Download";
import {uploadtimesheetcsvapicall} from "../../../ApiServices/Csvapiservices/csvapiservices";

// /timesheet-csv-download
//
const UploadTimesheet = () => {
  const [file, setFile] = useState(null);
  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);

    const response = await uploadtimesheetcsvapicall(formData);
    console.log(response, "/............./asdfjksdaf/............./");

    setFile(null);
  };

  const gettimesheetcsvdownload = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/csv-upload/timesheet-csv-download",
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
      a.download = "Timesheet.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <Container maxWidth="sm" fullWidth>
      <Box sx={{mt: 2, p: 1}}>
        <Typography
          style={{fontSize: "20px", fontWeight: "bold", marginBottom: "16px"}}
        >
          Upload Task
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={1}>
            <Grid size={{sm: 12}}>
              <TextField
                type="file"
                inputProps={{accept: ".csv"}}
                fullWidth
                onChange={handleFileChange}
              />
            </Grid>
            <Grid size={{sm: 12}}>
              <Button
                startIcon={<DownloadIcon />}
                onClick={() => gettimesheetcsvdownload()}
                sx={{
                  background: "#2c3e50",
                  padding: "8px 10px",
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                Timesheet Csv formate
              </Button>
            </Grid>
            <Grid size={{sm: 12}}>
              <Button
                type="submit"
                startIcon={<FileUploadIcon />}
                sx={{
                  background: "#2c3e50",
                  padding: "8px 10px",
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
      </Box>
    </Container>
  );
};

export default UploadTimesheet;
