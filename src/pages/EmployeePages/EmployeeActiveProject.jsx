import React, {useEffect, useState} from "react";
import {fetchemployeeactiveprojectapicall} from "../../ApiServices/EmployeeApiservices/Employee";

const EmployeeActiveProject = () => {
  const [isemployeeActiveproject, setIsemployeeactiveproject] = useState([]);

  const fetchemployeeactiveproject = async () => {
    try {
      const response = await fetchemployeeactiveprojectapicall();
      if (response.success) {
        setIsemployeeactiveproject(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    fetchemployeeactiveproject();
  }, [0]);
  return <div></div>;
};

export default EmployeeActiveProject;
