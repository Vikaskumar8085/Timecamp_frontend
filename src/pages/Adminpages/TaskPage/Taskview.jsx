import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import apiInstance from "../../../ApiInstance/apiInstance";

const Taskview = () => {
  const {id} = useParams();

  const fetchtaskviewinformationfunc = async () => {
    try {
      const response = await apiInstance.get(`/v1/admin/view-task/${id}`);
      console.log(response, "data");
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchtaskviewinformationfunc();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="Task Information" />
    </Layout>
  );
};

export default Taskview;
