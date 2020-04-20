
import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  AsyncStorage,
  Button
} from "react-native";

// using class based components because they have access to lifecycle methods such as componentDidMount
export default class ChangePassword extends Component {
  state = {
    email: ""
  };

   resetPassword = () => {
    // console.log(this.state.email + " " + this.state.password);
    fetch("https://us-central1-pickup-proj.cloudfunctions.net/api/user/updatePassword", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email
      }),
    })
      .then((response) => response.json())
      .then((res) => {
        // console.log(res.token);

        // logged in was successfull, store token
        alert("Password reset sent!")
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
                <Text style={styles.welcome}>Reset your password</Text>

                {/**    User input place holder      **/}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    onChangeText={(text) => this.setState({ email: text })}
                />

                {/**    Buttons container      **/}
                <View style={styles.btnContainer}>
                    {/**    Login btn      **/}
                    <TouchableOpacity style={styles.userBtn} onPress={this.resetPassword}>
                    <Text style={styles.btnTxt}>Send Password Reset</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.buttonStyle}>
                            <Text style={styles.account}>Go Back To</Text>
                            <Button color="#FFD700" onPress={() => this.props.navigation.navigate('Login')} title='Login' />
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
    width: "100%",
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
    buttonStyle: {
        flexDirection: "row"
    },
    account: {
        marginTop: 7,
        color: "white",
        fontSize: 19
    }
});
