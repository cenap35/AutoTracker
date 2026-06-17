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

export const updateWorkOrderStatus = async (id, status) => {
  const response = await api.put(
    `/serviceworkorders/${id}/status`,
    JSON.stringify(status),
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const updateServiceWorkOrder = async (id, workOrder) => {
  const response = await api.put(`/serviceworkorders/${id}`, workOrder);

  return response.data;
};

