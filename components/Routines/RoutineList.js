import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from '../../styles.js'
import BotNav from '../BotNav.js';
import { useIsFocused } from '@react-navigation/native';

const RoutineListScreen = ({ navigation }) => {
  const [routines, setRoutines] = useState([]);
  const isFocused = useIsFocused();

  let removeRoutine = (id) => {
    setRoutines(routines.filter(routine => routine._id !== id))
  }

  const routineElements = routines.map(routine =>
    <RoutineRecord key={routine._id} routine={routine} remove={removeRoutine} navigation={navigation}></RoutineRecord>
  )

  let getRoutines = () => {
    fetch("http://workout-tracker-backend-71ab3f542572.herokuapp.com/routines")
      .then((resp) => resp.json())
      .then((json) => setRoutines(json))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    isFocused && getRoutines()
  }, [isFocused]);

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
              navigation.navigate('Routine', { routine: {}, creating: true })
            }}
            title='Create Routine'
          />
        </View>
      </View>
      <BotNav navigation={navigation}></BotNav>
    </View>
  )
}

const RoutineRecord = (props) => {
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
    <TouchableOpacity onPress={() => props.navigation.navigate('Routine', { routine: props.routine, creating: false, })} style={styles.log}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View>
          <Text>{props.routine.routineName}</Text>
        </View>
        <View style={{ marginLeft: 'auto' }}>
          <Button
            onPress={() => { deleteRoutine() }}
            title='Delete Routine'
          />
        </View>
      </View>
    </TouchableOpacity>
  )
};

const styles = stylesSheet;

export default RoutineListScreen