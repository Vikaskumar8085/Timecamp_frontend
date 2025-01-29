import React from "react";
import {Link} from "react-router-dom";
import Sidebar from "./Components/Sidebar";
const DefaultLayout = ({children}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  return (
    <>
      <div className="Layout_wrapper">
        {/* sidebar */}
        <Sidebar
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        {/* sidebar */}

        <div className={`layout_main ${isSidebarOpen ? "open" : "closed"}`}>
          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
