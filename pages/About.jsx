import React from "react";
import { View, Text, ScrollView } from "react-native";
import { MotiView } from "moti";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Footer from "../components/Footer";
import Wave from "../components/Wave";

export default function About() {
  const features = [
    {
      icon: "leaf-outline",
      title: "Eco-Friendly",
      desc: "Sustainable refills with minimal waste.",
    },
    {
      icon: "water-outline",
      title: "Pure Water",
      desc: "Advanced purification technology.",
    },
    {
      icon: "heart-outline",
      title: "Healthy",
      desc: "Keep your family safe and hydrated.",
    },
  ];

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#eff6ff" }}
    >
      {/* Hero Section */}
      <LinearGradient
        colors={["#93c5fd", "#3b82f6", "#1e40af"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          height: 380,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Text
          style={{
            fontSize: 32,
            fontWeight: "800",
            color: "white",
            textAlign: "center",
            paddingHorizontal: 24,
          }}
        >
          About Us
        </Text>
        <Text
          style={{
            marginTop: 16,
            fontSize: 16,
            color: "#e0f2fe",
            textAlign: "center",
            paddingHorizontal: 24,
          }}
        >
          Learn more about our mission and commitment to pure water.
        </Text>

        <View
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%" }}
        >
          <Wave height={100} />
        </View>
      </LinearGradient>

      {/* Description */}
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ duration: 800 }}
        style={{ paddingHorizontal: 24, marginTop: 24, marginBottom: 24 }}
      >
        <Text
          style={{
            fontSize: 16,
            color: "#374151",
            textAlign: "center",
            lineHeight: 24,
          }}
        >
          Moises Water Refill Station is dedicated to delivering life’s most
          essential resource —{" "}
          <Text style={{ fontWeight: "bold" }}>
            pure, clean, and refreshing water
          </Text>
          . With eco-friendly refilling, we ensure your family stays healthy and
          hydrated.
        </Text>
      </MotiView>

      {/* Feature Cards */}
      <View style={{ paddingHorizontal: 16, marginBottom: 32 }}>
        {features.map((item, idx) => (
          <MotiView
            key={idx}
            from={{ opacity: 0, translateY: 20 }}
            animate={{ opacity: 1, translateY: 0 }}
            transition={{ delay: 0.3 + idx * 0.3, duration: 800 }}
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
              marginBottom: 16, // ✅ space between cards
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
      <Footer />
    </ScrollView>
  );
}
