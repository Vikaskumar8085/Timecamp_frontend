import React, {useEffect, useState} from "react";
import {fetchinactiveprojectsapicall} from "../../../ApiServices/ProjectApiServices";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {useSelector} from "react-redux";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import ProjectTable from "../../../Component/AdminComponents/Project/ProjectTable";

const Inactiveprojects = () => {
  const [IsInActiveprojectsdata, setIsInActiveprojectsdata] = useState([]);
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;

  const getinactiveprojectfunc = async () => {
    try {
      const response = await fetchinactiveprojectsapicall();
      console.log(response);

      if (response.success) {
        setIsInActiveprojectsdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    getinactiveprojectfunc();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="InActive Projects" />
      {Role === "Admin" && (
        <div>
          {" "}
          <ProjectTable isProjectdata={IsInActiveprojectsdata} />
        </div>
      )}
      {Role === "Client" && <div>Role:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
    </Layout>
  );
};

export default Inactiveprojects;
