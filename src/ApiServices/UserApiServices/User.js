import apiInstance from "../../ApiInstance/apiInstance";

export const getuserapicall = async () => {
  const response = await apiInstance.get("/v1/user/get-user");
  return response.data;
};
