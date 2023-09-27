import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from './styles.js'

const LogRecord = (props) => {
  let deleteLog = () => {
    fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs', {
    method: 'DELETE',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "_id": props.log._id,
    }),
    })
    .then((resp) => props.remove(props.log._id))
    .catch((error) => console.error(error))
  }

  return (
    <View style={styles.log}>
    <View style={{flex: 1, flexDirection: 'row'}}>
      <View>
      <Text>{props.log.logName} - {props.log.logDate}</Text>
      <Text>{props.log.logRoutine}</Text>
      </View>
      <View style={{marginLeft: 'auto'}}>
      <Button
        onPress={() => {deleteLog()}}
        title='delete log'
      />
      </View>
    </View>
    </View>
  )
  };

const LogListScreen = ({ navigation }) => {
  const [logs, setLogs] = useState([]);

  let removeLog = (id) => {
    console.log("Removing ", id)
    setLogs(logs.filter(log => log._id !== id))
  }

  const logElements = logs.map(log =>
    <LogRecord key={log._id} log={log} remove={removeLog}></LogRecord>
  )

  useEffect(() => {
    fetch("http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs")
    .then((resp) => resp.json())
    .then((json) => setLogs(json))
    .catch((error) => console.error(error))
  }, []);

  let createLog = () => {
    fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "logName": "Testing!",
      "logRoutine": "",
      "logExercises": [
      ]
    }),
    })
    .then((resp) => resp.json())
    .then((json) => setLogs([...logs, json]))
    .catch((error) => console.error(error))
  }

  return (
    <View style={styles.outerScreenLayout}>
    <View style={styles.topNav}>
      <Text>Workout Tracker</Text>
    </View>
    <View style={styles.centerContent}> 
      <View>
      <StatusBar style="auto" />
      {logElements}
      </View>
      <View style={{marginTop: 'auto'}}>
      <Button
        onPress={() => {createLog()}}
        title='create log'
      />
      </View>
    </View>
    <View style={styles.botNav}>
      {/* <Text>Workout Tracker</Text> */}
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

export default LogListScreen