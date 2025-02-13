import React, {useState} from "react";
import {fetchinactiveemployeeapicall} from "../../ApiServices/AdminApiServices/Employee";

const EmployeeInactiveProjects = () => {
  const [isemployleeInactiveprojects, setIsemployeeInactiveprojects] = useState([]);

  const fetchinactiveemployeeproject = async () => {
    try {
      const response = await fetchinactiveemployeeapicall();
      if (response.success) {
        setIsemployeeInactiveprojects(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  React.useEffect(() => {
    fetchinactiveemployeeproject();
  }, [0]);
  return <div></div>;
};

export default EmployeeInactiveProjects;
