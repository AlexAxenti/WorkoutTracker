import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import stylesSheet from '../styles.js'

const BotNav = (props) => {
  return (
    <View style={styles.botNav}>
      <TouchableOpacity style={styles.botNavButton} onPress={() => props.navigation.navigate('LogList')}>
        <Text>Log List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botNavButton} onPress={() => props.navigation.navigate('RoutineList')}>
        <Text>Routine List</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.botNavButton} onPress={() => props.navigation.navigate('ExerciseList')}>
        <Text>Exercise List</Text>
      </TouchableOpacity>
    </View>
  )
};

const styles = stylesSheet;

export default BotNav