import React, {useEffect, useState} from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {fetchactiveprojectsapicall} from "../../../ApiServices/ProjectApiServices";
import {useSelector} from "react-redux";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import ProjectTable from "../../../Component/AdminComponents/Project/ProjectTable";

const Activeproject = () => {
  const [Isactiveprojectdata, setIsActiveprojectsdata] = useState([]);
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;

  const getactiveprojectapicall = async () => {
    try {
      const response = await fetchactiveprojectsapicall();
      console.log(response, "response");
      if (response.success) {
        setIsActiveprojectsdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getactiveprojectapicall();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="InActive Projects" />
      {Role === "Admin" && (
        <>
          <ProjectTable isProjectdata={Isactiveprojectdata} />
        </>
      )}
      {Role === "Client" && <div>Role:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
    </Layout>
  );
};

export default Activeproject;
