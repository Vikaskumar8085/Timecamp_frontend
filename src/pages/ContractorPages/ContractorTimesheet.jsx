import React, {useEffect, useState} from "react";
import {fetchcontractortimesheetapicall} from "../../ApiServices/ContractorApiServices/ContractorApiServices";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableBody,
  Paper,
} from "@mui/material";

const ContractorTimesheet = () => {
  const [isContractorTimesheetdata, setIsContractorTimesheetdata] = useState(
    []
  );

  const fetchcontractorTimesheetfunc = async () => {
    try {
      const response = await fetchcontractortimesheetapicall();
      if (response.success) {
        setIsContractorTimesheetdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractorTimesheetfunc();
  }, [0]);
  return (
    <div>
      <Layout>
        <BreadCrumb pageName="Contractor Timesheet" />
        <TableContainer component={Paper}>
          <Table sx={{minWidth: 650}} aria-label="client table">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Timesheet No.</TableCell>
                <TableCell>Day</TableCell>
                <TableCell>Project</TableCell>
                <TableCell>Resource</TableCell>
                <TableCell>Task Description</TableCell>
                <TableCell>Total Hours</TableCell>
                <TableCell>Billed Hours</TableCell>
                <TableCell>Ok Hours</TableCell>
                <TableCell>Blank Hours</TableCell>
                <TableCell>Approval Status</TableCell>
                <TableCell>Billing Status</TableCell>
                <TableCell>Remarks</TableCell>
                <TableCell>Attachement</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {isContractorTimesheetdata.length > 0 ? (
                isContractorTimesheetdata.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{item.ts_code}</TableCell>
                    <TableCell>
                      {moment(item.created_at).format("DD-MM-YYYY")}
                    </TableCell>
                    <TableCell>{item.ProjectName || null}</TableCell>
                    <TableCell>{item.StaffName || null}</TableCell>
                    <TableCell>{item.Description || null}</TableCell>
                    <TableCell>{item.hours || null}</TableCell>
                    <TableCell>{item.billed_hours || null}</TableCell>
                    <TableCell>{item.ok_hours || null}</TableCell>
                    <TableCell>{item.blank_hours}</TableCell>
                    <TableCell>{item.approval_status}</TableCell>
                    <TableCell>{item.billing_status}</TableCell>
                    <TableCell>{item.remarks}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={10} align="center">
                    {/* <Empty /> */}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Layout>
    </div>
  );
};

export default ContractorTimesheet;
