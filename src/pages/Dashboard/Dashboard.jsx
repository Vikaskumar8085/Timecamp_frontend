import React from "react";
import DefaultLayout from "../../Layoutcomponents/DefaultLayout/DefaultLayout";
import {Container, Grid} from "@mui/material";
import ProjectForm from "../../Component/AdminComponents/Project/ProjectForm";

const Dashboard = () => {
  return (
    <DefaultLayout>
      <ProjectForm />
    </DefaultLayout>
  );
};

export default Dashboard;
