import React, {useEffect, useState} from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {fetchactiveprojectsapicall} from "../../../ApiServices/ProjectApiServices";
import {useSelector} from "react-redux";

const Activeproject = () => {
  const [Isactiveprojectdata, setIsActiveprojectsdata] = useState([]);
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;

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
    <DefaultLayout>
      <BreadCrumb pageName="InActive Projects" />
      {Role === "Admin" && <div></div>}
      {Role === "Client" && <div>Role:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
    </DefaultLayout>
  );
};

export default Activeproject;
