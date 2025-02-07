import {useFormik} from "formik";
import React from "react";

const AddDepartment = () => {
  const formik = useFormik({
    initialValues: {
      Department_Name: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await createdepartmentapicall(values);
        if (response.success) {
          setIsModalOpen(false);
        }
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  return (
    <div>
      <Container maxWidth="sm">
        <form onSubmit={formik.handleSubmit}>
          <br />
          <TextField
            label="Department Name"
            variant="outlined"
            type="text"
            sx={{width: "100%"}}
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
      </Container>
    </div>
  );
};

export default AddDepartment;
