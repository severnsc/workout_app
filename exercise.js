import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import {BackgroundImage} from './home';

var styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: "cover",
  },
  header: {
    fontSize: 48,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
  },
});

export default class ExerciseView extends Component {
  render() {
    return (
      <BackgroundImage source={require("./running_woman.png")} style={styles.backgroundImage}>
        <Text style={styles.header}>
          Exercise
        </Text>
      </BackgroundImage>
    );
  }
};