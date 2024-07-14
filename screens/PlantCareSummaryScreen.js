import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getPlantCareSummary } from "../services/apiServices";

const PlantCareSummary = () => {
  const [plantCareData, setPlantCareData] = useState([]);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
      if (id) {
        try {
          const data = await getPlantCareSummary(id);
          setPlantCareData(data);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération du résumé des soins des plantes",
            error
          );
        }
      }
    };

    fetchUserData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.plantName}>{item.name_plant}</Text>
      <Text style={styles.label}>Dernier soin :</Text>
      <Text style={styles.value}>{item.label_interaction_type || "N/A"}</Text>
      <Text style={styles.label}>Date :</Text>
      <Text style={styles.value}>
        {item.interaction_date
          ? new Date(item.interaction_date).toLocaleDateString()
          : "N/A"}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Résumé des soins des plantes</Text>
      <FlatList
        data={plantCareData}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id_plante_suggested.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E0F2F1",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
    color: "#00796B",
  },
  itemContainer: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 5,
    marginBottom: 10,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#00796B",
  },
  label: {
    fontSize: 16,
    color: "#00796B",
    marginTop: 8,
  },
  value: {
    fontSize: 16,
    color: "#00796B",
  },
});

export default PlantCareSummary;
