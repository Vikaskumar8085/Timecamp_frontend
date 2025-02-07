import * as React from "react";
import Button from "@mui/material/Button";
import TModal from "../../../common/Modal/TModal";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import {Container, Drawer, TextField} from "@mui/material";
import {useFormik} from "formik";
import DesignationTable from "../../../Component/MasterComponent/Designation/DesignationTable";
import {
  createdesignationapicall,
  fetchdesignationapicall,
} from "../../../ApiServices/MasterApiServices/Designation";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";
import AddDesignation from "../../../Component/MasterComponent/Designation/AddDesignation";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
import {addDesignationitem} from "../../../redux/Masterslices/DesignationSlice";

const Designation = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isdesignationdata, setisdesignationdata] = React.useState([]);
  const [IsOpen, setIsOpen] = React.useState(false);

  const getdesignation = async () => {
    try {
      dispatch(setLoader(true));
      const response = await fetchdesignationapicall();
      if (response.success) {
        dispatch(setLoader(false));
        setisdesignationdata(response.result);
      } else {
        dispatch(setLoader(false));
        toast.error(response?.message || "Something went wrong.");
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(err.response?.data?.message || "Something went wrong.");
    }
  };

  const handleSubmit = React.useCallback(async (values) => {
    try {
      setIsOpen(false);
      dispatch(setLoader(true));
      const response = await createdesignationapicall(values);
      if (response.success) {
        dispatch(setLoader(false));
        dispatch(addDesignationitem(response.result));
        toast.success(response.message);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error.response?.data?.message || "Something went wrong.");
    }
  }, []);

  React.useEffect(() => {
    getdesignation();
  }, [dispatch]);
  return (
    <Layout>
      <BreadCrumb pageName="Designation" />
      <HeaderTab>
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
          Add Designation
        </Button>
      </HeaderTab>
      {/* {isModalOpen ? (
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
      ) : null} */}

      {IsOpen && (
        <Drawer
          open={IsOpen}
          anchor="right"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <AddDesignation handleSubmit={handleSubmit} />
        </Drawer>
      )}
      <DesignationTable isdesignationdata={isdesignationdata} />
    </Layout>
  );
};

export default Designation;
