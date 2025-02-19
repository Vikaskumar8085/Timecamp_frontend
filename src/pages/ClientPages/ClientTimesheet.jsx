import React, {useEffect, useState} from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Chip,
} from "@mui/material";

import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {fetchclientprojecttimesheetapicall} from "../../ApiServices/Cllientapiservices/Client";

const ClientTimesheet = () => {
  const [isClientTimesheetdata, setIsClientTimesheetdata] = useState([]);
  console.log(isClientTimesheetdata, ".../...");
  const fetchclienttimesheetfunc = async () => {
    try {
      const response = await fetchclientprojecttimesheetapicall();
      if (response.success) {
        setIsClientTimesheetdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchclienttimesheetfunc();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="Client Timesheet" />

      <TableContainer
        component={Paper}
        sx={{mt: 3, boxShadow: 3, borderRadius: 2}}
      >
        <Table>
          <TableHead>
            <TableRow sx={{backgroundColor: "#f5f5f5"}}>
              <TableCell>
                <strong>TS Code</strong>
              </TableCell>
              <TableCell>
                <strong>Project ID</strong>
              </TableCell>
              <TableCell>
                <strong>Staff ID</strong>
              </TableCell>
              <TableCell>
                <strong>Task Description</strong>
              </TableCell>
              <TableCell>
                <strong>Approval Status</strong>
              </TableCell>
              <TableCell>
                <strong>Billed Hours</strong>
              </TableCell>
              <TableCell>
                <strong>Billing Status</strong>
              </TableCell>
              <TableCell>
                <strong>Blank Hours</strong>
              </TableCell>
              <TableCell>
                <strong>OK Hours</strong>
              </TableCell>
              <TableCell>
                <strong>Total Hours</strong>
              </TableCell>
              <TableCell>
                <strong>Remarks</strong>
              </TableCell>
              <TableCell>
                <strong>Created At</strong>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isClientTimesheetdata?.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.ts_code}</TableCell>
                <TableCell>{entry.project}</TableCell>
                <TableCell>{entry.Staff_Id}</TableCell>
                <TableCell>{entry.task_description}</TableCell>
                <TableCell>
                  <Chip
                    label={entry.approval_status}
                    color={
                      entry.approval_status === "APPROVED"
                        ? "success"
                        : "warning"
                    }
                  />
                </TableCell>
                <TableCell>{entry.billed_hours} hrs</TableCell>
                <TableCell>{entry.billing_status}</TableCell>
                <TableCell>{entry.blank_hours} hrs</TableCell>
                <TableCell>{entry.ok_hours} hrs</TableCell>
                <TableCell>{entry.hours} hrs</TableCell>
                <TableCell>{entry.remarks}</TableCell>
                <TableCell>
                  {new Date(entry.created_at).toLocaleDateString()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Layout>
  );
};

export default ClientTimesheet;
