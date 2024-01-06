import { Text, View, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from '../../styles.js'
import BotNav from '../BotNav.js';

const CreateExerciseScreen = ({ navigation }) => {
  const [exerciseName, setExerciseName] = useState('')

  let createExercise = () => {
    if(exerciseName.length==0) {
      return;
    }

    let method = 'POST'
    let body = {
      "exerciseName": exerciseName
    }

    console.log(body)
    // fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs', {
    fetch('http://localhost:7000/exercises', {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(resp => resp.json())
      .then(resp => navigation.goBack())
      .catch((error) => console.error(error))
  }

  return (
    <View style={styles.outerScreenLayout}>
      <View style={styles.topNav}>
        <Text>Create Log</Text>
      </View>
      <View style={styles.centerContent}>
        <View>
          <TextInput style={{ height: 40 }}
            placeholder="Exercise Name"
            onChangeText={newText => setExerciseName(newText)}
            defaultValue={''}
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
              createExercise()
            }}
            title='Create Exercise'
          />
        </View>
      </View>
      <BotNav navigation={navigation}></BotNav>
    </View>
  )
}

const styles = stylesSheet;

export default CreateExerciseScreen 