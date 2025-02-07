import React, { useEffect, useState } from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import { Box, Button, Drawer } from "@mui/material";
import TModal from "../../../common/Modal/TModal";
import ClientForm from "../../../Component/AdminComponents/Client/ClientForm";
import ClientTable from "../../../Component/AdminComponents/Client/ClientTable";
import {
  createclientapicall,
  fetchclientapicall,
} from "../../../ApiServices/AdminApiServices/Client";
import Layout from "../../../Layoutcomponents/Layout/Layout";
import AddIcon from "@mui/icons-material/Add";

const Client = () => {
  const [IsOpen, setIsOpen] = useState(false);
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
        // setIsModalOpen(false);
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
      <Button
        onClick={() => setIsOpen(true)}
        startIcon={<AddIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 0px",
          color: "white",
        }}
      >
        Add Client
      </Button>

      {IsOpen && (
        <Drawer open={IsOpen} onClose={() => setIsOpen(false)} anchor="right">
          <ClientForm handleSubmit={handleSubmit} />
        </Drawer>
      )}
      <ClientTable Isclientdata={Isclientdata} />
    </Layout>
  );
};

export default Client;
