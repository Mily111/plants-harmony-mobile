import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://172.20.10.6:5000/api",
  timeout: 5000,
});

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
