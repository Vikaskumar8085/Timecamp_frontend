import React, {useEffect, useState} from "react";
import {fetchContractorprojectsapicall} from "../../ApiServices/ContractorApiServices/ContractorApiServices";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";
const ContractorProject = () => {
  const [IsContractorProjectdata, setIsContractorProjectdata] = useState([]);

  const fetchcontractorprojectfunc = async () => {
    try {
      const response = await fetchContractorprojectsapicall();
      if (response.success) {
        setIsContractorProjectdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractorprojectfunc();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Contractor Project" />

      <TableContainer component={Paper} sx={{mt: 3}}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="left">Id</TableCell>
              <TableCell align="left">Project Name</TableCell>
              <TableCell align="left">Project Code</TableCell>
              <TableCell align="left">Project status</TableCell>
              <TableCell align="left">Project Type</TableCell>
              <TableCell align="left">Start Date</TableCell>
              <TableCell align="left">End Date</TableCell>
              <TableCell align="left">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {IsContractorProjectdata?.response?.map((item, index) => {
              return (
                <>
                  <TableRow key={item._id}>
                    <TableCell>{item.Project_Name}</TableCell>
                    <TableCell>{item.Project_Code}</TableCell>
                    <TableCell>
                      {item.Project_Status ? "Active" : "InActive"}
                    </TableCell>
                    <TableCell>{item.Project_Type}</TableCell>
                    <TableCell>
                      {new Date(item.Start_Date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(item.End_Date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link to={`/client/client-pageinfo/${item.ProjectId}`}>
                        view
                      </Link>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
            {IsContractorProjectdata?.contractorProjects?.map((item, index) => {
              return (
                <>
                  <TableRow key={item._id}>
                    <TableCell>{item.Project_Name}</TableCell>
                    <TableCell>{item.Project_Code}</TableCell>
                    <TableCell>{item.Project_Status}</TableCell>
                    <TableCell>{item.Project_Type}</TableCell>
                    <TableCell>
                      {new Date(item.Start_Date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      {new Date(item.End_Date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`/employee/employee-project-info/${item.ProjectId}`}
                      >
                        view
                      </Link>
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default ContractorProject;
