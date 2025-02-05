import React, {useEffect, useState} from "react";
import {fetchinactiveprojectsapicall} from "../../../ApiServices/ProjectApiServices";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {useSelector} from "react-redux";

const Inactiveprojects = () => {
  const [IsInActiveprojectsdata, setIsInActiveprojectsdata] = useState([]);
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;

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
      {Role === "Admin" && (
        <div>
          <Card>
            <p>FirstName : {userdata.FirstName}</p>
            <p>LastName : {userdata.LastName}</p>
            <p>Email : {userdata.Email}</p>
          </Card>
        </div>
      )}
      {Role === "Client" && <div>Role:{userdata?.Role}</div>}
      {Role === "Employee" && <div>Role:{userdata?.Role}</div>}
      {Role === "Contractor" && <div>Role:{userdata?.Role}</div>}
    </DefaultLayout>
  );
};

export default Inactiveprojects;
