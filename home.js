/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View
} from 'react-native';

import ExerciseView from "./exercise";

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
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
  nameInput: {
    flex: 1,
    maxHeight: 24,
    borderColor: '#0f0f0f',
    borderWidth: 0.5,
    textAlign: 'center',
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginLeft: 15,
    marginRight: 15,
  },
  button: {
    flex: 1,
    maxHeight: 36,
    backgroundColor: "rgba(117,205,230,1)",
    borderColor: "#0f0f0f",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: "center",
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    justifyContent: 'center',
    margin: 10,
  }
});

class BackgroundImage extends Component {
  render() {
    return (
      <Image source={this.props.source} style={styles.backgroundImage}>
        {this.props.children}
      </Image>
    )
  }
}

class NameTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {text: ""};
  }

  render() {
    return (
      <TextInput
      style={styles.nameInput}
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        returnKeyType={'go'}
        onSubmitEditing={this.props.onSubmitEditing}
      />
    );
  }
}


export default class HomeView extends Component {
 constructor(props) {
  super(props);
  this.nextScreen = this.nextScreen.bind(this);
 }

 nextScreen(entry) {
  this.props.navigator.push({
    title: "Exercise",
    component: ExerciseView,
    passProps: {
      entry: entry
    }
  });
 }

  render() {
    return (
      <BackgroundImage source={require('./running_woman.png')}>
        <View style={styles.container}>
          <Text style={styles.header}>
            Enter Your Name
          </Text>
          <NameTextInput onSubmitEditing={this.nextScreen} />
          <TouchableHighlight style={styles.button} onPress={(this.nextScreen)}>
            <Text style={styles.buttonText}>
              Start My Workout
            </Text>
          </TouchableHighlight>
        </View>
      </BackgroundImage>
    );
  }
};

export {BackgroundImage};