import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const Menu = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.menuContainer}>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.menuText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("MesPlantes")}
      >
        <Text style={styles.menuText}>Mes Plantes</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("PlantesEnTroc")}
      >
        <Text style={styles.menuText}>Plantes en Troc</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate("QuelleEstCettePlante")}
      >
        <Text style={styles.menuText}>Quelle est cette Plante?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  menuContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
    backgroundColor: "#E0F2F1", // Vert turquoise pastel
  },
  menuItem: {
    padding: 10,
  },
  menuText: {
    color: "#00796B", // Vert foncé
    fontSize: 16,
  },
});

export default Menu;
