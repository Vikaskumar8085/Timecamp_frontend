import React, {useEffect, useState} from "react";
import {fetchemployeeprojectsapicall} from "../../ApiServices/EmployeeApiservices/Employee";

const EmployeeProjects = () => {
  const [Isemployeeprojectdata, setIsemployeeprojectdata] = useState([]);

  const fetchemployeeproject = async () => {
    try {
      const response = await fetchemployeeprojectsapicall();
      if (response.success) {
        setIsemployeeprojectdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchemployeeproject();
  }, [0]);

  return <div>EmployeeProjects</div>;
};

export default EmployeeProjects;
