import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../services/api";
import { LinearGradient } from "expo-linear-gradient";

export default function LoginScreen({ navigation,setIsLoggedIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const res = await api.post("/auth/login", {
      email,
      password,
    });

    await AsyncStorage.setItem("token", res.data.token);
    setIsLoggedIn(true);
  } catch (error) {
    console.log(error.response?.data || error.message);
  }
};

  return (
    <LinearGradient
      colors={["#020617", "#0f172a", "#1e3a8a"]}
      style={styles.container}
    >
      <View style={styles.glassCard}>
        <Text style={styles.title}>OPTIFIT</Text>

        <TextInput
          placeholder="Email"
          placeholderTextColor="#cbd5f5"
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          placeholder="Password"
          placeholderTextColor="#cbd5f5"
          secureTextEntry
          style={styles.input}
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
          <Text style={styles.link}>Don't have an account? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  glassCard: {
    width: "90%",
    padding: 30,
    borderRadius: 30,

    backgroundColor: "rgba(147,197,253,0.25)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",

    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,

    elevation: 15,

    overflow: "hidden",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#93c5fd",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 14,
    borderRadius: 14,
    marginBottom: 14,
    color: "white",
  },

  button: {
    backgroundColor: "#38bdf8",
    padding: 15,
    borderRadius: 14,
  },

  buttonText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#020617",
  },

  link: {
    textAlign: "center",
    marginTop: 18,
    color: "#cbd5f5",
  },
});
