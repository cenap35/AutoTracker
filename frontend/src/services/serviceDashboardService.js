import api from "../api/axios";

export const getServiceDashboard = async () => {
  const response = await api.get("/servicedashboard");
  return response.data;
};