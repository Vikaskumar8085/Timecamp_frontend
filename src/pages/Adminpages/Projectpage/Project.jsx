import React, {useEffect, useState} from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import {Button} from "@mui/material";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TModal from "../../../common/Modal/TModal";
import ProjectForm from "../../../Component/AdminComponents/Project/ProjectForm";
import UploadProjectForm from "../../../Component/AdminComponents/Project/UploadProjectForm";
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
import { useSelector } from "react-redux";
import Layout from "../../../Layoutcomponents/Layout/Layout";

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
      {Role === "Admin" && (
        <>
          <BreadCrumb pageName="Project" />
          <HeaderTab>
            <Button
              onClick={() => setIsModalOpen(true)}
              sx={{
                background: "skyblue",
                padding: "15px",
                color: "white",
                margin: "0px 10px",
              }}
            >
              Add Project
            </Button>

            <Button
              onClick={() => setIsProjectUploadModelOpen(true)}
              sx={{
                background: "skyblue",
                padding: "15px",
                color: "white",
                margin: "0px 10px",
              }}
            >
              Upload Projects
            </Button>
          </HeaderTab>

          {isModalOpen ? (
            <TModal
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              title={"Add Project"}
            >
              <ProjectForm handleSubmit={handleSubmit} />
            </TModal>
          ) : null}

          {IsProjectUploadModelOpen ? (
            <TModal
              isModalOpen={IsProjectUploadModelOpen}
              setIsModalOpen={setIsProjectUploadModelOpen}
              title={"Upload Projects"}
            >
              <UploadProjectForm />
            </TModal>
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
                          <Link to={`/project-info/${item.ProjectId}`}>
                            View
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))
                  : "null"}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
      {Role === "Client" && <div>Role:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
    </Layout>
  );
};

export default Project;
