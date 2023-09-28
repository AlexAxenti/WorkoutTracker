import React from 'react'
import stylesSheet from './styles.js'

import LogListScreen from './components/Logs.js'
import RoutineListScreen from './components/RoutineList.js'
import CreateRoutineScreen from './components/CreateRoutine.js'
import RoutinePageScreen from './components/RoutinePage.js'

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
        <Stack.Screen name="CreateRoutine" component={CreateRoutineScreen} />
        <Stack.Screen name="RoutinePage" component={RoutinePageScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = stylesSheet;
