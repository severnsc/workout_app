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

export const Styles = StyleSheet.create({
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
  appHeader: {
    fontSize: 48,
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    fontWeight: 'bold',
    fontFamily: 'Helvetica',
    color: "white",
    marginTop: 100,
    marginBottom:-100,
  },
  nameInputView: {
    width:300,
    maxHeight: 48,
    marginLeft: 15,
    marginRight: 15,
    borderBottomWidth: 2,
    borderBottomColor: "white",
    flexDirection: 'row',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  nameInput: {
    color: "white",
    fontSize: 32,
    width:300,
    marginLeft: 5,
    fontFamily: "Avenir-Medium",
  },
  nameText: {
    fontSize: 32,
    color: "white",
    fontFamily: "Avenir-Medium",
  },
  button: {
    width:300,
    flex: 1,
    maxHeight: 50,
    backgroundColor: "rgba(117,205,230,1)",
    borderColor: "#0f0f0f",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 10,
    justifyContent: "center",
  },
  workoutButton: {
    flex: 1,
    maxHeight: 50,
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
    textAlign: 'center',
    fontSize: 24,
    fontFamily: 'Helvetica'
  }
});

class BackgroundImage extends Component {
  render() {
    return (
      <Image source={this.props.source} style={Styles.backgroundImage}>
        {this.props.children}
      </Image>
    )
  }
}

class NameTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = {text: this.props.text};
  }

  render() {
    return (
      <TextInput
        onChangeText={(text) => this.setState({text})}
        value={this.state.text}
        returnKeyType={'go'}
        onSubmitEditing={this.props.onSubmitEditing}
        onChange={this.props.onChange}
        autoFocus={true}
        style={Styles.nameInput}
      />
    );
  }
}

class SubmitButton extends Component {
  render() {
    return (
      <TouchableHighlight 
        style={Styles.button} 
        onPress={this.props.onPress}
      >
        <Text style={Styles.buttonText}>
          {this.props.buttonText}
        </Text>
      </TouchableHighlight>
    );
  }
}


export default class HomeView extends Component {
  constructor(props) {
    super(props);
    this.nextScreen = this.nextScreen.bind(this);
    this.state = {userName: this.props.text};
  }

  nextScreen(userName) {
    this.props.navigator.push({
      title: "Exercise",
      component: ExerciseView,
      passProps: {userName: userName}
    });
  }

  render() {

    return (
      <BackgroundImage source={require('./exercise.png')}>
        <View>
          <Text style={Styles.appHeader}>
            Workout App
          </Text>
        </View>
        <View style={Styles.container}>
          <View style={Styles.nameInputView}>
            <Text style={Styles.nameText}>
              Name:
            </Text>
            <NameTextInput 
              onChange={(event) => this.setState({userName: event.nativeEvent.text})} 
              onSubmitEditing={(event) => this.nextScreen(event.nativeEvent.text)}
              text={this.props.text}
            />
          </View>
          <SubmitButton 
            onPress={() => this.nextScreen(this.state.userName)}
            buttonText={"Start my workout"}
          />
        </View>
      </BackgroundImage>
    );
  }

};

export {BackgroundImage};