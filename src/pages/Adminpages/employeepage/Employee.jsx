import React, {useState} from "react";
import {Drawer, TextField} from "@mui/material";
import {useFormik} from "formik";
import * as Yup from "yup";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button} from "@mui/material";
import {
  addemployeeapicall,
  fetchemployeeapicall,
} from "../../../ApiServices/AdminApiServices/Employee";
import EmployeeTable from "../../../Component/AdminComponents/Employee/EmployeeTable";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import EmployeeUploadForm from "../../../Component/AdminComponents/Employee/EmployeeUploadForm";
import {uploademployeecsvapicall} from "../../../ApiServices/Csvapiservices/csvapiservices";
import EmployeeForm from "../../../Component/AdminComponents/Employee/EmployeeForm";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";

const Employee = () => {
  const [isUpload, setIsUpload] = useState(false);
  const [IsEmployeeData, setIsEmployeeData] = useState([]);
  const [IsOpen, setIsOpen] = React.useState(false);
  const dispatch = useDispatch();
  const getemployee = async () => {
    try {
      const response = await fetchemployeeapicall();
      if (response.success) {
        setIsEmployeeData(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await addemployeeapicall(value);
      console.log(response, "response data");
      if (response.success) {
        setIsOpen(false);
        getemployee();
        dispatch(setLoader(false));
      } else {
        toast.error(response?.message || "Something went wrong.");
      }
      console.log(value, "values");
    } catch (error) {
      dispatch(setLoader(true));
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  };

  // upload handle submit

  const uploadhandlesubmit = async (value) => {
    try {
      const response = await uploademployeecsvapicall(value);

      alert("File uploaded successfully!");
      console.log(response.data);
      getemployee();
      setIsUpload(false);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("File upload failed.");
    }
  };

  React.useEffect(() => {
    getemployee();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Employee" />

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
        Create Employee
      </Button>
      <Button
        onClick={() => setIsUpload(true)}
        startIcon={<FileUploadIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Upload Employee
      </Button>

      {/* create employee */}

      {IsOpen && (
        <Drawer open={IsOpen} onClose={() => setIsOpen(false)} anchor="right">
          <EmployeeForm handleSubmit={handleSubmit} />
        </Drawer>
      )}
      {/* create employee */}

      {isUpload && (
        <Drawer
          open={isUpload}
          onClose={() => setIsUpload(false)}
          anchor="right"
        >
          <EmployeeUploadForm uploadhandlesubmit={uploadhandlesubmit} />
        </Drawer>
      )}

      <EmployeeTable IsEmployeeData={IsEmployeeData} />
    </Layout>
  );
};

export default Employee;
