import React, { useEffect, useState } from "react";
import { fetchContractorprojectsapicall } from "../../ApiServices/ContractorApiServices/ContractorApiServices";

const ContractorProject = () => {
  const [IsContractorProjectdata, setIsContractorProjectdata] = useState([]);

  const fetchcontractorprojectfunc = async () => {
    try {
      const response = await fetchContractorprojectsapicall();
      if (response.success) {
        setIsContractorProjectdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractorprojectfunc();
  });
  return <div></div>;
};

export default ContractorProject;
