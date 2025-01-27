import React from "react";
import Header from "./Components/Header";
import Sidebar from "./Components/Sidebar";
import "./dashboard.css";
const DefaultLayout = ({children}) => {
  const [IsOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="dashboard_container">
        <div className="dashboard_row">
          <div className="dashboad_header">
            <Header />
          </div>
          <div className="dashboard_main">
            <Sidebar />
            <div className="main_content">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
