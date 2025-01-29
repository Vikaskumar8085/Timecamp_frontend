import React from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import { Button } from "@mui/material";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";

const Project = () => {
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
          }}
        >
          Add Project
        </Button>
      </HeaderTab>
    </DefaultLayout>
  );
};

export default Project;
