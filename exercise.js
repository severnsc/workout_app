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
  {
    name: "Burpees",
    difficulty: 3,
    timed: false
  },
  {
    name: "Squats",
    difficulty: 1,
    timed: false
  },
  {
    name: "Wall Squat",
    difficulty: 2,
    timed: true
  },
  {
    name: "Pushups",
    difficulty: 2,
    timed: false
  },
  {
    name: "Situps",
    difficulty: 1,
    timed: false
  },
  {
    name: "Jumping Jacks",
    difficulty: 1,
    timed: false
  },
  {
    name: "Plank",
    difficulty: 3,
    timed: true
  },
  {
    name: "Lunges",
    difficulty:2,
    timed: false
  },
  {
    name: "Frog jumps",
    difficulty: 3,
    timed: false
  },
  {
    name: "Superman",
    difficulty: 3,
    timed: true
  },
  {
    name: "Dips",
    difficulty: 1,
    timed: false
  }
];

const easyExercises = exercises.filter((e) => e.difficulty === 1);

const mediumExercises = exercises.filter((e) => e.difficulty === 2);

const hardExercises = exercises.filter((e) => e.difficulty === 3);

const repCounts = [10, 15, 20, 25, 30];

//One minute and Two minutes in ms
const times = [60000, 120000];

const alphabet = {A: 8.2, B: 1.5, C: 2.8, D: 4.3, E: 12.7, F: 2.2, G: 2.0, H: 6.1, I: 7.0, J: 0.2, K: 0.8, L: 4.0, M: 2.4, N: 6.7, O: 7.5, P: 1.9, Q: 0.1, R: 6.0, S: 6.3, T: 9.1, U: 2.8, V: 1.0, W: 2.4, X: 0.2, Y: 2.0, Z: 0.1};

const getRandomArrayItem = function(array){
  const rand = array[Math.floor(Math.random() * array.length)];
  return rand;
}

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

class Timer extends Component {

  constructor(props){
    super(props);
    this.state = {
      time: this.props.time,
      minutes: 0,
      seconds: 0,
      intervalID: null,
    }
    this.calculateTime = this.calculateTime.bind(this)
  }

  startTimer(){
    this.setState({intervalID: setInterval(this.calculateTime, 1000)});
  }

  stopTimer(){
    clearInterval(this.state.intervalID);
    this.setState({intervalID: null});
  }

  toggleTimer(){
    if(this.state.intervalID){
      this.stopTimer()
    }else{
      this.startTimer()
    }
  }

  timerEnd(){
    if(this.state.time === 0){
      clearInterval(this.state.intervalID)
    }
  }

  calculateTime(){
    console.log(this.state.time);
    const minutes = Math.floor(this.state.time / 60000);
    let seconds = (this.state.time % 60000) / 1000;
    if(seconds < 10){
      seconds = "0" + seconds;
    }
    this.setState({
      minutes: minutes,
      seconds: seconds,
      time: this.state.time - 1000,
    }, this.timerEnd())
  }

  componentDidMount(){
    this.calculateTime();
  }

  render() {
    
    let timerButtonText = "Start"
    
    if(this.state.intervalID){
      timerButtonText = "Stop"
    }

    return(
      <View style={Styles.timerView}>
        {this.props.children}
        <Text style={Styles.exerciseText}>
          {this.state.minutes} : {this.state.seconds}
        </Text>
        <TouchableHighlight 
          style={this.state.intervalID ? Styles.stopTimer : Styles.button} 
          onPress={() => this.toggleTimer()}
        >
          <Text style={Styles.buttonText}>
            {timerButtonText}
          </Text>
        </TouchableHighlight>
      </View>
    )
  }
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
      const currentExercise = this.props.exerciseSet[this.state.counter];
      if(currentExercise.timed){
        return(
          <Timer time={getRandomArrayItem(times)}>
            <Text style={Styles.exerciseText}>{currentExercise.name}</Text>
          </Timer>
        )
      }else{
        return getRandomArrayItem(repCounts) + " " + currentExercise.name
      }
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
          <TouchableHighlight underlayColor={"rgba(117,205,230,1)"} key="NextButton" onPress={() => this.nextExercise()} style={Styles.workoutButton}>
            <Text key="NextText" style={Styles.buttonText}>
              Next Exercise
            </Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"rgba(117,205,230,1)"} onPress={() => this.returnHome()} style={Styles.workoutButton}>
            <Text style={Styles.buttonText}>
              Return Home
            </Text>
          </TouchableHighlight>
        </View>
    }else if(this.state.counter < this.props.exerciseSet.length){
      exerciseButtons = 
        <View>
          <TouchableHighlight underlayColor={"rgba(117,205,230,1)"} key="NextButton" onPress={() => this.nextExercise()} style={Styles.workoutButton}>
            <Text key="NextText" style={Styles.buttonText}>
              Next Exercise
            </Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"rgba(117,205,230,1)"} key="PreviousButton" onPress={() => this.previousExercise()} style={Styles.workoutButton}>
            <Text key="PreviousText" style={Styles.buttonText}>
              Previous Exercise
            </Text>
          </TouchableHighlight>
        </View>
    }else{
      exerciseButtons = 
        <View>
          <TouchableHighlight underlayColor={"rgba(117,205,230,1)"} onPress={() => this.returnHome()} style={Styles.workoutButton}>
            <Text style={Styles.buttonText}>
              Return Home
            </Text>
          </TouchableHighlight>
          <TouchableHighlight underlayColor={"rgba(117,205,230,1)"} key="PreviousButton" onPress={() => this.previousExercise()} style={Styles.workoutButton}>
            <Text key="PreviousText" style={Styles.buttonText}>
              Previous Exercise
            </Text>
          </TouchableHighlight>
        </View>
    }

    let name = null;
    if(this.state.counter < this.props.text.length){
      name = this.props.text.split("").map((letter, i) => {
        return <Text key={i} style={this.state.counter === i && Styles.activeLetter}>{letter}</Text>
      })
    }

    return (
      <View>
        <View style={Styles.nameHeader}>
          <Text style={Styles.header}>
            {name}
          </Text>
        </View>
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
    let exerciseSet = []
    let numberOfEasyExercises = numberOfMediumExercises = numberOfHardExercises = 0;
    for(i=0; i<letters.length; i++){
      if(letters.length % 2 === 0){
        numberOfEasyExercises = Math.ceil(letters.length/4);
        numberOfMediumExercises = letters.length/2;
        numberOfHardExercises = Math.floor(letters.length/4);
        
      }else{
        numberOfEasyExercises = numberOfHardExercises = Math.floor(letters.length/4);
        numberOfMediumExercises = Math.ceil(letters.length/2);
        while(numberOfEasyExercises + numberOfMediumExercises + numberOfHardExercises < letters.length){
          numberOfHardExercises += 1
        }
      }
    };
    const exerciseGroups = [
      {
        count: numberOfEasyExercises,
        set: easyExercises
      },
      {
        count: numberOfMediumExercises,
        set: mediumExercises
      },
      {
        count: numberOfHardExercises,
        set: hardExercises
      }
    ];
    exerciseGroups.forEach((exerciseGroup) => {
      for(i=0; i<exerciseGroup.count; i++){
        exerciseSet.push(getRandomArrayItem(exerciseGroup.set));
      }
    });
    exerciseSet = shuffle(exerciseSet);
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