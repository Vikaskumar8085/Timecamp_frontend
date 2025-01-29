import React from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {Button} from "@mui/material";

const Employee = () => {
  return (
    <DefaultLayout>
      <BreadCrumb pageName="Employee" />

      <HeaderTab>
        <Button
          onClick={() => setIsModalOpen(true)}
          sx={{
            background: "skyblue",
            padding: "15px",
            color: "white",
          }}
        >
          Add Client
        </Button>
      </HeaderTab>
    </DefaultLayout>
  );
};

export default Employee;
