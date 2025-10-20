// pages/Order.jsx
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { MotiView } from "moti";
import Ionicons from "react-native-vector-icons/Ionicons";
import Wave from "../components/Wave";
import { LinearGradient } from "expo-linear-gradient";

export default function Order() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [hasContainer, setHasContainer] = useState(false);
  const [delivery, setDelivery] = useState(false);
  const [message, setMessage] = useState("");

  // Replace with your Firebase logic
  const handleOrder = () => {
    if (!customerName || !phone || (delivery && !address)) {
      return Alert.alert("Error", "Please fill all required fields");
    }
    const totalPrice = (!hasContainer ? 200 : 0) + (delivery ? 30 : 25);
    setMessage(`Order placed! Total: ₱${totalPrice}`);
    setCustomerName("");
    setPhone("");
    setAddress("");
    setHasContainer(false);
    setDelivery(false);
    setTimeout(() => setMessage(""), 4000);
  };

  const calculatePrice = () => {
    let price = 0;
    if (!hasContainer) price += 200;
    if (delivery) price += 30;
    return price;
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#eff6ff" }}
    >
      {/* Hero Section */}

      <View style={{ position: "relative" }}>
        <LinearGradient
          colors={["#93c5fd", "#3b82f6", "#1e40af"]} // ✅ Gradient colors
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
            Place Your Order
          </Text>
          <Text
            style={{
              marginTop: 12,
              fontSize: 16,
              color: "#e0f2fe",
              textAlign: "center",
            }}
          >
            Fresh & pure water delivered to your doorstep or ready for pickup.
          </Text>
        </LinearGradient>

        {/* Wave */}
        <View
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%" }}
        >
          <Wave height={88} />
        </View>
      </View>

      {/* Order Form Card */}
      <View style={{ paddingHorizontal: 16, marginTop: 32, marginBottom: 32 }}>
        <MotiView
          from={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          style={{
            backgroundColor: "white",
            borderRadius: 16,
            padding: 20,
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 6,
            elevation: 3,
          }}
        >
          {message && (
            <Text
              style={{
                textAlign: "center",
                marginBottom: 12,
                color: "green",
                fontWeight: "600",
              }}
            >
              {message}
            </Text>
          )}

          <TextInput
            placeholder="Name"
            value={customerName}
            onChangeText={setCustomerName}
            style={{
              borderWidth: 1,
              borderColor: "#93c5fd",
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
            }}
          />
          <TextInput
            placeholder="Phone"
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
            style={{
              borderWidth: 1,
              borderColor: "#93c5fd",
              borderRadius: 12,
              padding: 12,
              marginBottom: 12,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "600", color: "#1e40af" }}>
              Do you have a container?
            </Text>
            <TouchableOpacity
              onPress={() => setHasContainer(!hasContainer)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 12,
                backgroundColor: hasContainer ? "#2563eb" : "#bfdbfe",
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                {hasContainer ? "Yes" : "No"}
              </Text>
            </TouchableOpacity>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 12,
            }}
          >
            <Text style={{ fontWeight: "600", color: "#1e40af" }}>
              Delivery?
            </Text>
            <TouchableOpacity
              onPress={() => setDelivery(!delivery)}
              style={{
                paddingHorizontal: 16,
                paddingVertical: 8,
                borderRadius: 12,
                backgroundColor: delivery ? "#2563eb" : "#bfdbfe",
              }}
            >
              <Text style={{ color: "white", fontWeight: "600" }}>
                {delivery ? "Yes" : "No"}
              </Text>
            </TouchableOpacity>
          </View>

          {delivery && (
            <TextInput
              placeholder="Address"
              value={address}
              onChangeText={setAddress}
              style={{
                borderWidth: 1,
                borderColor: "#93c5fd",
                borderRadius: 12,
                padding: 12,
                marginBottom: 12,
              }}
            />
          )}

          <TouchableOpacity
            onPress={handleOrder}
            style={{
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#2563eb",
              paddingVertical: 12,
              borderRadius: 12,
              marginBottom: 8,
            }}
          >
            <Ionicons name="water-outline" size={20} color="#fff" />
            <Text style={{ color: "white", fontWeight: "600", marginLeft: 8 }}>
              Place Order
            </Text>
          </TouchableOpacity>

          <Text
            style={{ textAlign: "center", color: "#1e40af", fontWeight: "600" }}
          >
            Total: ₱{calculatePrice()}
          </Text>
        </MotiView>
      </View>
    </ScrollView>
  );
}
