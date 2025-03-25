import React from "react";
import {
  Typography,
  Avatar,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Box,
} from "@mui/material";
const Employeeinformation = ({isEmployeedata, isEmployeeprojectdata}) => {
  console.log(isEmployeedata, "/////");
  const content = (
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
          src={isEmployeedata.Photos?.[0]}
          alt={isEmployeedata.FirstName}
          sx={{width: 80, height: 80}}
        />

        {/* Employee Info */}
        <CardContent sx={{flex: 1}}>
          <Typography variant="h6" fontWeight="bold">
            {isEmployeedata.FirstName} {isEmployeedata.LastName}
          </Typography>
          <Chip
            label={isEmployeedata.IsActive}
            color={isEmployeedata.IsActive === "Active" ? "success" : "error"}
            sx={{mt: 1}}
          />
          <Typography variant="body2" color="text.secondary">
            📞 {isEmployeedata.Phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ✉️ {isEmployeedata.Email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🏠 {isEmployeedata.Address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🗓 Joining Date:{" "}
            {isEmployeedata.Joining_Date === "Invalid date"
              ? "Not Available"
              : isEmployeedata.Joining_Date}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🎭 Role: {isEmployeedata.Role}
          </Typography>

          {/* Social Link */}
          {isEmployeedata.Socail_Links && (
            <Typography variant="body2" color="primary" sx={{mt: 1}}>
              🔗{" "}
              <Link
                href={isEmployeedata.Socail_Links}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Profile
              </Link>
            </Typography>
          )}
        </CardContent>
      </Card>
    </>
  );

  const employeeprojects = (
    <>
      <Box sx={{mt: 3}}>
        <h1>Employee Project</h1>
      </Box>
      {isEmployeeprojectdata.Employeeproject &&
      isEmployeeprojectdata.Employeeproject.length > 0 ? (
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Project Code</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isEmployeeprojectdata.Employeeproject.map((project, index) => (
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
        <Typography variant="body2">{null}</Typography>
      )}
    </>
  );
  const employeeManagerprojects = (
    <>
      <Box sx={{mt: 3}}>
        <h1>Manager Project</h1>
      </Box>
      {isEmployeeprojectdata.ManagerProject &&
      isEmployeeprojectdata.ManagerProject.length > 0 ? (
        <TableContainer component={Paper} sx={{mt: 2}}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Project Code</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isEmployeeprojectdata.ManagerProject.map((project, index) => (
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
    <div>
      {content}
      {employeeprojects}
      {employeeManagerprojects}
    </div>
  );
};

export default Employeeinformation;
