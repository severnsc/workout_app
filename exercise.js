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

class ExerciseText extends Component {
  constructor(props){
    super(props);
    this.state = {
      currentExercise: this.props.exerciseSet[0],
      counter: 0,
    };
  }

  nextExercise() {
    if(this.state.counter < this.props.exerciseSet.length){
      this.setState({counter: this.state.counter + 1});
      this.setState({currentExercise: this.props.exerciseSet[this.state.counter]});
    }else{
      this.setState({currentExercise: "Workout Done!"});
    }
  }

  render() {
    return (
      <View>
        <Text style={Styles.header}>
          {this.state.currentExercise}
        </Text>
        <TouchableHighlight onPress={() => this.nextExercise()} style={Styles.button}>
          <Text style={Styles.buttonText}>
            Next Exercise
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default class ExerciseView extends Component {

  generateExerciseSet(name) {
    var letters = name.split("");
    var exerciseSet = []
    for(i=0; i<letters.length; i++){
      exerciseSet.push(getRandomArrayItem(repCounts) + " " + getRandomArrayItem(exercises));
    };
    return exerciseSet;
  }

  render() {
    return (
      <BackgroundImage source={require("./exercise.png")} style={Styles.backgroundImage}>
        <View style={Styles.container}>
          <ExerciseText exerciseSet={this.generateExerciseSet(this.props.userName)} />
        </View>
      </BackgroundImage>
    );
  }
};