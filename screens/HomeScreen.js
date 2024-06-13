import React from "react";
import { View, Text, StyleSheet } from "react-native";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue chez PlantsHarmony</Text>
      <Text style={styles.paragraph}>
        PlantsHarmony, là où la passion pour les plantes rencontre la
        technologie pour créer une expérience florale exceptionnelle.
      </Text>
      <Text style={styles.paragraph}>
        📸 Capturez la beauté, découvrez l'intelligence. Prenez une photo de
        votre plante mystère, laissez notre intelligence artificielle révéler
        son nom et ses secrets. Une expérience intuitive qui ajoute une touche
        de fascination à votre aventure végétale.
      </Text>
      <Text style={styles.paragraph}>
        🌱 Partagez, Échangez, Prospérez. Dans notre communauté PlantsHarmony,
        partagez vos connaissances, échangez des boutures et créez des liens
        avec des passionnés de plantes du monde entier. Cultivez non seulement
        des plantes, mais aussi des amitiés et une compréhension plus profonde
        de la nature.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#E0F2F1", // Vert turquoise pastel
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#00796B", // Bleu vert
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 15,
  },
});

export default HomeScreen;
