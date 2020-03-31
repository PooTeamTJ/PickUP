import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.title}>This is the Events Page</Text>
      <View style={styles.buttonStyle}>
        <Button
          onPress={() => navigation.navigate("Profile")}
          title="Go to profile"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center"
  },
  title: {
    marginTop: 100,
    fontSize: 40,
    justifyContent: "center"
  }
});

export default HomeScreen;
