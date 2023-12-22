import { Text, View, TextInput, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
import stylesSheet from '../styles.js'
import BotNav from './BotNav.js'

const ExerciseScreen = ({ route, navigation }) => {
  const exercise = route.params.exercise
  const logId = route.params.logId

  const [exerciseName, setExerciseName] = useState(exercise.exerciseName)
  const [exerciseSets, setExerciseSets] = useState(exercise.sets)

  useEffect(() => {
    console.log(exercise)
  }, []);

  let editSet = (set) => {
    const newSets = exerciseSets.map((e, i) => {
      if (i === set.setNumber - 1) {
        return set
      } else {
        return e
      }
    })
    setExerciseSets(newSets)
  }

  // let removeExercise = (exerciseIndex) => {
  //   const newExercises = logExercises.filter((e, i) => i !== exerciseIndex);
  //   setLogExercises(newExercises)
  // }

  // Render each exercise
  const setElements = exerciseSets.map((set, index) =>
    <View key={index} style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
      <SetElement set={set} editSet={editSet}></SetElement>
      <View>
        <Button
          onPress={() => {
            // removeExercise(index)
          }}
          title='X'
          style={{ marginLeft: 'auto' }}
        />
      </View>
    </View>
  )

  return (
    <View style={styles.outerScreenLayout}>
      <View style={styles.topNav}>
        <Text>Edit Exercise</Text>
      </View>
      <View style={styles.centerContent}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: 5 }}>Exercise Name:</Text>
          <TextInput
            style={{ height: 40 }}
            placeholder="Log Name"
            onChangeText={newText => setExerciseName(newText)}
            defaultValue={exerciseName}
          />
        </View>
        <View>
          <Text>Sets:</Text>
          {setElements}
          <Button
            onPress={() => {
              // logs.push(text)
              setExerciseSets([...exerciseSets, {setNumber: exerciseSets.length + 1}])
            }}
            title='Add Set'
          />
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
              // createLog()
              console.log(exerciseSets)
            }}
            title={'Save Exercise'}
          />
        </View>
      </View>
      <BotNav navigation={navigation}></BotNav>
    </View>
  )
}

const SetElement = (props) => {
  let set = props.set;
  return (
    <View style={{ flexDirection: 'row' }}>
      <Text style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: 5 }}>Set {set.setNumber}:</Text>
      <Text style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: 5 }}>Weight:</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="0"
        onChangeText={newText => {
          set.weight = newText
          props.editSet(set)
        }}
        keyboardType={'numeric'}
      />
      <Text style={{ marginTop: 'auto', marginBottom: 'auto', marginRight: 5 }}>Reps:</Text>
      <TextInput
        style={{ height: 40 }}
        placeholder="0"
        onChangeText={newText => {
          set.reps = newText
          props.editSet(set)
        }}
      />
    </View>
  )
}

const styles = stylesSheet;

export default ExerciseScreen 