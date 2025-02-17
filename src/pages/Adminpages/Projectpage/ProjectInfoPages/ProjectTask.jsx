import { Box, Button, Drawer, Grid2 } from "@mui/material";
import React, { useState } from "react";
import MilestoneForm from "./MilestoneForm";
import apiInstance from "../../../../ApiInstance/apiInstance";
import UploadTask from "../../../../Component/AdminComponents/Task/UploadTask";
import AddProjectTask from "../../../../Component/AdminComponents/Project/AddProjectTask";
import MilestoneList from "../../../../Component/AdminComponents/Project/ProjecTaskComponent/MilestoneList";

const ProjectTask = ({ id }) => {
  const [IsTaskOpen, setIsTaskOpen] = useState(false);
  const [IsMilestoneOpen, setIsMieStoneOpen] = useState(false);
  const [IsUploadTaskOpen, setIsUploadTaskOpen] = useState(false);
  const [Ismilestonedata, setIsmilestonedata] = useState([]);

  const fetchmilestonefunc = async () => {
    try {
      const response = await apiInstance.get(
        `/v2/milestone/fetch-milestone/${id}`
      );
      if (response.data.success) {
        setIsmilestonedata(response.data.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await apiInstance.post(
        `/v2/milestone/create-milestone/${id}`,
        values.milestones
      );
      console.log(response);
      if (response.success) {
        console.log(response);
        fetchmilestonefunc();
        setIsMieStoneOpen(false);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  React.useEffect(() => {
    fetchmilestonefunc();
  }, [0]);
  return (
    <>
      <Button
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsTaskOpen(true)}
      >
        Add Task
      </Button>
      <Button
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsMieStoneOpen(true)}
      >
        Add MileStone
      </Button>
      <Button
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsUploadTaskOpen(true)}
      >
        Upload Task
      </Button>

      {IsTaskOpen && (
        <Drawer
          open={IsTaskOpen}
          onClose={() => setIsTaskOpen(false)}
          anchor="right"
        >
          <AddProjectTask />
        </Drawer>
      )}

      {IsMilestoneOpen && (
        <Drawer
          open={IsMilestoneOpen}
          onClose={() => setIsMieStoneOpen(false)}
          anchor="right"
        >
          <MilestoneForm handleSubmit={handleSubmit} />
        </Drawer>
      )}

      {IsUploadTaskOpen && (
        <Drawer
          open={IsUploadTaskOpen}
          onClose={() => setIsUploadTaskOpen(false)}
          anchor="right"
        >
          <UploadTask />
        </Drawer>
      )}

      <div>
        <Grid2 container spacing={2}>
          <Grid2 size={{ sm: 12, md: 6 }}>
            <Box sx={{height:'300px', overflow:"auto"}}>
              <MilestoneList milestones={Ismilestonedata} />
            </Box>
          </Grid2>
        </Grid2>
      </div>
    </>
  );
};

export default ProjectTask;
