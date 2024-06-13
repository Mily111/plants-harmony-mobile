import React, { useEffect } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

const LogoutScreen = ({ navigation }) => {
  useEffect(() => {
    // Lorsque le composant est monté, déconnectez l'utilisateur et redirigez-le vers la page de connexion
    navigation.replace("Login");
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Déconnexion en cours...</Text>
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
  text: {
    fontSize: 18,
    color: "#00796B", // Bleu vert
  },
});

export default LogoutScreen;
