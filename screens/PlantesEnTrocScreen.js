import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAvailableTrades, baseURL } from "../services/apiServices";

const PlantesEnTrocScreen = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getAvailableTrades()
      .then((data) => {
        setPlants(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  const renderItem = ({ item }) => {
    const imageUrl = item.photo
      ? `${baseURL.replace("/api", "")}/${item.photo}`
      : null;
    return (
      <View style={styles.card}>
        {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
        <Text style={styles.name}>{item.name_plant}</Text>
        <Text style={styles.username}>Proposé par : {item.username}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Plantes disponibles pour échange</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={plants}
        renderItem={renderItem}
        keyExtractor={(item, index) =>
          item.id ? item.id.toString() : index.toString()
        }
        contentContainerStyle={styles.list}
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
  error: {
    color: "red",
    textAlign: "center",
    marginBottom: 16,
  },
  list: {
    paddingBottom: 16,
  },
  card: {
    backgroundColor: "#fff",
    marginBottom: 16,
    padding: 16,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 2,
  },
  image: {
    width: "100%",
    height: 200,
    marginBottom: 8,
    borderRadius: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#00796B",
  },
});

export default PlantesEnTrocScreen;
