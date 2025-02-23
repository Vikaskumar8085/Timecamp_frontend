import React, { useEffect, useState } from "react";
import { fetchcontractortaskapicall } from "../../ApiServices/ContractorApiServices/ContractorApiServices";
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
const ContractorTasks = () => {
  const [IsContracotorTaskdata, setIsContractorTaskdata] = useState([]);
  const fetchContractorTaskfunc = async () => {
    try {
      const response = await fetchcontractortaskapicall();
      if (response.success) {
        setIsContractorTaskdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchContractorTaskfunc();
  }, [0]);

  return (
    <div>
      <Layout>
        <BreadCrumb pageName="Contractor Task" />
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Typography variant="h6" sx={{ p: 2 }}>
            Task List
          </Typography>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Id</TableCell>
                <TableCell>Task Name</TableCell>
                <TableCell>Project Name</TableCell>
                <TableCell>Milestone</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Start Date</TableCell>
                <TableCell>End Date</TableCell>
                <TableCell>Resource Name</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Attachment</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {IsContracotorTaskdata.map((task, index) => (
                <TableRow key={task._id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{task.Task_Name}</TableCell>
                  <TableCell>{task.ProjectName?.join(", ")}</TableCell>
                  <TableCell>{task.MilestoneName?.join(", ")}</TableCell>
                  <TableCell>{task.Priority}</TableCell>
                  <TableCell>
                    {new Date(task.StartDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    {new Date(task.EndDate).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{task.ResourceName?.join(", ")}</TableCell>
                  <TableCell>{task.Status}</TableCell>
                  <TableCell>
                    {task.Attachment && (
                      <img
                        src={`/uploads/${task.Attachment}`}
                        alt="Task Attachment"
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "5px",
                        }}
                      />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </div>
  );
};

export default ContractorTasks;
