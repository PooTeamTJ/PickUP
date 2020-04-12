import React, {component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar,
  ImageBackground
} from 'react-native';


const LoginPage = ({ navigation }) => {
    return (
      <View style={styles.container}>
      {/**    background img      **/}
      <ImageBackground source={require("../assets/loginBG.jpeg")} style={styles.image}>

      {/**    headerg      **/}
        <Text style={styles.welcome}>PickUp</Text>

        {/**    User input place holder      **/}
        <TextInput
          style={styles.input}
          placeholder="Username"
          />

          {/**    Password input place holder      **/}
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            />

          {/**    Buttons container      **/}
          <View style = {styles.btnContainer}>

            {/**    Login btn      **/}
            <TouchableOpacity
            style = {styles.userBtn}>
              <Text style={styles.btnTxt}>Login</Text>
            </TouchableOpacity>

            {/**    Signop btn      **/}
            <TouchableOpacity
              style = {styles.userBtn}>
              <Text style = {styles.btnTxt}>Signup</Text>
            </TouchableOpacity>

          </View>
        </ImageBackground>
      </View>
    )
  }

  {/**    styles     **/}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center'

  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: "#FFF",
    fontFamily: "DancingScript-Bold"

  },
  input: {
    width: "90%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 10
  },
  userBtn: {
    backgroundColor: "#FFD700",
    padding:15,
    width:"45%"
  },
  btnTxt: {
    fontSize: 18,
    textAlign: "center"
  },
  btnContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "90%"
}
})

export default LoginPage
