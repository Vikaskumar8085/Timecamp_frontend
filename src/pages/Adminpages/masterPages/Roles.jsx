import * as React from "react";
import Button from "@mui/material/Button";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import TModal from "../../../common/Modal/TModal";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import { TextField } from "@mui/material";
import { useFormik } from "formik";
import RolesTable from "../../../Component/MasterComponent/Roles/RolesTable";
import {
  createrolesapicall,
  fetchroleapicall,
} from "../../../ApiServices/MasterApiServices/Roles";
import apiInstance from "../../../ApiInstance/apiInstance";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";


const Roles = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isRoledata, setIsRoledata] = React.useState([]);

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

  const formik = useFormik({
    initialValues: {
      RoleName: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await createrolesapicall(values);
        if (response.success) {
          setIsModalOpen(false);
          getroles();
        }
      } catch (error) {
        console.log(error?.message);
      }
    },
    // Handle success (e.g., show toast message, navigate, etc.)
  });

  React.useEffect(() => {
    getroles();
  }, []);

  return (
    <>
      <Layout>
        <BreadCrumb pageName="Roles" />
        <HeaderTab>
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
        </HeaderTab>
        {isModalOpen ? (
          <TModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            title={"Add Role"}
          >
            <form onSubmit={formik.handleSubmit}>
              <TextField
                label="Role Name"
                variant="outlined"
                type="text"
                sx={{ width: "100%" }}
                {...formik.getFieldProps("RoleName")}
                error={
                  formik.touched.RoleName && Boolean(formik.errors.RoleName)
                }
                helperText={formik.touched.RoleName && formik.errors.RoleName}
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
          </TModal>
        ) : null}

        <RolesTable isRoledata={isRoledata} />
      </Layout>
    </>
  );
};

export default Roles;
