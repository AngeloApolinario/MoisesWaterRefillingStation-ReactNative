import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import Footer from "../components/Footer";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View className="flex-1 bg-blue-50 items-center justify-center px-6">
      <Text className="text-3xl font-bold text-blue-800 mb-8">Login</Text>

      <View className="w-full">
        <TextInput
          className="bg-white p-4 rounded-xl mb-4 border border-gray-300"
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className="bg-white p-4 rounded-xl mb-4 border border-gray-300"
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity className="bg-blue-600 p-4 rounded-full mt-2">
          <Text className="text-white text-center font-semibold">Sign In</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
