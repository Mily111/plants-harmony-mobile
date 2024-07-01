import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const apiClient = axios.create({
  baseURL: "http://172.20.10.6:5000/api",
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

// Ajouter un intercepteur pour inclure le jeton dans les en-têtes des requêtes
apiClient.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("userToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'envoi des données", error);
    throw error;
  }
};

// Ajoutez d'autres méthodes si nécessaire
