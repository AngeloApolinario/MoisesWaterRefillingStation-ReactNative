import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { MotiView } from "moti";
import { LinearGradient } from "expo-linear-gradient";
import Ionicons from "react-native-vector-icons/Ionicons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import Register from "./Register";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);

  // If user toggles to register
  if (showRegister) {
    return <Register onGoToLogin={() => setShowRegister(false)} />;
  }

  const handleLogin = () => {
    if (!email || !password)
      return Alert.alert("Error", "Please enter email and password");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        onLoginSuccess(); // Notify parent that login succeeded
      })
      .catch((error) => {
        Alert.alert("Login Failed", error.message);
      });
  };

  const bubbles = [
    { size: 20, left: "10%", delay: 0 },
    { size: 30, left: "25%", delay: 1 },
    { size: 15, left: "50%", delay: 2 },
    { size: 25, left: "70%", delay: 1.5 },
    { size: 18, left: "85%", delay: 0.5 },
  ];

  return (
    <LinearGradient
      colors={["#93c5fd", "#3b82f6", "#1e40af"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 justify-center items-center px-6 relative overflow-hidden"
    >
      {/* Animated bubbles */}
      {bubbles.map((b, i) => (
        <MotiView
          key={i}
          from={{ translateY: 0, opacity: 0.4 }}
          animate={{ translateY: -SCREEN_HEIGHT, opacity: 0 }}
          transition={{
            duration: 4000 + i * 500,
            repeat: Infinity,
            delay: b.delay * 1000,
          }}
          className="absolute bg-white rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: 40,
          }}
        />
      ))}

      {/* Login Card */}
      <View className="bg-white rounded-3xl p-8 w-full shadow-xl z-10">
        <Text className="text-4xl font-extrabold text-center text-blue-900 mb-6">
          MOISES WATER
        </Text>
        <Text className="text-center text-blue-700 mb-6">
          Refresh your life with clean, safe water. Login below.
        </Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          className="border border-blue-300 rounded-xl p-4 mb-4 text-blue-900"
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          className="border border-blue-300 rounded-xl p-4 mb-6 text-blue-900"
          secureTextEntry
        />

        <TouchableOpacity
          onPress={handleLogin}
          className="bg-blue-600 p-4 rounded-xl flex-row justify-center items-center mb-4 shadow-lg"
        >
          <Ionicons name="log-in-outline" size={22} color="#fff" />
          <Text className="text-white font-bold ml-2 text-lg">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setShowRegister(true)}
          className="self-center mt-2"
        >
          <Text className="text-blue-800 font-semibold text-lg">
            Don't have an account? Register
          </Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
}
