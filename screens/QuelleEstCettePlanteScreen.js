import React from "react";
import { View, Text, StyleSheet } from "react-native";

const QuelleEstCettePlanteScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Quelle est cette Plante?</Text>
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

export default QuelleEstCettePlanteScreen;
