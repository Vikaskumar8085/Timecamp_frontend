import {Button, Container, Drawer, Input, TextField} from "@mui/material";
import React, {useEffect, useState} from "react";
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
import AddDepartment from "../../../Component/MasterComponent/Department/AddDepartment";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";

const Department = () => {
  const dispatch = useDispatch();
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

  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await createdepartmentapicall(value);
      if (response.success) {
        dispatch(setLoader(false));
        getdepartment();
        setIsOpen(false);
      }
    } catch (error) {
      dispatch(setLoader(false));
    }
  };

  useEffect(() => {
    getdepartment();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Department" />

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

      {IsOpen && (
        <Drawer open={IsOpen} anchor="right" onClose={() => setIsOpen(false)}>
          <AddDepartment handleSubmit={handleSubmit} />
        </Drawer>
      )}
      <DepartmentTable isdepartmentdata={isdepartmentdata} />
    </Layout>
  );
};

export default Department;
