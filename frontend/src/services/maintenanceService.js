import api from "../api/axios";

export const getMaintenanceRecords = async (vehicleId) => {
  const response = await api.get(`/vehicles/${vehicleId}/maintenance-records`);

  return response.data;
};

export const createMaintenanceRecord = async (vehicleId, recordData) => {
  const response = await api.post(
    `/vehicles/${vehicleId}/maintenance-records`,
    recordData,
  );

  return response.data;
};

export const deleteMaintenanceRecord = async (vehicleId, recordId) => {
  await api.delete(`/vehicles/${vehicleId}/maintenance-records/${recordId}`);
};
