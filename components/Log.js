import { Text, View, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from '../styles.js'
import BotNav from './BotNav.js';

const LogScreen = ({ route, navigation }) => {
  const log = route.params.log;
  const creatingLog = route.params.creating;
  const routine = route.params.routine;

  const [logName, setLogName] = useState(creatingLog ? '' : log.logName);
  const [routineName, setRoutineName] = useState(creatingLog ? routine.routineName : log.logRoutine)
  const [logExercises, setLogExercises] = useState(creatingLog ? routine.routineExercises : log.logExercises)

  useEffect(() => {
    console.log(routine)
  }, []);

  let createLog = () => {
    let method = creatingLog ? 'POST' : 'PUT'
    let body = {
      "logName": logName,
      "logRoutine": routineName,
      "logExercises": logExercises,
    }

    if (!creatingLog) {
      body._id = log._id
    }
    console.log(body)
    fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs', {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    .then((resp) => navigation.navigate('LogList'))
    .catch((error) => console.error(error))
  }

  let editExercise = (exerciseName, exerciseIndex) => {
    const newExercises = logExercises.map((e, i) => {
      if (i === exerciseIndex) {
        return exerciseName
      } else {
        return e
      }
    })
    setLogExercises(newExercises)
  }

  let removeExercise = (exerciseIndex) => {
    const newExercises = logExercises.filter((e, i) => i !== exerciseIndex);
    setLogExercises(newExercises)
  }

  // Render each exercise
  const exerciseElements = logExercises.map((exercise, index) =>
    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <ExerciseElement editExercise={editExercise} exerciseIndex={index} exercise={exercise}></ExerciseElement>
      {/* <ExerciseElement exerciseIndex={index} exerciseName={exercise}></ExerciseElement> */}
      <View>
        <Button
          onPress={() => {
            removeExercise(index)
          }}
          title='X'
          style={{ marginLeft: 'auto' }}
        />
      </View>
    </View>
  )

  return (
    <View style={styles.outerScreenLayout}>
      <View style={styles.topNav}>
        <Text>Create Log</Text>
      </View>
      <View style={styles.centerContent}>
        <View>
          <Text>
            Routine: {routineName}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 5}}>Log Name:</Text>
            <TextInput
              style={{ height: 40 }}
              placeholder="Log Name"
              onChangeText={newText => setLogName(newText)}
              defaultValue={logName}
            />
          </View>
          
          <Text>Exercises:</Text>
          {exerciseElements}
          <Button
            onPress={() => {
              // logs.push(text)
              setLogExercises([...logExercises, ''])
            }}
            title='Add Exercise'
          />
        </View>
        <View style={{ marginTop: 'auto', flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            onPress={() => {
              navigation.goBack()
            }}
            title='Exit'
          />
          <Button
            onPress={() => {
              createLog()
            }}
            title={creatingLog ? 'Create Log' : 'Save Log'}
          />
        </View>
      </View>
      <BotNav navigation={navigation}></BotNav>
    </View>
  )
}

const ExerciseElement = (props) => {
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: 5 }}>Exercise Name:</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="Exercise Name"
        onChangeText={newText => {
          props.editExercise({ exerciseName: newText }, props.exerciseIndex)
        }}
        defaultValue={props.exercise.exerciseName}
      />
    </View>
  )
}

const styles = stylesSheet;

export default LogScreen 