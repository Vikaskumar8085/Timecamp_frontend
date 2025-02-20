import React, { useEffect, useState } from "react";
import { fetchemployeetaskapicall } from "../../ApiServices/EmployeeApiservices/Employee";

const EmployeeTasks = () => {
  const [IsEmployeeTaskdata ,setIsEmployeeTaskdata]= useState([]);
  const fetchemployeetaskfunc = async () => {
    try {
      const response = await fetchemployeetaskapicall();
      if(response.success){
        setIsEmployeeTaskdata(response.result)
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    fetchemployeetaskfunc();
  }, [0]);
  return <div></div>;
};

export default EmployeeTasks;
