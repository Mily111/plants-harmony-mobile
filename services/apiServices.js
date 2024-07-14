// services/apiServices.js
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// export const baseURL = "http://172.20.10.6:5000/api";
export const baseURL = "http://192.168.1.50:5000/api";
// export const baseURL = "http://192.168.240.201:5000/api";

const apiClient = axios.create({
  baseURL: baseURL,
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

// intercepteur pour inclure le jeton dans les en-têtes des requêtes
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

// export const getAvailableTrades = async () => {
//   try {
//     const response = await apiClient.get("/trades/available");
//     return response.data;
//   } catch (error) {
//     console.error("Erreur lors de la récupération des données", error);
//     throw error;
//   }
// };

export const getAvailablePlants = async () => {
  try {
    const response = await apiClient.get("/plants/available");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des plantes disponibles",
      error
    );
    throw error;
  }
};

export const getUserPlants = async (userId) => {
  try {
    const response = await apiClient.get(`/plants/getUserPlant/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des plantes de l'utilisateur",
      error
    );
    throw error;
  }
};

export const deleteUserPlant = async (plantId) => {
  try {
    const response = await apiClient.delete(
      `/plants/deleteUserPlant/${plantId}`
    );
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la suppression de la plante", error);
    throw error;
  }
};

export const addPlantSuggestion = async (formData) => {
  try {
    const response = await apiClient.post("/plants/plantSuggestion", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de la plante suggérée", error);
    throw error;
  }
};

export const fetchPlantNames = async () => {
  try {
    const response = await apiClient.get("/plants/plantsName");
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des noms de plantes", error);
    throw error;
  }
};

export const updatePlantState = async (plantId, stateExchange) => {
  try {
    const response = await apiClient.put(`/plants/${plantId}/state`, {
      state_exchange: stateExchange,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating plant state", error);
    throw error;
  }
};
export const addInteraction = async (
  user_id,
  plant_id,
  id_interaction_type,
  created_at
) => {
  try {
    const response = await apiClient.post("/interactions/add", {
      user_id,
      plant_id,
      id_interaction_type,
      created_at,
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'interaction", error);
    throw error;
  }
};

export const getInteractionsForUser = async (userId) => {
  try {
    const response = await apiClient.get(`/interactions/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des interactions", error);
    throw error;
  }
};

export const fetchInteractionTypes = async () => {
  try {
    const response = await apiClient.get("/interactions/types");
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des types d'interaction",
      error
    );
    throw error;
  }
};

export const getPlantCareSummary = async (userId) => {
  try {
    const response = await apiClient.get(`/plants/careSummary/${userId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du résumé des soins des plantes",
      error
    );
    throw error;
  }
};

export const getUserPlantsWithInteractions = async (userId) => {
  try {
    const response = await apiClient.get(
      `/plants/user/${userId}/plantsInteractions`
    );
    return response.data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération du résumé des soins des plantes",
      error
    );
    throw error;
  }
};
