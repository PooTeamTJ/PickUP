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


  constructor(props) {
    super(props)
  }

  state = {
    rosterCountState: null,
      createAtState: null,
      descriptionState:null,
      locationState:null,
      maxPeopleState:null,
      roseterCountState:null,
      userIdState:null,
      userImageState:null,
      waitListState:null
    ,
    err: null
  }




    addPerson = () => {
      if (this.state.rosterCountState == this.maxPeopleState)
      {
        this.state.err = "Event is full"
      }else{
        this.setState({rosterCountState: this.state.rosterCountState + 1})
        this.state.err = null
      }
    }

    leaveEvent = () => {
      /** here we want to make sure the user is part of this event
        For now I'm checking that there are people in the event**/
      if (this.state.rosterCountState == 0)
      {
        this.state.err = "Event is Empty"
      }else{
        this.setState({rosterCountState: this.state.rosterCountState - 1})
        this.state.err = null
      }
    }


    // here we get all the info from the data base by calling the route from backend
    getEvent = () => {
      fetch('https://us-central1-pickup-proj.cloudfunctions.net/api/events/GNLHb6HOvPl56tK2VEz2',
            {method: 'GET', headers: new Headers({
               'Authorization': 'Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6IjBiYWJiMjI0NDBkYTAzMmM1ZDAwNDJjZGFhOWQyODVjZjhkMjAyYzQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vcGlja3VwLXByb2oiLCJhdWQiOiJwaWNrdXAtcHJvaiIsImF1dGhfdGltZSI6MTU4NzE2Mzk0MCwidXNlcl9pZCI6Imt3dm8xNlowd0ZVZUdOMVVVeEhJVEpIVDVHbzEiLCJzdWIiOiJrd3ZvMTZaMHdGVWVHTjFVVXhISVRKSFQ1R28xIiwiaWF0IjoxNTg3MTYzOTQwLCJleHAiOjE1ODcxNjc1NDAsImVtYWlsIjoic2FpdGVqYXNtb3B1cmlAZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImZpcmViYXNlIjp7ImlkZW50aXRpZXMiOnsiZW1haWwiOlsic2FpdGVqYXNtb3B1cmlAZ21haWwuY29tIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.Tz18WPhrHpyKaldJk8N2nobRufB2yAf6DIsHI98VuSCGgpdLyekRRRKF8kHF3m6iax20ag8eYgf2As4BppwDJLyDvUFMyvLeSc-RLJATiDC_MI0p0ahsk5BguZw3JnjeN_d9Y3WI30rSOtyU8_9ETUxKyiuBrx3dHTm2FQAtWdz69P-ppF9A_svigBWkcxPqkamLo2aDqnIQrbIK_6RavqKhANiq7BLk_NMqfxM8cJxhYEWtIwnIQjkD0HgFuKSCPcDS7IIqTpTFMdmbdfM9lVHSEKJadDa30YZOSHHo29CTZmgN_NjjR94ocsYT6apyRLLC451GZF-j-khwwSJBFQ'
               })})
        .then((response) => response.json())

        .then((json) => {
          this.setState({
            rosterCountState: json.rosterCount,
            locationState: json.location,
            maxPeopleState: json.maxPeople,
            waitListState: json.maxPeople
            });
        })

        .catch((error) => console.error(error))

        .finally(() => {
          this.setState({ isLoading: false });
        })
    }

    componentDidMount() {
      this.getEvent()
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
            <Text style={{fontSize:30, top:"20%", color:"#FFF"}}>Participants: {this.state.rosterCountState}/{this.state.maxPeopleState} </Text>
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
