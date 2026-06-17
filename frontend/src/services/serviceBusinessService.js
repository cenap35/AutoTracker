import api from "../api/axios";

export const getMyServiceBusiness = async () => {
  const response = await api.get("/servicebusinesses/me");
  return response.data;
};

export const updateMyServiceBusiness = async (business) => {
  const response = await api.put(
    "/servicebusinesses/me",
    business
  );

  return response.data;
};