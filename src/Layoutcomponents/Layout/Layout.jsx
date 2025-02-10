import React, { Suspense, useState } from "react";
import "./style.css";
import Sidebar from "./Sidebar/Sidebar";
import Loader from "../../common/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { getuserapicall } from "../../ApiServices/UserApiServices/User";
import { setUser } from "../../redux/User/UserSlice";
import { Avatar } from "@mui/material";
const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const userdata = useSelector((state) => {
    return state.user.values;
  });

  let Role = userdata.Role;
  console.log(userdata.Role, "daalfasdlkfaslk");
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
      const response = await getuserapicall();
      console.log(response.result, "response");
      if (response.success) {
        dispatch(setUser(response.result));
      }
    } catch (error) {
      console.group(error?.message);
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
              <div className="header_left_item">
                <button
                  className="toggle_btn"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  {isOpen ? "✖" : "☰"}
                </button>
              </div>

              <div className="header_right_item">
                <Avatar
                  src={"https://via.placeholder.com/100"}
                  alt={"adsfk"}
                  sx={{ width: 60, height: 60 }}
                />
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
