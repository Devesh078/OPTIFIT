import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.1.37:5000/api",
});

export default api;
/*
// Attach token automatically
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;*/