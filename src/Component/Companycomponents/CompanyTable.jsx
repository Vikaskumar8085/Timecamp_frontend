import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid2,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  Link,
} from "@mui/material";
import BusinessIcon from "@mui/icons-material/Business";

// Function to handle null values
const getValue = (value) => value || "No data available";
function CompanyTable({company}) {
  return (
    <>
      <Box p={3}>
        {/* Grid View (Company Card) */}
        <Card sx={{p: 3, borderRadius: 4, boxShadow: 3, mb: 4}}>
          <CardContent>
            <Grid2 container spacing={3} alignItems="center">
              {/* Logo */}
              <Grid2 xs={12} sm={4} display="flex" justifyContent="center">
                <Avatar
                  src={
                    company.Company_Logo || "https://via.placeholder.com/100"
                  }
                  alt={company.Company_Name}
                  sx={{width: 100, height: 100}}
                />
              </Grid2>
              {/* Company Info */}
              <Grid2 xs={12} sm={8}>
                <Typography variant="h5" fontWeight="bold">
                  {getValue(company.Company_Name)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {getValue(company.Address)}, {getValue(company.Postal_Code)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📞 {getValue(company.Phone)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📧 {getValue(company.Company_Email)}
                </Typography>
                <Typography variant="body2">
                  🌐{" "}
                  <Link
                    href={company.CompanyWesite}
                    target="_blank"
                    rel="noopener"
                  >
                    {getValue(company.CompanyWesite)}
                  </Link>
                </Typography>
              </Grid2>
            </Grid2>
          </CardContent>
        </Card>

        {/* Table View */}
        <TableContainer component={Paper} sx={{borderRadius: 4, boxShadow: 3}}>
          <Table>
            <TableHead>
              <TableRow sx={{backgroundColor: "#f5f5f5"}}>
                <TableCell>
                  <BusinessIcon sx={{verticalAlign: "middle"}} /> Company
                  Details
                </TableCell>
                <TableCell>Information</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>Company Name</TableCell>
                <TableCell>{getValue(company.Company_Name)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Email</TableCell>
                <TableCell>{getValue(company.Company_Email)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Address</TableCell>
                <TableCell>{getValue(company.Address)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Postal Code</TableCell>
                <TableCell>{getValue(company.Postal_Code)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Phone</TableCell>
                <TableCell>{getValue(company.Phone)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Number of Employees</TableCell>
                <TableCell>{getValue(company.Employee_No)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Established Date</TableCell>
                <TableCell>{getValue(company.Established_date)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Website</TableCell>
                <TableCell>
                  <Link
                    href={company.CompanyWesite}
                    target="_blank"
                    rel="noopener"
                  >
                    {getValue(company.CompanyWesite)}
                  </Link>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Tax Number</TableCell>
                <TableCell>{getValue(company.Tex_Number)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default React.memo(CompanyTable);
