/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  NavigatorIOS,
  StyleSheet,
  View
} from 'react-native';

import HomeView from "./home";

var styles = StyleSheet.create({
  navigationContainer: {
    flex: 1,
  },
});

export default class WorkoutApp extends Component {
  render() {
    return (
      <NavigatorIOS
        style={styles.navigationContainer}
        initialRoute={{
          title: "Name Workout App",
          component: HomeView,
        }}
        navigationBarHidden={true}
      />
    );
  }
}

AppRegistry.registerComponent('WorkoutApp', () => WorkoutApp);
