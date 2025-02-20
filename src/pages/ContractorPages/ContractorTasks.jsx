import React, { useEffect, useState } from "react";
import { fetchcontractortaskapicall } from "../../ApiServices/ContractorApiServices/ContractorApiServices";

const ContractorTasks = () => {
  const [IsContracotorTaskdata, setIsContractorTaskdata] = useState([]);

  const fetchContractorTaskfunc = async () => {
    try {
      const response = await fetchcontractortaskapicall();
      if (response.success) {
        setIsContractorTaskdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchContractorTaskfunc();
  }, [0]);

  return <div></div>;
};

export default ContractorTasks;
