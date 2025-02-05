import React from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";

const Task = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  return (
    <DefaultLayout>
      {Role === "Admin" && (
        <div>
          <BreadCrumb pageName="Task" />
          <HeaderTab>
            <Button
              onClick={() => setIsModalOpen(true)}
              sx={{
                background: "skyblue",
                padding: "15px",
                color: "white",
              }}
            >
              Add Task
            </Button>
          </HeaderTab>
        </div>
      )}
      {Role === "Client" && <div>Role:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
    </DefaultLayout>
  );
};

export default Task;
