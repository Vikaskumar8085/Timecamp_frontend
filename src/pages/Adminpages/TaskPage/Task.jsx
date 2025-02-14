import React, {useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button, Drawer} from "@mui/material";
import {useSelector} from "react-redux";
import AddIcons from "@mui/icons-material/Add";
import Layout from "../../../Layoutcomponents/Layout/Layout";

import UploadTask from "../../../Component/AdminComponents/Task/UploadTask";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import TaskCreationForm from "../../../Component/AdminComponents/Task/TaskCreationForm";

const Task = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  const [IsOpen, setIsOpen] = useState(false);
  const [IsUpload, setIsUpload] = useState(false);

  return (
    <Layout>
      {Role === "Admin" && (
        <div>
          <BreadCrumb pageName="Task" />
          <Button
            onClick={() => setIsOpen(true)}
            startIcon={<AddIcons />}
            sx={{
              background: "#2c3e50",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
          >
            Add Task
          </Button>
          <Button
            onClick={() => setIsUpload(true)}
            startIcon={<FileUploadIcon />}
            sx={{
              background: "#2c3e50",
              padding: "8px 10px",
              margin: "10px 0px",
              color: "white",
            }}
          >
            Upload Task
          </Button>

          {IsOpen && (
            <Drawer
              open={IsOpen}
              onClose={() => setIsOpen(false)}
              anchor="right"
            >
      
              <TaskCreationForm />
            </Drawer>
          )}

          {IsUpload && (
            <Drawer
              open={IsUpload}
              onClose={() => setIsUpload(false)}
              anchor="right"
            >
              <UploadTask />
            </Drawer>
          )}
        </div>
      )}
      {Role === "Client" && <div>Role:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
    </Layout>
  );
};

export default Task;
