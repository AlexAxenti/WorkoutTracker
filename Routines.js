import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import stylesSheet from './styles.js'

const RoutineListScreen = ({ navigation }) => {
  const [routines, setRoutines] = useState(['test']);

  const routineElements = routines.map(routine =>
    <View key={routine}>
      <Text>Test</Text>
    </View>
  )

  return (
    <View style={styles.outerScreenLayout}>
      <View style={styles.topNav}>
        <Text>Routine List</Text>
      </View>
      <View style={styles.centerContent}>
        <View>
          {routineElements}
        </View>
        <View style={{ marginTop: 'auto' }}>
          <Button
            onPress={() => {
              // logs.push(text)
              navigation.navigate('CreateRoutine')
            }}
            title='Create Routine'
          />
        </View>
      </View>
      <View style={styles.botNav}>
        <TouchableOpacity style={styles.botNavButton} onPress={() => navigation.navigate('LogList')}>
          <Text>Log List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botNavButton} onPress={() => navigation.navigate('RoutineList')}>
          <Text>RoutineList</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const CreateRoutineScreen = ({ navigation }) => {
  const [routineName, setRoutineName] = useState('');
  const [routineExercises, setRoutineExercises] = useState([])

  const exerciseElements = routineExercises.map((exercise, index) =>
    <View key={index}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Exercise Name"
        onChangeText={newText => {
          let exercisesCopy = routineExercises
          exercisesCopy[index] = newText
          setRoutineExercises(exercisesCopy)
        }}
        defaultValue=''
      />
    </View>
  )

  let createRoutine = () => {
    fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/routines', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "routineName": routineName,
        "routineExercises": routineExercises,
      }),
    })
    .then((resp) => console.log(resp))
    // .then((resp) => resp.json())
    // .then((json) => setLogs([...logs, json]))
    .catch((error) => console.error(error))
  }

  return (
    <View style={styles.outerScreenLayout}>
      <View style={styles.topNav}>
        <Text>Create Routine</Text>
      </View>
      <View style={styles.centerContent}>
        <View>
        <Text>Routine Name:</Text>
        <TextInput
          style={{ height: 40 }}
          placeholder="Routine Name"
          onChangeText={newText => setRoutineName(newText)}
          defaultValue=''
        />
        <Text>Exercises:</Text>
        {exerciseElements}
        <Button
          onPress={() => {
            // logs.push(text)
            console.log("Created Exercise")
            setRoutineExercises([...routineExercises, ''])
          }}
          title='Add Exercise'
        />
        </View>
        <View style={{ marginTop: 'auto' }}>
          <Button
            onPress={() => {
              // logs.push(text)
              createRoutine()
            }}
            title='Create Routine'
          />
        </View>
      </View>
      <View style={styles.botNav}>
        <TouchableOpacity style={styles.botNavButton} onPress={() => navigation.navigate('LogList')}>
          <Text>Log List</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botNavButton} onPress={() => navigation.navigate('RoutineList')}>
          <Text>RoutineList</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = stylesSheet;

export { RoutineListScreen as RoutineListScreen, CreateRoutineScreen as CreateRoutineScreen }