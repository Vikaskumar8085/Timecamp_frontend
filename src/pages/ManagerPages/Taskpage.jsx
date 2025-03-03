import React from "react";
import Layout from "../../Layoutcomponents/Layout/Layout";
import BreadCrumb from "../../common/BreadCrumb/BreadCrumb";
import { Button, Drawer } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Taskpage = () => {
  const [IsOpen, setIsOpen] = useState(false);
  return (
    <Layout>
      <BreadCrumb pageName=" Manager Task" />
      <Button
        startIcon={<AddIcon />}
        sx={{
          backgroundColor: "#ddd",
          color: "white",
          margin: "10px 0px",
          padding: "10px 15px",
        }}
        onClick={() => setIsOpen(true)}
      >
        Create Task
      </Button>

      {IsOpen && (
        <Drawer open={IsOpen} anchor="right" onClose={() => setIsOpen(false)}>
          create task
        </Drawer>
      )}
    </Layout>
  );
};

export default Taskpage;
