import React, { Component } from "react";
import {
  View,
  Button,
  StyleSheet,
  Text,
  useColorScheme,
  FlatList,
  AsyncStorage,
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
  }

  // use renderItem to display the dynamic events as an EventCard
  renderItem = ({ item }) => {
    return (
      <View>
        <EventCard event={item} />
      </View>
    );
  };

  render() {
    return (
      <View style={styles.events}>
        <React.Fragment>
          <FlatList
            keyExtractor={(events) => events.eventID}
            data={this.state.events}
            renderItem={this.renderItem}
          />
        </React.Fragment>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  events: {
    marginTop: 100,
    fontSize: 40,
    textAlign: "center",
  },
});
