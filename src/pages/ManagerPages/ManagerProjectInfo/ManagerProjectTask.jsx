import React, {useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button, Drawer} from "@mui/material";
import ManagerProjectMilestoneForm from "../../../Component/ManagerComponents/ManagerProjectinfoComponent/ManagerProjectMilestoneForm";
import ManagerProjectTaskForm from "../../../Component/ManagerComponents/ManagerProjectinfoComponent/ManagerProjectTaskForm";
import ManagerProjectTaskUploadForm from "../../../Component/ManagerComponents/ManagerProjectinfoComponent/ManagerProjectTaskUploadForm";

const ManagerTask = () => {
  const [IsMilestoneOpen, setIsMilestoneOpen] = useState(false);
  const [IsOpen, setIsOpen] = useState(false);
  const [IsUploadTask, setIsUploadTask] = useState(false);

  const [isMilestonoeresourcesdata, setisMilestonoeresourcesdata] = useState(
    []
  );

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
          <ManagerProjectTaskForm
            isMilestonoeresourcesdata={isMilestonoeresourcesdata}
          />
        </Drawer>
      )}

      {IsMilestoneOpen && (
        <Drawer
          open={IsMilestoneOpen}
          onClose={() => setIsMilestoneOpen(false)}
          anchor="right"
        >
          <ManagerProjectMilestoneForm />
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
          <ManagerProjectTaskUploadForm />
        </Drawer>
      )}
    </>
  );
};

export default ManagerTask;
