import React, { useState, useEffect } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
} from "@mui/material";

const MilestoneList = ({ milestones, loading = false }) => {
  return (
    <>
      {milestones.length > 0 ? (
        milestones.map((item, index) => (
          <Card key={index} sx={{ mb: 1, p: 1, position: "relative" }}>
            <Box
              sx={{ position: "absolute", top: 0, left: 0, width: "100%" }}
            ></Box>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {item.Name}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {item.Description}
              </Typography>
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography color="textSecondary">No milestones available</Typography>
      )}
    </>
  );
};

export default MilestoneList;
