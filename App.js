import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Launch from './pages/launch.js';
import Navigator from './navigation/navigator.js';
import {Provider} from 'react-redux';
import {Store} from './redux/store';



export default function App() {
  return (
  <Provider store ={Store}>
    <Navigator/>
  </Provider>
  );
}
