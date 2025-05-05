import React from "react";
import Sidebar from "./Sidebar/Sidebar";
// import "../../pages/Home.scss";
import Header from "./Header/Header";

const LayoutDesign = ({children}) => {
  const [dropdownOpen, setDropdownOpen] = React.useState(null);

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  return (
    <>
      <div className="wrapper">
        {/* header */}
        <Header />
        {/* header */}
        <div className="wrapper_box">
          {/* sidebar */}
          <Sidebar
            toggleDropdown={toggleDropdown}
            dropdownOpen={dropdownOpen}
          />
          {/* sidebar */}
          {/* content */}
          <div className="wrapper_content">{children}</div>
          {/* content */}
        </div>
      </div>
    </>
  );
};

export default LayoutDesign;
