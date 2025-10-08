import React from "react";
import { View, Text, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Footer from "../components/Footer";
import Wave from "../components/Wave";
import { LinearGradient } from "expo-linear-gradient";

export default function Contact() {
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
            height: 200,
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
            Contact Us
          </Text>
          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              color: "#e0f2fe",
              textAlign: "center",
            }}
          >
            We’d love to hear from you!
          </Text>
        </LinearGradient>

        {/* Wave at bottom */}
        <View
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%" }}
        >
          <Wave height={100} />
        </View>
      </View>

      {/* Contact Cards */}
      <View style={{ paddingHorizontal: 16, marginTop: 32, marginBottom: 32 }}>
        {/* Address */}
        <View
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
            marginBottom: 16, // Space between cards
          }}
        >
          <Ionicons name="location-outline" size={28} color="#2563eb" />
          <Text style={{ marginLeft: 16, color: "#4b5563", flex: 1 }}>
            084 San Francisco, Llanera, Nueva Ecija
          </Text>
        </View>

        {/* Phone */}
        <View
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
            marginBottom: 16,
          }}
        >
          <Ionicons name="call-outline" size={28} color="#2563eb" />
          <Text style={{ marginLeft: 16, color: "#4b5563", flex: 1 }}>
            +63 950 467 8234
          </Text>
        </View>

        {/* Email */}
        <View
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
          }}
        >
          <Ionicons name="mail-outline" size={28} color="#2563eb" />
          <Text style={{ marginLeft: 16, color: "#4b5563", flex: 1 }}>
            moiseswater@gmail.com
          </Text>
        </View>
      </View>

      {/* Footer */}
      <Footer />
    </ScrollView>
  );
}
