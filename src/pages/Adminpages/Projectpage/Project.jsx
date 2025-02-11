import React, {useEffect, useState} from "react";
import {Button, Drawer} from "@mui/material";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TModal from "../../../common/Modal/TModal";
import ProjectForm from "../../../Component/AdminComponents/Project/ProjectForm";
import UploadProjectForm from "../../../Component/AdminComponents/Project/UploadProjectForm";
import AddIcons from "@mui/icons-material/Add";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import {
  createprojectapicall,
  fetchprojectapicall,
} from "../../../ApiServices/ProjectApiServices";
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import ProjectTable from "../../../Component/AdminComponents/Project/ProjectTable";

const Project = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isProjectdata, setIsProjectdata] = useState([]);
  const [IsProjectUploadModelOpen, setIsProjectUploadModelOpen] =
    useState(false);

  const handleSubmit = async (values) => {
    try {
      const response = await createprojectapicall(values);
      if (response.success) {
        setIsModalOpen(false);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const getProjectapicall = async () => {
    try {
      const response = await fetchprojectapicall();
      if (response.success) {
        setIsProjectdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getProjectapicall();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="Projects" />
      {Role === "Admin" && (
        <>
          <Button
            onClick={() => setIsModalOpen(true)}
            startIcon={<AddIcons />}
            sx={{
              background: "#2c3e50",
              padding: "8px 10px",
              margin: "10px 0px",
              color: "white",
            }}
          >
            Add Project
          </Button>

          <Button
            onClick={() => setIsProjectUploadModelOpen(true)}
            startIcon={<FileUploadIcon />}
            sx={{
              background: "#2c3e50",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
          >
            Upload Projects
          </Button>

          {isModalOpen ? (
            <Drawer
              open={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              anchor="right"
            >
              <ProjectForm handleSubmit={handleSubmit} />
            </Drawer>
          ) : null}

          {IsProjectUploadModelOpen ? (
            <Drawer
              open={IsProjectUploadModelOpen}
              onClose={() => setIsProjectUploadModelOpen(false)}
              anchor="right"
            >
              <UploadProjectForm />
            </Drawer>
          ) : null}

          <ProjectTable isProjectdata={isProjectdata} />
        </>
      )}
      {Role === "Client" && <div>Role:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
    </Layout>
  );
};

export default Project;
