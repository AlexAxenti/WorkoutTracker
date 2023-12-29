import { StatusBar } from 'expo-status-bar';
import { Text, View, Button, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from '../styles.js'
import BotNav from './BotNav.js';
import { useIsFocused } from '@react-navigation/native';

const LogListScreen = ({ navigation }) => {
  const [logs, setLogs] = useState([]);
  const isFocused = useIsFocused();

  let removeLog = (id) => {
    setLogs(logs.filter(log => log._id !== id))
  }

  const logElements = logs.map(log =>
    <LogRecord key={log._id} log={log} remove={removeLog} navigation={navigation}></LogRecord>
  )

  let getLogs = () => {
    fetch("http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs")
      .then((resp) => resp.json())
      .then((json) => setLogs(json))
      .catch((error) => console.error(error))
  }

  useEffect(() => {
    isFocused && getLogs()
  }, [isFocused]);

  // let createLog = () => {
  //   fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     "logName": "Testing!",
  //     "logRoutine": "",
  //     "logExercises": [
  //     ]
  //   }),
  //   })
  //   .then((resp) => resp.json())
  //   .then((json) => setLogs([...logs, json]))
  //   .catch((error) => console.error(error))
  // }

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
            // onPress={() => createLog()}
            onPress={() => navigation.navigate('CreateLog', { log: {}, creating: true })}
            title='Create Log'
          />
        </View>
      </View>
      <BotNav navigation={navigation}></BotNav>
    </View>
  )
}

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
    <TouchableOpacity onPress={() => props.navigation.navigate('Log', { logId: props.log._id, creating: false, })} style={styles.log}>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View>
          <Text>{props.log.logName} - {props.log.logDate}</Text>
          <Text>{props.log.logRoutine}</Text>
        </View>
        <View style={{ marginLeft: 'auto' }}>
          <Button
            onPress={() => { deleteLog() }}
            title='Delete Log'
          />
        </View>
      </View>
    </TouchableOpacity>
  )
};

const styles = stylesSheet;

export default LogListScreen