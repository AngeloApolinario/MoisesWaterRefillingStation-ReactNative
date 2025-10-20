import React from "react";
import { View, Text, ScrollView } from "react-native";
import { MotiView } from "moti";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../components/Footer";
import Wave from "../components/Wave";

export default function Services() {
  const services = [
    {
      icon: "home-outline",
      title: "Home Delivery",
      desc: "Convenient doorstep delivery for your family.",
    },
    {
      icon: "water-outline",
      title: "Refill Station",
      desc: "Eco-friendly walk-in refills at our store.",
    },
    {
      icon: "checkmark-done-outline",
      title: "Water Purification",
      desc: "State-of-the-art purification technology.",
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#eff6ff" }}
    >
      {/* Hero Section */}
      <View style={{ position: "relative" }}>
        <LinearGradient
          colors={["#93c5fd", "#3b82f6", "#1e40af"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            height: 250,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 24,
          }}
        >
          <Text
            style={{
              fontSize: 28,
              fontWeight: "800",
              color: "white",
              textAlign: "center",
            }}
          >
            Our Services
          </Text>
          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              color: "#e0f2fe",
              textAlign: "center",
            }}
          >
            Discover what we offer to keep your water pure and fresh.
          </Text>
        </LinearGradient>

        {/* Wave */}
        <View
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%" }}
        >
          <Wave height={88} />
        </View>
      </View>

      {/* Service Cards */}
      <View style={{ paddingHorizontal: 16, marginTop: 32, marginBottom: 32 }}>
        {services.map((item, i) => (
          <MotiView
            key={i}
            from={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: i * 0.3 }}
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 16,
              padding: 16,
              shadowColor: "#000",
              shadowOpacity: 0.1,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 6,
              elevation: 3,
              marginBottom: 16, // ✅ Space between cards
            }}
          >
            <Ionicons name={item.icon} size={36} color="#2563eb" />
            <View style={{ marginLeft: 16, flex: 1 }}>
              <Text
                style={{ fontSize: 18, fontWeight: "600", color: "#1e40af" }}
              >
                {item.title}
              </Text>
              <Text style={{ fontSize: 14, color: "#4b5563", marginTop: 4 }}>
                {item.desc}
              </Text>
            </View>
          </MotiView>
        ))}
      </View>

      {/* Footer */}
    </ScrollView>
  );
}
