import React, {useEffect, useState} from "react";
import {fetchinactiveprojectsapicall} from "../../../ApiServices/ProjectApiServices";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";

const Inactiveprojects = () => {
  const [IsInActiveprojectsdata, setIsInActiveprojectsdata] = useState([]);

  const getinactiveprojectfunc = async () => {
    try {
      const response = await fetchinactiveprojectsapicall();
      console.log(response);
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getinactiveprojectfunc();
  }, [0]);

  return (
    <DefaultLayout>
      <BreadCrumb pageName="InActive Projects" />
    </DefaultLayout>
  );
};

export default Inactiveprojects;
