import * as React from "react";
import { Button, View, StyleSheet, Text } from "react-native";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import AllEventsScreen from "./screens/AllEventsScreen";
import TopBar from "./components/TopBar";
import LoginScreen from "./screens/LoginScreen";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = props => {
  return (
    <DrawerContentScrollView {...props}>
      <Text>test</Text>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Home"
        drawerStyle={styles.drawerStyle}
        drawerContent={props => <TopBar {...props} />}
      >
        <Drawer.Screen name="Home" component={HomeScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
        <Drawer.Screen name="All Events" component={AllEventsScreen} />
        <Drawer.Screen name="login test" component={LoginScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  drawerStyle: {
    backgroundColor: "white"
  }
});
