import apiInstance from "../../ApiInstance/apiInstance";

export const fetchContractorprojectsapicall = async () => {
  const response = await apiInstance.get("/v2/contractor/contractor-project");
  return response.data;
};

export const fetchcontractoractiveprojectapicall = async () => {
  const response = await apiInstance.get(
    "/v2/contractor/contractor-active-project"
  );
  return response.data;
};

export const fetchcontractorinactiveprojectapicall = async () => {
  const response = await apiInstance.get(
    "/v2/contracotr/contractor-inactive-project"
  );
  return response.data;
};

export const fetchcontractorprojectinformationapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/contractor/fetch-contractor-single-project/${value}`
  );
  return response.data;
};

export const fetchcontractorprojecttimesheetapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/contractor/contract-project-timesheet/${value}`
  );
  return response.data;
};

export const fetchcontractorprojecttasksapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/contractor/contractor-project-task/${value}`
  );
  return response.data;
};

export const fetchcontractortimesheetapicall = async () => {
  const response = await apiInstance.get(
    "/v2/contractor/fetch-contractor-timesheet"
  );
  return response.data;
};

export const fillcontractorprojecttimesheetapicall = async (value) => {
  const response = await apiInstance.post(
    "/v2/contracotr/fill-contractor-project-timesheet",
    value
  );
  return response.data;
};

export const fetchcontractortaskapicall = async () => {
  const response = await apiInstance.get(
    "/v2/contractor/fetch-contractor-tasks"
  );
  return response.data;
};
