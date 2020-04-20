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
  AsyncStorage
} from "react-native";

export default class EventComponent extends Component {

  constructor(props) {
    super(props);
  }

  state = {
    rosterCountState: null,
    createAtState: null,
    descriptionState: null,
    locationState: null,
    maxPeopleState: null,
    roseterCountState: null,
    userIdState: null,
    userImageState: null,
    waitListState: null,
    timeState: null,
    err: null,
    dateState: null,
    sportState: null
  };

  async getUserToken(key) {
    try {
      // need to wait to get token because render will load before lifecycle method
      const retrievedItem = await AsyncStorage.getItem(key);

      const token = JSON.parse(retrievedItem);
      return token;

    } catch (error) {
      console.log(error);
    }
  }


  addPerson = () => {
    if (this.state.rosterCountState == this.maxPeopleState) {
      this.state.err = "Event is full";
    } else {
      this.setState({ rosterCountState: this.state.rosterCountState + 1 });
      this.state.err = null;
    }
  };

  leaveEvent = () => {
    /** here we want to make sure the user is part of this event
        For now I'm checking that there are people in the event**/
    if (this.state.rosterCountState == 0) {
      this.state.err = "Event is Empty";
    } else {
      this.setState({ rosterCountState: this.state.rosterCountState - 1 });
      this.state.err = null;
    }
  };




  // here we get all the info from the data base by calling the route from backend
  async getEvent  ()  {
   // var item = await AsyncStorage.getItem('token')
   // var token = JSON.parse(item)
   var token = await this.getUserToken('token')

    fetch(
       `https://us-central1-pickup-proj.cloudfunctions.net/api/events/${this.props.eventID}`, //GNLHb6HOvPl56tK2VEz2,
      {
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + token

          }
      }
    )
    .then((response) => response.json())

    .then((x) => {
      console.log(x)

        this.setState({
          rosterCountState: x.rosterCount,
          locationState: x.location,
          maxPeopleState: x.maxPeople,
          waitListState: x.maxPeople,
          timeState: x.time,
          dateState: x.date,
          sportState: x.sport
        });
      })

      .catch((error) => console.error(error))

      .finally(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    this.getEvent();
  }

  render() {
    return (
      <ImageBackground
        source={require("../assets/loginBG.jpeg")}
        style={styles.image}
        blurRadius={4}
      >
        <View style={styles.container}>
          {/** Here we get the event name as prop from the user**/}
          <View style={{ backgroundColor: "black", width: "100%" }}>
            <Text style={styles.welcome}>{this.state.sport}</Text>
          </View>

          {/** Here we get the event date, time, location, maxPeople as prop from the user**/}
          <View style={{ top: "2%", alignItems: "center" }}>
            <Text style={{ fontSize: 60, color: "#FFF" }}>
              {this.state.dateState}{" "}
            </Text>
            <Text style={{ fontSize: 40, top: "5%", color: "#FFF" }}>
              {this.state.timeState}{" "}
            </Text>
            <Text style={{ fontSize: 20, top: "10%", color: "#FFF" }}>
              {this.state.locationState}{" "}
            </Text>
            <Text style={{ fontSize: 30, top: "20%", color: "#FFF" }}>
              Participants: {this.state.rosterCountState} /  {this.state.maxPeopleState}{" "}
            </Text>
          </View>

          {/**place holder for a map**/}
          <View>
            <Text style={{ fontSize: 70, top: "20%" }}>
              {" "}
              Place Holder for a map of the location
            </Text>
          </View>

          {/** Buttons to join and leave event**/}
          <View style={styles.btnContainer}>
            <TouchableOpacity style={styles.userBtn} onPress={this.addPerson}>
              <Text style={styles.btnTxt}>Join</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.userBtn} onPress={this.leaveEvent}>
              <Text style={styles.btnTxt}>Leave</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/**Go back button **/}
        <View style={styles.backBtnContainer}>
          <TouchableOpacity
            style={styles.userBtn}
            onPress={() => this.props.navigation.navigate("Home")}
          >
            <Text style={styles.btnTxt}>Back</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    top: "5%",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
    alignItems: "center",
  },
  welcome: {
    fontSize: 70,
    textAlign: "center",
    margin: 10,
    color: "#FFF",
    fontStyle: "italic",
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
    top: "12%",
    left: "2.5%",
  },
  backBtnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "40%",
    top: "-1%",
    left: "6%",
  },
});
