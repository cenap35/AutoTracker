import api from "../api/axios";

export const getAccountTransactions = async () => {
  const response = await api.get("/serviceaccounttransactions");
  return response.data;
};

export const getAccountTransactionStats = async () => {
  const response = await api.get("/serviceaccounttransactions/stats");
  return response.data;
};

export const createAccountTransaction = async (transaction) => {
  const response = await api.post("/serviceaccounttransactions", transaction);
  return response.data;
};

export const updateAccountTransaction = async (id, transaction) => {
  const response = await api.put(
    `/serviceaccounttransactions/${id}`,
    transaction,
  );
  return response.data;
};

export const deleteAccountTransaction = async (id) => {
  await api.delete(`/serviceaccounttransactions/${id}`);
};

export const markAccountTransactionPaid = async (id) => {
  const response = await api.post(
    `/serviceaccounttransactions/${id}/mark-paid`,
  );
  return response.data;
};

export const createAccountTransactionFromWorkOrder = async (workOrderId) => {
  const response = await api.post(
    `/serviceaccounttransactions/from-work-order/${workOrderId}`,
  );

  return response.data;
};
