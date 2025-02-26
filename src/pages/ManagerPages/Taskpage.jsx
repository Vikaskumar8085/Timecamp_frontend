import React, {useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {Button, Drawer} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Taskpage = () => {
  const [IsOpen, setIsOpen] = useState(false);
  // const formik = useFormik({
  //   initialValues: {
  //     ProjectId: "",
  //     StaffId: "",
  //     MilestoneId: "",
  //     Task_Name: "",
  //     StartDate: "",
  //     EndDate: "",
  //     Estimated_Time: "",
  //     Priority: "",
  //     Task_Description: "",
  //     Attachment: null,
  //     Resource_Id: "",
  //   },

  //   onSubmit: async (values) => {
  //     console.log(values, "?/////////////");
  //     const formData = new FormData();
  //     formData.append("MilestoneId", values.MilestoneId);
  //     formData.append("Task_Name", values.Task_Name);
  //     formData.append("StartDate", values.StartDate);
  //     formData.append("ProjectId", values.ProjectId);
  //     formData.append("EndDate", values.EndDate);
  //     formData.append("Estimated_Time", values.Estimated_Time);
  //     formData.append("Priority", values.Priority);
  //     formData.append("Task_Description", values.Task_Description);
  //     formData.append("file", values.Attachment);
  //     formData.append("Resource_Id", values.Resource_Id);
  //     TaskHandlesubmit(formData);

  //     formik.resetForm();
  //   },
  // });
  return (
    <Layout>
      <BreadCrumb pageName=" Manager Task" />
      <Button
        startIcon={<AddIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsOpen(true)}
      >
        Create Task
      </Button>

      {IsOpen && (
        <Drawer open={IsOpen} anchor="right" onClose={() => setIsOpen(false)}>
          task creation page
        </Drawer>
      )}
    </Layout>
  );
};

export default Taskpage;
