import React, { useEffect, useState } from "react";
import { fetchactivecontractorapicall } from "../../../ApiServices/AdminApiServices/Contractor";

const Activecontractor = () => {
  const [isActivecontractordata, setIsActivecontractordata] = useState([]);

  const getactivecontractor = async () => {
    try {
      const response = await fetchactivecontractorapicall();
      if (response.success) {
        setIsActivecontractordata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getactivecontractor();
  }, [0]);
  return <div></div>;
};

export default Activecontractor;
