// import React, { useEffect, useState } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   Image,
//   StyleSheet,
//   SafeAreaView,
//   TouchableOpacity,
//   Alert,
// } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import {
//   getUserPlants,
//   deleteUserPlant,
//   updatePlantState, // Importer la fonction updatePlantState
//   baseURL,
// } from "../services/apiServices";

// const MesPlantesScreen = ({ navigation }) => {
//   const [plants, setPlants] = useState([]);
//   const [error, setError] = useState(null);
//   const [userId, setUserId] = useState(null);

//   useEffect(() => {
//     async function fetchUserId() {
//       const id = await AsyncStorage.getItem("userId");
//       setUserId(id);
//     }

//     async function fetchUserPlants() {
//       try {
//         if (userId) {
//           const data = await getUserPlants(userId);
//           setPlants(data);
//         }
//       } catch (err) {
//         console.error(
//           "Erreur lors de la récupération des plantes de l'utilisateur :",
//           err
//         );
//         setError(err.message);
//       }
//     }

//     fetchUserId().then(fetchUserPlants);
//   }, [userId]);

//   const handleDeletePlant = async (plantId) => {
//     Alert.alert(
//       "Supprimer Plante",
//       "Êtes-vous sûr de vouloir supprimer cette plante?",
//       [
//         {
//           text: "Annuler",
//           style: "cancel",
//         },
//         {
//           text: "Supprimer",
//           onPress: async () => {
//             try {
//               await deleteUserPlant(plantId);
//               setPlants(
//                 plants.filter((plant) => plant.Id_plante_suggested !== plantId)
//               );
//               Alert.alert("Succès", "Plante supprimée avec succès!");
//             } catch (err) {
//               Alert.alert(
//                 "Erreur",
//                 "Erreur lors de la suppression de la plante."
//               );
//               console.error(err);
//             }
//           },
//         },
//       ]
//     );
//   };

//   const handleUpdatePlantState = async (plantId, currentState) => {
//     const newState =
//       currentState === "disponible" ? "indisponible" : "disponible";
//     try {
//       await updatePlantState(plantId, newState);
//       setPlants((prevPlants) =>
//         prevPlants.map((plant) =>
//           plant.Id_plante_suggested === plantId
//             ? { ...plant, state_exchange: newState }
//             : plant
//         )
//       );
//       Alert.alert("Succès", "État de la plante mis à jour avec succès!");
//     } catch (err) {
//       Alert.alert(
//         "Erreur",
//         "Erreur lors de la mise à jour de l'état de la plante."
//       );
//       console.error(err);
//     }
//   };

//   const handleAddPlant = () => {
//     navigation.navigate("AddPlant", {
//       onPlantAdded: () => {
//         fetchUserPlants(); // Rafraîchir la liste des plantes après l'ajout
//       },
//     });
//   };

//   const renderItem = ({ item }) => {
//     const imageUrl = `${baseURL.replace("/api", "")}/${item.photo}`;
//     return (
//       <View style={styles.card}>
//         <Image source={{ uri: imageUrl }} style={styles.image} />
//         <Text style={styles.name}>{item.name_plant}</Text>
//         <Text style={styles.state}>{item.state_exchange}</Text>
//         <TouchableOpacity
//           style={styles.updateButton}
//           onPress={() =>
//             handleUpdatePlantState(
//               item.Id_plante_suggested,
//               item.state_exchange
//             )
//           }
//         >
//           <Text style={styles.updateButtonText}>Changer l'état</Text>
//         </TouchableOpacity>
//         <TouchableOpacity
//           style={styles.deleteButton}
//           onPress={() => handleDeletePlant(item.Id_plante_suggested)}
//         >
//           <Text style={styles.deleteButtonText}>Supprimer</Text>
//         </TouchableOpacity>
//       </View>
//     );
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <Text style={styles.title}>Mes Plantes</Text>
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//       <FlatList
//         data={plants}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.Id_plante_suggested.toString()}
//         contentContainerStyle={styles.list}
//       />
//       <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
//         <Text style={styles.addButtonText}>Ajouter une plante</Text>
//       </TouchableOpacity>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#E0F2F1",
//     padding: 16,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: "bold",
//     marginBottom: 16,
//     textAlign: "center",
//     color: "#00796B",
//   },
//   error: {
//     color: "red",
//     textAlign: "center",
//     marginBottom: 16,
//   },
//   list: {
//     paddingBottom: 16,
//   },
//   card: {
//     backgroundColor: "#fff",
//     marginBottom: 16,
//     padding: 16,
//     borderRadius: 8,
//     shadowColor: "#000",
//     shadowOpacity: 0.1,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 8,
//     elevation: 2,
//   },
//   image: {
//     width: "100%",
//     height: 200,
//     marginBottom: 8,
//     borderRadius: 8,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 4,
//   },
//   state: {
//     fontSize: 16,
//     color: "#00796B",
//     marginBottom: 8,
//   },
//   updateButton: {
//     backgroundColor: "#00796B",
//     padding: 10,
//     borderRadius: 5,
//     marginBottom: 8,
//   },
//   updateButtonText: {
//     color: "#fff",
//     textAlign: "center",
//   },
//   deleteButton: {
//     backgroundColor: "#E57373",
//     padding: 10,
//     borderRadius: 5,
//     marginTop: 10,
//   },
//   deleteButtonText: {
//     color: "#fff",
//     textAlign: "center",
//   },
//   addButton: {
//     backgroundColor: "#00796B",
//     padding: 15,
//     borderRadius: 5,
//     marginTop: 20,
//     alignItems: "center",
//   },
//   addButtonText: {
//     color: "#fff",
//     fontWeight: "bold",
//     fontSize: 16,
//   },
// });

