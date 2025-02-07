import { Button, Container, Drawer, Input, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import TModal from "../../../common/Modal/TModal";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import DepartmentTable from "../../../Component/MasterComponent/Department/DepartmentTable";
import AddIcon from "@mui/icons-material/Add";

import {
  createdepartmentapicall,
  fetchdepartmentapicall,
} from "../../../ApiServices/MasterApiServices/Department";
import Layout from "../../../Layoutcomponents/Layout/Layout";

const Department = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isdepartmentdata, setIsdepartmentdata] = useState([]);
  const [IsOpen, setIsOpen] = useState(false);
  const getdepartment = async () => {
    try {
      const response = await fetchdepartmentapicall();
      if (response.success) {
        setIsdepartmentdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getdepartment();
  });
  return (
    <Layout>
      <BreadCrumb pageName="Department" />
      <HeaderTab>
        <Button
          onClick={() => setIsModalOpen(true)}
          sx={{
            background: "skyblue",
            padding: "15px",
            color: "white",
          }}
        >
          Add Department
        </Button>
        <Button
          onClick={() => setIsOpen(true)}
          startIcon={<AddIcon />}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 0px",
            color: "white",
          }}
        >
          Add Department
        </Button>
      </HeaderTab>

      {isModalOpen ? (
        <TModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={"Add Department"}
        >
          <div className="department_form">
            <form onSubmit={formik.handleSubmit}>
              <br />
              <TextField
                label="Department Name"
                variant="outlined"
                type="text"
                sx={{ width: "100%" }}
                {...formik.getFieldProps("Department_Name")}
              />
              <Button
                sx={{
                  backgroundColor: "skyblue",
                  padding: "10px 15px",
                  color: "white",
                  margin: "10px 0px",
                  width: "100%",
                }}
                type="submit"
              >
                submit
              </Button>
            </form>
          </div>
        </TModal>
      ) : null}

      {IsOpen && (
        <Drawer
          open={IsOpen}
          anchor="right"
          onClose={() => setIsOpen(false)}
        ></Drawer>
      )}
      <DepartmentTable isdepartmentdata={isdepartmentdata} />
    </Layout>
  );
};

export default Department;
