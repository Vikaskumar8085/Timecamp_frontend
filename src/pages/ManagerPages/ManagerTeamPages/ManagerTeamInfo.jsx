import React, {useCallback, useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import LayoutDesign from "../../../Layoutcomponents/LayoutDesign/LayoutDesign";
import BreadCrumb from "../../../common/BreadCrumb/BreadCrumb";
import toast from "react-hot-toast";
import {fetchmanagerteaminfoapicall} from "../../../ApiServices/ManagerApiServices";
import TeamInfo from "../../../Component/ManagerComponents/ManageTeamComponent/TeamInfo";

const ManagerTeamInfo = () => {
  const [isteamInfo, setTeamInfo] = useState(null);
  const {id} = useParams();

  const fetchmanagerteaminfoFunc = useCallback(async () => {
    try {
      const response = await fetchmanagerteaminfoapicall(id);
      if (response?.success) {
        setTeamInfo(response.result);
      }
    } catch (error) {
      toast.error(error?.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchmanagerteaminfoFunc();
  }, [fetchmanagerteaminfoFunc]);

  return (
    <>
      <LayoutDesign>
        <BreadCrumb pageName="Team Information" />
        <TeamInfo isteamInfo={isteamInfo} />
      </LayoutDesign>
    </>
  );
};

export default ManagerTeamInfo;
