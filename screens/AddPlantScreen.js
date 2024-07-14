import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Picker } from "@react-native-picker/picker";
import {
  addPlantSuggestion,
  fetchPlantNames,
  getUserPlants,
} from "../services/apiServices";

const AddPlantScreen = ({ navigation }) => {
  const [plantName, setPlantName] = useState("");
  const [plantNames, setPlantNames] = useState([]);
  const [stateExchange, setStateExchange] = useState("disponible");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [userId, setUserId] = useState(null);
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUserId() {
      const id = await AsyncStorage.getItem("userId");
      setUserId(id);
    }

    async function getPlantNames() {
      try {
        const names = await fetchPlantNames();
        console.log("Fetched plant names:", names);
        setPlantNames(names);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des noms de plantes",
          error
        );
      }
    }

    fetchUserId();
    getPlantNames();
  }, []);

  useEffect(() => {
    (async () => {
      const { status: cameraStatus } =
        await ImagePicker.requestCameraPermissionsAsync();
      if (cameraStatus !== "granted") {
        Alert.alert(
          "Permission refusée",
          "Nous avons besoin de la permission pour accéder à la caméra."
        );
      }
      const { status: mediaLibraryStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (mediaLibraryStatus !== "granted") {
        Alert.alert(
          "Permission refusée",
          "Nous avons besoin de la permission pour accéder à la galerie de photos."
        );
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImagePreview(result.assets[0].uri);
    }
  };

  const takePhoto = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      setImagePreview(result.assets[0].uri);
    }
  };

  const fetchUserPlants = async () => {
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
  };

  const handleSubmit = async () => {
    if (!plantName) {
      alert("Veuillez choisir un nom de plante");
      return;
    }

    if (!userId) {
      alert("Erreur : utilisateur non identifié. Veuillez vous reconnecter.");
      return;
    }

    const formData = new FormData();
    formData.append("plantName", plantName);
    formData.append("stateExchange", stateExchange);
    if (image) {
      const uriParts = image.split(".");
      const fileType = uriParts[uriParts.length - 1];
      formData.append("photo", {
        uri: image,
        name: `photo.${fileType}`,
        type: `image/${fileType}`,
      });
    }
    formData.append("userId", userId.toString());

    try {
      const res = await addPlantSuggestion(formData);
      if (res.message === "Plant suggestion added or updated") {
        Alert.alert("Succès", "Plante suggérée ajoutée");
        fetchUserPlants();
        navigation.goBack();
      } else {
        Alert.alert("Erreur", "Erreur lors de l'ajout de la plante suggérée");
      }
    } catch (error) {
      console.error("Erreur ajout plante suggérée", error);
      Alert.alert("Erreur", "Erreur ajout plante suggérée");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Ajouter une Plante</Text>
      <Picker
        selectedValue={plantName}
        onValueChange={(itemValue) => setPlantName(itemValue)}
        style={styles.input}
        itemStyle={styles.pickerItem}
      >
        <Picker.Item
          label="Choisir un nom de plante"
          value=""
          style={styles.pickerPlaceholder}
        />
        {plantNames.map((plant) => (
          <Picker.Item
            key={plant.id_plant}
            label={plant.name_plant}
            value={plant.name_plant}
          />
        ))}
      </Picker>
      <View style={styles.stateExchangeContainer}>
        <Text style={styles.label}>État de l'échange</Text>
        <Picker
          selectedValue={stateExchange}
          onValueChange={(itemValue) => setStateExchange(itemValue)}
          style={styles.statePicker}
          itemStyle={styles.pickerItem}
        >
          <Picker.Item label="Disponible" value="disponible" />
          <Picker.Item label="Indisponible" value="indisponible" />
        </Picker>
      </View>
      <View style={styles.imagePickerContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Choisir une image</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={takePhoto}>
          <Text style={styles.buttonText}>Prendre une photo</Text>
        </TouchableOpacity>
      </View>
      {imagePreview && (
        <Image source={{ uri: imagePreview }} style={styles.imagePreview} />
      )}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>Annuler</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Ajouter pour échange</Text>
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
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  pickerPlaceholder: {
    color: "#888",
  },
  stateExchangeContainer: {
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#00796B",
    marginBottom: 5,
  },
  statePicker: {
    backgroundColor: "#fff",
    borderRadius: 5,
  },
  imagePickerContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#00796B",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#00796B",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    marginRight: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: "#E57373",
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
    flex: 1,
    alignItems: "center",
    marginLeft: 5,
  },
  cancelButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 5,
    marginTop: 10,
    alignSelf: "center",
  },
});

export default AddPlantScreen;
