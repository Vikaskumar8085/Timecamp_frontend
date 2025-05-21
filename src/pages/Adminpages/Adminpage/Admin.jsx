import React, {useEffect} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Container, Button, Grid2, Box} from "@mui/material";
import TModal from "../../../common/Modal/TModal";
import * as Yup from "yup";
import {
  createadminapicall,
  fetchadminapicall,
} from "../../../ApiServices/AdminApiServices/Admin";
import AddIcon from "@mui/icons-material/Add";
import UserList from "../../../Component/AdminComponents/Admin/UserList";
import {useDispatch} from "react-redux";
import {setLoader} from "../../../redux/LoaderSlices/LoaderSlices";
import Input from "../../../common/Input/Input";
import toast from "react-hot-toast";
import InputPassword from "../../../common/InputPassword/InputPassword";
import PhoneInput from "react-phone-input-2";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import {useFormik} from "formik";
import InputImageUpload from "../../../common/InputImageUpload/InputImageUpload";

// validation

const validationSchema = Yup.object({
  FirstName: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("First name is required"),
  LastName: Yup.string()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("Last name is required"),
  Email: Yup.string().email("Invalid email").required("Email is required"),
  Password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  Phone: Yup.string()
    .min(10, "Enter a valid phone number")
    .required("Phone number is required"),
  ConfirmPassword: Yup.string()
    .oneOf([Yup.ref("Password"), null], "Passwords must match")
    .required("Confirm password is required"),

  profileImage: Yup.mixed().nullable().required("Profile image is required"),
});
// validation

