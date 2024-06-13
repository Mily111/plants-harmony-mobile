import React from "react";
import { View, Text, StyleSheet } from "react-native";

const PlantesEnTrocScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Plantes en Troc</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E0F2F1", // Vert turquoise pastel
  },
});

export default PlantesEnTrocScreen;
