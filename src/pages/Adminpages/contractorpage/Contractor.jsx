import React from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {Button} from "@mui/material";

const Contractor = () => {
  return (
    <DefaultLayout>
      <BreadCrumb pageName="Contractor" />

      <HeaderTab>
        <Button
          onClick={() => setIsModalOpen(true)}
          sx={{
            background: "skyblue",
            padding: "15px",
            color: "white",
          }}
        >
          Add Contractor
        </Button>
      </HeaderTab>
    </DefaultLayout>
  );
};

export default Contractor;
