import apiInstance from "../../ApiInstance/apiInstance";

export const fetchProjectwithmilestonesapicall = async () => {
  const response = await apiInstance.get(
    "/v1/admin/fetch-projectwithmilestone"
  );
  return response.data;
};
