import { Card, CardContent, Typography, Avatar, Box } from "@mui/material";
import React from "react";

const ContractorInformation = ({ isContractordata }) => {
  return (
    <div>
      <Card
        sx={{
          p: 3,
          display: "flex",
          alignItems: "center",
          gap: 3,
          maxWidth: 400,
        }}
      >
        <Avatar
          src={isContractordata.ProfileImage}
          alt={isContractordata.FirstName}
          sx={{ width: 80, height: 80 }}
        />
        <CardContent sx={{ flex: 1 }}>
          <Typography variant="h6" fontWeight="bold">
            {isContractordata.FirstName} {isContractordata.LastName}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            📞 {isContractordata.Phone}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            ✉️ {isContractordata.Email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            🗓 Joining Date: {isContractordata.Joining_Date}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default ContractorInformation;
