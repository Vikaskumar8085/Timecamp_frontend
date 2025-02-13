import apiInstance from "../../ApiInstance/apiInstance";

export const fetchclientprojectapicall = async () => {
  const response = await apiInstance("/v2/client/client-project");
  return response.data;
};
export const fetchclientactiveprojectapicall = async () => {
  const response = await apiInstance("/v2/client/client-active-project");
  return response.data;
};

export const fetchclientinactiveprojectapicall = async () => {
  const response = await apiInstance("/v2/client/client-inactive-project");
  return response.data;
};
