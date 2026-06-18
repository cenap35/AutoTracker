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

export const sellPart = async (id, quantity) => {
  const response = await api.post(`/serviceparts/${id}/sell`, {
    quantity: Number(quantity),
  });

  return response.data;
};

export const getPartStats = async () => {
  const response = await api.get("/serviceparts/stats");
  return response.data;
};

export const getMonthlyPartStats = async () => {
  const response = await api.get("/serviceparts/monthly-stats");
  return response.data;
};

export const getTopPartSales = async () => {
  const response = await api.get("/serviceparts/top-sales");
  return response.data;
};

export const getPartSales = async () => {
  const response = await api.get("/serviceparts/sales");
  return response.data;
};

export const downloadPartReportPdf = async ({ year, month } = {}) => {
  const params = {};

  if (year) params.year = year;
  if (month) params.month = month;

  const response = await api.get("/serviceparts/report-pdf", {
    params,
    responseType: "blob",
  });

  return response.data;
};