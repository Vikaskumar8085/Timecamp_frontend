import React, {useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button, Drawer} from "@mui/material";

const ManagerTask = () => {
  const [IsMilestoneOpen, setIsMilestoneOpen] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [IsUploadTask, setIsUploadTask] = useState(false);

  return (
    <>
      <BreadCrumb pageName="Manager Task" />

      <div>
        <Button
          onClick={() => setIsMilestoneOpen(true)}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Create Milestone
        </Button>
        <Button
          onClick={() => setIsOpen(true)}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Create Task
        </Button>
        <Button
          onClick={() => setIsUploadTask(true)}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 10px",
            color: "white",
          }}
        >
          Upload Task
        </Button>
      </div>

      {IsOpen && (
        <Drawer
          open={IsOpen}
          onClose={() => {
            setIsOpen(false);
          }}
          anchor="right"
        >
          Create task
        </Drawer>
      )}

      {IsMilestoneOpen && (
        <Drawer
          open={IsMilestoneOpen}
          onClose={() => setIsMilestoneOpen(false)}
          anchor="right"
        >
          Create Milestone
        </Drawer>
      )}

      {IsUploadTask && (
        <Drawer
          open={IsUploadTask}
          onClose={() => {
            setIsUploadTask(false);
          }}
          anchor="right"
        >
          Upload Task
        </Drawer>
      )}
    </>
  );
};

export default ManagerTask;
