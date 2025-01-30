import {Box, Container, Grid} from "@mui/material";
import React from "react";
import Card from "../../../common/Card/Card";

function AdminTable({isAdmindata}) {
  return (
    <>
      <Box sx={{display: "flex", flexWrap: "wrap"}}>
        {isAdmindata.map((item, index) => {
          return (
            <Card>
              <div>FirstName : {item.FirstName}</div>
              <div>LastName : {item.LastName}</div>
              <div>Email : {item.Email}</div>
            </Card>
          );
        })}
      </Box>
    </>
  );
}

export default React.memo(AdminTable);
