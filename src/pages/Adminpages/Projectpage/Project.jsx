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
      {/* {Role === "Admin" && ( */}
      <>
        <HeaderTab>
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
        </HeaderTab>

        {isModalOpen ? (
          <Drawer
            open={isModalOpen}
            onClose={()=>setIsModalOpen(false)}
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

        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell align="left">ID</TableCell>
                <TableCell align="left">Project Name</TableCell>
                <TableCell align="left">Project Code</TableCell>
                {/* <TableCell align="left">Client Name</TableCell> */}
                <TableCell align="left">Project Hours</TableCell>
                <TableCell align="left">Start Date</TableCell>
                <TableCell align="left">End Date</TableCell>
                <TableCell align="left">Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isProjectdata.length > 0
                ? isProjectdata.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell component="th" scope="row">
                        {index + 1}
                      </TableCell>
                      <TableCell align="left">{item.Project_Name}</TableCell>
                      <TableCell align="left">{item.Project_Code}</TableCell>
                      <TableCell align="left">{item.Project_Hours}</TableCell>
                      <TableCell align="left">{item.Start_Date}</TableCell>
                      <TableCell align="left">{item.End_Date}</TableCell>
                      <TableCell align="left">
                        <Link to={`/project-info/${item.ProjectId}`}>View</Link>
                      </TableCell>
                    </TableRow>
                  ))
                : "null"}
            </TableBody>
          </Table>
        </TableContainer>
      </>
      {/* )} */}
      {Role === "Client" && <div>Role:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
    </Layout>
  );
};

export default Project;
