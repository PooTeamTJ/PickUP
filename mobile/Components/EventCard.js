// event card for AllEventsScreen
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
} from "react-native";

import { Button, Card, Icon } from "react-native-elements";

export default class EventCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      rosterCount: this.props.event.rosterCount,
    };
  }

  updateRosterCount() {
    if (this.state.rosterCount != this.props.event.rosterCount) {
      this.setState({ rosterCount: this.props.event.rosterCount });
    }
  }

  render() {
    this.updateRosterCount();
    return (
      <View>
        <Card
          style={styles.card}
          title={this.props.event.sport}
          image={{
            uri: `https://maps.googleapis.com/maps/api/staticmap?center=${this.props.event.location}&zoom=13&size=600x300&maptype=roadmap&key=AIzaSyDajSMNySNArAGv-sLRldlp4lAKsZE-YnQ`,
          }}
        >
          <Text style={{ marginBottom: 10, flexDirection: "row" }}>
            <Text style={{ fontWeight: "bold" }}>Date: </Text>
            {this.props.event.date} {"\n"}
            <Text style={{ fontWeight: "bold" }}>Time: </Text>
            {this.props.event.time} {"\n"}
            <Text style={{ fontWeight: "bold" }}>Roster: </Text>
            {this.state.rosterCount} / {this.props.event.maxPeople} {"\n"}
            <Text style={{ fontWeight: "bold" }}>Location: </Text>
            {this.props.event.location}
          </Text>
          <Button
            icon={<Icon name="code" color="#ffffff" />}
            buttonStyle={{
              borderRadius: 0,
              marginLeft: 0,
              marginRight: 0,
              marginBottom: 0,
            }}
            title="GO TO EVENT PAGE"
            onPress={() =>
              this.props.navigation.navigate("Event", {
                id: this.props.event.eventId,
              })
            }
          />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {},
});
