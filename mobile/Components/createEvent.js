import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  Button,
  Slider,
  AsyncStorage
} from 'react-native';

import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';
import TimePicker from "react-native-24h-timepicker";

export default class createEvent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [{
                value: 'Basketball',
            }, {
                value: 'Soccer',
            }, {
                value: 'Tennis',
            }, {
                value: 'Football',
            }],
            value: '',
            date: '',
            time: 'Select a time...',
            address: '',
            description: '',
            participants: 0,
            color: '#c9c9c9',
            label: 'Select a sport...',
            tokenState: ''
        }
    }

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

    createEvent = () => {
        fetch("https://us-central1-pickup-proj.cloudfunctions.net/api/events", {
          method: "POST",
          headers: {
            'Accept': "application/json",
            "Content-Type": "application/json",
            'Authorization': 'Bearer ' + this.state.tokenState,
          },
          body: JSON.stringify({
                description: this.state.description,
                location: this.state.address,
                time: this.state.time,
                date: this.state.date,
                sport: this.state.value,
                maxPeople: this.state.participants,
          }),
        })
          .then((response) => response.json())
          .then((res) => {
            console.log("res: " + res)
          })
          .catch((error) => console.error(error))
          .finally(() => {
            this.setState({ isLoading: false });
          });
      };

    onCancel() {
        this.TimePicker.close()
    }

    onConfirm(hour, minute) {
        this.setState({ time: `${hour}:${minute}`, color: "black" })
        this.TimePicker.close()
    }

    onChangeText = (key, val) => {
        this.setState({ [key]: val })
    }

    componentDidMount() {
        this.getUserToken("token")
            .then((value) => {
                console.log("Here" + value)
                this.setState({tokenState: value})
            })
            .catch((error) => {
                console.log("Error getting token")
            })
        const value = this.state.data[0].value
        this.setState({
            value
        });
    }

    render() {
        return (
             <View style={styles.container}>
                <ImageBackground source={require("../assets/loginBG.jpeg")} style={styles.image} blurRadius= {4}>

                <Text style={styles.welcome}>Create an Event!</Text>

                {/** Sport Drop Down Menu **/}
                <View style={{width: '90%'}}>
                    <Text style={{paddingLeft: 2}}>Sport</Text>
                </View>   

                <Dropdown
                    label={this.state.label}
                    data={this.state.data}
                    pickerStyle={{borderBottomColor: 'transparent', borderWidth: 0}}
                    dropdownOffset={{ 'top': 0, 'left': 0}}
                    style={styles.dropdown}
                    fontSize={14}
                    baseColor="#c9c9c9"
                    rippleOpacity={0}
                    shadeOpacity={1}
                    onChangeText={(value) => {this.setState({value, label: ''})}}
                    containerStyle={{width: "90%", backgroundColor: "white", height: "6%", paddingTop: 9, paddingLeft: 13}}
                />

                {/** Date Menu **/}
                <View style={{width: '90%', paddingTop: 5}}>
                    <Text style={{paddingLeft: 2}}>Date</Text>
                </View>

                <DatePicker
                    style={{width: "90%", backgroundColor: "white", height: "6%"}}
                    customStyles={{dateInput: {alignItems: 'left', justifyContent: 'center', borderColor: 'white', paddingLeft: 12}}}
                    date={this.state.date}
                    mode="date"
                    placeholder="Select a date..."
                    format="MM-DD-YYYY"
                    minDate="01-01-2018"
                    maxDate="01-01-2022"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon={false}
                    onDateChange={(date) => {this.setState({date: date})}}
                />

                {/** Time Menu **/}
                <View style={{width: '90%', paddingTop: 5}}>
                    <Text style={{paddingLeft: 2}}>Time</Text>
                </View>   

                <TouchableOpacity onPress={() => this.TimePicker.open()} style={styles.time}>
                    <Text style={[styles.timeText, {color: this.state.color}]}>{this.state.time}</Text>
                </TouchableOpacity>

                <TimePicker
                    ref={ref => {this.TimePicker = ref}}
                    onCancel={() => this.onCancel()}
                    onConfirm={(hour, minute) => this.onConfirm(hour, minute)}
                />

                {/** Full Address Location Text Input **/}
                <View style={{width: '90%', paddingTop: 5}}>
                    <Text style={{paddingLeft: 2}}>Location</Text>
                </View>

                <TextInput style={styles.input} placeholder="Enter an address..." autoCapitalize="none" onChangeText={val => this.onChangeText('address', val)} />

                {/** Full Address Location Text Input **/}
                <View style={{width: '90%', paddingTop: 5}}>
                    <Text style={{paddingLeft: 2}}>Description</Text>
                </View>

                <TextInput style={styles.input} placeholder="Enter a description..." autoCapitalize="none" onChangeText={val => this.onChangeText('description', val)} />

                {/** Participants slider **/}
                <View style={{width: '90%'}}>
                    <Text>Participants: {this.state.participants}</Text>
                </View>
                <Slider
                    style={{width: "90%", marginBottom: 5}}
                    step={1} 
                    maximumValue={50} 
                    value={this.state.participants}
                    color="black"
                    onValueChange={(participants) => this.setState({participants})}
                />


                {/**    Buttons container      **/}
                <View style = {styles.btnContainer}>
                    {/**    Create Event btn      **/}
                    <TouchableOpacity style = {styles.userBtn}>
                        <Button color="black" style={styles.btnTxt} onPress={() => this.createEvent()} title="Create Event" />
                    </TouchableOpacity>
                </View>

                </ImageBackground>
            </View>
        )
    }

}

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
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        color: "#FFF",
        fontStyle: 'italic',
        },
    input: {
        width: "90%",
        backgroundColor: "white",
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
    time: {
        height: "6%",
        backgroundColor: "white",
        width: "90%",
    },
    timeText: {
        paddingTop: 12,
        paddingLeft: 13
    }
})