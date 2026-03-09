import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import api from "../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

  export default function DashboardScreen({ setIsLoggedIn }) {
  useEffect(() => {
  const loadDashboard = async () => {
    try {
      const res = await api.get("/dashboard");
      console.log("Dashboard Data:", res.data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  loadDashboard();
}, []);

   const handleLogout = async () => {
    await AsyncStorage.removeItem("token");
    setIsLoggedIn(false);
  };
  return (
    <LinearGradient
      colors={["#020617", "#0f172a", "#1e3a8a"]}
      style={styles.container}
    >
      <Text style={styles.title}>Welcome to Dashboard</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "#93c5fd",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#38bdf8",
    padding: 15,
    borderRadius: 14,
  },
  buttonText: {
    fontWeight: "700",
    color: "#020617",
  },
});