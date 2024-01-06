import React from 'react'
import stylesSheet from './styles.js'

import LogListScreen from './components/Logs/LogList.js'
import CreateLogScreen from './components/Logs/CreateLog.js'
import LogScreen from './components/Logs/Log.js'
import LogExerciseScreen from './components/Logs/LogExercise.js'

import RoutineListScreen from './components/Routines/RoutineList.js'
import RoutineScreen from './components/Routines/Routine.js'

import ExerciseListScreen from './components/Exercises/ExerciseList.js'
import CreateExerciseScreen from './components/Exercises/CreateExercise.js'

import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerShown: false
        }}>
        <Stack.Screen name="LogList" component={LogListScreen}/>
        <Stack.Screen name="CreateLog" component={CreateLogScreen} />
        <Stack.Screen name="Log" component={LogScreen} />
        <Stack.Screen name="LogExercise" component={LogExerciseScreen} />

        <Stack.Screen name="RoutineList" component={RoutineListScreen} />
        <Stack.Screen name="Routine" component={RoutineScreen} />

        <Stack.Screen name="ExerciseList" component={ExerciseListScreen} />
        <Stack.Screen name="CreateExercise" component={CreateExerciseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = stylesSheet;