const Admin = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isAdmindata, setIsAdmindata] = React.useState([]);
  const [IsEdit, setIsEdit] = React.useState(null);
  console.log("isEdit ?????????????", IsEdit?.Email ?? "no data");

  const dispatch = useDispatch();
  // fetch admin

  const formik = useFormik({
    initialValues: {
      FirstName: IsEdit ? IsEdit.FirstName || "" : "",
      LastName: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
      profileImage: null,
      Phone: "",
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        handleSubmit(values);
        setIsEdit(null);
        formik.resetForm();
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  const fetchadmin = async () => {
    try {
      const response = await fetchadminapicall();

      if (response.success) {
        setIsAdmindata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleEdit = (value) => {
    setIsEdit(value);
    setIsModalOpen(true);
  };
  // create admin
  const handleSubmit = async (value) => {
    try {
      dispatch(setLoader(true));
      const response = await createadminapicall(value);

      if (response.success) {
        dispatch(setLoader(false));
        toast.success(response?.message);
        fetchadmin();
        setIsModalOpen(false);
      } else {
        fetchadmin();
        dispatch(setLoader(false));
        toast.error(response?.message);
        setIsModalOpen(false);
      }
    } catch (error) {
      dispatch(setLoader(false));
      toast.error(error?.response?.data?.message);
      setIsModalOpen(false);
    }
  };
  useEffect(() => {
    fetchadmin();
  }, [0]);
  return (
    <LayoutDesign>
      <BreadCrumb pageName="Admin" />
      <Button
        onClick={() => setIsModalOpen(true)}
        startIcon={<AddIcon />}
        sx={{
          background: "#6560f0",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
      >
        Add Admin
      </Button>
      {/* {isModalOpen ? (
          <TModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            // title={"Add Admin"}
            title={"add Admin"}
          >
            <AdminForm
              IsEdit={IsEdit}
              setIsEdit={setIsEdit}
              handleSubmit={handleSubmit}
            />
        </TModal>
      ) : null} */}
      {isModalOpen && (
        <>
          <TModal
            open={isModalOpen}
            onClose={() => {
              setIsEdit(null);
              setIsModalOpen(false);
            }}
            title={IsEdit ? "Edit Admin" : "Add Admin"}
          >
            <Container maxWidth="md">
              <Box>
                <form onSubmit={formik.handleSubmit}>
                  <Grid2 Container spacing={4}>
                    <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                      <InputImageUpload
                        name={"profileImage"}
                        value={formik.values.profileImage}
                        onChange={(file) =>
                          formik.setFieldValue("profileImage", file)
                        }
                      />
                      {formik.touched.profileImage &&
                        formik.errors.profileImage && (
                          <div style={{color: "red"}}>
                            {formik.errors.profileImage}
                          </div>
                        )}
                    </Grid2>
                    <Grid2 size={{sm: 12, md: 6, xs: 12}} sx={{mt: 3}}>
                      <Input
                        style={{width: "100%"}}
                        placeholder={"Please Enter Your First Name"}
                        labelText={"First Name"}
                        name={"FirstName"}
                        {...formik.getFieldProps("FirstName")}
                      />

                      {formik.touched.FirstName && formik.errors.FirstName && (
                        <div style={{color: "red"}}>
                          {formik.errors.FirstName}
                        </div>
                      )}
                    </Grid2>
                    <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                      <Input
                        style={{width: "100%"}}
                        placeholder={"please Enter Your Last Name"}
                        labelText={"LastName"}
                        {...formik.getFieldProps("LastName")}
                      />
                      {formik.touched.LastName && formik.errors.LastName && (
                        <div style={{color: "red"}}>
                          {formik.errors.LastName}
                        </div>
                      )}
                    </Grid2>
                    <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                      <Input
                        style={{width: "100%"}}
                        type={"Email"}
                        placeholder={"please Enter Your Last Name"}
                        labelText={"Email"}
                        {...formik.getFieldProps("Email")}
                      />
                      {formik.touched.Email && formik.errors.Email && (
                        <div style={{color: "red"}}>{formik.errors.Email}</div>
                      )}
                    </Grid2>
                    {IsEdit === null && (
                      <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                        <InputPassword
                          type={"password"}
                          placeholder="Please Enter your password"
                          labelText={"Password"}
                          {...formik.getFieldProps("Password")}
                          style={{width: "100%"}}
                        />
                        {formik.touched.Password && formik.errors.Password && (
                          <div style={{color: "red"}}>
                            {formik.errors.Password}
                          </div>
                        )}
                      </Grid2>
                    )}

                    {IsEdit === null && (
                      <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                        <InputPassword
                          type={"password"}
                          placeholder="Please Enter Confirm password"
                          labelText={"Confirm Password"}
                          {...formik.getFieldProps("ConfirmPassword")}
                          style={{width: "100%"}}
                        />
                        {formik.touched.ConfirmPassword &&
                          formik.errors.ConfirmPassword && (
                            <div style={{color: "red"}}>
                              {formik.errors.ConfirmPassword}
                            </div>
                          )}
                      </Grid2>
                    )}
                    <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                      <label
                        htmlFor="phone-input"
                        style={{
                          display: "block",
                          marginBottom: "6px",
                          color: "#86919b",
                          fontWeight: "500",
                        }}
                      >
                        Phone Number
                      </label>

                      <PhoneInput
                        inputStyle={{width: "100%"}}
                        country={"in"}
                        style={{width: "100%"}}
                        onChange={(value) =>
                          formik.setFieldValue("Phone", value)
                        }
                        onBlur={() => formik.setFieldTouched("Phone", true)}
                      />

                      {formik.touched.Phone && formik.errors.Phone && (
                        <div style={{color: "red", font: "14px"}}>
                          {formik.errors.Phone}
                        </div>
                      )}
                    </Grid2>

                    <Grid2 size={{sm: 12, xs: 12, md: 6}} sx={{mt: 3}}>
                      <Button
                        type="submit"
                        sx={{
                          background: "#6560f0",
                          color: "white",
                          width: "100%",
                        }}
                      >
                        submit
                      </Button>
                    </Grid2>
                  </Grid2>
                </form>
              </Box>
            </Container>
          </TModal>
        </>
      )}

      <UserList handleEdit={handleEdit} users={isAdmindata} />
    </LayoutDesign>
  );
};

export default Admin;
