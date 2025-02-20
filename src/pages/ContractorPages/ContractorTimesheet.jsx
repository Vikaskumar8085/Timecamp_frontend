import React, { useEffect, useState } from "react";
import { fetchcontractortimesheetapicall } from "../../ApiServices/ContractorApiServices/ContractorApiServices";

const ContractorTimesheet = () => {
  const [isContractorTimesheetdata, setIsContractorTimesheetdata] = useState(
    []
  );

  const fetchcontractorTimesheetfunc = async () => {
    try {
      const response = await fetchcontractortimesheetapicall();
      if (response.success) {
        setIsContractorTimesheetdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractorTimesheetfunc();
  }, [0]);
  return <div></div>;
};

export default ContractorTimesheet;
