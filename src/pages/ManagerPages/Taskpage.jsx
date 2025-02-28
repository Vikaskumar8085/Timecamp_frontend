import React, {useEffect, useState} from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import {Button, Drawer} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ManagerTaskcreationForm from "../../Component/ManagerComponents/ManagerTaskcreationForm";
import {fetchmanagerprojectwithmilestoneapicall} from "../../ApiServices/ManagerApiServices";

const Taskpage = () => {
  const [IsOpen, setIsOpen] = useState(false);
  const [Isprojectmilestonedata, setIsprojectmilestonedata] = useState([]);
  console.log(Isprojectmilestonedata,">>>>")

  const fetchprojectwithmilestonemanagerfunc = async () => {
    try {
      const response = await fetchmanagerprojectwithmilestoneapicall();
      if (response?.success) {
        setIsprojectmilestonedata(response?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchprojectwithmilestonemanagerfunc();
  }, [0]);
  return (
    <Layout>
      <BreadCrumb pageName=" Manager Task" />
      <Button
        startIcon={<AddIcon />}
        sx={{
          background: "#2c3e50",
          padding: "8px 10px",
          margin: "10px 10px",
          color: "white",
        }}
        onClick={() => setIsOpen(true)}
      >
        Create Task
      </Button>

      {IsOpen && (
        <Drawer open={IsOpen} anchor="right" onClose={() => setIsOpen(false)}>
          <ManagerTaskcreationForm
            Isprojectmilestonedata={Isprojectmilestonedata}
          />
        </Drawer>
      )}
    </Layout>
  );
};

export default Taskpage;
