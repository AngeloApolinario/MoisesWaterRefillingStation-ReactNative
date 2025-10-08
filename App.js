import "react-native-gesture-handler";
import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LinearGradient } from "expo-linear-gradient";
import "./global.css";
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props) {
  return (
    <DrawerContentScrollView {...props} contentContainerStyle={{ flex: 1 }}>
      <LinearGradient
        colors={["#60a5fa", "#2563eb"]}
        style={styles.drawerHeader}
      >
        <Image
          source={require("./assets/moiseswater.png")}
          style={styles.logo}
        />
        <Text style={styles.drawerTitle}>MOISES WATER</Text>
      </LinearGradient>

      <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
        <DrawerItemList {...props} />
      </View>
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          headerTintColor: "#fff",
          drawerActiveTintColor: "#2563eb",
          drawerLabelStyle: { fontSize: 16 },

          headerBackground: () => (
            <LinearGradient
              colors={["#60a5fa", "#2563eb"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={{ flex: 1 }}
            />
          ),
        }}
      >
        <Drawer.Screen
          name="Home"
          component={Home}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="About"
          component={About}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons
                name="information-circle-outline"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Drawer.Screen
          name="Services"
          component={Services}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="water-outline" color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Contact"
          component={Contact}
          options={{
            drawerIcon: ({ color, size }) => (
              <Ionicons name="call-outline" color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  drawerHeader: {
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 10,
    borderRadius: 40,
  },
  drawerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
});
