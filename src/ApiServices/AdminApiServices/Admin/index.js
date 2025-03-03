import apiInstance from "../../../ApiInstance/apiInstance";

export const createadminapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/create-admin", value);
  return response.data;
};

export const fetchadminapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-admin");
  return response.data;
};

// fetch staff
export const fetchstaffmemberapicall = async () => {
  const response = await apiInstance.get("/v1/admin//fetch-staffmembers");
  return response.data;
};

// fetch user notification

export const fetchuserNotificationapicall = async () => {
  const response = await apiInstance.get("/v1/user/fetch-user-notification");
  return response.data;
};
