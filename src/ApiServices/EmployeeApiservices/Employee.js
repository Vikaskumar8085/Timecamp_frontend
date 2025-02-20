import apiInstance from "../../ApiInstance/apiInstance";

export const fetchemployeeprojectsapicall = async () => {
  const response = await apiInstance.get("/v2/employee/employee-project");
  return response.data;
};

export const fetchemployeeactiveprojectapicall = async () => {
  const response = await apiInstance.get(
    "/v2/employee/employee-active-project"
  );
  return response.data;
};

export const fetchemployeeinactiveprojectapicall = async () => {
  const response = await apiInstance.get(
    "/v2/employee/employee-inactive-project"
  );
  return response.data;
};

// fetch project timesheet

export const fetchemployeeprojecttimesheetapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/employee/fetch-employee-project-timesheet/${value}`
  );
  return response.data;
};

// fetch project information
export const fetchemployeeprojectinformationapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/employee/fetch-employee-project-information/${value}`
  );
  return response.data;
};

export const fetchemployeeprojecttaskapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/employee/fetch-employee-project-tasks/${value}`
  );
  return response.data;
};

// fetch employee timesheet api call

export const fetchemployeetimesheetapicall = async () => {
  const response = await apiInstance.get(
    "/v2/employee/fetch-employee-timesheet"
  );
  return response.data;
};

// fetch employee task api call

export const fetchemployeetaskapicall = async () => {
  const response = await apiInstance.get("/v2/employee/fetch-employee-tasks");
  return response.data;
};

// fill employee timesheet apicall
export const fillemployeetimesheetapicall = async (value) => {
  const response = await apiInstance.post("/fill-project-timesheet", value);
  return response.data;
};
