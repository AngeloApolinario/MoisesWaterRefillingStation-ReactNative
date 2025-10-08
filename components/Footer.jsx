import React from "react";
import { View, Text } from "react-native";

export default function Footer() {
  return (
    <View className="bg-gray-900 py-10 items-center">
      <Text className="text-gray-300 text-center">
        © {new Date().getFullYear()} Moises Water Refill Station. All rights
        reserved.
      </Text>
    </View>
  );
}