// export default MesPlantesScreen;

import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getUserPlants,
  deleteUserPlant,
  updatePlantState,
  baseURL,
} from "../services/apiServices";

const MesPlantesScreen = ({ navigation }) => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    async function fetchUserId() {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    }

    async function fetchUserPlants() {
      try {
        if (userId) {
          const data = await getUserPlants(userId);
          setPlants(data);
        }
      } catch (err) {
        console.error(
          "Erreur lors de la récupération des plantes de l'utilisateur :",
          err
        );
        setError(err.message);
      }
    }

    fetchUserId().then(fetchUserPlants);
  }, [userId]);

  const handleDeletePlant = async (plantId) => {
    Alert.alert(
      "Supprimer Plante",
      "Êtes-vous sûr de vouloir supprimer cette plante?",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Supprimer",
          onPress: async () => {
            try {
              await deleteUserPlant(plantId);
              setPlants(
                plants.filter((plant) => plant.Id_plante_suggested !== plantId)
              );
              Alert.alert("Succès", "Plante supprimée avec succès!");
            } catch (err) {
              Alert.alert(
                "Erreur",
                "Erreur lors de la suppression de la plante."
              );
              console.error(err);
            }
          },
        },
      ]
    );
  };

  const handleUpdatePlantState = async (plantId, currentState) => {
    const newState =
      currentState === "disponible" ? "indisponible" : "disponible";
    try {
      await updatePlantState(plantId, newState);
      setPlants((prevPlants) =>
        prevPlants.map((plant) =>
          plant.Id_plante_suggested === plantId
            ? { ...plant, state_exchange: newState }
            : plant
        )
      );
      Alert.alert("Succès", "État de la plante mis à jour avec succès!");
    } catch (err) {
      Alert.alert(
        "Erreur",
        "Erreur lors de la mise à jour de l'état de la plante."
      );
      console.error(err);
    }
  };

  const handleAddPlant = () => {
    navigation.navigate("AddPlant", {
      onPlantAdded: () => {
        fetchUserPlants(); // Rafraîchir la liste des plantes après l'ajout
      },
    });
  };

  const renderItem = ({ item }) => {
    const imageUrl = `${baseURL.replace("/api", "")}/${item.photo}`;
    return (
      <View style={styles.card}>
        <Image source={{ uri: imageUrl }} style={styles.image} />
        <Text style={styles.name}>{item.name_plant}</Text>
        <Text style={styles.state}>{item.state_exchange}</Text>
        <TouchableOpacity
          style={styles.updateButton}
          onPress={() =>
            handleUpdatePlantState(
              item.Id_plante_suggested,
              item.state_exchange
            )
          }
        >
          <Text style={styles.updateButtonText}>Changer l'état</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDeletePlant(item.Id_plante_suggested)}
        >
          <Text style={styles.deleteButtonText}>Supprimer</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Mes Plantes</Text>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <FlatList
        data={plants}
        renderItem={renderItem}
        keyExtractor={(item) => item.Id_plante_suggested.toString()}
        contentContainerStyle={styles.list}
      />
      <TouchableOpacity style={styles.addButton} onPress={handleAddPlant}>
        <Text style={styles.addButtonText}>Ajouter une plante</Text>
      </TouchableOpacity>
    </SafeAreaView>
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
    textAlign: "center",
    color: "#00796B",
  },
  state: {
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
    color: "#00796B",
  },
  updateButton: {
    backgroundColor: "#FFA726",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  updateButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#E57373",
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#00796B",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default MesPlantesScreen;
