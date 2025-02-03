import apiInstance from "../../ApiInstance/apiInstance";

export const createprojectapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/create-projects", value);
  return response.data;
};

export const fetchprojectapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-projects");
  return response.data;
};

// Active projects
export const fetchactiveprojectsapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-active-projects");
  return response.data;
};

// In active projects

export const fetchinactiveprojectsapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-inactive-projects");
  return response.data;
};
// fetch single project api call
export const fetchsingleprojectapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-single-project/${value}`
  );

  return response.data;
};
