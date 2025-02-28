import React, {Suspense, useState} from "react";
import "./style.css";
import Sidebar from "./Sidebar/Sidebar";
import Loader from "../../common/Loader/Loader";
import {useDispatch, useSelector} from "react-redux";
import {getuserapicall} from "../../ApiServices/UserApiServices/User";
import {setUser} from "../../redux/User/UserSlice";
import {Avatar, Badge, Chip, Typography} from "@mui/material";
import NotificationDrawer from "../../Component/Notificationcomponent/NotificationDrawer";
import {setLoader} from "../../redux/LoaderSlices/LoaderSlices";
import toast from "react-hot-toast";
const Layout = ({children}) => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => {
    return state.user.values;
  });

  let Role = userdata?.Role;
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({
    masters: false,
    client: false,
    Employee: false,
    Contractor: false,
    TimeSheet: false,
    Project: false,
  });
  const getProfileFunc = async () => {
    try {
      dispatch(setLoader(true));
      const response = await getuserapicall();
      console.log(response.result, "response");
      if (response.success) {
        dispatch(setUser(response.result));
        dispatch(setLoader(false));
      } else {
        toast.error(response?.message);
        dispatch(setLoader(true));
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
      dispatch(setLoader(true));
    }
  };
  function redirectfunc() {
    if (!localStorage.getItem("token")) {
      window.location.href = "/login";
    }
  }

  React.useEffect(() => {
    getProfileFunc();
    redirectfunc();
  }, [0]);
  return (
    <div className="layout_wrapper">
      <div className="layout_box">
        <Sidebar
          dropdownOpen={dropdownOpen}
          setDropdownOpen={setDropdownOpen}
          isOpen={isOpen}
          Role={Role}
        />
        <div className="layout_wrapper_box">
          <div className="layout_wrapper_header">
            <div className="header_box">
              <div
                className="header_left_item"
                style={{display: "flex", alignItems: "center", gap: "2"}}
              >
                <button
                  className="toggle_btn"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? "✖" : "☰"}
                </button>

                <div className="company_logo">
                  <img
                    src={"https://ignitivelabs.in/images/logo-1.png"}
                    alt=""
                    srcset=""
                    style={{height: "60px", margin: "0px 20px ", flexGrow: 1}}
                  />
                </div>
              </div>

              <div
                className="header_right_item"
                style={{display: "flex", alignItems: "center", gap: "20px"}}
              >
                <NotificationDrawer />

                {userdata?.Role === "Admin" && (
                  <div>
                    <p>{userdata?.FirstName}</p>
                    <Chip label="success" color="success">
                      {userdata?.Role}
                    </Chip>
                  </div>
                )}

                {userdata?.Role === "Client" && (
                  <div>
                    <p>{userdata?.Client_Name}</p>
                    <Chip label="success" color="success">
                      {userdata?.Role}
                    </Chip>
                  </div>
                )}

                {userdata?.Role === "Employee" ||
                  userdata?.Role === "Contractor" ||
                  (userdata?.Role === "Manager" && (
                    <div>
                      <Typography>{userdata?.Client_Name}</Typography>
                      <Chip label="success" color="success">
                        {userdata?.Role}
                      </Chip>
                    </div>
                  ))}

                <div className="header_right_item_box">
                  <Avatar
                    src={"https://via.placeholder.com/100"}
                    alt={"adsfk"}
                    sx={{width: 60, height: 60}}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="layout_wrapper_main">
            <Suspense fallback={<Loader />}>{children}</Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
