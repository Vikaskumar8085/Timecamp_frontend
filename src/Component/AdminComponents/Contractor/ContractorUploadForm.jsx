import {
  Box,
  Button,
  Container,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React, {useState} from "react";
import DownloadIcon from "@mui/icons-material/Download";

const ContractorUploadForm = ({uploadcontractorcsvupload}) => {
  const [file, setFile] = useState(null);
  // Handle file selection
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  console.log(file, "///////////");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert("Please select a file to upload.");
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    console.log(formData, "afsaldflksdfl");
    uploadcontractorcsvupload(formData);

    setFile(null);
  };
  const getcontractorcsvformate = async () => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await fetch(
        "http://localhost:8000/api/v1/csv-upload/contractor-csv-download",
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
      a.download = "Contractor.csv";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log(error?.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 2,
          p: 1,
        }}
      >
        <Typography variant="h5">Upload Contractor</Typography>
        <form onSubmit={handleSubmit}>
          <Grid2 container spacing={1}>
            <Grid2 size={{sm: 12}}>
              <TextField
                type="file"
                inputProps={{accept: ".csv"}}
                fullWidth
                onChange={handleFileChange}
                // value={""}
              />
            </Grid2>
            <Grid2 size={{sm: 12}}>
              <Button
                onClick={() => getcontractorcsvformate()}
                startIcon={<DownloadIcon />}
                sx={{
                  background: "#2c3e50",
                  padding: "8px 10px",
                  color: "white",
                  textTransform: "capitalize",
                }}
              >
                Contractor Csv formate
              </Button>
            </Grid2>

            <Grid2 size={{sm: 12}}>
              <Button
                sx={{
                  background: "#2c3e50",
                  padding: "8px 10px",
                  color: "white",
                  width: "100%",
                }}
                type="submit"
              >
                submit
              </Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Container>
  );
};

export default ContractorUploadForm;
