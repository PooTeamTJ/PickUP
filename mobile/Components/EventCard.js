// event card for AllEventsScreen
import React, { Component } from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  FlatList,
} from "react-native";

export default class EventCard extends Component {
  constructor(props) {
    super(props);
  }

  state = {};

  render() {
    return (
      <View>
        <Text>sport: {this.props.event.sport}</Text>
        <Text>location: {this.props.event.location}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
