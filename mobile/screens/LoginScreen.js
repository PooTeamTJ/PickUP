import React, {component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';

const LoginPage = ({ navigation }) => {
    return (
      <View style={styles.container}>
      // status bar (the line at the top of the phone)
        <StatusBar backgroundColor="#1e90ff" barStyle="light-content"/>
      // Header
        <Text style={styles.welcome}>Login To PickUp</Text>
      // input text holder for user name
        <TextInput
          style={styles.input}
          placeholder="Username"
          />
        // input text holder for password
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            />
          // buttons
          <View style = {styles.btnContainer}>
          // Login btn
            <TouchableOpacity
            style = {styles.userBtn}>
              <Text style={styles.btnTxt}>Login</Text>
            </TouchableOpacity>
            // signup btn
            <TouchableOpacity
              style = {styles.userBtn}>
              <Text style = {styles.btnTxt}>Signup</Text>
            </TouchableOpacity>

          </View>

      </View>
    )
  }


// styles for the page
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1e90ff'
  },
  welcome: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10,
    color: "#fff",
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
