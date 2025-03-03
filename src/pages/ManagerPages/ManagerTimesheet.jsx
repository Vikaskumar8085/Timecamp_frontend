import React, {useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {useFormik} from "formik";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Drawer,
  Container,
  Typography,
  Grid,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import {Add, Remove} from "@mui/icons-material";

const ManagerTimesheet = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const formik = useFormik({
    initialValues: {
      entries: [
        {
          ProjectId: "",
          hours: "",
          fileattachment: null,
          date: "",
          Task_description: "",
          Description: "",
        },
      ],
    },
    validationSchema: Yup.object({
      entries: Yup.array().of(
        Yup.object({
          ProjectId: Yup.string().required("Project ID is required"),
          hours: Yup.number()
            .required("Hours are required")
            .positive("Must be positive"),
          date: Yup.date().required("Date is required"),
          Task_description: Yup.string().required(
            "Task description is required"
          ),
          Description: Yup.string().required("Description is required"),
        })
      ),
    }),
    onSubmit: (values) => {
      console.log("Final Submission:", values);
    },
  });

  const handleAddEntry = () => {
    formik.setValues({
      ...formik.values,
      entries: [
        ...formik.values.entries,
        {
          ProjectId: "",
          hours: "",
          fileattachment: null,
          date: "",
          Task_description: "",
          Description: "",
        },
      ],
    });
  };

  const handleRemoveEntry = (index) => {
    const updatedEntries = formik.values.entries.filter((_, i) => i !== index);
    formik.setValues({...formik.values, entries: updatedEntries});
  };

  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };

  return (
    <Layout>
      <BreadCrumb pageName="ManagerTimesheet" />
      <Button onClick={() => setIsOpen(true)}>Fill Timesheet</Button>

      {IsOpen && (
        <Drawer open={IsOpen} onClose={() => setIsOpen(false)} anchor="right">
          <Container maxWidth="md" sx={{p: 3}}>
            <Typography variant="h5" gutterBottom>
              Multi-Add Form
            </Typography>
            <form onSubmit={formik.handleSubmit}>
              <Grid container spacing={2}>
                {formik.values.entries.map((entry, index) => (
                  <Grid item xs={12} key={index}>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12}>
                        <FormControl fullWidth>
                          <InputLabel>Project ID</InputLabel>
                          <Select
                            name={`entries[${index}].ProjectId`}
                            value={entry.ProjectId}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                              formik.touched.entries?.[index]?.ProjectId &&
                              Boolean(formik.errors.entries?.[index]?.ProjectId)
                            }
                          >
                            <MenuItem value="Project1">Project 1</MenuItem>
                            <MenuItem value="Project2">Project 2</MenuItem>
                            <MenuItem value="Project3">Project 3</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Hours"
                          type="number"
                          name={`entries[${index}].hours`}
                          value={entry.hours}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.entries?.[index]?.hours &&
                            Boolean(formik.errors.entries?.[index]?.hours)
                          }
                          helperText={
                            formik.touched.entries?.[index]?.hours &&
                            formik.errors.entries?.[index]?.hours
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          type="date"
                          label="Date"
                          InputLabelProps={{shrink: true}}
                          name={`entries[${index}].date`}
                          value={entry.date}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.entries?.[index]?.date &&
                            Boolean(formik.errors.entries?.[index]?.date)
                          }
                          helperText={
                            formik.touched.entries?.[index]?.date &&
                            formik.errors.entries?.[index]?.date
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Task Description"
                          name={`entries[${index}].Task_description`}
                          value={entry.Task_description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.entries?.[index]?.Task_description &&
                            Boolean(
                              formik.errors.entries?.[index]?.Task_description
                            )
                          }
                          helperText={
                            formik.touched.entries?.[index]?.Task_description &&
                            formik.errors.entries?.[index]?.Task_description
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          label="Description"
                          name={`entries[${index}].Description`}
                          value={entry.Description}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                          error={
                            formik.touched.entries?.[index]?.Description &&
                            Boolean(formik.errors.entries?.[index]?.Description)
                          }
                          helperText={
                            formik.touched.entries?.[index]?.Description &&
                            formik.errors.entries?.[index]?.Description
                          }
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton
                          color="error"
                          onClick={() => handleRemoveEntry(index)}
                          disabled={formik.values.entries.length === 1}
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
                    onClick={handleAddEntry}
                    startIcon={<Add />}
                  >
                    Add Entry
                  </Button>
                </Grid>
              </Grid>
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{mt: 2}}
              >
                Submit
              </Button>
            </form>
          </Container>
        </Drawer>
      )}

      {selectedItems.length > 0 ? (
        <>
          <Button>Approve</Button>
          <Button>Disapprove</Button>

          <Button
            onClick={() => SendForApprovel()}
            sx={{
              background: "#31bb62",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
          >
            Send For Approved
          </Button>
          <Button>delete selected</Button>
        </>
      ) : null}
    </Layout>
  );
};

export default ManagerTimesheet;
