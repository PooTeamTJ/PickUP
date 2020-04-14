{/** Login screen. For any questions contact Zeke at Itzikefraim6@gmail.com **/}

import React, {component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Button
} from 'react-native';


const SignUpPage = ({ navigation }) => {
    state = {
        username: '', email: '', password: ''
    }
    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }
    signUp = async () => {
        const { username, email, password } = this.state
        try {
            console.log('User succesfully signed up!: ', success)
        } catch (error) {
            console.log('Error signing up', error)
        }
    }

    return (
        <View style={styles.container}>
            {/**    background img      **/}
            <ImageBackground source={require("../assets/loginBG.jpeg")} style={styles.image}>

            {/**    header, can be replaced with app logo when we get one     **/}
            <Text style={styles.welcome}>Sign Up With Email</Text>

            {/**    User input place holder      **/}
            <TextInput style={styles.input} placeholder="Username" onChangeText={val => this.onChangeText('password', val)}/>

            {/**    Email input place holder      **/}
            <TextInput style={styles.input} placeholder="Email" autoCompleteType="email" onChangeText={val => this.onChangeText('email', val)} />

            {/**    Password input place holder      **/}
            <TextInput style={styles.input} placeholder="Password" secureTextEntry onChangeText={val => this.onChangeText('password', value)} />

            {/**    Buttons container      **/}
            <View style = {styles.btnContainer}>
                {/**    Login btn      **/}
                <TouchableOpacity style = {styles.userBtn}>
                    <Button color="black" style={styles.btnTxt} title="Create an account" />
                </TouchableOpacity>
            </View>

            {/**    Go to login link    **/}
            <View style={styles.buttonStyle}>
                <Text style={styles.account}>Already have an account?</Text>
                <Button color="#FFD700" onPress={() => navigation.navigate('Login')} title='Login' />
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
        },
        input: {
            width: "90%",
            backgroundColor: "#fff",
            padding: 15,
            marginBottom: 10
        },
        userBtn: {
            backgroundColor: "#FFD700",
            padding: 7,
            width:"100%"
        },
        btnTxt: {
            fontSize: 18,
            textAlign: "center"
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
})

export default SignUpPage
