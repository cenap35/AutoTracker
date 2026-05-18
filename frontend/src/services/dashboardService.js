import api from "../api/axios";

export const getDashboardSummary = async () => {
  const response = await api.get("/dashboard/summary");

  return response.data;
};

export const getRecentMaintenance = async () => {
  const response = await api.get("/dashboard/recent-maintenance");
  return response.data;
};