import { Text, View, TextInput, Button, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import stylesSheet from './styles.js'

import LogListScreen from './Logs.js'
import { RoutineListScreen, CreateRoutineScreen } from './Routines.js'

import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

// const LogRecord = (props) => {
//   let deleteLog = () => {
//     fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs', {
//       method: 'DELETE',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         "_id": props.log._id,
//       }),
//     })
//     .then((resp) => props.remove(props.log._id))
//     .catch((error) => console.error(error))
//   }

//   return (
//     <View style={styles.log}>
//       <View style={{flex: 1, flexDirection: 'row'}}>
//         <View>
//           <Text>{props.log.logName} - {props.log.logDate}</Text>
//           <Text>{props.log.logRoutine}</Text>
//         </View>
//         <View style={{marginLeft: 'auto'}}>
//           <Button
//             onPress={() => {deleteLog()}}
//             title='delete log'
//           />
//         </View>
//       </View>
//     </View>
//   )
// };

// const LogListScreen = ({ navigation }) => {
//   const [logs, setLogs] = useState([]);

//   let removeLog = (id) => {
//     console.log("Removing ", id)
//     setLogs(logs.filter(log => log._id !== id))
//   }

//   const logElements = logs.map(log =>
//     <LogRecord key={log._id} log={log} remove={removeLog}></LogRecord>
//   )

//   useEffect(() => {
//     fetch("http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs")
//       .then((resp) => resp.json())
//       .then((json) => setLogs(json))
//       .catch((error) => console.error(error))
//   }, []);

//   let createLog = () => {
//     fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/logs', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         "logName": "Testing!",
//         "logRoutine": "",
//         "logExercises": [
//         ]
//       }),
//     })
//     .then((resp) => resp.json())
//     .then((json) => setLogs([...logs, json]))
//     .catch((error) => console.error(error))
//   }

//   return (
//     <View style={styles.outerScreenLayout}>
//       <View style={styles.topNav}>
//           <Text>Workout Tracker</Text>
//       </View>
//       <View style={styles.centerContent}> 
//         <View>
//           <StatusBar style="auto" />
//           {logElements}
//         </View>
//         <View style={{marginTop: 'auto'}}>
//           <Button
//             onPress={() => {createLog()}}
//             title='create log'
//           />
//         </View>
//       </View>
//       <View style={styles.botNav}>
//         {/* <Text>Workout Tracker</Text> */}
//         <TouchableOpacity style={styles.botNavButton} onPress={() => navigation.navigate('LogList')}>
//           <Text>Log List</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.botNavButton} onPress={() => navigation.navigate('RoutineList')}>
//           <Text>RoutineList</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// const RoutineListScreen = ({ navigation }) => {
//   const [routines, setRoutines] = useState(['test']);

//   const routineElements = routines.map(routine =>
//     <View key={routine}>
//       <Text>Test</Text>
//     </View>
//   )

//   return (
//     <View style={styles.outerScreenLayout}>
//       <View style={styles.topNav}>
//         <Text>Routine List</Text>
//       </View>
//       <View style={styles.centerContent}>
//         <View>
//           {routineElements}
//         </View>
//         <View style={{ marginTop: 'auto' }}>
//           <Button
//             onPress={() => {
//               // logs.push(text)
//               navigation.navigate('CreateRoutine')
//             }}
//             title='Create Routine'
//           />
//         </View>
//       </View>
//       <View style={styles.botNav}>
//         <TouchableOpacity style={styles.botNavButton} onPress={() => navigation.navigate('LogList')}>
//           <Text>Log List</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.botNavButton} onPress={() => navigation.navigate('RoutineList')}>
//           <Text>RoutineList</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

// const CreateRoutineScreen = ({ navigation }) => {
//   const [routineName, setRoutineName] = useState('');
//   const [routineExercises, setRoutineExercises] = useState([])

//   const exerciseElements = routineExercises.map((exercise, index) =>
//     <View key={index}>
//       <TextInput
//         style={{ height: 40 }}
//         placeholder="Exercise Name"
//         onChangeText={newText => {
//           let exercisesCopy = routineExercises
//           exercisesCopy[index] = newText
//           setRoutineExercises(exercisesCopy)
//         }}
//         defaultValue=''
//       />
//     </View>
//   )

//   let createRoutine = () => {
//     fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/routines', {
//       method: 'POST',
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         "routineName": routineName,
//         "routineExercises": routineExercises,
//       }),
//     })
//     .then((resp) => console.log(resp))
//     // .then((resp) => resp.json())
//     // .then((json) => setLogs([...logs, json]))
//     .catch((error) => console.error(error))
//   }

//   return (
//     <View style={styles.outerScreenLayout}>
//       <View style={styles.topNav}>
//         <Text>Create Routine</Text>
//       </View>
//       <View style={styles.centerContent}>
//         <View>
//         <Text>Routine Name:</Text>
//         <TextInput
//           style={{ height: 40 }}
//           placeholder="Routine Name"
//           onChangeText={newText => setRoutineName(newText)}
//           defaultValue=''
//         />
//         <Text>Exercises:</Text>
//         {exerciseElements}
//         <Button
//           onPress={() => {
//             // logs.push(text)
//             console.log("Created Exercise")
//             setRoutineExercises([...routineExercises, ''])
//           }}
//           title='Add Exercise'
//         />
//         </View>
//         <View style={{ marginTop: 'auto' }}>
//           <Button
//             onPress={() => {
//               // logs.push(text)
//               createRoutine()
//             }}
//             title='Create Routine'
//           />
//         </View>
//       </View>
//       <View style={styles.botNav}>
//         <TouchableOpacity style={styles.botNavButton} onPress={() => navigation.navigate('LogList')}>
//           <Text>Log List</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.botNavButton} onPress={() => navigation.navigate('RoutineList')}>
//           <Text>RoutineList</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   )
// }

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
