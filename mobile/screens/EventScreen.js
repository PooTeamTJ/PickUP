{
  /** Login screen. For any questions contact Zeke at Itzikefraim6@gmail.com **/
}

import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  AsyncStorage,
  Button
} from "react-native";

import EventComponent from "../Components/EventCard"

// using class based components because they have access to lifecycle methods such as componentDidMount
export default class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };



  render() {
    return (
      <View>
        <EventComponent eventID="5ZvaGKAj0FxsvlaLJPOg"/>
      </View>

    );
  }
}




const styles = StyleSheet.create({

});
