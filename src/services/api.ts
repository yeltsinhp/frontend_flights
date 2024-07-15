import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:3000/orchestrator/",
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  return config;
});

export default apiClient;
