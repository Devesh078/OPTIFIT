import api from "../services/api";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

export default function ProfileSetupScreen({ navigation, route }) {
  const { email, password } = route.params;
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [sleep, setSleep] = useState("");
  const [goal, setGoal] = useState("");
  const handleContinue = async () => {
  if (!name || !age || !height || !weight || !goal) {
    alert("Please fill all fields");
    return;
  }

  try {
    const res = await api.post("/auth/register", {
  name: name.trim(),
  email,
  password,
  age: parseInt(age),
  height: parseInt(height),
  weight: parseInt(weight),
  goal: goal.trim().toLowerCase().replace(/\s+/g, "_"),
  activityLevel: "moderate",
});
    console.log(res.data);

    alert("User Registered Successfully ✅");

    navigation.replace("Login");

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
        <Text style={styles.title}>Tell us about yourself</Text>

        <ScrollView>
          <TextInput
            placeholder="Name"
            placeholderTextColor="#cbd5f5"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <TextInput
            placeholder="Age"
            placeholderTextColor="#cbd5f5"
            keyboardType="numeric"
            style={styles.input}
            value={age}
            onChangeText={setAge}
          />

          <TextInput
            placeholder="Height (cm)"
            placeholderTextColor="#cbd5f5"
            keyboardType="numeric"
            style={styles.input}
            value={height}
            onChangeText={setHeight}
          />

          <TextInput
            placeholder="Weight (kg)"
            placeholderTextColor="#cbd5f5"
            keyboardType="numeric"
            style={styles.input}
            value={weight}
            onChangeText={setWeight}
          />

          <TextInput
            placeholder="Sleep Hours"
            placeholderTextColor="#cbd5f5"
            keyboardType="numeric"
            style={styles.input}
            value={sleep}
            onChangeText={setSleep}
          />

          <TextInput
            placeholder="Goal (muscle / weight loss)"
            placeholderTextColor="#cbd5f5"
            style={styles.input}
            value={goal}
            onChangeText={setGoal}
          />

          <TouchableOpacity style={styles.button} onPress={handleContinue}>
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>
        </ScrollView>
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
    fontSize: 24,
    fontWeight: "700",
    color: "#93c5fd",
    textAlign: "center",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "rgba(255,255,255,0.15)",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
    color: "white",
  },

  button: {
    backgroundColor: "#38bdf8",
    padding: 16,
    borderRadius: 14,
    marginTop: 10,
  },

  buttonText: {
    textAlign: "center",
    fontWeight: "700",
    color: "#020617",
  },
});
