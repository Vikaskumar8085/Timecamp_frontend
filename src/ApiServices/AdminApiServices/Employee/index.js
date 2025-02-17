import apiInstance from "../../../ApiInstance/apiInstance";

// add employee api call
export const addemployeeapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/create-employee", value);
  return response.data;
};

// fetch employee api call

export const fetchemployeeapicall = async () => {
  const repsonse = await apiInstance.get("/v1/admin/fetch-employee");
  return repsonse.data;
};

// fetch active employee api call

export const fetchactiveemployeeapicall = async () => {
  const repsonse = await apiInstance.get("/v1/admin/fetch-active-employee");
  return repsonse.data;
};

// fetch inactive api call

export const fetchinactiveemployeeapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-inactive-employee");
  return response.data;
};

export const fetchsingleemployeeapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-single-employee/${value}`
  );
  return response.data;
};

export const fetchemployeeprojectapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-employee-project/${value}`
  );
  return response.data;
};
