import { Text, View, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from '../styles.js'
import BotNav from './BotNav.js';

const LogScreen = ({ route, navigation }) => {
  const log = route.params.log;
  const creatingLog = route.params.creating;

  // const [routineName, setRoutineName] = useState(creatingRoutine ? '' : routine.routineName);
  // const [routineExercises, setRoutineExercises] = useState(creatingRoutine ? [] : routine.routineExercises)

  // useEffect(() => {
  //   getRoutines()
  // }, []);

  // let createRoutine = () => {
  //   console.log(routineName, routineExercises)
  //   let method = creatingRoutine ? 'POST' : 'PUT'
  //   let body = {
  //     "routineName": routineName,
  //     "routineExercises": routineExercises,
  //   }

  //   if (!creatingRoutine) {
  //     body._id = routine._id

  //     console.log(body)
  //   }
    
  //   fetch('http://workout-tracker-backend-71ab3f542572.herokuapp.com/routines', {
  //     method: method,
  //     headers: {
  //       Accept: 'application/json',
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(body),
  //   })
  //     .then((resp) => navigation.goBack())
  //     .catch((error) => console.error(error))
  // }

  // let editExercise = (exerciseName, exerciseIndex) => {
  //   const newExercises = routineExercises.map((e, i) => {
  //     if (i === exerciseIndex) {
  //       return exerciseName
  //     } else {
  //       return e
  //     }
  //   })
  //   setRoutineExercises(newExercises)
  // }

  // let removeExercise = (exerciseIndex) => {
  //   const newExercises = routineExercises.filter((e, i) => i !== exerciseIndex);
  //   setRoutineExercises(newExercises)
  // }

  // Render each exercise
  // const exerciseElements = routineExercises.map((exercise, index) =>
  //   <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
  //     <ExerciseElement editExercise={editExercise} exerciseIndex={index} exerciseName={exercise}></ExerciseElement>
  //     <View>
  //       <Button
  //         onPress={() => {
  //           removeExercise(index)
  //         }}
  //         title='X'
  //         style={{ marginLeft: 'auto' }}
  //       />
  //     </View>
  //   </View>
  // )

  return (
    <View style={styles.outerScreenLayout}>
      <View style={styles.topNav}>
        <Text>Create Log</Text>
      </View>
      <View style={styles.centerContent}>
        <View>
          {/* <View style={{flexDirection: 'row'}}>
            <Text style={{marginTop: 'auto', marginBottom: 'auto', marginRight: 5}}>Routine Name:</Text>
            <TextInput
              style={{ height: 40 }}
              placeholder="Routine Name"
              onChangeText={newText => setRoutineName(newText)}
              defaultValue={routineName}
            />
          </View> */}
          {/* <Text>Exercises:</Text>
          {exerciseElements}
          <Button
            onPress={() => {
              // logs.push(text)
              setRoutineExercises([...routineExercises, ''])
            }}
            title='Add Exercise'
          /> */}
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
              // createRoutine()
            }}
            title={creatingLog ? 'Create Log' : 'Save Log'}
          />
        </View>
      </View>
      <BotNav navigation={navigation}></BotNav>
    </View>
  )
}

// const ExerciseElement = (props) => {
//   return (
//     <View style={{ flexDirection: 'row' }}>
//       <Text style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: 5 }}>Exercise Name:</Text>
//       <TextInput
//         style={{ height: 40 }}
//         placeholder="Exercise Name"
//         onChangeText={newText => {
//           props.editExercise(newText, props.exerciseIndex)
//         }}
//         defaultValue={props.exerciseName}
//       />
//     </View>
//   )
// }

const styles = stylesSheet;

export default LogScreen 