import React from "react";
import { useParams } from "react-router-dom";

const Employeeinfo = () => {
  const { id } = useParams();
  return <div>{id}</div>;
};

export default Employeeinfo;
