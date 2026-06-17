import api from "../api/axios";

export const getCustomerVehicles = async () => {
  const response = await api.get("/customervehicles");
  return response.data;
};

export const createCustomerVehicle = async (vehicle) => {
  const response = await api.post("/customervehicles", vehicle);
  return response.data;
};