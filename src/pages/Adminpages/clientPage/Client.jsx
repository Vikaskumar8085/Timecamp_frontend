import React from "react";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import {Button} from "@mui/material";
import TModal from "../../../common/Modal/TModal";
import ClientForm from "../../../Component/AdminComponents/Client/ClientForm";
import ClientTable from "../../../Component/AdminComponents/Client/ClientTable";

const Client = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  return (
    <DefaultLayout>
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
          <ClientForm />
        </TModal>
      ) : null}

      <ClientTable /> 
    </DefaultLayout>
  );
};

export default Client;
