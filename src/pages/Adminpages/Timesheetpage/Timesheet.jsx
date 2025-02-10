import React, {useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {Button, Drawer} from "@mui/material";
import UploadTimesheet from "../../../Component/AdminComponents/Timesheet/UploadTimesheet";
import {useSelector} from "react-redux";
import Layout from "../../../Layoutcomponents/Layout/Layout";

const Timesheet = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  return (
    <Layout>
      <BreadCrumb pageName="TimeSheet" />

      {/* {Role === "Admin" && ( */}
      <div>
        <HeaderTab>
          <Button
            onClick={() => setIsModalOpen(true)}
            sx={{
              background: "#2c3e50",
              padding: "10px 15px",
              color: "white",
            }}
          >
            Upload Timesheet
          </Button>
        </HeaderTab>
        {isModalOpen ? (
          <Drawer
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            anchor="right"
          >
            <UploadTimesheet />
          </Drawer>
        ) : null}
      </div>
      {/* )} */}
      {Role === "Client" && <div>Role:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
    </Layout>
  );
};

export default Timesheet;
