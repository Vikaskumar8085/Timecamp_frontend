import apiInstance from "../../../ApiInstance/apiInstance";
// create designation

export const createdesignationapicall = async (value) => {
  console.log(value, "value");
  const repsonse = await apiInstance.post(
    "/v1/master/create-designation",
    value
  );

  // console.log(response, "data");
  return await repsonse.data;
};

// fetch designation
export const fetchdesignationapicall = async () => {
  const response = await apiInstance.get("/v1/master/fetch-designation");
  return response.data;
};
