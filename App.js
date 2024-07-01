import "react-native-gesture-handler";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";
import HomeScreen from "./screens/HomeScreen";
import MesPlantesScreen from "./screens/MesPlantesScreen";
import PlantesEnTrocScreen from "./screens/PlantesEnTrocScreen";
import QuelleEstCettePlanteScreen from "./screens/QuelleEstCettePlanteScreen";
import LoginScreen from "./screens/LoginScreen";
import LogoutScreen from "./screens/LogoutScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          switch (route.name) {
            case "Home":
              iconName = "home";
              break;
            case "MesPlantes":
              iconName = "leaf";
              break;
            case "PlantesEnTroc":
              iconName = "swap-horizontal";
              break;
            case "QuelleEstCettePlante":
              iconName = "help-circle";
              break;
            default:
              iconName = "home";
              break;
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#00796B",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: { backgroundColor: "#E0F2F1" },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ tabBarLabel: "Home" }}
      />
      <Tab.Screen
        name="MesPlantes"
        component={MesPlantesScreen}
        options={{ tabBarLabel: "Mes Plantes" }}
      />
      <Tab.Screen
        name="PlantesEnTroc"
        component={PlantesEnTrocScreen}
        options={{ tabBarLabel: "Plantes en Troc" }}
      />
      <Tab.Screen
        name="QuelleEstCettePlante"
        component={QuelleEstCettePlanteScreen}
        options={{ tabBarLabel: "Quelle est cette Plante?" }}
      />
      <Tab.Screen
        name="Logout"
        component={LogoutScreen}
        options={{ tabBarLabel: "Déconnexion" }}
      />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Main" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
