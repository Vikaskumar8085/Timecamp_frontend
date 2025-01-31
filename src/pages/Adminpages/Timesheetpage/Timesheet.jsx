import React, {useState} from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {Button} from "@mui/material";
import TModal from "../../../common/Modal/TModal";
import UploadTimesheet from "../../../Component/AdminComponents/Timesheet/UploadTimesheet";

const Timesheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <DefaultLayout>
      <BreadCrumb pageName="TimeSheet" />

      <HeaderTab>
        <Button
          onClick={() => setIsModalOpen(true)}
          sx={{
            background: "skyblue",
            padding: "15px",
            color: "white",
          }}
        >
          Upload Timesheet
        </Button>
      </HeaderTab>
      {isModalOpen ? (
        <TModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={"Upload Timesheet"}
        >
          <UploadTimesheet />
        </TModal>
      ) : null}
    </DefaultLayout>
  );
};

export default Timesheet;
