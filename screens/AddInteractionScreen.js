import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Alert,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  addInteraction,
  getUserPlants,
  fetchInteractionTypes,
} from "../services/apiServices";

const AddInteractionScreen = ({ navigation }) => {
  const [userId, setUserId] = useState(null);
  const [plants, setPlants] = useState([]);
  const [interactionTypes, setInteractionTypes] = useState([]);
  const [selectedPlant, setSelectedPlant] = useState("");
  const [selectedInteractionType, setSelectedInteractionType] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    async function fetchUserData() {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
      if (id) {
        try {
          const plantsData = await getUserPlants(id);
          setPlants(plantsData);
        } catch (error) {
          console.error(
            "Erreur lors de la récupération des plantes de l'utilisateur :",
            error
          );
        }
      }
    }

    async function fetchInteractionData() {
      try {
        const interactionData = await fetchInteractionTypes();
        setInteractionTypes(interactionData);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des types d'interaction :",
          error
        );
      }
    }

    fetchUserData();
    fetchInteractionData();
  }, []);

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const formatDateForMySQL = (date) => {
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const dd = String(date.getDate()).padStart(2, "0");
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    const ss = String(date.getSeconds()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd} ${hh}:${min}:${ss}`;
  };

  const handleAddInteraction = async () => {
    if (!selectedPlant || !selectedInteractionType || !date) {
      Alert.alert("Erreur", "Tous les champs sont requis.");
      return;
    }

    const interactionData = {
      user_id: userId,
      plant_id: selectedPlant,
      id_interaction_type: selectedInteractionType,
      created_at: formatDateForMySQL(date),
    };

    try {
      await addInteraction(
        interactionData.user_id,
        interactionData.plant_id,
        interactionData.id_interaction_type,
        interactionData.created_at
      );
      Alert.alert("Succès", "Interaction ajoutée avec succès.");
      navigation.goBack();
    } catch (error) {
      console.error("Erreur lors de l'ajout de l'interaction", error);
      Alert.alert("Erreur", "Erreur lors de l'ajout de l'interaction.");
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ajouter une Interaction</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Choisir une plante</Text>
        <Picker
          selectedValue={selectedPlant}
          onValueChange={(itemValue) => setSelectedPlant(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Sélectionner une plante" value="" />
          {plants.map((plant) => (
            <Picker.Item
              key={plant.Id_plante_suggested}
              label={plant.name_plant}
              value={plant.Id_plant}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Type d'interaction</Text>
        <Picker
          selectedValue={selectedInteractionType}
          onValueChange={(itemValue) => setSelectedInteractionType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Sélectionner un type" value="" />
          {interactionTypes.map((type) => (
            <Picker.Item
              key={type.id_interaction_type}
              label={type.label_interaction_type}
              value={type.id_interaction_type}
            />
          ))}
        </Picker>
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Date</Text>
        <TouchableOpacity
          onPress={() => setShowDatePicker(true)}
          style={styles.datePickerButton}
        >
          <Text style={styles.dateText}>
            {date.toISOString().split("T")[0]}
          </Text>
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleAddInteraction}
        >
          <Text style={styles.submitButtonText}>Ajouter</Text>
        </TouchableOpacity>
      </View>
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
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00796B",
    marginBottom: 8,
  },
  picker: {
    backgroundColor: "#fff",
    borderRadius: 5,
    padding: 8,
  },
  datePickerButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#00796B",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  cancelButton: {
    backgroundColor: "#E57373",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginRight: 10,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: "#00796B",
    padding: 15,
    borderRadius: 5,
    flex: 1,
    alignItems: "center",
    marginLeft: 10,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddInteractionScreen;
