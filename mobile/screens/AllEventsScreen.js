import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
  AsyncStorage,
  ImageBackground,
} from "react-native";
import EventCard from "../Components/EventCard";

export default class AllEventsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
    };
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

  // call all events api
  async getAllEvents() {
    const token = await this.getUserToken("token");

    fetch("https://us-central1-pickup-proj.cloudfunctions.net/api/events", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      // parse the object received from getAllEvents endpoint and save to state
      .then((json) => {
        this.setState({
          events: json,
        });
        console.log(this.state.events);
      })

      .catch((error) => console.error(error))

      .finally(() => {
        this.setState({ isLoading: false });
      });
  }

  componentDidMount() {
    this.getAllEvents();
    this.listener = this.props.navigation.addListener("didFocus", this.getFlights)
  }

  // use renderItem to display the dynamic events as an EventCard
  renderItem = ({ item }) => {
    return (
      <View>
        <EventCard event={item} navigation={this.props.navigation} />
      </View>
    );
  };

  render() {
    return (
      <ImageBackground
        source={require("../assets/loginBG.jpeg")}
        style={styles.image}
        blurRadius={4}
      >
        <View style={styles.events}>
          <Text style={styles.text}>ALL EVENTS</Text>

          <React.Fragment>
            <FlatList
              keyExtractor={(events) => events.eventID}
              data={this.state.events}
              renderItem={this.renderItem}
            />
          </React.Fragment>
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  events: {
    marginTop: 30,
    fontSize: 40,
    textAlign: "center",
    marginBottom: 60
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    paddingBottom: 10,
    fontWeight: "bold",
    backgroundColor: "#000",
    color: "#FFF",
    marginTop: 5,
    paddingTop: 20
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
});
