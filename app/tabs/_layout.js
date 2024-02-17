import { StyleSheet, Text, View } from "react-native";
import { Tabs } from "expo-router";
import Dashboard from "./dash";
import HistoryScreen from "./history";
import UploadScreen from "../upload";
import { Ionicons } from "@expo/vector-icons";
export default () => {
    
    return (
        <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#8494ac", // Customize the active tab color
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            backgroundColor: "white",
            borderTopWidth: 1,
          },
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            let label;
  
            if (route.name === "dash") {
              iconName = focused ? "home" : "home-outline";
              label = "Home";
            } else if (route.name === "history") {
              iconName = focused ? "clipboard" : "clipboard-outline";
              label = "History";
            } 
  
            return (
              <View style={{ alignItems: "center", marginTop: 9 }}>
                <Ionicons name={iconName} size={size} color={color} />
                <Text style={{ color, fontSize: 12, fontWeight: "500" }}>
                  {label}
                </Text>
              </View>
            );
          },
        })}
      >
        <Tabs.Screen
          name="dash"
          options={{ tabBarLabel: "" }}
          // component={Dashboard}
        />
        <Tabs.Screen
          name="history"
          options={{ tabBarLabel: "" }}
          // component={HistoryScreen}
        />
        
      </Tabs>
    );
  };