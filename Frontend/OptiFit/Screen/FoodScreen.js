import React, { useState, useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Swipeable } from "react-native-gesture-handler";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView
} from "react-native";
import api from "../services/api";
import { SafeAreaView } from "react-native-safe-area-context";

const FoodScreen = () => {
  const [foodName, setFoodName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("");

  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fats, setFats] = useState("");

  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [foods, setFoods] = useState([]);

  // =========================
  // FETCH NUTRITION
  // =========================
  const fetchNutrition = async (name) => {
    try {
      const res = await api.get(
        `/food/nutrition?name=${name}&quantity=${Number(quantity)}&unit=${unit}`
      );

      const data = res.data.nutrition;

      setCalories(data.calories ?? "");
      setProtein(data.protein ?? "");
      setCarbs(data.carbs ?? "");
      setFats(data.fats ?? "");
    } catch (error) {
      console.log("Nutrition error:", error.message);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const qty = Number(quantity);

      if (
        foodName.trim().length > 0 &&
        !isNaN(qty) &&
        qty > 0 &&
        unit.trim().length > 0
      ) {
        fetchNutrition(foodName);
      } else {
        setCalories("");
        setProtein("");
        setCarbs("");
        setFats("");
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [foodName, quantity, unit]);

  // =========================
  // AUTOCOMPLETE
  // =========================
  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (foodName.length > 1) {
        try {
          const res = await api.get(`/food/search?q=${foodName}`);
          setSuggestions(res.data.foods || []);
          setShowDropdown(true);
        } catch (err) {
          console.log("Search error:", err.message);
        }
      } else {
        setSuggestions([]);
        setShowDropdown(false);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [foodName]);

  // =========================
  // FETCH FOODS
  // =========================
  const fetchFoods = async () => {
    try {
      const res = await api.get("/food/list");
      setFoods(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log("Fetch foods error:", error.message);
      setFoods([]);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // =========================
  // ADD FOOD
  // =========================
  const handleAddFood = async () => {
    try {
      if (!foodName || !quantity || !unit) {
        alert("Enter all fields");
        return;
      }

      await api.post("/food/log", {
        foodName,
        quantity: Number(quantity),
        unit,
        calories,
        protein,
        carbs,
        fats
      });

      setFoodName("");
      setQuantity("");
      setUnit("");
      setCalories("");
      setProtein("");
      setCarbs("");
      setFats("");

      fetchFoods();
    } catch (error) {
      console.log("Add food error:", error.message);
    }
  };

  // =========================
  // DELETE FOOD
  // =========================
  const handleDelete = async (id) => {
    try {
      await api.delete(`/food/delete/${id}`);
      fetchFoods();
    } catch (error) {
      console.log("Delete error:", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0F172A" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Food Log</Text>

        {/* INPUT */}
        <TextInput
          placeholder="Enter food"
          placeholderTextColor="#94A3B8"
          value={foodName}
          onChangeText={(text) => {
            setFoodName(text);
            setShowDropdown(true);
          }}
          style={styles.input}
        />

        {/* DROPDOWN */}
        {showDropdown && suggestions.length > 0 && (
          <View style={styles.dropdown}>
            {suggestions.map((item) => (
              <TouchableOpacity
                key={item.name}
                onPress={() => {
                  setFoodName(item.name);
                  setSuggestions([]);
                  setShowDropdown(false);
                }}
                style={styles.dropdownItem}
              >
                <Text style={styles.dropdownText}>{item.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}

        {/* NUTRITION CARD */}
        <View style={styles.nutritionCard}>
          {calories ? (
            <>
              <View style={styles.row}>
                <View style={styles.metric}>
                  <MaterialCommunityIcons name="fire" size={20} color="#22C55E" />
                  <Text style={styles.metricText}>{calories} kcal</Text>
                </View>

                <View style={styles.metric}>
                  <MaterialCommunityIcons name="food-steak" size={20} color="#3B82F6" />
                  <Text style={styles.metricText}>{protein}g protein</Text>
                </View>
              </View>

              <View style={styles.row}>
                <View style={styles.metric}>
                  <MaterialCommunityIcons name="grain" size={20} color="#F59E0B" />
                  <Text style={styles.metricText}>{carbs}g carbs</Text>
                </View>

                <View style={styles.metric}>
                  <MaterialCommunityIcons name="oil" size={20} color="#EF4444" />
                  <Text style={styles.metricText}>{fats}g fats</Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.placeholderText}>
              Enter food, quantity & unit
            </Text>
          )}
        </View>

        {/* QUANTITY */}
        <TextInput
          placeholder="Quantity"
          placeholderTextColor="#94A3B8"
          value={quantity}
          keyboardType="numeric"
          onChangeText={(text) => {
            const clean = text.replace(/[^0-9.]/g, "");
            setQuantity(clean);
          }}
          style={styles.input}
        />

        {/* UNIT */}
        <TextInput
          placeholder="Unit"
          placeholderTextColor="#94A3B8"
          value={unit}
          onChangeText={(text) => {
            const clean = text.replace(/[^a-zA-Z]/g, "").toLowerCase();
            setUnit(clean);
          }}
          style={styles.input}
        />

        {/* BUTTON */}
        <TouchableOpacity onPress={handleAddFood} style={styles.button}>
          <Text style={styles.buttonText}>Add Food</Text>
        </TouchableOpacity>

        {/* SCROLL LIST */}
        <View style={{ flex: 1 }}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {foods.map((item) => (
              <Swipeable
                key={item._id}
                renderRightActions={() => (
                  <TouchableOpacity
                    onPress={() => handleDelete(item._id)}
                    style={styles.deleteButton}
                  >
                    <Text style={styles.deleteText}>Delete</Text>
                  </TouchableOpacity>
                )}
              >
                <View style={styles.foodItem}>
                  <Text style={styles.foodName}>
                    {item.foodName} ({item.quantity} {item.unit})
                  </Text>

                  <View style={styles.row}>
                    <View style={styles.metric}>
                      <MaterialCommunityIcons name="fire" size={16} color="#22C55E" />
                      <Text style={styles.metricSmall}>{item.calories}</Text>
                    </View>

                    <View style={styles.metric}>
                      <MaterialCommunityIcons name="food-steak" size={16} color="#3B82F6" />
                      <Text style={styles.metricSmall}>{item.protein}</Text>
                    </View>

                    <View style={styles.metric}>
                      <MaterialCommunityIcons name="grain" size={16} color="#F59E0B" />
                      <Text style={styles.metricSmall}>{item.carbs}</Text>
                    </View>

                    <View style={styles.metric}>
                      <MaterialCommunityIcons name="oil" size={16} color="#EF4444" />
                      <Text style={styles.metricSmall}>{item.fats}</Text>
                    </View>
                  </View>
                </View>
              </Swipeable>
            ))}
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default FoodScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },

  title: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 20
  },

  input: {
    backgroundColor: "#1E293B",
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    color: "#fff"
  },

  dropdown: {
    backgroundColor: "#1E293B",
    borderRadius: 10,
    marginBottom: 10
  },

  dropdownItem: {
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: "#334155"
  },

  dropdownText: {
    color: "#fff"
  },

  nutritionCard: {
    backgroundColor: "#1E293B",
    padding: 16,
    borderRadius: 16,
    marginBottom: 15
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },

  metric: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6
  },

  metricText: {
    color: "#fff",
    fontWeight: "600"
  },

  metricSmall: {
    color: "#94A3B8",
    fontSize: 12
  },

  placeholderText: {
    color: "#94A3B8",
    textAlign: "center"
  },

  button: {
    backgroundColor: "#22C55E",
    padding: 15,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 10
  },

  buttonText: {
    fontWeight: "bold",
    color: "#0F172A"
  },

  foodItem: {
    backgroundColor: "#1E293B",
    padding: 15,
    borderRadius: 12,
    marginTop: 10
  },

  foodName: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 5
  },

  deleteButton: {
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    width: 100,
    borderRadius: 12,
    marginTop: 10
  },

  deleteText: {
    color: "#fff",
    fontWeight: "bold"
  }
});