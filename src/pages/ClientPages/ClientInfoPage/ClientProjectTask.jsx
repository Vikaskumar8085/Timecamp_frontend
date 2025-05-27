import React from "react";
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
  Grid2,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Link} from "react-router-dom";
import Empty from "../../../common/EmptyFolder/Empty";
const ClientProjectTask = ({isclinettaskinfodata, istaskMembers}) => {
  const formatDate = (excelDate) => {
    if (!excelDate) return "N/A";
    return new Date(
      (parseFloat(excelDate) - 25569) * 86400000
    ).toLocaleDateString();
  };

  return (
    <div>
      <BreadCrumb pageName="Client Project Task" />

      <div className="client_project_task_wrapper">
        <Grid2 container spacing={2}>
          <Grid2
            size={{md: 4, lg: 4, sm: 12}}
            className="client_project_task_header"
          >
            <div className="task-members-wrapper">
              <h3 className="title">Allocated Task Members</h3>
              <div className="task-members-scroll">
                {istaskMembers.map((item, index) => (
                  <div className="task-member" key={index}>
                    <img
                      src={item?.Photos?.[0]}
                      alt="Profile"
                      className="profile-img"
                    />
                    <div className="member-info">
                      <div className="name">
                        {item.FirstName} {item.LastName}
                      </div>
                      <div className="designation">
                        {item.Designation || "Role Unknown"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Grid2>
        </Grid2>
      </div>

      {isclinettaskinfodata?.length > 0 ? (
        <>
          <table className="table_Container">
            <thead className="table_head">
              <tr className="head_row">
                <th className="table_head_data">Id</th>
                <th className="table_head_data">Task Name</th>
                <th className="table_head_data">Task Description </th>
                <th className="table_head_data">Priority </th>
                <th className="table_head_data">Status </th>
                <th className="table_head_data">Start Date </th>
                <th className="table_head_data">End Date </th>
                <th className="table_head_data">Estimated Time </th>
                <th className="table_head_data">Completed Time </th>
                <th className="table_head_data">Actions </th>
              </tr>
            </thead>
            <tbody className="table_body">
              {isclinettaskinfodata?.map((item, index) => {
                console.log(item, "item project atsk");
                return (
                  <>
                    <tr className="body_row" key={index}>
                      <td className="table_data">{index + 1}</td>
                      <td className="table_data">{item.Task_Name}</td>
                      <td className="table_data">{item.Task_description}</td>
                      <td className="table_data">{item.Priority}</td>
                      <td className="table_data">{item.Status}</td>
                      <td className="table_data">{item.StartDate}</td>
                      <td className="table_data">{item.EndDate}</td>
                      <td className="table_data">{item.Estimated_Time}</td>
                      <td className="table_data">{item.Completed_time}</td>

                      <td className="table_data">
                        <Link to={`/client/client-taskinfo/${item.task_Id}`}>
                          <VisibilityIcon />
                        </Link>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default ClientProjectTask;
