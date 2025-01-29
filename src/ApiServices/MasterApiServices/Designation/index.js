import apiInstance from "../../../ApiInstance/apiInstance";
// create designation

export const createdesignationapicall = async (value) => {
  const repsonse = await apiInstance.post(
    "/v1/master/create-designation",
    value
  );
  return repsonse.data;
};

// fetch designation
export const fetchdesignationapicall = async () => {
  const response = await apiInstance.get("/v1/master/fetch-designation");
  return response.data;
};
