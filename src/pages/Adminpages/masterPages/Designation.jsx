import * as React from "react";

import Button from "@mui/material/Button";

import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import TModal from "../../../common/Modal/TModal";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {TextField} from "@mui/material";
import {useFormik} from "formik";
import DesignationTable from "../../../Component/MasterComponent/Designation/DesignationTable";

const Designation = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const fromik = useFormik({
    initialValues: {
      Designation_Name: "",
    },
  });

  return (
    <DefaultLayout>
      <BreadCrumb pageName="Designation" />
      <HeaderTab>
        <Button
          onClick={() => setIsModalOpen(true)}
          sx={{
            background: "skyblue",
            padding: "15px",
            color: "white",
          }}
        >
          Add Designation
        </Button>
      </HeaderTab>
      {isModalOpen ? (
        <TModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={"Add designation"}
        >
          <form onSubmit={fromik.handleSubmit}>
            <TextField
              label="Designation Name"
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
      <DesignationTable />
    </DefaultLayout>
  );
};

export default Designation;
