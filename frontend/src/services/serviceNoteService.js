import api from "../api/axios";

export const getNotes = async () => {
  const response = await api.get("/ServiceNotes");
  return response.data;
};

export const createNote = async (note) => {
  const response = await api.post("/ServiceNotes", note);
  return response.data;
};

export const updateNote = async (id, note) => {
  const response = await api.put(`/ServiceNotes/${id}`, note);
  return response.data;
};

export const toggleNote = async (id) => {
  const response = await api.put(`/ServiceNotes/${id}/toggle`);
  return response.data;
};

export const deleteNote = async (id) => {
  await api.delete(`/ServiceNotes/${id}`);
};
