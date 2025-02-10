import React, {useState} from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import AddIcons from "@mui/icons-material/Add";
import Layout from "../../../Layoutcomponents/Layout/Layout";

const Task = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
  const [IsOpen, setIsOpen] = useState(false);

  return (
    <Layout>
      {Role === "Admin" && (
        <div>
          <BreadCrumb pageName="Task" />
          <HeaderTab>
            <Button
              onClick={() => setIsOpen(true)}
              startIcon={<AddIcons />}
              sx={{
                background: "#2c3e50",
                padding: "8px 10px",
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
    </Layout>
  );
};

export default Task;
