import React from "react";
import { View, Button, StyleSheet } from "react-native";

const ProfileScreen = ({ navigation }) => {
  return (
    <View style={styles.buttonStyle}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default ProfileScreen;
