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

var exercises = ["Burpees", "Squats", "Wall Squat", "Pushups", "Situps"];

var repCounts = [10, 15, 20, 25, 30];

var getRandomArrayItem = function(array){
  var rand = array[Math.floor(Math.random() * array.length)];
  return rand;
}

export default class ExerciseView extends Component {

  generateExerciseSet() {
    var exerciseSet = getRandomArrayItem(repCounts) + " " + getRandomArrayItem(exercises);
    return exerciseSet;
  }

  render() {
    return (
      <BackgroundImage source={require("./exercise.png")} style={Styles.backgroundImage}>
        <View style={Styles.container}>
          <Text style={Styles.header}>
            {this.generateExerciseSet()}
          </Text>
        </View>
      </BackgroundImage>
    );
  }
};