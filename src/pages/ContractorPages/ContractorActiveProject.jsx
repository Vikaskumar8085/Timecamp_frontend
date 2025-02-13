import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";

const ContractorActiveProject = () => {
  const [isContractoractiveproject, setIsContractoractiveproject] = useState(
    []
  );

  const fetchcontractoractiveproject = async () => {
    try {
      // const response = await
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchcontractoractiveproject();
  }, [0]);

  return (
    <>
      <Layout>
        <BreadCrumb pageName="Contract Active Project" />
      </Layout>
    </>
  );
};

export default ContractorActiveProject;
