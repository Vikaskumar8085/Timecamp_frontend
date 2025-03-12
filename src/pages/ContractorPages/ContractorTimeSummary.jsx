import React from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import ContractorTotalHoursByResources from "../../Component/DashboardComponents/Contractor/ContractorTotalHoursByResources";
import ContractorTotalHoursByProject from "../../Component/DashboardComponents/Contractor/ContractorTotalHoursByProject";
import ContractorTotalHoursByCompany from "../../Component/DashboardComponents/Contractor/ContractorTotalHoursByCompany";
import ContractorBillingStatusDistribution from "../../Component/DashboardComponents/Contractor/ContractorBillingStatusDistribution";
import ContractorProjectTimeUtilization from "../../Component/DashboardComponents/Contractor/ContractorProjectTimeUtilization";
import ContaractorDailyHours from "../../Component/DashboardComponents/Contractor/ContaractorDailyHours";
import ContractorApprovelbilingstatus from "../../Component/DashboardComponents/Contractor/ContractorApprovelbilingstatus";

const ContractorTimeSummary = () => {
  return (
    <Layout>
      <BreadCrumb pageName="Contractor Time Summary" />
      <ContractorTotalHoursByResources />
      <ContractorTotalHoursByProject />
      <ContractorTotalHoursByCompany />
      <ContractorBillingStatusDistribution />
      <ContractorProjectTimeUtilization />
      <ContaractorDailyHours />
      <ContractorApprovelbilingstatus />
    </Layout>
  );
};

export default ContractorTimeSummary;
