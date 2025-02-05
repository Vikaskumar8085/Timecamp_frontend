import React, {useState} from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {Button} from "@mui/material";
import TModal from "../../../common/Modal/TModal";
import UploadTimesheet from "../../../Component/AdminComponents/Timesheet/UploadTimesheet";
import {useSelector} from "react-redux";

const Timesheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  return (
    <DefaultLayout>
      <BreadCrumb pageName="TimeSheet" />

      {Role === "Admin" && (
        <div>
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
        </div>
      )}
      {Role === "Client" && <div>Role:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
    </DefaultLayout>
  );
};

export default Timesheet;
