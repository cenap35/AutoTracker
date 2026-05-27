import api from "../api/axios";

export const getVehicleReminders = async () => {
  const response = await api.get("/VehicleReminders");
  return response.data;
};

export const createVehicleReminder = async (reminderData) => {
  const response = await api.post("/VehicleReminders", reminderData);
  return response.data;
};

export const updateVehicleReminder = async (id, reminderData) => {
  const response = await api.put(`/VehicleReminders/${id}`, reminderData);
  return response.data;
};

export const deleteVehicleReminder = async (id) => {
  const response = await api.delete(`/VehicleReminders/${id}`);
  return response.data;
};