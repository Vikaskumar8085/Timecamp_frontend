import React, {useEffect, useState} from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button} from "@mui/material";
import TModal from "../../../common/Modal/TModal";
import ClientForm from "../../../Component/AdminComponents/Client/ClientForm";
import ClientTable from "../../../Component/AdminComponents/Client/ClientTable";
import {
  createclientapicall,
  fetchclientapicall,
} from "../../../ApiServices/AdminApiServices/Client";
import Layout from "../../../Layoutcomponents/Layout/Layout";

const Client = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [Isclientdata, setIsclientdata] = useState([]);
  // fetch client

  const fetchclientfucntion = async () => {
    try {
      const response = await fetchclientapicall();
      console.log(response, "client");

      if (response.success) {
        setIsclientdata(response.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const handleSubmit = async (value) => {
    try {
      const response = await createclientapicall(value);
      if (response.success) {
        setIsModalOpen(false);
        fetchclientfucntion();
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchclientfucntion();
  }, [0]);

  return (
    <Layout>
      <BreadCrumb pageName="Client" />
      <HeaderTab>
        <Button
          onClick={() => setIsModalOpen(true)}
          sx={{
            background: "skyblue",
            padding: "15px",
            color: "white",
          }}
        >
          Add Client
        </Button>
      </HeaderTab>

      {isModalOpen ? (
        <TModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={"Add Client"}
        >
          <ClientForm handleSubmit={handleSubmit} />
        </TModal>
      ) : null}

      <ClientTable Isclientdata={Isclientdata} />
    </Layout>
  );
};

export default Client;
