import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

import SplashScreen from "./Screen/SplashScreen";
import LoginScreen from "./Screen/LoginScreen";
import SignupScreen from "./Screen/SignupScreen";
import ProfileSetupScreen from "./Screen/ProfileSetupScreen";
import DashboardScreen from "./Screen/DashboardScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      setIsLoggedIn(!!token);
    };
    checkLogin();
  }, []);

  if (isLoggedIn === null) return null;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <Stack.Screen name="Dashboard">
            {props => (
              <DashboardScreen {...props} setIsLoggedIn={setIsLoggedIn} />
            )}
          </Stack.Screen>
        ) : (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login">
              {props => (
                <LoginScreen {...props} setIsLoggedIn={setIsLoggedIn} />
              )}
            </Stack.Screen>
            <Stack.Screen name="Signup" component={SignupScreen} />
            <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}