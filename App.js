import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const LogRecord = (props) => {
  return (
    <View style={styles.log}>
      <Text>{props.title}</Text>
    </View>
  )
};

const LogListScreen = (props) => {
  const [text, setText] = useState('');
  const [logs, setLogs] = useState([]);

  const logElements = logs.map(log => 
    <LogRecord title={log}></LogRecord>
  )
  return (
    <View style={styles.centerContent}>
      <View style={styles.topNav}>
          <Text>Workout Tracker</Text>
      </View>
      <View>
        <StatusBar style="auto" />
        {logElements}
      </View>
      <TextInput
        style={{ height: 40 }}
        placeholder="Create log"
        onChangeText={newText => setText(newText)}
        defaultValue={text}
      />
      <Button
        onPress={() => {
          // logs.push(text)
          setLogs([...logs, text])
        }}
        title='create log'
      />
    </View>
  )
}

const ExerciseListScreen = (props) => {
  const [exercises, setExercises] = useState(['Bench press', 'Squats', 'Cable rows']);

  const exercisesElements = exercises.map(exercise => 
    <LogRecord title={exercise}></LogRecord>
  )

  return (
    <View>
      <View style={styles.topNav}>
          <Text>Exercise List</Text>
      </View>
      <View style={styles.centerContent}>
        {exercisesElements}
      </View>
    </View>
  )
}

export default function App() {
  return (
    // <View style={styles.container}>
    <NavigationContainer style={{flexDirection: "column"}}>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen name="LogList" component={LogListScreen} />
        <Tab.Screen name="ExerciseList" component={ExerciseListScreen} />
        {/* <LogListScreen></LogListScreen> */}
        {/* <View style={styles.botNav}></View> */}
      </Tab.Navigator>
    </NavigationContainer>
    // </View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    height: 100,
    backgroundColor: '#2f3a59',
    alignItems: 'center',
    justifyContent: 'center',
  },
  botNav: {
    flex: 1,
    backgroundColor: '#2f3a59',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerContent: {
    backgroundColor: '#b2bbd6',
    // alignItems: 'center',
    // justifyContent: 'center',
    flex: 6,
  },
  container: {
    flexDirection: 'column',
    flex: 1,
    // backgroundColor: '#fff',
  },
  log: {
    backgroundColor: 'green',
    height: 50,
    marginTop: 3,
    borderTopColor: 'black',
    borderTopWidth: 2,
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    // backgroundColor: '#fff',
  },
});
