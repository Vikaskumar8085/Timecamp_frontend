import React from "react";
import { useParams } from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";

const Projectinfo = () => {
  const { id } = useParams();
  return <Layout>{id}</Layout>;
};

export default Projectinfo;
