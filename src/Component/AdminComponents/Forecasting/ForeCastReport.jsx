import {
  Button,
  FormControl,
  Grid2,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, {useState, useEffect} from "react";
import {useFormik} from "formik";
import {fetchroleapicall} from "../../../ApiServices/MasterApiServices/Roles";
import {fetchdesignationapicall} from "../../../ApiServices/MasterApiServices/Designation";

const ForeCastReport = () => {
  const [isroledata, setisroledata] = useState([]);
  const [isdesignationdata, setisdesignationdata] = useState([]);

  const getroledata = async () => {
    try {
      const response = await fetchroleapicall();
      if (response.success) {
        setisroledata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const fetchDesignationfunc = async () => {
    try {
      const response = await fetchdesignationapicall();
      if (response?.success) {
        setisdesignationdata(response?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getroledata();
    fetchDesignationfunc();
  }, []);

  const formik = useFormik({
    initialValues: {
      Enquiry_Name: "",
      Estimate_Dev_Hours: "",
      Period_Days: "",
      Start_Date: "",
      RoleId: "",
      DesignationId: "",
      Min_Exp: "",
      Max_Exp: "",
      Number_of_developer: "",
    },
    onSubmit: (values) => {
      console.log("Submitted Values:", values);
      // You can call your API here
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid2 component={Paper} sx={{p: 3}} container spacing={2}>
        <Grid2
          sx={{background: "#2c3e50", p: 2, color: "white"}}
          size={{lg: 12, md: 12, sm: 12, xs: 12}}
        >
          <Typography>Project Forecast</Typography>
        </Grid2>

        <Grid2 size={{md: 4, sm: 12, xs: 12}}>
          <TextField
            fullWidth
            margin="normal"
            label="Enquiry Name"
            name="Enquiry_Name"
            value={formik.values.Enquiry_Name}
            onChange={formik.handleChange}
          />
        </Grid2>
        <Grid2 size={{md: 4, sm: 12, xs: 12}}>
          <TextField
            fullWidth
            margin="normal"
            label="Estimate Development Hours"
            name="Estimate_Dev_Hours"
            value={formik.values.Estimate_Dev_Hours}
            onChange={formik.handleChange}
          />
        </Grid2>
        <Grid2 size={{md: 4, sm: 12, xs: 12}}>
          <TextField
            fullWidth
            type="number"
            margin="normal"
            label="Period Days"
            name="Period_Days"
            value={formik.values.Period_Days}
            onChange={formik.handleChange}
          />
        </Grid2>
        <Grid2 size={{md: 4, sm: 12, xs: 12}}>
          <TextField
            fullWidth
            type="date"
            margin="normal"
            InputLabelProps={{shrink: true}}
            label="Start Date"
            name="Start_Date"
            value={formik.values.Start_Date}
            onChange={formik.handleChange}
          />
        </Grid2>

        <Grid2
          sx={{background: "#2c3e50", p: 2, color: "white"}}
          size={{md: 12, lg: 12, sm: 12, xs: 12}}
        >
          <Typography> Resource Requirements</Typography>
        </Grid2>

        <Grid2 size={{md: 4, sm: 12, xs: 12}}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="Role-select-label">Select Role</InputLabel>
            <Select
              labelId="Role-select-label"
              id="Role-select"
              name="RoleId"
              value={formik.values.RoleId}
              onChange={formik.handleChange}
              label="Select Role"
            >
              {isroledata.map((item) => (
                <MenuItem key={item.RoleId} value={item.RoleId}>
                  <ListItemText primary={item.RoleName} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={{md: 4, sm: 12, xs: 12}}>
          <FormControl fullWidth margin="normal">
            <InputLabel id="Designation-select-label">
              Select Designation
            </InputLabel>
            <Select
              labelId="Designation-select-label"
              id="Designation-select"
              name="DesignationId"
              value={formik.values.DesignationId}
              onChange={formik.handleChange}
              label="Select Designation"
            >
              {isdesignationdata.map((item) => (
                <MenuItem key={item.Designation_Id} value={item.Designation_Id}>
                  <ListItemText primary={item.Designation_Name} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={{md: 4, sm: 12, xs: 12}}>
          <TextField
            fullWidth
            type="number"
            margin="normal"
            label="Min Experience (Years)"
            name="Min_Exp"
            value={formik.values.Min_Exp}
            onChange={formik.handleChange}
          />
        </Grid2>

        <Grid2 size={{md: 4, sm: 12, xs: 12}}>
          <TextField
            fullWidth
            type="number"
            margin="normal"
            label="Max Experience (Years)"
            name="Max_Exp"
            value={formik.values.Max_Exp}
            onChange={formik.handleChange}
          />
        </Grid2>

        <Grid2 size={{md: 4, sm: 12, xs: 12}}>
          <TextField
            fullWidth
            type="number"
            margin="normal"
            label="Number of Developer"
            name="Number_of_developer"
            value={formik.values.Number_of_developer}
            onChange={formik.handleChange}
          />
        </Grid2>

        <Grid2 size={{lg: 12, md: 12, sm: 12, xs: 12}}>
          <Button
            type="submit"
            sx={{background: "#2c3e50", color: "white"}}
            fullWidth
          >
            Submit
          </Button>
        </Grid2>
      </Grid2>
    </form>
  );
};

export default ForeCastReport;
