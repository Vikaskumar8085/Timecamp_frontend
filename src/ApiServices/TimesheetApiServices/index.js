import apiInstance from "../../ApiInstance/apiInstance";

export const fetchtimesheetapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-timesheet");
  return response.data;
};

// Timesummary api service
export const fetchtotalhourbyresourcesapicall = async () => {
  const response = await apiInstance.get("/v2/timesheet/totalhourbyresources");
  return response.data;
};

export const fetchProjectTimeapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-project-time");
  return response.data;
};
