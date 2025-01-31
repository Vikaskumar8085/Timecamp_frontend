import React, {useEffect, useState} from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {fetchactiveprojectsapicall} from "../../../ApiServices/ProjectApiServices";

const Activeproject = () => {
  const [Isactiveprojectdata, setIsActiveprojectsdata] = useState([]);

  const getactiveprojectapicall = async () => {
    try {
      const response = await fetchactiveprojectsapicall();
      console.log(response, "response");
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getactiveprojectapicall();
  }, [0]);

  return (
    <div>
      {" "}
      <DefaultLayout>
        <BreadCrumb pageName="InActive Projects" />
      </DefaultLayout>
    </div>
  );
};

export default Activeproject;
