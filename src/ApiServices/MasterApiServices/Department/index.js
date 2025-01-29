import apiInstance from "../../../ApiInstance/apiInstance";

export const createdepartmentapicall = async (value) => {
  const response = await apiInstance.post(
    "/v1/master/create-department",
    value
  );
  return response.data;
};

export const fetchdepartmentapicall = async () => {
  const response = await apiInstance.get("v1/master/fetch-department");
  return response.data;
};
