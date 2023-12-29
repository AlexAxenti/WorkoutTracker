import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from '../styles.js'
import BotNav from './BotNav.js';
import { useIsFocused } from '@react-navigation/native';

const LogScreen = ({ route, navigation }) => {
  const logId = route.params.logId;
  const creatingLog = route.params.creating;

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
      })
      .catch((error) => console.error(error))
  }

  let updateLog = () => {
    let method = 'PUT'
    let body = {
      "logName": logName,
      "logRoutine": routineName,
      "logExercises": logExercises,
      "_id": log._id
    }

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

  let removeExercise = (exerciseIndex) => {
    const newExercises = logExercises.filter((e, i) => i !== exerciseIndex);
    setLogExercises(newExercises)
  }

  // Render each exercise
  const exerciseElements = logExercises.map((exercise, index) =>
    <View key={index} style={{ flexDirection: 'row' }}>
      <View style={{flex: 1}}>
        <ExerciseElement exercise={exercise} logId={log._id} navigation={navigation}></ExerciseElement>
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
              navigation.navigate("LogList")
            }}
            title='Exit'
          />
          <Button
            onPress={() => {
              updateLog()
            }}
            title='Save Log'
          />
        </View>
      </View>
      <BotNav navigation={navigation}></BotNav>
    </View>
  )
}

const ExerciseElement = (props) => {
  return (
    <TouchableOpacity onPress={() => props.navigation.navigate('Exercise', { exercise: props.exercise, logId: props.logId })} style={{ flexDirection: 'row' }}>
      <Text style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: 5 }}>Exercise Name: {props.exercise.exerciseName}</Text>
    </TouchableOpacity>
  )
}

const styles = stylesSheet;

export default LogScreen 