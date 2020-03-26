import React from "react";
import { View, Button, StyleSheet, Text } from "react-native";

const AllEventsScreen = ({ navigation }) => {
  return (
    <View>
      <Text style={styles.title}>All Events Near Me</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginTop: 100,
    fontSize: 40,
    textAlign: "center"
  }
});

export default AllEventsScreen;
