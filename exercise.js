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
      counter: 0,
    };
  }

  nextExercise() {
    if(this.state.counter < this.props.exerciseSet.length){
      this.setState((prevState, props) => ({
        counter: prevState.counter + 1
      }));
    }
  }

  previousExercise() {
    if(this.state.counter > 0){
      this.setState((prevState, props) => ({
        counter: prevState.counter - 1
      }));
    }
  }

  getCurrentExercise() {
    if(this.state.counter < this.props.exerciseSet.length){
      return this.props.exerciseSet[this.state.counter]
    }else{
      return "Workout Done!"
    }
  }

  render() {
    return (
      <View>
        <Text key="ExerciseText" style={Styles.header}>
          {this.getCurrentExercise()}
        </Text>
        <TouchableHighlight key="NextButton" onPress={() => this.nextExercise()} style={Styles.button}>
          <Text key="NextText" style={Styles.buttonText}>
            Next Exercise
          </Text>
        </TouchableHighlight>
        <TouchableHighlight key="PreviousButton" onPress={() => this.previousExercise()} style={Styles.button}>
          <Text key="PreviousText" style={Styles.buttonText}>
            Previous Exercise
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