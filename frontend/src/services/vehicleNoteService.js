import api from "../api/axios";

export const getVehicleNotes = async () => {
  const response = await api.get("/VehicleNotes");
  return response.data;
};

export const createVehicleNote = async (noteData) => {
  const response = await api.post("/VehicleNotes", noteData);
  return response.data;
};

export const updateVehicleNote = async (id, noteData) => {
  const response = await api.put(`/VehicleNotes/${id}`, noteData);
  return response.data;
};

export const deleteVehicleNote = async (id) => {
  const response = await api.delete(`/VehicleNotes/${id}`);
  return response.data;
};