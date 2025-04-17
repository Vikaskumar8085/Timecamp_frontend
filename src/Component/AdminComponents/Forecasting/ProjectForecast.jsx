import React, {useState} from "react";
import {
  Typography,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Button,
  Grid2,
} from "@mui/material";
import {useFormik} from "formik";

const quarterlyMonths = {
  Q1: ["January", "February", "March"],
  Q2: ["April", "May", "June"],
  Q3: ["July", "August", "September"],
  Q4: ["October", "November", "December"],
};

const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const quarterOptions = Object.entries(quarterlyMonths).map(
  ([quarter, months]) => ({
    label: `${quarter} (${months.join(", ")})`,
    value: quarter,
  })
);

const ProjectForecast = () => {
  const [filterType, setFilterType] = useState("quarterly");

  const formik = useFormik({
    initialValues: {
      startPeriod: "",
      endPeriod: "",
    },
    onSubmit: (values) => {
      console.log("Form submitted:", values);
    },
  });

  const renderPeriodOptions = () => {
    if (filterType === "quarterly") {
      return quarterOptions.map((q) => (
        <MenuItem key={q.value} value={q.value}>
          {q.label}
        </MenuItem>
      ));
    }
    return allMonths.map((month) => (
      <MenuItem key={month} value={month}>
        {month}
      </MenuItem>
    ));
  };

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Grid2 component={Paper} sx={{p: 3}} container spacing={2}>
          <Grid2
            sx={{background: "#2c3e50", p: 2, color: "white"}}
            size={{lg: 12, md: 12, sm: 12, xs: 12}}
          >
            <Typography>Project Forecast</Typography>
          </Grid2>

          <Grid2 size={{lg: 6, sm: 12, xs: 12, md: 6}}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="filter-type-label">Filter Type</InputLabel>
              <Select
                labelId="filter-type-label"
                value={filterType}
                label="Filter Type"
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="quarterly">Quarterly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={{lg: 6, sm: 12, xs: 12, md: 6}}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="start-period-label">
                {filterType === "quarterly" ? "Start Quarter" : "Start Month"}
              </InputLabel>
              <Select
                labelId="start-period-label"
                name="startPeriod"
                value={formik.values.startPeriod}
                onChange={formik.handleChange}
                label={
                  filterType === "quarterly" ? "Start Quarter" : "Start Month"
                }
              >
                {renderPeriodOptions()}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={{lg: 6, sm: 12, xs: 12, md: 6}}>
            <FormControl fullWidth margin="normal">
              <InputLabel id="end-period-label">
                {filterType === "quarterly" ? "End Quarter" : "End Month"}
              </InputLabel>
              <Select
                labelId="end-period-label"
                name="endPeriod"
                value={formik.values.endPeriod}
                onChange={formik.handleChange}
                label={filterType === "quarterly" ? "End Quarter" : "End Month"}
              >
                {renderPeriodOptions()}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={{lg: 12, md: 12}}>
            <Button type="submit" variant="contained" sx={{mt: 2}}>
              Submit
            </Button>
          </Grid2>
        </Grid2>
      </form>

      <Grid2 sx={{mt: 2}} container spacing={2}>
        <Grid2 size={{lg: 6, md: 6, sm: 12, xs: 12}}>
          <Paper>1</Paper>
        </Grid2>
        <Grid2 size={{lg: 6, md: 6, sm: 12, xs: 12}}>
          <Paper>1</Paper>
        </Grid2>
      </Grid2>
    </>
  );
};

export default ProjectForecast;
