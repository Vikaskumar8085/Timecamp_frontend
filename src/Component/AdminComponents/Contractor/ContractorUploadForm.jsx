import {
  Box,
  Button,
  Container,
  Grid2,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";

const ContractorUploadForm = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          mt: 2,
          p: 1,
        }}
      >
        <Typography variant="h5">Upload Contractor</Typography>
        <form>
          <Grid2 container spacing={1}>
            <Grid2 size={{ sm: 12 }}>
              <TextField type="file" />
            </Grid2>
            <Grid2 size={{ sm: 12 }}>
              <Button>submit</Button>
            </Grid2>
          </Grid2>
        </form>
      </Box>
    </Container>
  );
};

export default ContractorUploadForm;
