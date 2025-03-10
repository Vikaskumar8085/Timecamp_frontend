import React, {useState, useEffect} from "react";
import apiInstance from "../../../ApiInstance/apiInstance";

const ManagerProductivityLeaderboard = () => {
  const [isproductivityleaderboarddata, setIsproductivityleaderboarddata] =
    useState(
      [] ||
        function (error) {
          console.log(error?.message);
        }
    );

  const fetchmanagerproductivityleaderboardfunc = async () => {
    try {
      const response = await apiInstance.get(
        "/v2/manager/manager-productivity-leaderboard"
      );
      if (response?.data?.success) {
        setIsproductivityleaderboarddata(response?.data?.result);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  useEffect(() => {
    fetchmanagerproductivityleaderboardfunc();
  }, [0]);

  return <div></div>;
};

export default ManagerProductivityLeaderboard;
