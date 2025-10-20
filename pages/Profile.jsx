import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";
import {
  getDatabase,
  ref,
  query,
  orderByChild,
  equalTo,
  onValue,
} from "firebase/database";
import { MotiView, MotiText } from "moti";
import Ionicons from "react-native-vector-icons/Ionicons";

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Profile({ onLogout }) {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const db = getDatabase();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) setEmail(user.email);

    const ordersRef = query(
      ref(db, "orders"),
      orderByChild("userId"),
      equalTo(user?.uid)
    );
    const unsubscribe = onValue(ordersRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const parsedOrders = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setOrders(parsedOrders.reverse());
      } else {
        setOrders([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "#facc15";
      case "On the Way":
        return "#3b82f6";
      case "Delivered":
        return "#16a34a";
      default:
        return "#d1d5db";
    }
  };

  const renderOrder = ({ item }) => (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ duration: 500 }}
      style={styles.orderCard}
    >
      <View style={styles.orderHeader}>
        <Text style={styles.orderTitle}>Order #{item.id.slice(-4)}</Text>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: getStatusColor(item.status) },
          ]}
        >
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>

      <View style={styles.orderRow}>
        <Ionicons name="person-outline" size={18} color="#2563eb" />
        <Text style={styles.orderText}>{item.customerName}</Text>
      </View>

      <View style={styles.orderRow}>
        <Ionicons name="call-outline" size={18} color="#2563eb" />
        <Text style={styles.orderText}>{item.phone}</Text>
      </View>

      {item.delivery && (
        <View style={styles.orderRow}>
          <Ionicons name="location-outline" size={18} color="#2563eb" />
          <Text style={styles.orderText}>{item.address}</Text>
        </View>
      )}

      <View style={styles.orderRow}>
        <Ionicons name="cube-outline" size={18} color="#2563eb" />
        <Text style={styles.orderText}>
          Container: {item.hasContainer ? "Yes" : "No"}
        </Text>
      </View>

      <View style={[styles.orderRow, { marginTop: 8 }]}>
        <Ionicons name="pricetag-outline" size={18} color="#2563eb" />
        <Text style={styles.priceText}>₱{item.price}</Text>
      </View>
    </MotiView>
  );

  return (
    <LinearGradient
      colors={["#93c5fd", "#3b82f6", "#1e40af"]}
      style={styles.container}
    >
      {/* Floating Bubbles */}
      {[10, 30, 50, 70, 90].map((left, i) => (
        <MotiView
          key={i}
          from={{ translateY: 0, opacity: 0.3 }}
          animate={{ translateY: -SCREEN_HEIGHT, opacity: 0 }}
          transition={{
            duration: 4000 + i * 500,
            repeat: Infinity,
            delay: i * 300,
          }}
          style={[
            styles.bubble,
            {
              width: 10 + i * 6,
              height: 10 + i * 6,
              left: `${left}%`,
            },
          ]}
        />
      ))}

      {/* Header */}
      <View style={styles.header}>
        <MotiText
          from={{ opacity: 0, translateY: -10 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 600 }}
          style={styles.title}
        >
          Profile
        </MotiText>
        <Text style={styles.email}>{email}</Text>
        <TouchableOpacity
          onPress={() => signOut(auth).then(onLogout)}
          style={styles.logoutButton}
        >
          <Ionicons name="log-out-outline" size={20} color="#2563eb" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Orders */}
      <View style={styles.ordersContainer}>
        <Text style={styles.ordersTitle}>My Orders</Text>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 40 }}
          />
        ) : orders.length === 0 ? (
          <Text style={styles.noOrdersText}>You have no orders yet.</Text>
        ) : (
          <FlatList
            data={orders}
            renderItem={renderOrder}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 100 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 12,
  },
  bubble: {
    position: "absolute",
    backgroundColor: "white",
    borderRadius: 999,
    bottom: 0,
    opacity: 0.3,
  },
  header: {
    alignItems: "center",
    marginBottom: 32,
  },
  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "800",
    marginBottom: 8,
  },
  email: {
    color: "#e0f2fe",
    fontSize: 16,
    fontWeight: "500",
  },
  logoutButton: {
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 18,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 6,
  },
  logoutText: {
    color: "#2563eb",
    fontWeight: "600",
    fontSize: 14,
  },
  ordersContainer: {
    flex: 1,
  },
  ordersTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 16,
  },
  noOrdersText: {
    color: "#f0f9ff",
    textAlign: "center",
    fontSize: 16,
    marginTop: 40,
  },
  orderCard: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 20,
    padding: 16,
    width: SCREEN_WIDTH - 48,
    alignSelf: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },
  orderHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  orderTitle: {
    color: "#1e3a8a",
    fontWeight: "700",
    fontSize: 16,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    color: "white",
    fontWeight: "600",
    fontSize: 12,
  },
  orderRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  orderText: {
    color: "#1e40af",
    marginLeft: 8,
    fontSize: 14,
  },
  priceText: {
    color: "#1e40af",
    marginLeft: 8,
    fontWeight: "700",
    fontSize: 15,
  },
});
