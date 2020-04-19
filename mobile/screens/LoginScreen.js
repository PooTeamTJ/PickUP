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
} from "react-native";

// using class based components because they have access to lifecycle methods such as componentDidMount
export default class LoginPage extends Component {
  state = {
    email: "",
    password: "",
  };

  login = () => {
    // console.log(this.state.email + " " + this.state.password);
    fetch("https://us-central1-pickup-proj.cloudfunctions.net/api/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        // console.log(res.token);

        // logged in was successfull, store token
        if (res.token != null) {
          //console.log(res.token);
          AsyncStorage.setItem("token", JSON.stringify(res.token));
          this.props.navigation.navigate("Home");
        } else {
          alert(res.message); // tell user the password specifications
        }
      })
      .catch((error) => console.error(error))
      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        {/**    background img      **/}
        <ImageBackground
          source={require("../assets/loginBG.jpeg")}
          style={styles.image}
        >
          {/**    header, can be replaced with app logo when we get one     **/}
          <Text style={styles.welcome}>PickUp</Text>

          {/**    User input place holder      **/}
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => this.setState({ email: text })}
          />

          {/**    Password input place holder      **/}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => this.setState({ password: text })}
          />

          {/**    Buttons container      **/}
          <View style={styles.btnContainer}>
            {/**    Login btn      **/}
            <TouchableOpacity style={styles.userBtn} onPress={this.login}>
              <Text style={styles.btnTxt}>Login</Text>
            </TouchableOpacity>

            {/**    Signup btn      **/}
            <TouchableOpacity
              style={styles.userBtn}
              onPress={() => this.props.navigation.navigate("Signup")}
            >
              <Text style={styles.btnTxt}>Signup</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

{
  /**    styles     **/
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 30,
    textAlign: "center",
    margin: 10,
    color: "#FFF",
  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10,
  },
  userBtn: {
    backgroundColor: "#FFD700",
    padding: 15,
    width: "45%",
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center",
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
});
