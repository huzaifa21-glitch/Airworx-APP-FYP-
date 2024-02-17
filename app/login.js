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
export default function Login({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [text,setText]= useState("Login");

  const navigateToForgotPassword = () => {

    router.replace("/forgotpass");
    // Implement navigation to the Forgot Password screen
    // navigation.navigate('ForgotPassword');
  };

  const isEmailValid = (email) => {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFieldEmpty = (value) => {
    // Check if the value is empty or contains only whitespace
    return !value || /^\s*$/.test(value);
  };
  const handleLogin = async () => {
    if (isFieldEmpty(email)) {
       
      Toast.show("Please enter a valid email")
      return;
    }
    if (isFieldEmpty(password)) {
    
      Toast.show("Please enter a valid password");
      return;
    }
    if (!isEmailValid(email)) {
      Toast.show("Please enter a valid email address");
      console.log("invalid Email");
      return;
    }
    try {
      setText("Logging in...");
      const response = await fetch("http://192.168.104.24:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (response.status === 200) {
        AsyncStorage.setItem("KeepLoggedIn", JSON.stringify(true));
        AsyncStorage.setItem("userEmail", JSON.stringify(email));
        console.log("Login successful");
        router.replace("/tabs");
        setText("Login");
        // Handle successful login, e.g., navigate to the next screen
      } else if (response.status === 401) {
        console.log("Invalid Email");
        Toast.show('Invalid Email', Toast.LONG, {
          backgroundColor: '#000',
        });
        setText("Login");
      } else if (response.status === 402) {
        console.log("Invalid Password");
        Toast.show("Invalid Password");
        setText("Login");
      } else {
        console.error(data.error);
        setText("Login");
        // Handle login error, e.g., display an error message
      }
    } catch (error) {
      console.error("Error:", error);
      setText("Login");
      // Handle network or other errors
    }
  };

  const navigateToRegister = () => {
    router.replace("/Register");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground
        source={require("./assets/background.png")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>A I R W O R X</Text>
            <Text style={styles.subtitle}>Login</Text>

            <View style={styles.inputContainer}>
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

            <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
              <Text style={styles.buttonText}>{text}</Text>
            </TouchableOpacity>

            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={navigateToForgotPassword}>
                <Text style={styles.linkText}>Forgot Password?</Text>
              </TouchableOpacity>
              <Text style={styles.separator}>|</Text>
              <TouchableOpacity onPress={navigateToRegister}>
                <Text style={styles.linkText}>Register</Text>
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
