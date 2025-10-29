import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
  TextInput,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { BlurView } from "expo-blur";
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
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

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
        // Reverse the array so latest orders show at the top
        const reversedOrders = parsedOrders.reverse();
        setOrders(reversedOrders);
        setFilteredOrders(reversedOrders);
      } else {
        setOrders([]);
        setFilteredOrders([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    let updatedOrders = orders;

    if (filterStatus !== "All") {
      updatedOrders = updatedOrders.filter(
        (order) => order.status === filterStatus
      );
    }

    if (searchQuery.trim() !== "") {
      const queryLower = searchQuery.toLowerCase();
      updatedOrders = updatedOrders.filter(
        (order) =>
          order.customerName.toLowerCase().includes(queryLower) ||
          order.phone.includes(queryLower) ||
          order.address?.toLowerCase().includes(queryLower)
      );
    }

    setFilteredOrders(updatedOrders);
  }, [searchQuery, filterStatus, orders]);

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
      transition={{ duration: 400 }}
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

      <View style={styles.orderRow}>
        <Ionicons name="water-outline" size={18} color="#2563eb" />
        <Text style={styles.orderText}>Quantity: {item.quantity}</Text>
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

        <BlurView intensity={90} tint="light" style={styles.infoCard}>
          <Ionicons name="person-circle-outline" size={70} color="#1e3a8a" />
          <Text style={styles.email}>{email}</Text>

          <TouchableOpacity
            onPress={() => signOut(auth).then(onLogout)}
            style={styles.logoutButton}
          >
            <Ionicons name="log-out-outline" size={20} color="#1e3a8a" />
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </BlurView>
      </View>

      {/* Search + Filter */}
      <View style={styles.filterContainer}>
        <TextInput
          placeholder="Search by name, phone, or address"
          placeholderTextColor="#9ca3af"
          value={searchQuery}
          onChangeText={setSearchQuery}
          style={styles.searchInput}
        />

        <View style={styles.filterButtons}>
          {["All", "Pending", "On the Way", "Delivered"].map((status) => (
            <TouchableOpacity
              key={status}
              onPress={() => setFilterStatus(status)}
              style={[
                styles.filterButton,
                filterStatus === status && styles.filterButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.filterText,
                  filterStatus === status && styles.filterTextActive,
                ]}
              >
                {status}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Orders */}
      <View style={styles.ordersContainer}>
        {loading ? (
          <ActivityIndicator
            size="large"
            color="#fff"
            style={{ marginTop: 40 }}
          />
        ) : filteredOrders.length === 0 ? (
          <Text style={styles.noOrdersText}>No matching orders found.</Text>
        ) : (
          <FlatList
            data={filteredOrders}
            renderItem={renderOrder}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingBottom: 120 }}
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
    marginBottom: 20,
  },
  infoCard: {
    backgroundColor: "rgba(255, 255, 255, 0.25)",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "85%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    color: "white",
    fontSize: 34,
    fontWeight: "800",
    marginBottom: 12,
  },
  email: {
    color: "#1e3a8a",
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 6,
  },
  logoutText: {
    color: "#1e3a8a",
    fontWeight: "700",
    fontSize: 15,
    marginLeft: 6,
  },
  filterContainer: {
    marginBottom: 14,
  },
  searchInput: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 10,
    fontSize: 14,
    marginBottom: 10,
  },
  filterButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
  },
  filterButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 6,
  },
  filterButtonActive: {
    backgroundColor: "white",
  },
  filterText: {
    color: "white",
    fontSize: 13,
    fontWeight: "500",
  },
  filterTextActive: {
    color: "#1e3a8a",
    fontWeight: "700",
  },
  ordersContainer: {
    flex: 1,
  },
  noOrdersText: {
    color: "#f0f9ff",
    textAlign: "center",
    fontSize: 16,
    marginTop: 40,
  },
  orderCard: {
    backgroundColor: "rgba(255, 255, 255, 0.15)",
    borderRadius: 20,
    padding: 16,
    width: SCREEN_WIDTH - 48,
    alignSelf: "center",
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.2)",
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
