import {Box, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

const ProductivityLeaderBoard = () => {
  return (
    <>
      <Box sx={{my: 2}}>
        <Link to={"/productivity-leaderboard"}>view</Link>
      </Box>
    </>
  );
};

export default ProductivityLeaderBoard;
