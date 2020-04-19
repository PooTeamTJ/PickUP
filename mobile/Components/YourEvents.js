import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
  AsyncStorage,
} from "react-native";
import EventComponent from "../Components/eventComponent";
import { Card, ListItem, Icon } from "react-native-elements";
// const { db } = require("../../web/functions/util/admin");

export default class YourEvents extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        { name: "Basketball at UCF", id: 1 },
        { name: "soccer", id: 2 },
        { name: "Lacrosse at the park", id: 3 },
      ],
      token: "",
    };
  }

  // need to get events from users

  async getUserToken(key) {
    try {
      // need to wait to get token because render will load before lifecycle method
      const retrievedItem = await AsyncStorage.getItem(key);
      const token = JSON.parse(retrievedItem);
      return token;
    } catch (error) {
      console.log("fail");
    }
  }

  componentDidMount() {
    this.getUserToken("token")
      .then((value) => {
        console.log(value);
        // token is now in memory (state) and stored on the device for one hour
        this.token = value;
      })
      .catch((error) => {
        console.log("Error getting token");
      });
  }

  renderItem = ({ item }) => {
    return (
      <View>
        <Text>
          {item.name} id:{item.id}
        </Text>
      </View>
    );
  };
  render() {
    return (
      <React.Fragment>
        <FlatList data={this.state.events} renderItem={this.renderItem} />
      </React.Fragment>
    );
  }
}

const styles = StyleSheet.create({});
