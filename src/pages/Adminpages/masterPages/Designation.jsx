import * as React from "react";

import Button from "@mui/material/Button";

import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import TModal from "../../../common/Modal/TModal";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {TextField} from "@mui/material";
import {useFormik} from "formik";
import DesignationTable from "../../../Component/MasterComponent/Designation/DesignationTable";
import {
  createdesignationapicall,
  fetchdesignationapicall,
} from "../../../ApiServices/MasterApiServices/Designation";

const Designation = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isdesignationdata, setisdesignationdata] = React.useState([]);

  const getdesignation = async () => {
    try {
      const response = await fetchdesignationapicall();
      if (response.success) {
        setisdesignationdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      Designation_Name: "",
    },
    onSubmit: async (values) => {
      try {
        const resp = await createdesignationapicall(values);
        if (resp.success) {
          setIsModalOpen(false);
          getdesignation();
        }
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  React.useEffect(() => {
    getdesignation();
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
          <form onSubmit={formik.handleSubmit}>
            <TextField
              label="Designation Name"
              variant="outlined"
              type="text"
              sx={{width: "100%"}}
              {...formik.getFieldProps("Designation_Name")}
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
      <DesignationTable isdesignationdata={isdesignationdata} />
    </DefaultLayout>
  );
};

export default Designation;
