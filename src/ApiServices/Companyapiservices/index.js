import apiInstance from "../../ApiInstance/apiInstance";

export const createcompanyapicall = async (value) => {
  const repsonse = await apiInstance.post("/", value);
  return repsonse.data;
};

export const fetchcompanyapicall = async () => {
  const response = await apiInstance.get("/");
  return response.data;
};
