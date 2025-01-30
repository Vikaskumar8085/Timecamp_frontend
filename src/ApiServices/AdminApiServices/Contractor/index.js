import apiInstance from "../../../ApiInstance/apiInstance";
// create contractor
export const addContractorapicall = async (value) => {
  const response = await apiInstance.post("/v1/admin/create-contractor", value);
  return response.data;
};

// fetch contractor
export const fetchcontractorapicall = async () => {
  const response = await apiInstance.post("/v1/admin/fetch-contractor");
  return response.data;
};

// fetch active contractor
export const fetchactivecontractorapicall = async () => {
  const response = await apiInstance.post("/v1/admin/fetch-active-contractor");
  return response.data;
};

//   fetch inactive contracotr
export const fetchinactivecontractorapicall = async () => {
  const response = await apiInstance.post(
    "/v1/admin/fetch-inactive-contractor"
  );
  return response.data;
};
