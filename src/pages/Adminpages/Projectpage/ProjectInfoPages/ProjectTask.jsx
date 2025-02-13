import {Button, Drawer} from "@mui/material";
import React, {useState} from "react";
import MilestoneForm from "./MilestoneForm";
import apiInstance from "../../../../ApiInstance/apiInstance";

const ProjectTask = ({id}) => {
  const [IsTaskOpen, setIsTaskOpen] = useState(false);
  const [IsMilestoneOpen, setIsMieStoneOpen] = useState(false);
  const [IsUploadTaskOpen, setIsUploadTaskOpen] = useState(false);

  const handleSubmit = async (values) => {
    try {
      const response = await apiInstance.post(
        `/v2/milestone/create-milestone/${id}`,
        values.milestones
      );
      console.log(response);
    } catch (error) {
      console.log(error?.message);
    }
  };

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
          Task
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
          Upload Task
        </Drawer>
      )}
    </>
  );
};

export default ProjectTask;
