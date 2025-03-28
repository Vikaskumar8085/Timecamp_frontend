import React, {useEffect} from "react";
import apiInstance from "../../../ApiInstance/apiInstance";

const EmployeeRecentProject = () => {
  const fetchemployeerecentprojectfunc = async () => {
    try {
      const response = await apiInstance.get("/v2/employee/");
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchemployeerecentprojectfunc();
  }, [0]);

  return <div></div>;
};

export default EmployeeRecentProject;
