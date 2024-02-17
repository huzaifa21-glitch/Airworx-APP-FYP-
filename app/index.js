import { StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect,useNavigation } from "expo-router";


var parsedData;
export default function Page() {
  const [isLogin, setIsLogin] = useState(null);
  const navigation = useNavigation();
  const retrieveData = async () => {
    try {
      const data = await AsyncStorage.getItem('KeepLoggedIn');
      const parsedData = JSON.parse(data);

      console.log('token:', parsedData);

      if (parsedData) {
        // console.log('found parseDATA');
        // If there's a valid token in AsyncStorage, set isLogin to true
        setIsLogin(true);
      } else {
        // If no token found, set isLogin to false
        setIsLogin(false);
      }
    } catch (error) {
      console.error('Error retrieving data:', error);
      // Handle error accordingly, you might want to set isLogin to false in case of an error
      setIsLogin(false);
    }
  };

  useEffect(() => {
    retrieveData();
  }, []);
  useEffect(() => {
    if (isLogin) {
      // Navigate to "tabs" if isLogin is true
      navigation.replace('tabs'); // Use replace to prevent going back to the login screen
    } else {
      // Navigate to "login" if isLogin is false
      navigation.replace('login'); // Use replace to prevent going back to the login screen
    }
  }, [isLogin, navigation]);

  return; //
}
