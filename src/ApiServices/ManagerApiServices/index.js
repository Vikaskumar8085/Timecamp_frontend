import apiInstance from "../../ApiInstance/apiInstance";

export const fetchmanagerclientsapicall = async () => {
  const response = await apiInstance.get("/v2/manager/fetch-manager-client");
  return response.data;
};

export const fetchmanagerstaffapicall = async () => {
  const response = await apiInstance.get("/v2/manager/fetch-manager-staff");
  return response.data;
};

export const fetchmanagerrolesapicall = async () => {
  const response = await apiInstance.get("/v2/manager/fetch-manager-roles");
  return response.data;
};

export const fetchmanagerprojectwithmilestoneapicall = async () => {
  const response = await apiInstance.get(
    "/v2/manager/fetch-manager-projectwithmilestone"
  );
  return response?.data;
};
