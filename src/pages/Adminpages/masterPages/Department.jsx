import {Button, Input, TextField} from "@mui/material";
import React, {useState} from "react";
import TModal from "../../../common/Modal/TModal";
import DefaultLayout from "../../../Layoutcomponents/DefaultLayout/DefaultLayout";
import HeaderTab from "../../../common/HeaderTab/HeaderTab";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import DepartmentTable from "../../../Component/MasterComponent/Department/DepartmentTable";

const Department = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <DefaultLayout>
      <BreadCrumb pageName="Designation" />
      <HeaderTab>
        <Button
          onClick={() => setIsModalOpen(true)}
          sx={{
            background: "skyblue",
            padding: "15px",
            color: "white",
          }}
        >
          Add Department
        </Button>
      </HeaderTab>

      {isModalOpen ? (
        <TModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          title={"Add Department"}
        >
          <div className="department_form">
            <form>
              <br />
              <TextField
                label="Department Name"
                variant="outlined"
                type="text"
                sx={{width: "100%"}}
              />
              <Button
                sx={{
                  backgroundColor: "skyblue",
                  padding: "10px 15px",
                  color: "white",
                  margin: "10px 0px",
                  width: "100%",
                }}
                type="submit"
              >
                submit
              </Button>
            </form>
          </div>
        </TModal>
      ) : null}
      <DepartmentTable />
    </DefaultLayout>
  );
};

export default Department;
