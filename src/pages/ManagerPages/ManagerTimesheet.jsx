import React, {useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {Button, Container, Drawer, Grid2, TextField} from "@mui/material";

const ManagerTimesheet = () => {
  const [IsOpen, setIsOpen] = useState(false);

  return (
    <Layout>
      <BreadCrumb pageName="ManagerTimesheet" />
      <Button onClick={() => setIsOpen(true)}>Fill Timesheet</Button>
      {IsOpen && (
        <Drawer open={IsOpen} onClose={() => setIsOpen(false)} anchor="right">
          <Container
            sx={{
              p: 2,
            }}
            maxWidth={"md"}
          >
            <form action="">
              <Grid2 container spacing={2}>
                <Grid2 size={{sm: 12}}>
                  {/* <TextField fullWidth label="Project" /> */}
                </Grid2>
              </Grid2>
            </form>
          </Container>
        </Drawer>
      )}
    </Layout>
  );
};

export default ManagerTimesheet;
