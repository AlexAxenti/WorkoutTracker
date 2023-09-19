import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const LogRecord = (props) => {
  return (
    <View style={styles.log}>
      <Text>{props.title}</Text>
    </View>
  )
};

const LogListScreen = ({ navigation }) => {
  const [text, setText] = useState('');
  const [logs, setLogs] = useState([]);

  const logElements = logs.map(log =>
    <LogRecord title={log}></LogRecord>
  )
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

const RoutineListScreen = ({ navigation }) => {
  const [routines, setRoutines] = useState(['test']);

  const routineElements = routines.map(routine =>
    <LogRecord title={routine}></LogRecord>
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
              console.log("Create Routine")
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

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="LogList" component={LogListScreen}/>
        <Stack.Screen name="RoutineList" component={RoutineListScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  outerScreenLayout: {
    flex: 1,
    flexDirection: 'column',
  },
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
    flexDirection: 'row'
  },
  botNavButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  centerContent: {
    // backgroundColor: '#b2bbd6',
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
