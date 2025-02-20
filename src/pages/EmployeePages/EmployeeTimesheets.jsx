import React, { useState } from "react";
import { fetchemployeetimesheetapicall } from "../../ApiServices/EmployeeApiservices/Employee";

const EmployeeTimesheets = () => {
  const [IsEmployeeTimesheetData, setIsEmployeeTimesheetData] = useState([]);

  const fetchemployeetimesheetfunc = async () => {
    try {
      const response = await fetchemployeetimesheetapicall();
      if (response.success) {
        setIsEmployeeTimesheetData(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };
  useEffect(() => {
    fetchemployeetimesheetfunc();
  }, [0]);
  return <div></div>;
};

export default EmployeeTimesheets;
