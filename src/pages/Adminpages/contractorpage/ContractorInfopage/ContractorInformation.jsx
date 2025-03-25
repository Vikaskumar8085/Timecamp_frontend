import {
  Typography,
  Avatar,
  Card,
  CardContent,
  CircularProgress,
  Chip,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
} from "@mui/material";
import React from "react";

const ContractorInformation = ({isContractordata, iscontractorprojectdata}) => {
  //

  const contractorprojectdata = (
    <>
      <Box sx={{mt: 3}}>
        <h1>Contractor Project</h1>
      </Box>
      {iscontractorprojectdata.ContractorProject &&
      iscontractorprojectdata.ContractorProject.length > 0 ? (
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Project Code</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {iscontractorprojectdata.ContractorProject.map(
                (project, index) => (
                  <TableRow key={project.ProjectId}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{project.Project_Name}</TableCell>
                    <TableCell>{project.Project_Code}</TableCell>
                    <TableCell>{project.Project_Type}</TableCell>
                    <TableCell>
                      {project.Project_Status ? "Active" : "Inactive"}
                    </TableCell>
                    <TableCell>{project.Start_Date}</TableCell>
                    <TableCell>{project.End_Date}</TableCell>
                  </TableRow>
                )
              )}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Typography variant="body2">{null}</Typography>
      )}
    </>
  );
  const ContractorManagerprojects = (
    <>
      <Box sx={{mt: 3}}>
        <h1>Contractor Manager Project</h1>
      </Box>
      {iscontractorprojectdata.ManagerProject &&
      iscontractorprojectdata.ManagerProject.length > 0 ? (
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table>
            <TableBody>
              {iscontractorprojectdata.ManagerProject.map((project, index) => (
                <TableRow key={project.ProjectId}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{project.Project_Name}</TableCell>
                  <TableCell>{project.Project_Code}</TableCell>
                  <TableCell>{project.Project_Type}</TableCell>
                  <TableCell>
                    {project.Project_Status ? "Active" : "Inactive"}
                  </TableCell>
                  <TableCell>{project.Start_Date}</TableCell>
                  <TableCell>{project.End_Date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        ""
      )}
    </>
  );
  return (
    <>
      <Card
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 2,
        }}
      >
        {/* Profile Avatar */}
        <Avatar
          src={isContractordata.Photos?.[0]}
          alt={isContractordata.FirstName}
          sx={{width: 80, height: 80}}
        />
        {/* Employee Info */}
        <CardContent sx={{flex: 1}}>
          <Typography variant="h6" fontWeight="bold">
            {isContractordata.FirstName} {isContractordata.LastName}
          </Typography>
          <Chip
            label={isContractordata.IsActive}
            color={isContractordata.IsActive === "Active" ? "success" : "error"}
            sx={{mt: 1}}
          />
          <Typography variant="body2" color="text.secondary">
            📞 {isContractordata.Phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ✉️ {isContractordata.Email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🏠 {isContractordata.Address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🗓 Joining Date:{" "}
            {isContractordata.Joining_Date === "Invalid date"
              ? "Not Available"
              : isContractordata.Joining_Date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🎭 Role: {isContractordata.Role}
          </Typography>

          {/* Social Link */}
          {isContractordata.Socail_Links && (
            <Typography variant="body2" color="primary" sx={{mt: 1}}>
              🔗{" "}
              <Link
                href={isContractordata.Socail_Links}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </Link>
            </Typography>
          )}
        </CardContent>
      </Card>
      <div>{contractorprojectdata}</div>
      <div>{ContractorManagerprojects}</div>
    </>
  );
};

export default ContractorInformation;
