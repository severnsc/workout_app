/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

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
    backgroundColor: 'rgba(255,255,255,.9)',
    marginLeft: 15,
    marginRight: 15,
  },
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
      />
    );
  }
}


export default class WorkoutApp extends Component {
  render() {
    return (
      <BackgroundImage source={require('./running_woman.png')}>
        <View style={styles.container}>
          <Text style={styles.header}>
            Enter Your Name
          </Text>
          <NameTextInput />
        </View>
      </BackgroundImage>
    );
  }
}

AppRegistry.registerComponent('WorkoutApp', () => WorkoutApp);
