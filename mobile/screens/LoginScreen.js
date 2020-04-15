import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const LoginScreen = () => {
  return (
    <View>
      <Text style={styles.loginText}>Log in</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loginText: {
    textAlign: "center",
    marginTop: 400,
    fontSize: 40
  }
});

export default LoginScreen;
