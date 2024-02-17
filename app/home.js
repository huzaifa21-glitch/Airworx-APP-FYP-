import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  KeyboardAvoidingView,
} from "react-native";
import { router } from "expo-router";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from "react-native-simple-toast";
export default function HomeScreen({ }) {
  

  const navigate = () => {
    router.replace("/tabs");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground
        source={require("./assets/home.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>A I R W O R X</Text>
            <Text style={styles.subtitle}>Empowering communities after disasters. Estimate damage, track affected populations, and view insightful charts. Access historical data for better preparedness. Engage with your community and receive resource allocation recommendations. Your tool for a resilient future.</Text>

            

            <TouchableOpacity onPress={navigate} style={styles.loginButton}>
              <Text style={styles.buttonText}>Explore More</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: "cover", // or 'stretch'
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 400,
    width: "100%",
    marginHorizontal: "auto",
    backgroundColor: "rgba(255, 255, 255, 0.9)", // Adjust the opacity as needed
    padding: 10,
    borderRadius: 12,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#38434D",
    marginBottom: 24,
    textAlign: "center",
    width:'100%',
    marginVertical:30,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    height: 50,
    borderColor: "#72A0C1",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingLeft: 10,
    backgroundColor: "#ddd",
  },
  inputFocused: {
    borderColor: "#002D62", // Change the border color when focused
    borderWidth: 1.5,
  },
  loginButton: {
    backgroundColor: "#002D62",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    marginVertical:30,
    marginHorizontal:20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  linksContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  linkText: {
    color: "#034694",
    textDecorationLine: "underline",
    marginRight: 8,
  },
  separator: {
    color: "#3498db",
    fontSize: 16,
    marginHorizontal: 8,
  },
});
