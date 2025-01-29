import apiInstance from "../../../ApiInstance/apiInstance";
// create designation

export const createrolesapicall = async (value) => {
  const repsonse = await apiInstance.post("/v1/master/create-roles", value);
  return repsonse.data;
};

// fetch designation
export const fetchroleapicall = async () => {
  const response = await apiInstance.get("/v1/master/fetch-roles");
  return response.data;
};
