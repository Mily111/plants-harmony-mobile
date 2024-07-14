import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserPlantsWithInteractions } from "../services/apiServices";

const UserPlantsWithInteractionsScreen = () => {
  const [plantsWithInteractions, setPlantsWithInteractions] = useState([]);

  useEffect(() => {
    const fetchUserPlantsWithInteractions = async () => {
      try {
        const userId = await AsyncStorage.getItem("userId");
        const data = await getUserPlantsWithInteractions(userId);
        setPlantsWithInteractions(data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du résumé des soins des plantes",
          error
        );
      }
    };

    fetchUserPlantsWithInteractions();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.plantName}>{item.name_plant}</Text>
      <Text style={styles.detail}>Quantité : {item.quantity_possess}</Text>
      <Text style={styles.detail}>État : {item.state_exchange}</Text>
      <Text style={styles.detail}>
        Dernier soin : {item.label_interaction_type || "N/A"}
      </Text>
      <Text style={styles.detail}>
        Date du dernier soin : {item.interaction_date || "N/A"}
      </Text>
      <Text style={styles.detail}>Historique des soins :</Text>
      {item.interactions && item.interactions.length > 0 ? (
        item.interactions.map((interaction, index) => (
          <View key={index} style={styles.interactionContainer}>
            <Text style={styles.detail}>
              Type : {interaction.label_interaction_type}
            </Text>
            <Text style={styles.detail}>
              Date : {interaction.date_interaction}
            </Text>
          </View>
        ))
      ) : (
        <Text style={styles.detail}>Aucun soin trouvé</Text>
      )}
    </View>
  );

  return (
    <FlatList
      data={plantsWithInteractions}
      keyExtractor={(item) => item.Id_plante_suggested.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  itemContainer: {
    backgroundColor: "#E0F2F1",
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  plantName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  detail: {
    fontSize: 14,
  },
  interactionContainer: {
    marginTop: 8,
    padding: 8,
    backgroundColor: "#FFF",
    borderRadius: 8,
  },
});

export default UserPlantsWithInteractionsScreen;
