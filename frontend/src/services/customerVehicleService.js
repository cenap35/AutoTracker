import api from "../api/axios";

export const getCustomerVehicles = async () => {
  const response = await api.get("/customervehicles");
  return response.data;
};

export const createCustomerVehicle = async (vehicle) => {
  const response = await api.post("/customervehicles", vehicle);
  return response.data;
};

export const getCustomerVehicleById = async (id) => {
  const response = await api.get(`/customervehicles/${id}`);
  return response.data;
};

export const updateCustomerVehicle = async (id, vehicle) => {
  const response = await api.put(`/customervehicles/${id}`, vehicle);
  return response.data;
};

export const deleteCustomerVehicle = async (id) => {
  await api.delete(`/customervehicles/${id}`);
};
