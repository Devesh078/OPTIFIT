import React, { useEffect, useRef } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function SplashScreen({ navigation }) {
  const fade1 = useRef(new Animated.Value(0)).current;
  const fade2 = useRef(new Animated.Value(0)).current;
  const fade3 = useRef(new Animated.Value(0)).current;
  const fade4 = useRef(new Animated.Value(0)).current;
  const fade5 = useRef(new Animated.Value(0)).current;
  const fade6 = useRef(new Animated.Value(0)).current;
  const fade7 = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(fade1, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fade2, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fade3, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fade4, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fade5, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fade6, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
      Animated.timing(fade7, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      navigation.replace("Login");
    }, 3000);
  }, []);

  return (
    <LinearGradient
      colors={["#020617", "#0f172a", "#1e3a8a"]}
      style={styles.container}
    >
      <View style={styles.logoRow}>
        <Animated.Text style={[styles.logo, { opacity: fade1 }]}>
          O
        </Animated.Text>
        <Animated.Text style={[styles.logo, { opacity: fade2 }]}>
          P
        </Animated.Text>
        <Animated.Text style={[styles.logo, { opacity: fade3 }]}>
          T
        </Animated.Text>
        <Animated.Text style={[styles.logo, { opacity: fade4 }]}>
          I
        </Animated.Text>
        <Animated.Text style={[styles.logoFit, { opacity: fade5 }]}>
          F
        </Animated.Text>
        <Animated.Text style={[styles.logoFit, { opacity: fade6 }]}>
          I
        </Animated.Text>
        <Animated.Text style={[styles.logoFit, { opacity: fade7 }]}>
          T
        </Animated.Text>
      </View>

      <Text style={styles.tagline}>Optimize Your Fitness</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  logoRow: {
    flexDirection: "row",
  },

  logo: {
    fontSize: 50,
    fontWeight: "900",
    color: "#93c5fd",
    letterSpacing: 4,
  },

  logoFit: {
    fontSize: 50,
    fontWeight: "900",
    color: "#38bdf8",
    letterSpacing: 4,
  },

  tagline: {
    marginTop: 15,
    color: "#cbd5f5",
    fontSize: 16,
  },
});
