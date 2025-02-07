import React, {Suspense, useState} from "react";
import "./style.css";
import Sidebar from "./Sidebar/Sidebar";
import Loader from "../../common/Loader/Loader";
import {useSelector} from "react-redux";
import {getuserapicall} from "../../ApiServices/UserApiServices/User";
const Layout = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState({
    masters: false,
    client: false,
    Employee: false,
    Contractor: false,
    TimeSheet: false,
  });
  const userdata = useSelector((state) => state.user.values);
  let Role = userdata.Role;

  const getProfileFunc = async () => {
    try {
      const response = await getuserapicall();
      console.log(response, "response");
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
                <h1>profile</h1>
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
