import apiInstance from "../../ApiInstance/apiInstance";

export const loginapicall = async (value) => {
  const response = await apiInstance.post("", value);
  return response.data;
};

export const signupapicall = async (value) => {
  const response = await apiInstance.post("".value);
  return response.data;
};
