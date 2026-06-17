import api from "../api/axios";

export const getCustomers = async () => {
  const response = await api.get("/servicecustomers");
  return response.data;
};

export const createCustomer = async (customer) => {
  const response = await api.post("/servicecustomers", customer);
  return response.data;
};

export const getCustomerById = async (id) => {
  const response = await api.get(`/servicecustomers/${id}`);
  return response.data;
};

export const updateCustomer = async (id, customer) => {
  const response = await api.put(
    `/servicecustomers/${id}`,
    customer
  );

  return response.data;
};

export const deleteCustomer = async (id) => {
  await api.delete(`/servicecustomers/${id}`);
};