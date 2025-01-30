import React, { useEffect, useState } from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import { fetchinactivecontractorapicall } from "../../../ApiServices/AdminApiServices/Contractor";

const InActivecontractor = () => {
  const [isInActivecontractordata, setIsInActivecontractordata] = useState([]);

  const getactivecontractor = async () => {
    try {
      const response = await fetchinactivecontractorapicall();
      if (response.success) {
        setIsInActivecontractordata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getactivecontractor();
  }, [0]);
  return <DefaultLayout>Inactive contractor</DefaultLayout>;
};

export default InActivecontractor;
