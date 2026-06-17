import api from "../api/axios";

export const getServiceWorkOrders = async () => {
  const response = await api.get("/serviceworkorders");
  return response.data;
};

export const createServiceWorkOrder = async (workOrder) => {
  const response = await api.post("/serviceworkorders", workOrder);
  return response.data;
};

export const getServiceWorkOrderById = async (id) => {
  const response = await api.get(`/serviceworkorders/${id}`);
  return response.data;
};