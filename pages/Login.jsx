import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
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

  if (showRegister) {
    return <Register onGoToLogin={() => setShowRegister(false)} />;
  }

  const handleLogin = () => {
    if (!email || !password)
      return Alert.alert("Error", "Please enter email and password");

    signInWithEmailAndPassword(auth, email, password)
      .then(() => onLoginSuccess())
      .catch((error) => Alert.alert("Login Failed", error.message));
  };

  const bubbles = [
    { size: 25, left: "10%", delay: 0 },
    { size: 35, left: "25%", delay: 1 },
    { size: 20, left: "50%", delay: 2 },
    { size: 40, left: "70%", delay: 1.5 },
    { size: 22, left: "85%", delay: 0.5 },
  ];

  return (
    <LinearGradient
      colors={["#60a5fa", "#2563eb", "#1e3a8a"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 justify-center items-center relative overflow-hidden"
    >
      {/* Animated floating bubbles */}
      {bubbles.map((b, i) => (
        <MotiView
          key={i}
          from={{ translateY: 0, opacity: 0.4 }}
          animate={{ translateY: -SCREEN_HEIGHT, opacity: 0 }}
          transition={{
            duration: 5000 + i * 600,
            repeat: Infinity,
            delay: b.delay * 1000,
          }}
          className="absolute bg-white/30 rounded-full"
          style={{
            width: b.size,
            height: b.size,
            left: b.left,
            bottom: 20,
          }}
        />
      ))}

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        className="w-full px-6 z-10"
      >
        {/* Branding / Logo */}
        <View className="items-center mb-10">
          <Image
            source={{
              uri: "https://cdn-icons-png.flaticon.com/512/2917/2917995.png",
            }}
            style={{ width: 90, height: 90 }}
          />
          <Text className="text-4xl font-extrabold text-white mt-4 tracking-widest">
            MOISES WATER
          </Text>
          <Text className="text-blue-100 text-center mt-2">
            Refresh your life with clean, safe water
          </Text>
        </View>

        {/* Glassmorphism Card */}
        <View
          className="rounded-3xl p-8 w-full shadow-2xl"
          style={{
            backgroundColor: "rgba(255,255,255,0.15)",
            borderColor: "rgba(255,255,255,0.3)",
            borderWidth: 1,
            backdropFilter: "blur(10px)",
          }}
        >
          <TextInput
            placeholder="Email"
            placeholderTextColor="#e0e7ff"
            value={email}
            onChangeText={setEmail}
            className="border border-white/40 rounded-xl p-4 mb-4 text-white text-base"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Password"
            placeholderTextColor="#e0e7ff"
            value={password}
            onChangeText={setPassword}
            className="border border-white/40 rounded-xl p-4 mb-6 text-white text-base"
            secureTextEntry
          />

          {/* Login Button */}
          <TouchableOpacity
            onPress={handleLogin}
            activeOpacity={0.8}
            className="p-4 rounded-xl flex-row justify-center items-center mb-4 shadow-lg"
            style={{
              backgroundColor: "rgba(255,255,255,0.2)",
              borderColor: "rgba(255,255,255,0.5)",
              borderWidth: 1,
            }}
          >
            <Ionicons name="log-in-outline" size={22} color="#fff" />
            <Text className="text-white font-semibold ml-2 text-lg">Login</Text>
          </TouchableOpacity>

          {/* Register Toggle */}
          <TouchableOpacity
            onPress={() => setShowRegister(true)}
            className="self-center mt-2"
          >
            <Text className="text-blue-100 font-semibold text-lg">
              Don't have an account? <Text className="underline">Register</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Subtle footer text */}
      <Text className="absolute bottom-6 text-blue-100 text-sm opacity-80">
        © 2025 Moises Water. All rights reserved.
      </Text>
    </LinearGradient>
  );
}
