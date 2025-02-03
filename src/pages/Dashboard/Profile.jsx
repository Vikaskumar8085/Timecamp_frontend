import React from "react";
import DefaultLayout from "../../Layoutcomponents/DefaultLayout/DefaultLayout";
import {useSelector} from "react-redux";
import Card from "../../common/Card/Card";

const Profile = () => {
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;
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

export default Profile;
