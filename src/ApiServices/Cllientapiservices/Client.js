import apiInstance from "../../ApiInstance/apiInstance";

export const fetchclientprojectapicall = async () => {
  const response = await apiInstance.get("/v2/client/client-project");
  return response.data;
};
export const fetchclientactiveprojectapicall = async () => {
  const response = await apiInstance.get("/v2/client/client-active-project");
  return response.data;
};

export const fetchclientinactiveprojectapicall = async () => {
  const response = await apiInstance.get("/v2/client/client-inactive-project");
  return response.data;
};

// fetch client Task
export const fetchclientprojectaskapicall = async () => {
  const response = await apiInstance.get("/v2/client/client-project-task");
  return response.data;
};

export const fetchclientprojecttimesheetapicall = async () => {
  const repsonse = await apiInstance.get("/v2/client/client-project-timesheet");
  return repsonse.data;
};
export const fetchclientprojectinfoapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/client/client-single-project/${value}`
  );

  return response.data;
};

export const fetchclienttimesheetinfoapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/client/client-project-timesheet/${value}`
  );
  return response.data;
};

export const fetchclienttaskinfoapicall = async (value) => {
  const response = await apiInstance.get(
    `/v2/client/client-project-task/${value}`
  );
  return response.data;
};

export const approveclienttimesheetapicall = async (value) => {
  const response = await apiInstance.put(
    `/v2/client/client-approve-timesheet/${value.id}`,
    value.payload
  );
  return response.data;
};

export const disapprovetimesheetapicall = async (value) => {
  const response = await apiInstance.put(
    `/v2/client/client-disapprove-timesheet/${value.id}`,
    value.payload
  );
  return response.data;
};
