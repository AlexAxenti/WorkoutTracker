import React from 'react'
import stylesSheet from './styles.js'

import LogListScreen from './components/LogList.js'
import RoutineListScreen from './components/RoutineList.js'
import RoutineScreen from './components/Routine.js'
import CreateLogScreen from './components/CreateLog.js'
import LogScreen from './components/Log.js'
import ExerciseScreen from './components/Exercise.js'

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
        <Stack.Screen name="RoutineList" component={RoutineListScreen} />
        <Stack.Screen name="Routine" component={RoutineScreen} />
        <Stack.Screen name="CreateLog" component={CreateLogScreen} />
        <Stack.Screen name="Log" component={LogScreen} />
        <Stack.Screen name="Exercise" component={ExerciseScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = stylesSheet;
