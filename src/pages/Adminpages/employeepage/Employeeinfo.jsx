import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import { fetchsingleemployeeapicall } from "../../../ApiServices/AdminApiServices/Employee";
import { Paper } from "@mui/material";
import Card from "../../../common/Card/Card";
import Layout from "../../../Layoutcomponents/Layout/Layout";

const Employeeinfo = () => {
  const { id } = useParams();
  const [isEmployeedata, setIsEmployeedata] = useState([]);

  const fetchsingleemployeefunc = async () => {
    try {
      const response = await fetchsingleemployeeapicall(id);
      console.log(response, "data employee data");
      if (response.success) {
        setIsEmployeedata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchsingleemployeefunc();
  }, [0]);
  return (
    <Layout>
      <Card>
        <p>FirstName:{isEmployeedata.FirstName}</p>
        <p>LastName:{isEmployeedata.LastName}</p>
        <p>Email:{isEmployeedata.Email}</p>
        <p>Phone:{isEmployeedata.Phone}</p>
        <p>Address:{isEmployeedata.Address}</p>
      </Card>
    </Layout>
  );
};

export default Employeeinfo;
