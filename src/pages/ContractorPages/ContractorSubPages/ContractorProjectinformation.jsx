import React, {useEffect} from "react";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";

const ContractorProjectinformation = ({id}) => {
  const fetchcontractorprojectinfofunc = async () => {
    try {
      const response = await fetchcontractorprojectinfo
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractorprojectinfofunc();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="Contractor Project information" />
    </Layout>
  );
};

export default ContractorProjectinformation;
