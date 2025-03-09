import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Container,
  Typography,
  Grid,
  IconButton,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

const ManagerProjectMilestoneForm = ({ handleSubmitmilestone }) => {
  const formik = useFormik({
    initialValues: {
      milestones: [
        { MilestoneName: "", Description: "", StartDate: "", EndDate: "" },
      ],
    },
    validationSchema: Yup.object({
      milestones: Yup.array().of(
        Yup.object({
          MilestoneName: Yup.string().required("Milestone name is required"),
          Description: Yup.string().required("Description is required"),
          StartDate: Yup.date().required("Start date is required"),
          EndDate: Yup.date()
            .required("End date is required")
            .min(Yup.ref("StartDate"), "End date cannot be before start date"),
        })
      ),
    }),
    onSubmit: async (values) => {
      try {
        handleSubmitmilestone(values);
        console.log(values?.milestones, "vlaues");
        // formik.resetForm();
      } catch (error) {
        console.log(error?.message);
      }
    },
  });

  // Function to add a new milestone
  const handleAddMilestone = () => {
    formik.setValues({
      ...formik.values,
      milestones: [
        ...formik.values.milestones,
        { MilestoneName: "", Description: "", StartDate: "", EndDate: "" },
      ],
    });
  };

  // Function to remove a milestone
  const handleRemoveMilestone = (index) => {
    const updatedMilestones = formik.values.milestones.filter(
      (_, i) => i !== index
    );
    formik.setValues({ ...formik.values, milestones: updatedMilestones });
  };
  return (
    <>
      <Container maxWidth="md" sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Milestone Form
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {formik.values.milestones.map((milestone, index) => (
              <Grid item xs={12} key={index}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Milestone Name"
                      name={`milestones[${index}].MilestoneName`}
                      value={milestone.MilestoneName}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.milestones?.[index]?.MilestoneName &&
                        Boolean(
                          formik.errors.milestones?.[index]?.MilestoneName
                        )
                      }
                      helperText={
                        formik.touched.milestones?.[index]?.MilestoneName &&
                        formik.errors.milestones?.[index]?.MilestoneName
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="Description"
                      name={`milestones[${index}].Description`}
                      value={milestone.Description}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.milestones?.[index]?.Description &&
                        Boolean(formik.errors.milestones?.[index]?.Description)
                      }
                      helperText={
                        formik.touched.milestones?.[index]?.Description &&
                        formik.errors.milestones?.[index]?.Description
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="date"
                      label="Start Date"
                      InputLabelProps={{ shrink: true }}
                      name={`milestones[${index}].StartDate`}
                      value={milestone.StartDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.milestones?.[index]?.StartDate &&
                        Boolean(formik.errors.milestones?.[index]?.StartDate)
                      }
                      helperText={
                        formik.touched.milestones?.[index]?.StartDate &&
                        formik.errors.milestones?.[index]?.StartDate
                      }
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="date"
                      label="End Date"
                      InputLabelProps={{ shrink: true }}
                      name={`milestones[${index}].EndDate`}
                      value={milestone.EndDate}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.milestones?.[index]?.EndDate &&
                        Boolean(formik.errors.milestones?.[index]?.EndDate)
                      }
                      helperText={
                        formik.touched.milestones?.[index]?.EndDate &&
                        formik.errors.milestones?.[index]?.EndDate
                      }
                    />
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      color="error"
                      onClick={() => handleRemoveMilestone(index)}
                      disabled={formik.values.milestones.length === 1}
                    >
                      <Remove />
                    </IconButton>
                  </Grid>
                </Grid>
              </Grid>
            ))}
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleAddMilestone}
                startIcon={<Add />}
              >
                Add Milestone
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            variant="contained"
            color="success"
            sx={{ mt: 2 }}
          >
            Submit
          </Button>
        </form>
      </Container>
    </>
  );
};

export default ManagerProjectMilestoneForm;
