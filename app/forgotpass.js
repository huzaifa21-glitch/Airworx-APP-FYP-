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
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-simple-toast";
export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [otpFocused, setOtpFocused] = useState(false);
  const [otpGenerated, setOtpGenerated] = useState(false);


  const isEmailValid = (email) => {
    // Regular expression for a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isFieldEmpty = (value) => {
    // Check if the value is empty or contains only whitespace
    return !value || /^\s*$/.test(value);
  };

  const sendOTP = async (email) => {
    if (isFieldEmpty(email)) {
       
      Toast.show("Please Enter Email")
      return;
    }
    if (!isEmailValid(email)) {
      Toast.show("Please enter a valid email address");
      console.log("invalid Email");
      return;
    }
    try {
      const userEmail = email; // Replace with the actual user email

      // Make a POST request to send OTP
      const response = await axios.post("http://192.168.104.24:3000/send-otp", {
        userEmail,
      });
      const result = response.data; // Use response.data directly

      console.log(result);

      if (response.status === 300) {
        Toast.show("User Not Found!", Toast.LONG);
        // console.error(result.error);
      } else {
        if (result.success) {
          // OTP sent successfully
          console.log("OTP sent successfully");
          setOtpGenerated(true);
          Toast.show("OTP Generated Successfully", Toast.LONG);
          // console.log(result.message);
        } else {
          // OTP sending failed
          console.error(result.message);
        }
      }
      // Handle the response
    } catch (error) {
      console.error("Error sending OTP:", error.message);
    }
  };

  const resetPassword = () => {
    if (isFieldEmpty(password)) {
    
      Toast.show("Please enter a valid password");
      return;
    }

    if (isFieldEmpty(otp)) {
    
      Toast.show("Please enter a valid otp");
      return;
    }

    const endpointUrl = "http://192.168.104.24:3000/verify-otp"; // Replace with your actual API base URL

    // Example data to send in the request body
    const requestData = {
      userEmail: email,
      code: otp,
      newPassword: password,
    };

    // Make a POST request to the /verify-otp endpoint
    axios
      .post(endpointUrl, requestData)
      .then((response) => {
        router.replace("/login");
        console.log("Response:", response.data);
        Toast.show("Password Reset Succesfull", Toast.LONG);
      })
      .catch((error) => {
        console.error(
          "Error:",
          error.response ? error.response.data : error.message
        );
      });
    // Add your logic to reset the password using the OTP and new password
  };

  const navigateToRegister = () => {
    router.replace("/login");
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <ImageBackground
        source={require("./assets/forgot.jpg")}
        style={styles.backgroundImage}
      >
        <View style={styles.container}>
          <View style={styles.main}>
            <Text style={styles.title}>A I R W O R X</Text>
            <Text style={styles.subtitle}>Forgot Password</Text>

            <View style={styles.inputContainer}>
              {/* First View (Email Input and OTP Generation Button) */}
              {!otpGenerated && (
                <>
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
                  <TouchableOpacity
                    onPress={() => sendOTP(email)}
                    style={styles.loginButton}
                  >
                    <Text style={styles.buttonText}>Generate OTP</Text>
                  </TouchableOpacity>
                </>
              )}

              {/* Second View (OTP Input, Password Input, and Reset Password Button) */}
              {otpGenerated && (
                <>
                  <TextInput
                    style={[styles.input, otpFocused && styles.inputFocused]}
                    placeholder="Enter OTP"
                    placeholderTextColor={"#000"}
                    onFocus={() => setOtpFocused(true)}
                    onBlur={() => setOtpFocused(false)}
                    onChangeText={(text) => setOtp(text)}
                  />

                  <TextInput
                    style={[
                      styles.input,
                      passwordFocused && styles.inputFocused,
                    ]}
                    placeholder="New Password"
                    secureTextEntry
                    placeholderTextColor={"#000"}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    onChangeText={(text) => setPassword(text)}
                  />

                  <TouchableOpacity
                    onPress={resetPassword}
                    style={styles.loginButton}
                  >
                    <Text style={styles.buttonText}>Reset Password</Text>
                  </TouchableOpacity>
                </>
              )}
            </View>

            <View style={styles.linksContainer}>
              <TouchableOpacity onPress={navigateToRegister}>
                <Text style={styles.linkText}>Back To Login</Text>
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
