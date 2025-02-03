import React, {useState} from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import {Button} from "@mui/material";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import TModal from "../../../common/Modal/TModal";
import ProjectForm from "../../../Component/AdminComponents/Project/ProjectForm";
import UploadProjectForm from "../../../Component/AdminComponents/Project/UploadProjectForm";
import {createprojectapicall} from "../../../ApiServices/ProjectApiServices";

const Project = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  return (
    <DefaultLayout>
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
    </DefaultLayout>
  );
};

export default Project;
