import * as React from "react";
import Button from "@mui/material/Button";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import TModal from "../../../common/Modal/TModal";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {TextField} from "@mui/material";
import {useFormik} from "formik";
import RolesTable from "../../../Component/MasterComponent/Roles/RolesTable";

const Roles = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const formik = useFormik({
    initialValues: {
      RoleName: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(values, "vluess");
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  return (
    <>
      <DefaultLayout>
        <BreadCrumb pageName="Roles" />
        <HeaderTab>
          <Button
            onClick={() => setIsModalOpen(true)}
            sx={{
              background: "skyblue",
              padding: "15px",
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
                sx={{width: "100%"}}
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

        <RolesTable />
      </DefaultLayout>
    </>
  );
};

export default Roles;
