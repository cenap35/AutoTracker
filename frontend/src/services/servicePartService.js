import api from "../api/axios";

export const getParts = async () => {
  const response = await api.get("/serviceparts");
  return response.data;
};

export const createPart = async (part) => {
  const response = await api.post("/serviceparts", part);
  return response.data;
};

export const updatePart = async (id, part) => {
  const response = await api.put(`/serviceparts/${id}`, part);
  return response.data;
};

export const deletePart = async (id) => {
  await api.delete(`/serviceparts/${id}`);
};