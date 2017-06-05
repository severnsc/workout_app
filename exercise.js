import React, { Component } from 'react';
import {
  Animated,
  AppRegistry,
  Easing,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import {BackgroundImage, Styles} from './home';

import HomeView from './home';

const exercises = [
  {name: "Burpees",
   difficulty: 3},
  {name: "Squats",
   difficulty: 1},
  {name: "Wall Squat",
   difficulty: 2},
  {name: "Pushups",
   difficulty: 1},
  {name: "Situps",
   difficulty: 1}
];

const repCounts = [10, 15, 20, 25, 30];

const times = ["1 minute", "2 minute"];

const alphabet = {A: 8.2, B: 1.5, C: 2.8, D: 4.3, E: 12.7, F: 2.2, G: 2.0, H: 6.1, I: 7.0, J: 0.2, K: 0.8, L: 4.0, M: 2.4, N: 6.7, O: 7.5, P: 1.9, Q: 0.1, R: 6.0, S: 6.3, T: 9.1, U: 2.8, V: 1.0, W: 2.4, X: 0.2, Y: 2.0, Z: 0.1};

const getRandomArrayItem = function(array){
  const rand = array[Math.floor(Math.random() * array.length)];
  return rand;
}

class ExerciseText extends Component {
  constructor(props){
    super(props);
    this.state = {
      counter: 0,
    };
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    this.animate();
  }

  animate() {
    this.animatedValue.setValue(0);
    Animated.timing(
      this.animatedValue,
      {
        toValue: 1,
        duration: 500,
        easing: Easing.linear,
      }
    ).start()
  }

  nextExercise() {
    if(this.state.counter < this.props.exerciseSet.length){
      this.setState((prevState, props) => ({
        counter: prevState.counter + 1
      }));
      this.animate();
    }
  }

  previousExercise() {
    if(this.state.counter > 0){
      this.setState((prevState, props) => ({
        counter: prevState.counter - 1
      }));
      this.animate();
    }
  }

  getCurrentExercise() {
    if(this.state.counter < this.props.exerciseSet.length){
      return this.props.exerciseSet[this.state.counter];
    }else{
      return "Workout Done!"
    }
  }

  returnHome() {
    this.props.navigator.push({
      title: "Home",
      component: HomeView,
      passProps: {text: this.props.text}
    });
  }

  render() {
    const opacity = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    })

    let exerciseButtons = null;
    if(this.state.counter === 0){
      exerciseButtons = 
        <View>
          <TouchableHighlight key="NextButton" onPress={() => this.nextExercise()} style={Styles.workoutButton}>
            <Text key="NextText" style={Styles.buttonText}>
              Next Exercise
            </Text>
          </TouchableHighlight>
          <TouchableHighlight onPress={() => this.returnHome()} style={Styles.workoutButton}>
            <Text style={Styles.buttonText}>
              Return Home
            </Text>
          </TouchableHighlight>
        </View>
    }else if(this.state.counter < this.props.exerciseSet.length){
      exerciseButtons = 
        <View>
          <TouchableHighlight key="NextButton" onPress={() => this.nextExercise()} style={Styles.workoutButton}>
            <Text key="NextText" style={Styles.buttonText}>
              Next Exercise
            </Text>
          </TouchableHighlight>
          <TouchableHighlight key="PreviousButton" onPress={() => this.previousExercise()} style={Styles.workoutButton}>
            <Text key="PreviousText" style={Styles.buttonText}>
              Previous Exercise
            </Text>
          </TouchableHighlight>
        </View>
    }else{
      exerciseButtons = 
        <View>
          <TouchableHighlight onPress={() => this.returnHome()} style={Styles.workoutButton}>
            <Text style={Styles.buttonText}>
              Return Home
            </Text>
          </TouchableHighlight>
          <TouchableHighlight key="PreviousButton" onPress={() => this.previousExercise()} style={Styles.workoutButton}>
            <Text key="PreviousText" style={Styles.buttonText}>
              Previous Exercise
            </Text>
          </TouchableHighlight>
        </View>
    }

    return (
      <View>
        <Animated.Text key="ExerciseText" style={{
          opacity,
          fontSize: 48,
          textAlign: 'center',
          backgroundColor: 'rgba(0,0,0,0)',
          fontWeight: 'bold',
          fontFamily: 'Helvetica',
          width:300,
        }}>
          {this.getCurrentExercise()}
        </Animated.Text>
        {exerciseButtons}
      </View>
    );
  }
}

export default class ExerciseView extends Component {

  generateExerciseSet(name) {
    const letters = name.split("");
    var exerciseSet = []
    for(i=0; i<letters.length; i++){
      exerciseSet.push(getRandomArrayItem(repCounts) + " " + getRandomArrayItem(exercises).name);
    };
    return exerciseSet;
  }

  render() {
    return (
      <BackgroundImage source={require("./exercise.png")} style={Styles.backgroundImage}>
        <View style={Styles.container}>
          <ExerciseText 
            exerciseSet={this.generateExerciseSet(this.props.userName)}
            navigator={this.props.navigator}
            text={this.props.userName}
          />
        </View>
      </BackgroundImage>
    );
  }
};