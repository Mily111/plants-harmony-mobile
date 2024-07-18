// import React, { useState } from "react";
// import { View, TextInput, Button, StyleSheet, Text } from "react-native";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import { postData } from "../services/apiServices";

// const LoginScreen = ({ navigation }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   const handleLogin = async () => {
//     console.log("Tentative de connexion avec :", {
//       username,
//       password_user: password,
//     });
//     try {
//       const result = await postData("/users/login", {
//         username,
//         password_user: password,
//       });
//       console.log("Réponse de l'API :", result);
//       if (result.status === "ok") {
//         // Utilisez "status" au lieu de "Status"
//         await AsyncStorage.setItem("userToken", result.token);
//         await AsyncStorage.setItem("userId", result.userId.toString()); // Stocke l'ID de l'utilisateur
//         navigation.navigate("Main"); // Navigue vers le Tab Navigator
//       } else {
//         setError(
//           result.message || "Nom d’utilisateur ou mot de passe incorrect"
//         );
//       }
//     } catch (error) {
//       console.error("Erreur de connexion :", error);
//       setError("Erreur de connexion");
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {error ? <Text style={styles.error}>{error}</Text> : null}
//       <TextInput
//         style={styles.input}
//         placeholder="Nom d'utilisateur"
//         value={username}
//         onChangeText={setUsername}
//       />
//       <TextInput
//         style={styles.input}
//         placeholder="Mot de passe"
//         secureTextEntry
//         value={password}
//         onChangeText={setPassword}
//       />
//       <Button title="Se connecter" onPress={handleLogin} />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     backgroundColor: "#E0F2F1", // Vert turquoise pastel
//   },
//   input: {
//     width: "80%",
//     padding: 10,
//     marginBottom: 10,
//     borderWidth: 1,
//     borderColor: "#ccc",
//     borderRadius: 5,
//   },
//   error: {
//     color: "red",
//     marginBottom: 10,
//   },
// });

// export default LoginScreen;

import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { postData, getCsrfToken } from "../services/apiServices"; // Importer getCsrfToken

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    console.log("Tentative de connexion avec :", {
      username,
      password_user: password,
    });
    try {
      // Obtenir le jeton CSRF avant de tenter la connexion
      await getCsrfToken();

      const result = await postData("/sessionsClientLourd/loginClientLourd", {
        username,
        password_user: password,
      });

      console.log("Réponse de l'API :", result);
      if (result.status === "ok") {
        await AsyncStorage.setItem("userToken", result.token);
        await AsyncStorage.setItem("userId", result.userId.toString()); // Stocke l'ID de l'utilisateur
        navigation.navigate("Main"); // Navigue vers le Tab Navigator
      } else {
        setError(
          result.message || "Nom d’utilisateur ou mot de passe incorrect"
        );
      }
    } catch (error) {
      console.error("Erreur de connexion :", error);
      setError("Erreur de connexion");
    }
  };

  return (
    <View style={styles.container}>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Nom d'utilisateur"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button title="Se connecter" onPress={handleLogin} />
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
  input: {
    width: "80%",
    padding: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  error: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginScreen;
