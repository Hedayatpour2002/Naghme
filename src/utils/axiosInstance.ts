import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://localhost:443",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const removeAuthHeader = () => {
  delete apiClient.defaults.headers.common["Authorization"];
};
export default apiClient;
