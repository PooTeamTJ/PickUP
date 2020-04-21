import * as React from "react";
import { Button, View, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AllEventsScreen from "./screens/AllEventsScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import EventComponent from "./Components/eventComponent";
import CreateEventComponent from "./Components/createEvent";
import ChangePasswordScreen from "./screens/ChangePassword";
import EventScreen from "./screens/EventScreen";

const Drawer = createDrawerNavigator();

export default function App() {
  console.disableYellowBox = true
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Back to Login">
        <Drawer.Screen name="Back to Login" component={LoginScreen} />
        <Drawer.Screen name="Create an Account" component={SignUpScreen} />
        <Drawer.Screen name="Change Password" component={ChangePasswordScreen}/>
        {/* <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} /> */}
        <Drawer.Screen name="All Events" component={AllEventsScreen} />
        <Drawer.Screen name="Create Event" component={CreateEventComponent} />
        <Drawer.Screen name="Event" component={EventComponent} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  white: {
    color: "black",
    marginLeft: 5
  }
});
