import React from "react";
import PropTypes from "prop-types";
import "./BreadCrumb.css";

const Breadcrumb = ({pageName, linkPath}) => {
  return (
    <nav className="breadcrumb">
      <a href={linkPath} className="breadcrumb-link">
        {pageName}
      </a>
    </nav>
  );
};

Breadcrumb.propTypes = {
  pageName: PropTypes.string.isRequired,
  linkPath: PropTypes.string.isRequired,
};

export default Breadcrumb;
