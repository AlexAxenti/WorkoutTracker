import { Text, View, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from '../styles.js'
import BotNav from './BotNav.js';
import DropDownPicker from 'react-native-dropdown-picker';

const CreateLogScreen = ({ navigation }) => {
  const [open, setOpen] = useState(false);
  const [dropDownItems, setDropDownItems] = useState([])
  const [value, setValue] = useState({ routineName: 'None', routineExercises: [] })

  let getRoutines = () => {
    fetch("http://workout-tracker-backend-71ab3f542572.herokuapp.com/routines")
      .then((resp) => resp.json())
      .then((json) => {
        formatDropDownItems(json)
      })
      .catch((error) => console.error(error))
  }

  let createLog = () => {
    let method = 'POST'
    let body = {
      "logName": value.routineName == 'None' ? '' : value.routineName,
      "logRoutine": value.routineName == 'None' ? '' : value.routineName
    }

    console.log(body)
    // fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs', {
    fetch('http://localhost:7000/logs', {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then(resp => resp.json())
      .then(resp => navigation.navigate('Log', { log: resp })) //('Log', { logId: resp.body.logId })
      .catch((error) => console.error(error))
  }

  let formatDropDownItems = json => {
    let items = [{ label: 'None', value: { routineName: 'None', routineExercises: [] } }]
    json.map(routine => {
      let routineExercises = []
      routine.routineExercises.map(exercise => {
        routineExercises.push({ exerciseName: exercise })
      })
      items.push({label: routine.routineName, value: {routineName: routine.routineName, routineExercises: routineExercises}})
    })
    setDropDownItems(items)
  }

  useEffect(() => {
    getRoutines()
  }, []);

  return (
    <View style={styles.outerScreenLayout}>
      <View style={styles.topNav}>
        <Text>Create Log</Text>
      </View>
      <View style={styles.centerContent}>
        <View>
          <DropDownPicker
            open={open}
            value={value}
            items={dropDownItems}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setDropDownItems}
            defaultValue={value}
            placeholder="None"
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
              console.log(value)
              // navigation.navigate('Log', { log: {}, routine: value, creating: true })
              createLog()
            }}
            title='Create Log'
          />
        </View>
      </View>
      <BotNav navigation={navigation}></BotNav>
    </View>
  )
}

const styles = stylesSheet;

export default CreateLogScreen 