import React from 'react'
import stylesSheet from './styles.js'

import LogListScreen from './components/Logs.js'
import { RoutineListScreen, CreateRoutineScreen } from './components/Routines.js'

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = stylesSheet;
