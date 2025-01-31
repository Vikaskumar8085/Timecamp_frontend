import React from "react";
import {useParams} from "react-router-dom";

const Projectinfo = () => {
  const {id} = useParams();
  return <div>{id}</div>;
};

export default Projectinfo;
