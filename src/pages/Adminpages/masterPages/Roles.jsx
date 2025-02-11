import * as React from "react";
import Button from "@mui/material/Button";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import TModal from "../../../common/Modal/TModal";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {Drawer, TextField} from "@mui/material";
import {useFormik} from "formik";
import RolesTable from "../../../Component/MasterComponent/Roles/RolesTable";
import {
  createrolesapicall,
  fetchroleapicall,
} from "../../../ApiServices/MasterApiServices/Roles";
import apiInstance from "../../../ApiInstance/apiInstance";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import AddRoles from "../../../Component/MasterComponent/Roles/AddRoles";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";

const Roles = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRoledata, setIsRoledata] = React.useState([]);
  const dispatch = useDispatch();

  const getroles = async () => {
    try {
      const response = await fetchroleapicall();
      if (response.success) {
        setIsRoledata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await createrolesapicall(value);
      if (response.success) {
        dispatch(setLoader(false));
        setIsModalOpen(false);
        getroles();
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  React.useEffect(() => {
    getroles();
  }, []);

  return (
    <>
      <Layout>
        <BreadCrumb pageName="Roles" />

        <Button
          onClick={() => setIsModalOpen(true)}
          startIcon={<AddIcon />}
          sx={{
            background: "#2c3e50",
            padding: "8px 10px",
            margin: "10px 0px",
            color: "white",
          }}
        >
          Add Roles
        </Button>

        {isModalOpen ? (
          <Drawer
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            anchor="right"
          >
            <AddRoles handleSubmit={handleSubmit} />
          </Drawer>
        ) : null}

        <RolesTable isRoledata={isRoledata} />
      </Layout>
    </>
  );
};

export default Roles;
