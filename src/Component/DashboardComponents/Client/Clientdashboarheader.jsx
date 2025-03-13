import {Box, Card, CardContent, Grid, Typography} from "@mui/material";
import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import apiInstance from "../../../ApiInstance/apiInstance";
import PeopleIcon from "@mui/icons-material/People";
import WorkIcon from "@mui/icons-material/Work";
import BusinessIcon from "@mui/icons-material/Business";

const Clientdashboarheader = () => {
  const [isdata, setisdata] = useState([]);
  const getValue = (value) => value || 0;
  const dataList = [
    {
      label: "Total Hours",
      value: getValue(isdata?.totalHours),
      icon: <PeopleIcon fontSize="large" color="primary" />,
    },
    // {
    //   label: "Staff Number",
    //   value: getValue(isdata?.staffNo),
    //   icon: <PeopleIcon fontSize="large" color="primary" />,
    // },
    {
      label: "Project Number",
      value: getValue(isdata?.totalproject),
      icon: <WorkIcon fontSize="large" color="secondary" />,
    },
    // {
    //   label: "Total Timesheet",
    //   value: getValue(isdata?.totalTask),
    //   icon: <BusinessIcon fontSize="large" color="success" />,
    // },
  ];
  const fetchclientdashboardheaderfunc = async () => {
    try {
      const response = await apiInstance.get("/v2/client/client-dash-counter");
      if (response?.data?.success) {
        setisdata(response?.data?.result);
      } else {
        toast.error(response?.message);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(() => {
    fetchclientdashboardheaderfunc();
  }, [0]);

  return (
    <div>
      <Grid container spacing={2}>
        {dataList.map((item, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              sx={{p: 2, borderRadius: 2, boxShadow: 3, bgcolor: "#f5f5f5"}}
            >
              <CardContent>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {item.icon}
                  <Typography
                    variant="subtitle1"
                    fontWeight="bold"
                    color="primary"
                  >
                    {item.label}
                  </Typography>
                  <Typography variant="h6">{item.value}</Typography>
                  {/* <ResponsiveContainer width="100%" height={150}>
                    <PieChart>
                      <Pie
                        data={[{name: item.label, value: item.value}]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={50}
                        label
                      >
                        <Cell fill={COLORS[index % COLORS.length]} />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer> */}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default Clientdashboarheader;
