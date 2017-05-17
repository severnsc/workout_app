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

import {BackgroundImage, Styles} from './home';


export default class ExerciseView extends Component {
  render() {
    return (
      <BackgroundImage source={require("./exercise.png")} style={Styles.backgroundImage}>
        <View style={Styles.container}>
          <Text style={Styles.header}>
            {this.props.userName}
          </Text>
        </View>
      </BackgroundImage>
    );
  }
};