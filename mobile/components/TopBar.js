import React from "react";
import { View, Text, StyleSheet, Image, ImageBackground } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { DrawerNavigatorItems } from "react-navigation-drawer";
import {
  createDrawerNavigator,
  DrawerItemList,
  DrawerContentScrollView
} from "@react-navigation/drawer";
import Emoji from "react-native-emoji";

// this is the component that holds user info at the top of the drawer
const TopBar = props => {
  return (
    <View>
      <ImageBackground
        source={require("../assets/topbar-background-gradient.png")}
        style={styles.backgroundstyle}
      >
        {/* <Image
          source={require("../assets/profile-pic.jpg")}
          styles={styles.profile}
        /> */}
        <Text style={styles.name}>Kobe Bryant</Text>
        <View style={{ flexDirection: "row" }}>
          <Text style={styles.rating}>4.9 rating</Text>
          <Emoji name="trophy" style={styles.emojiStyle} />
          <Emoji name="basketball" style={styles.emojiStyle} />
          <Emoji name="snake" style={styles.emojiStyle} />
        </View>
      </ImageBackground>

      {/* <View style={styles.container}>
        <DrawerNavigatorItems {...props} />
      </View> */}
      <DrawerItemList {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "contain"
  },
  backgroundstyle: {
    width: undefined,
    padding: 16,
    paddingTop: 48
  },
  name: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
    marginVertical: 8
  },
  rating: {
    fontSize: 13,
    marginRight: 4,
    color: "white",
    textAlign: "left",
    paddingRight: 75
  },
  container: {
    flex: 1
  },
  emojiStyle: {
    fontSize: 25,
    textAlign: "right"
  }
});

export default TopBar;
