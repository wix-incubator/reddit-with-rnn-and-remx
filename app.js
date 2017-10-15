/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {registerScreens} from './src/screens';
import {Navigation} from 'react-native-navigation';

registerScreens();

Navigation.startSingleScreenApp({
  screen: {
    screen: 'example.TopicsScreen',
    title: 'TopicsTopics'
  }
});
