import apiInstance from "../../ApiInstance/apiInstance";

// client
export const downloadclientcsvformate = async () => {
  const response = await apiInstance.get("/v1/csv-upload/client-csv-download");
  return response.data;
};

// employee
export const downloadEmployeecsvformate = async () => {
  const response = await apiInstance.get(
    "/v1/csv-upload/employee-csv-download"
  );
  return response.data;
};

//   contractor
export const downloadcontractorcsvformate = async () => {
  const response = await apiInstance.get(
    "/v1/csv-upload/contractor-csv-download"
  );
  return response.data;
};
