import api from "../api/axios";

export const getCustomers = async () => {
  const response = await api.get("/servicecustomers");
  return response.data;
};

export const createCustomer = async (customer) => {
  const response = await api.post("/servicecustomers", customer);
  return response.data;
};
