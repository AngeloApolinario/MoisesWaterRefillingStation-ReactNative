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
import { LinearGradient } from "expo-linear-gradient";
import Wave from "../components/Wave";
import { ref, push } from "firebase/database";
import { database, auth } from "../firebaseConfig";

export default function Order() {
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [hasContainer, setHasContainer] = useState(true);
  const [delivery, setDelivery] = useState(false);
  const [quantity, setQuantity] = useState("1");
  const [message, setMessage] = useState("");

  const REFILL_PRICE = 25;
  const CONTAINER_PRICE = 200;
  const DELIVERY_FLAT = 5;

  // Correct calculation: per refill/container, delivery fee is per unit
  const calculatePrice = () => {
    const qty = parseInt(quantity) || 0;
    let total = 0;

    total += qty * REFILL_PRICE; // refill cost
    if (!hasContainer) total += qty * CONTAINER_PRICE; // container cost
    if (delivery) total += qty * DELIVERY_FLAT; // delivery fee per unit

    return total;
  };

  const getBreakdown = () => {
    const qty = parseInt(quantity) || 0;
    const refill = qty * REFILL_PRICE;
    const container = !hasContainer ? qty * CONTAINER_PRICE : 0;
    const deliveryFee = delivery ? qty * DELIVERY_FLAT : 0;
    const total = refill + container + deliveryFee;
    return { refill, container, deliveryFee, total };
  };

  const handleOrder = async () => {
    const user = auth.currentUser;
    if (!user)
      return Alert.alert("Error", "You must be logged in to place an order.");

    if (!customerName || !phone || (delivery && !address) || !quantity) {
      return Alert.alert("Error", "Please fill all required fields");
    }

    const qty = parseInt(quantity);
    if (isNaN(qty) || qty <= 0) {
      return Alert.alert("Error", "Quantity must be a positive number");
    }

    const totalPrice = calculatePrice();

    const newOrder = {
      userId: user.uid,
      customerName,
      phone,
      address: delivery ? address : "Pickup at Moises Water Station",
      hasContainer,
      delivery,
      quantity: qty,
      price: totalPrice,
      status: "Pending",
      createdAt: Date.now(),
    };

    try {
      await push(ref(database, "orders"), newOrder);
      setMessage(`Order placed successfully! Total: ₱${totalPrice}`);
      setCustomerName("");
      setPhone("");
      setAddress("");
      setQuantity("1");
      setHasContainer(true);
      setDelivery(false);
      setTimeout(() => setMessage(""), 4000);
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to place order. Try again.");
    }
  };

  const { refill, container, deliveryFee, total } = getBreakdown();

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#eff6ff" }}
    >
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

        <View
          style={{ position: "absolute", bottom: -1, left: 0, width: "100%" }}
        >
          <Wave height={88} />
        </View>
      </View>

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
            placeholder="Full Name"
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

          <TextInput
            placeholder="Quantity"
            value={quantity}
            onChangeText={setQuantity}
            keyboardType="numeric"
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
                backgroundColor: hasContainer ? "#2563eb" : "#ef4444",
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
              placeholder="Delivery Address"
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

          {/* Price breakdown */}

          <View
            style={{
              marginTop: 16,
              backgroundColor: "#f0f9ff",
              padding: 16,
              borderRadius: 16,
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowOffset: { width: 0, height: 4 },
              shadowRadius: 6,
              elevation: 3,
            }}
          >
            <Text
              style={{
                color: "#1e3a8a",
                fontWeight: "800",
                fontSize: 18,
                textAlign: "center",
                marginBottom: 12,
              }}
            >
              💧 Order Summary
            </Text>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#2563eb", fontWeight: "600" }}>
                Refill(s)
              </Text>
              <Text style={{ color: "#1e40af", fontWeight: "700" }}>
                ₱{refill}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#ef4444", fontWeight: "600" }}>
                Container fee
              </Text>
              <Text style={{ color: "#b91c1c", fontWeight: "700" }}>
                ₱{container}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginBottom: 8,
              }}
            >
              <Text style={{ color: "#16a34a", fontWeight: "600" }}>
                Delivery fee
              </Text>
              <Text style={{ color: "#166534", fontWeight: "700" }}>
                ₱{deliveryFee}
              </Text>
            </View>

            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#cbd5e1",
                marginVertical: 10,
              }}
            />

            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text
                style={{ color: "#1e3a8a", fontWeight: "800", fontSize: 16 }}
              >
                Total
              </Text>
              <Text
                style={{ color: "#1e40af", fontWeight: "900", fontSize: 16 }}
              >
                ₱{total}
              </Text>
            </View>
          </View>
        </MotiView>
      </View>
    </ScrollView>
  );
}
