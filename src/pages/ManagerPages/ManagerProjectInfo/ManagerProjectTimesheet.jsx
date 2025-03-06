import React, {useState} from "react";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";

const ManagerProjectTimesheet = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const handleCheckboxChange = (id) => {
    setSelectedItems(
      (prevSelected) =>
        prevSelected.includes(id)
          ? prevSelected.filter((item) => item !== id) // Remove if already selected
          : [...prevSelected, id] // Add if not selected
    );
  };

  return (
    <>
      <BreadCrumb pageName="Manager Timesheet" />

      {selectedItems.length > 0 ? (
        <>
          <Button>Approve</Button>
          <Button>Disapprove</Button>

          <Button
            onClick={() => SendForApprovel()}
            sx={{
              background: "#31bb62",
              padding: "8px 10px",
              margin: "10px 10px",
              color: "white",
            }}
          >
            Send For Approved
          </Button>
          <Button>delete selected</Button>
        </>
      ) : null}
    </>
  );
};

export default ManagerProjectTimesheet;
