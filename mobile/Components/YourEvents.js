import React from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
} from "react-native";
import EventComponent from "../Components/eventComponent";
import { Card, ListItem, Icon } from "react-native-elements";
// const { db } = require("../../web/functions/util/admin");

// need to get events from users
const events = [
  { name: "Basketball at UCF", id: 1 },
  { name: "soccer", id: 2 },
  { name: "Lacrosse at the park", id: 3 },
];

const renderItem = ({ item }) => {
  return (
    <View>
      <Text>
        {item.name} id:{item.id}
      </Text>
    </View>
  );
};

const YourEvents = () => {
  return (
    <React.Fragment>
      <FlatList data={events} renderItem={renderItem} />
    </React.Fragment>
  );
};

const styles = StyleSheet.create({});

export default YourEvents;
