import { Link } from "expo-router";
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

import Toast from "react-native-simple-toast";
export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [nameFocused, setNameFocused] = useState(false);
  const isEmailValid = (email) => {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isPasswordValid = (password) => {
    // Password must be at least 6 characters long
    return password.length >= 8;
  };
  const isFieldEmpty = (value) => {
    // Check if the value is empty or contains only whitespace
    return !value || /^\s*$/.test(value);
  };

  const handleRegistration = async () => {
    try {
     
      if (isFieldEmpty(name)) {
       
        Toast.show("Please enter a valid name");
        return;
      }
      if (isFieldEmpty(email)) {
       
        Toast.show("Please enter a valid email")
        return;
      }
      if (isFieldEmpty(password)) {
      
        Toast.show("Please enter a valid password");
        return;
      }
      if (!isEmailValid(email)) {
        // Toast.show("Please enter a valid email address");
        console.log("invalid Email");
        return;
      }

      if (!isPasswordValid(password)) {
        Toast.show("Password must be at least 6 characters long");
        return;
      }
      const response = await fetch("http://192.168.104.24:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          name,
          password,
        }),
      });
      const data = await response.json();

      if (response.status == "201") {
      
        Toast.show("You have succesfully registered to AIRWORX!")
        router.replace("/login");
        console.log(data.message);
      } else if (response.status == "400") {
       
        Toast.show("Email Already Exists")
        console.log(data.message);
      } else {
        console.error(data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const navigateToRegister = () => {
    router.replace("/login");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground
        source={require("./assets/flood.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>A I R W O R X</Text>
            <Text style={styles.subtitle}>Sign Up</Text>

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, nameFocused && styles.inputFocused]}
                placeholder="Name"
                autoCapitalize="none"
                placeholderTextColor={"#000"}
                onFocus={() => setNameFocused(true)}
                onBlur={() => setNameFocused(false)}
                onChangeText={(text) => setName(text)}
              />

              <TextInput
                style={[styles.input, emailFocused && styles.inputFocused]}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor={"#000"}
                onFocus={() => setEmailFocused(true)}
                onBlur={() => setEmailFocused(false)}
                onChangeText={(text) => setEmail(text)}
              />
              <TextInput
                style={[styles.input, passwordFocused && styles.inputFocused]}
                placeholder="Password"
                secureTextEntry
                placeholderTextColor={"#000"}
                onFocus={() => setPasswordFocused(true)}
                onBlur={() => setPasswordFocused(false)}
                onChangeText={(text) => setPassword(text)}
              />
            </View>

            <TouchableOpacity
              onPress={handleRegistration}
              style={styles.loginButton}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>

            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={navigateToRegister}>
                <Text style={styles.linkText}>
                  Already Have An Account? SingIn
                </Text>
              </TouchableOpacity>
            </View>
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
    padding: 20,
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
