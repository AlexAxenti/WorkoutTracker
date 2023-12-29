import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from '../styles.js'
import BotNav from './BotNav.js';
import { useIsFocused } from '@react-navigation/native';

const LogScreen = ({ route, navigation }) => {
  const logId = route.params.logId;
  const creatingLog = route.params.creating;
  const routine = route.params.routine;
  // const routineName = creatingLog ? routine.routineName : log.logRoutine

  // const [logName, setLogName] = useState(creatingLog ? '' : log.logName);
  // // const [routineName, setRoutineName] = useState(creatingLog ? routine.routineName : log.logRoutine)
  // const [logExercises, setLogExercises] = useState(creatingLog ? routine.routineExercises : log.logExercises)

  //Remake
  const [routineName, setRoutineName] = useState('')
  const [log, setLog] = useState({});
  const [logName, setLogName] = useState('');
  const [logExercises, setLogExercises] = useState([])
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && getLog()
  }, [isFocused]);

  let getLog = () => {
    // fetch(`http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs/${logId}`)
    fetch(`http://localhost:7000/logs/${logId}`)
      .then((resp) => resp.json())
      .then((json) => {
        setLog(json)
        setLogName(json.logName)
        setRoutineName(json.logRoutine)
        setLogExercises(json.logExercises)
        console.log(json)
      })
      .catch((error) => console.error(error))
  }

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

  let editExercise = (exercise, exerciseIndex) => {
    const newExercises = logExercises.map((e, i) => {
      if (i === exerciseIndex) {
        return exercise
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
    // <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
    <View key={index} style={{ flexDirection: 'row' }}>
      <View style={{flex: 1}}>
        <ExerciseElement editExercise={editExercise} exerciseIndex={index} exercise={exercise} logId={log._id} navigation={navigation}></ExerciseElement>
      </View>
      <View>
        <Button
          onPress={() => {
            removeExercise(index)
          }}
          title='X'
        />
      </View>
    </View>
  )

  return (
    <View style={styles.outerScreenLayout}>
      <View style={styles.topNav}>
        <Text>{creatingLog ? 'Create Log' : 'Edit Log'}</Text>
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
    <TouchableOpacity onPress={() => props.navigation.navigate('Exercise', { exercise: props.exercise, logId: props.logId, onGoBack: props.editExercise, exerciseIndex: props.exerciseIndex })} style={{ flexDirection: 'row' }}>
      <Text style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: 5 }}>Exercise Name:</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="Exercise Name"
        // onChangeText={newText => {
        //   props.editExercise({ exerciseName: newText }, props.exerciseIndex)
        // }}
        defaultValue={props.exercise.exerciseName}
      />
    </TouchableOpacity>
  )
}

const styles = stylesSheet;

export default LogScreen 