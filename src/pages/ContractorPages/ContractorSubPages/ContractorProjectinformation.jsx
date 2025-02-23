import React, { useEffect, useState } from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { fetchcontractorprojectinformationapicall } from "../../../ApiServices/ContractorApiServices/ContractorApiServices";
import { Card, CardContent, Typography, Grid, Chip, Box } from "@mui/material";
import toast from "react-hot-toast";

const ContractorProjectinformation = ({ id }) => {
  const [IsprojectInfodata, setIsprojectInfodata] = useState([]);

  const fetchcontractorprojectinfofunc = async () => {
    try {
      const response = await fetchcontractorprojectinformationapicall(id);
      if (response.success) {
        setIsprojectInfodata(response.result);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong");
    }
  };

  useEffect(() => {
    fetchcontractorprojectinfofunc();
  }, [0]);

  const content = IsprojectInfodata.map((project, index) => {
    return (
      <>
        <Card sx={{ maxWidth: 600, m: 2, p: 2, boxShadow: 3, borderRadius: 2 }}>
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
      <BreadCrumb pageName="Contractor Project information" />
      {content}
    </>
  );
};

export default ContractorProjectinformation;
