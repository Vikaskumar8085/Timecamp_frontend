import apiInstance from "../../ApiInstance/apiInstance";

export const createprojectapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/create-projects", value);
  return response.data;
};

export const fetchprojectapicall = async (value) => {
  const response = await apiInstance.get("/v1/admin/fetch-projects", value);
  return response.data;
};

// Active projects
export const fetchactiveprojectsapicall = async (value) => {
  const response = await apiInstance.get(
    "/v1/admin/fetch-active-projects",
    value
  );
  return response.data;
};

// In active projects

export const fetchinactiveprojectsapicall = async (value) => {
  const response = await apiInstance.get("/v1/admin/fetch-inactive-projects",value);
  return response.data;
};
// fetch single project api call
export const fetchsingleprojectapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-single-project/${value}`
  );

  return response.data;
};

// fetch staffmemebers

export const fetchstaffmembersapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-staff-members");
  return response.data;
};

export const fetchprojecttimesheetapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-project-timesheet/${value}`
  );
  return response.data;
};
