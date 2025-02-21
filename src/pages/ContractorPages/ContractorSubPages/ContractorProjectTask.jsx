import React, {useEffect} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";

const ContractorProjectTask = ({id}) => {
  const fetchcontractorprojecttaskfunc = async () => {
    try {
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractorprojecttaskfunc();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName="Contractor Project Task" />
    </Layout>
  );
};

export default ContractorProjectTask;
