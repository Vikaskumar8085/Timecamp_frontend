import React, {useEffect, useState} from "react";
import {Card, CardContent, Typography, Grid, Chip, Box} from "@mui/material";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {fetchemployeeprojectinformationapicall} from "../../../ApiServices/EmployeeApiservices/Employee";
const EmployeeProjectInformation = ({id}) => {
  const [
    IsEmployeeProjectInformationdata,
    setIsEmployeeProjectInformationdata,
  ] = useState([]);

  const fetchEmployeeprojectinfofunc = async () => {
    try {
      const response = await fetchemployeeprojectinformationapicall(id);
      if (response.success) {
        setIsEmployeeProjectInformationdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchEmployeeprojectinfofunc();
  }, [0]);

  const content = IsEmployeeProjectInformationdata.map((project, index) => {
    return (
      <>
        <Card sx={{maxWidth: 600, m: 2, p: 2, boxShadow: 3, borderRadius: 2}}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              {project.Project_Name} ({project.Project_Code})
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              Type: {project.Project_Type}
            </Typography>
            <Typography variant="body1" mt={1}>
              <strong>Manager:</strong> {project.Manager_Name}
            </Typography>

            <Typography variant="body1">
              <strong>Project Hours:</strong> {project.Project_Hours} hrs
            </Typography>
            <Typography variant="body1">
              <strong>Status:</strong>{" "}
              {project.Project_Status ? "Active" : "Inactive"}
            </Typography>
            <Typography variant="body1">
              <strong>Start Date:</strong> {project.Start_Date}
            </Typography>
            <Typography variant="body1">
              <strong>End Date:</strong> {project.End_Date}
            </Typography>

            <Box mt={2}>
              <Typography variant="body1" fontWeight="bold">
                Team Members:
              </Typography>
              <Box mt={1} display="flex" gap={1} flexWrap="wrap">
                {project.Team.map((member, index) => (
                  <Chip
                    key={index}
                    label={member}
                    color="primary"
                    variant="outlined"
                  />
                ))}
              </Box>
            </Box>
          </CardContent>
        </Card>
      </>
    );
  });

  return (
    <>
      <BreadCrumb pageName="Employee Project Information" />
      {content}
    </>
  );
};

export default EmployeeProjectInformation;
