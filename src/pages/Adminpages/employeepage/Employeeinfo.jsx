import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import { fetchsingleemployeeapicall } from "../../../ApiServices/AdminApiServices/Employee";

const Employeeinfo = () => {
  const { id } = useParams();

  const fetchsingleemployeefunc = async () => {
    try {
      const response = await fetchsingleemployeeapicall(id);
      console.log(response, "data");
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchsingleemployeefunc();
  });
  return <DefaultLayout></DefaultLayout>;
};

export default Employeeinfo;
