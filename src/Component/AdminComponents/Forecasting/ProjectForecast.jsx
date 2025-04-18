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

// router
// routes/quarter.js
// const express = require('express');
// const router  = express.Router();
// const { ensureAuth } = require('../middleware/auth');
// const quarterCtrl    = require('../controllers/quarterController');

// router
//   .route('/')
//   .get( ensureAuth, quarterCtrl.getQuarterForm )
//   .post( ensureAuth, quarterCtrl.postQuarterForm );

// module.exports = router;

// controller

// // controllers/quarterController.js
// const {DateTime} = require("luxon");
// const Company = require("../models/Company");
// const Project = require("../models/Project");
// const ProjectRole = require("../models/ProjectRole");
// const Employee = require("../models/Employee");

// const expectedNewOnboard = 5;

// exports.getQuarterForm = async (req, res, next) => {
//   try {
//     res.render("quarter_projects", {
//       formData: {},
//       benchCount: 0,
//       expectedCompleteCount: 0,
//       expectedNewOnboard,
//       projects: [],
//       months: "",
//     });
//   } catch (err) {
//     next(err);
//   }
// };

// exports.postQuarterForm = async (req, res, next) => {
//   try {
//     // 1. Find company for the logged‑in user
//     const company = await Company.findOne({user_for: req.user._id});
//     if (!company) throw new Error("No company found for this user.");

//     // 2. Determine quarter, months, and date range
//     const {quarter} = req.body;
//     const today = DateTime.local().startOf("day");
//     const year = today.year;

//     let months, startDate, endDate;
//     switch (quarter) {
//       case "Q1":
//         months = ["January", "February", "March"];
//         startDate = DateTime.local(year, 1, 1);
//         endDate = DateTime.local(year, 3, 31);
//         break;
//       case "Q2":
//         months = ["April", "May", "June"];
//         startDate = DateTime.local(year, 4, 1);
//         endDate = DateTime.local(year, 6, 30);
//         break;
//       case "Q3":
//         months = ["July", "August", "September"];
//         startDate = DateTime.local(year, 7, 1);
//         endDate = DateTime.local(year, 9, 30);
//         break;
//       case "Q4":
//         months = ["October", "November", "December"];
//         startDate = DateTime.local(year, 10, 1);
//         endDate = DateTime.local(year, 12, 31);
//         break;
//       default:
//         throw new Error("Invalid quarter selected.");
//     }

//     // 3. Fetch all projects ending in that quarter for this company
//     const projects = await Project.find({
//       company,
//       end_date: {
//         $gte: startDate.toJSDate(),
//         $lte: endDate.toJSDate(),
//       },
//     });

//     // 4. Find all project IDs whose end_date ≥ quarter start
//     const ongoingProjectIds = await Project.find({
//       company,
//       end_date: {$gte: startDate.toJSDate()},
//     }).distinct("_id");

//     // 5. Find all employees assigned to those projects
//     const assignedEmployeeIds = await ProjectRole.find({
//       company_name: company,
//       project: {$in: ongoingProjectIds},
//     }).distinct("employee");

//     // 6. Bench = employees in company not in assignedEmployeeIds
//     const benchCount = await Employee.countDocuments({
//       company_name: company,
//       _id: {$nin: assignedEmployeeIds},
//     });

//     // 7. Expected completed = projects that have started and not yet ended as of today
//     const expectedCompleteCount = await Project.countDocuments({
//       company,
//       start_date: {$lte: today.toJSDate()},
//       end_date: {$gte: today.toJSDate()},
//     });

//     // 8. Render with the same template
//     res.render("quarter_projects", {
//       formData: {quarter},
//       benchCount,
//       expectedCompleteCount,
//       expectedNewOnboard,
//       projects,
//       months: months.join(", "),
//     });
//   } catch (err) {
//     // In case of validation errors, you can flash them:
//     req.flash("error", err.message);
//     return this.getQuarterForm(req, res, next);
//   }
// };

// <!-- views/quarter_projects.ejs -->
// <!DOCTYPE html>
// <html>
// <head>
//   <title>Quarterly Projects</title>
// </head>
// <body>
//   <% if (messages.error) { %>
//     <div class="errors"><%= messages.error %></div>
//   <% } %>

//   <form action="" method="POST">
//     <label>
//       Select Quarter:
//       <select name="quarter">
//         <option value="Q1" <%= formData.quarter==='Q1'?'selected':'' %>>Q1</option>
//         <option value="Q2" <%= formData.quarter==='Q2'?'selected':'' %>>Q2</option>
//         <option value="Q3" <%= formData.quarter==='Q3'?'selected':'' %>>Q3</option>
//         <option value="Q4" <%= formData.quarter==='Q4'?'selected':'' %>>Q4</option>
//       </select>
//     </label>
//     <button type="submit">Show</button>
//   </form>

//   <h3>Months: <%= months %></h3>
//   <p>Bench Count: <%= benchCount %></p>
//   <p>Expected Complete: <%= expectedCompleteCount %></p>
//   <p>Expected New Onboard: <%= expectedNewOnboard %></p>

//   <h4>Projects in <%= formData.quarter || '—' %>:</h4>
//   <ul>
//     <% projects.forEach(p => { %>
//       <li><%= p.name %> (ends <%= p.end_date.toDateString() %>)</li>
//     <% }) %>
//   </ul>
// </body>
// </html>
