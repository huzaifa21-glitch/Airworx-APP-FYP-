import { Stack } from 'expo-router';
import Login from './login';
import Register from './Register';
export default function StackLayout() {
  return (
   <Stack>
    <Stack.Screen
        name="login"
        options={{ headerShown: false }}
        
      />
      <Stack.Screen
        name="Register"
        options={{ headerShown: false }}
        // component = {Register}
      />
      <Stack.Screen
        name="upload"
        options={{ headerShown: false }}
        // component = {Register}
      />
       <Stack.Screen
        name="report"
        options={{ headerShown: false }}
        // component = {Register}
      />
      <Stack.Screen
        name="forgotpass"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="floodreport"
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="firereport"
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="home"
        options={{ headerShown: false }}
      />
       <Stack.Screen
        name="upload2"
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="upload3"
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="tabs"
        options={{ headerShown: false }}
      />
   </Stack>
  );
}
