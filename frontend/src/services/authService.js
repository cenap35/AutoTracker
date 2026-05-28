import api from "../api/axios";

export const login = async (email, password) => {
  const response = await api.post("/auth/login", {
    email,
    password,
  });

  return response.data;
};

export const register = async (fullName, email, password) => {
  const response = await api.post("/auth/register", {
    fullName,
    email,
    password,
  });

  return response.data;
};

export const resendConfirmationEmail = async (email) => {
  const response = await api.post("/auth/resend-confirmation-email", {
    email,
  });

  return response.data;
};

export const forgotPassword = async (email) => {
  const response = await api.post("/auth/forgot-password", {
    email,
  });

  return response.data;
};

export const resetPassword = async (token, newPassword, confirmNewPassword) => {
  const response = await api.post("/auth/reset-password", {
    token,
    newPassword,
    confirmNewPassword,
  });

  return response.data;
};

export const changePassword = async (passwordData) => {
  const response = await api.post("/auth/change-password", passwordData);
  return response.data;
};

export const deleteAccount = async () => {
  const response = await api.delete("/auth/delete-account");
  return response.data;
};
