import apiInstance from "../../../ApiInstance/apiInstance";

export const createclientapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/create-client", value);
  return response.data;
};

export const fetchclientapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-client");
  return response.data;
};
