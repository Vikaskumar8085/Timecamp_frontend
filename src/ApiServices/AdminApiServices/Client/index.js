import apiInstance from "../../../ApiInstance/apiInstance";

export const createclientapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/create-client", value);
  return response.data;
};

export const fetchclientapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-client");
  return response.data;
};

export const fetchactiveclientapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-active-client");
  return response.data;
};

export const fetchinactiveclientapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-inactive-client");
  return response.data;
};

export const fetchdeadclientapicall = async () => {
  const response = await apiInstance.get("/v1/admin/fetch-dead-client");
  return response.data;
};

export const fetchsignleclientapicall = async (value) => {
  const response = await apiInstance.get(
    `/v1/admin/fetch-single-client/${value}`
  );
  return response.data;
};

// fetch client projects
export const fetchclientprojectsapicall = async (value) => {
  console.log(value, "afsdfasdf");
  const response = await apiInstance.get(
    `/v1/admin/fetch-client-projects/${value}`
  );
  return response.data;
};
