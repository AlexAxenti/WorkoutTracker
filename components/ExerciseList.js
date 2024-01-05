import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from '../styles.js'
import BotNav from './BotNav.js';
import { useIsFocused } from '@react-navigation/native';

const ExerciseListScreen = ({ navigation }) => {
  const [exercises, setExercises] = useState([]);
  const isFocused = useIsFocused();

  let removeExercise = (id) => {
    setExercises(exercises.filter(exercise => exercise._id !== id))
  }

  const exerciseElements = exercises.map(exercise =>
    <ExerciseRecord key={exercise._id} exercise={exercise} remove={removeExercise} navigation={navigation}></ExerciseRecord>
  )

  let getExercises = () => {
    fetch("http://workout-tracker-backend-71ab3f542572.herokuapp.com/routines")
      .then((resp) => resp.json())
      .then((json) => setExercises(json))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    isFocused && getExercises()
  }, [isFocused]);

  return (
    <View style={styles.outerScreenLayout}>
      <View style={styles.topNav}>
        <Text>Exercise List</Text>
      </View>
      <View style={styles.centerContent}>
        <View>
          {exerciseElements}
        </View>
        <View style={{ marginTop: 'auto' }}>
          <Button
            onPress={() => {
              // logs.push(text)
              //navigation.navigate('Routine', { routine: {}, creating: true })
              console.log("Create exercise! :D")
            }}
            title='Create Exercise'
          />
        </View>
      </View>
      <BotNav navigation={navigation}></BotNav>
    </View>
  )
}

const ExerciseRecord = (props) => {
  let deleteRoutine = () => {
    fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/routines', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "_id": props.routine._id,
      }),
    })
      .then((resp) => props.remove(props.routine._id))
      .catch((error) => console.error(error))
  }

  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Routine', { routine: props.exercise, creating: false, })} style={styles.log}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View>
          <Text>{props.exercise.routineName}</Text>
        </View>
        <View style={{ marginLeft: 'auto' }}>
          <Button
            // onPress={() => { deleteRoutine() }}
            onPress={() => console.log("Delete exericse! D:")}
            title='Delete Routine'
          />
        </View>
      </View>
    </TouchableOpacity>
  )
};

const styles = stylesSheet;

export default ExerciseListScreen