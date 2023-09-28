import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from '../styles.js'
import BotNav from './BotNav.js';
import { useIsFocused } from '@react-navigation/native';

const RoutinePageScreen = ({ route, navigation }) => {
  const [routine, setRoutine] = useState(route.params.routine);

  return (
    <View style={styles.outerScreenLayout}>
      <View style={styles.topNav}>
        <Text>Routine Page</Text>
      </View>
      <View style={styles.centerContent}>
        <Text>Routine {routine.routineName}</Text>
      </View>
      <BotNav navigation={navigation}></BotNav>
    </View>
  )
}

const styles = stylesSheet;

export default RoutinePageScreen