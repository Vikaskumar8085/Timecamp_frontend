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
