import React, {Component} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  FlatList
} from 'react-native';







export default class EventComponent extends Component {


  state = {
    rosterCount: 0,
    err: null
  }

  addPerson = () => {
    if (this.state.rosterCount == 10)
    {
      this.state.err = "Event is full"
    }else{
      this.setState({rosterCount: this.state.rosterCount + 1})
      this.state.err = null
    }
  }

  leaveEvent = () => {
    {/** here we want to make sure the user is part of this event
      For now I'm checking that there are people in the event**/}
    if (this.state.rosterCount == 0)
    {
      this.state.err = "Event is Empty"
    }else{
      this.setState({rosterCount: this.state.rosterCount - 1})
      this.state.err = null
    }
  }




  render() {
    return (
      <ImageBackground source={require("../assets/loginBG.jpeg")} style={styles.image} blurRadius= {4}>

        <View style={styles.container}>


          {/** Here we get the event name as prop from the user**/}
          <View style={{backgroundColor:"black", width:"100%"}} >
            <Text  style={styles.welcome}>Soccer{this.props.eventName}</Text>
          </View>

          {/** Here we get the event date, time, location, maxPeople as prop from the user**/}
          <View style={{top:"2%", alignItems:"center"}}>
            <Text style={{fontSize:60, color:"#FFF"}}>3/10/20{this.props.date} </Text>
            <Text style={{fontSize:40, top:"5%", color:"#FFF"}}>18:30{this.props.time} </Text>
            <Text style={{fontSize:20, top:"10%", color:"#FFF"}}>University of Central Florida, Orlando, Fl{this.props.location} </Text>
            <Text style={{fontSize:30, top:"20%", color:"#FFF"}}>Participants: {this.state.rosterCount}/10{this.props.maxPeople} </Text>
          </View>


          {/**place holder for a map**/}
          <View>
            <Text style={{fontSize:70, top: "20%"}}> Place Holder for a map of the location</Text>
          </View>


          {/** Buttons to join and leave event**/}
          <View style ={styles.btnContainer}>
            <TouchableOpacity
              style = {styles.userBtn}
              onPress = {this.addPerson} >
              <Text style = {styles.btnTxt}>Join</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style = {styles.userBtn}
              onPress = {this.leaveEvent} >
              <Text style = {styles.btnTxt}>Leave</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/**Go back button **/}
        <View style ={styles.backBtnContainer}>
          <TouchableOpacity
            style = {styles.userBtn}
            onPress = {() => this.props.navigation.navigate("Home")} >
            <Text style = {styles.btnTxt}>Back</Text>
          </TouchableOpacity>
        </View>
        </ImageBackground>



    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    top:"5%"
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: 'center'

  },
  welcome: {
    fontSize: 70,
    textAlign: 'center',
    margin: 10,
    color: "#FFF",
    fontStyle: 'italic',


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
  width: "90%",
  top:"12%",
  left:"2.5%"
},
  backBtnContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  width: "40%",
  top:"-1%",
  left:"6%"
}

})
