import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { MotiView } from "moti";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import Wave from "../components/Wave";
import Footer from "../components/Footer";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Home({ navigation }) {
  const bubbles = [
    { size: 20, left: "10%", delay: 0 },
    { size: 30, left: "25%", delay: 1 },
    { size: 15, left: "50%", delay: 2 },
    { size: 25, left: "70%", delay: 1.5 },
    { size: 18, left: "85%", delay: 0.5 },
  ];

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      {/* Hero Section */}
      <LinearGradient
        colors={["#93c5fd", "#3b82f6", "#1e40af"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{
          minHeight: SCREEN_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating bubbles */}
        {bubbles.map((b, i) => (
          <MotiView
            key={i}
            from={{ translateY: 0, opacity: 0.4 }}
            animate={{ translateY: -300, opacity: 0 }}
            transition={{
              duration: 4000 + i * 500,
              repeat: Infinity,
              delay: b.delay * 1000,
            }}
            style={{
              width: b.size,
              height: b.size,
              left: b.left,
              position: "absolute",
              bottom: 40,
              backgroundColor: "white",
              borderRadius: b.size / 2,
              opacity: 0.3,
            }}
          />
        ))}

        <View style={{ zIndex: 20, paddingHorizontal: 24 }}>
          <Text
            style={{
              fontSize: 40,
              fontWeight: "800",
              color: "white",
              textAlign: "center",
            }}
          >
            Pure Water, Pure Life
          </Text>
          <Text
            style={{
              marginTop: 16,
              fontSize: 16,
              color: "#e0f2fe",
              textAlign: "center",
            }}
          >
            Refresh your body and soul with the cleanest, safest water in town.
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 32,
              gap: 12,
            }}
          >
            {/* Navigate to Order Page */}
            <TouchableOpacity
              onPress={() => navigation.navigate("Order")}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                backgroundColor: "#2563eb",
                borderRadius: 24,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Ionicons name="cart" size={18} color="#fff" />
              <Text style={{ color: "white", fontWeight: "600" }}>
                Order Now
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => navigation.navigate("About")}
              style={{
                paddingHorizontal: 24,
                paddingVertical: 12,
                borderWidth: 1,
                borderColor: "white",
                borderRadius: 24,
                flexDirection: "row",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Ionicons
                name="information-circle-outline"
                size={18}
                color="#fff"
              />
              <Text style={{ color: "white", fontWeight: "600" }}>
                Learn More
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={{ position: "absolute", bottom: 0, width: "100%" }}>
          <Wave height={160} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
}
