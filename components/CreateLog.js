import { Text, View, TextInput, Button } from 'react-native';
import React, { useState, useEffect } from 'react';
import stylesSheet from '../styles.js'
import BotNav from './BotNav.js';
import DropDownPicker from 'react-native-dropdown-picker';

const CreateLogScreen = ({ navigation }) => {
  // const [routineName, setRoutineName] = useState(creatingRoutine ? '' : routine.routineName);
  // const [routineExercises, setRoutineExercises] = useState(creatingRoutine ? [] : routine.routineExercises)

  // const [routines, setRoutines] = useState([])
  const [open, setOpen] = useState(false);
  const [dropDownItems, setDropDownItems] = useState([])
  const [value, setValue] = useState({})

  let getRoutines = () => {
    fetch("http://workout-tracker-backend-71ab3f542572.herokuapp.com/routines")
      .then((resp) => resp.json())
      .then((json) => {
        formatDropDownItems(json)
      })
      .catch((error) => console.error(error))
  }

  let formatDropDownItems = json => {
    let items = [{label: 'None', value: {}}]
    json.map(routine => {
      items.push({label: routine.routineName, value: routine})
    })
    setDropDownItems(items)
  }

  useEffect(() => {
    getRoutines()
  }, []);

  return (
    <View style={styles.outerScreenLayout}>
      <View style={styles.topNav}>
        <Text>Create Log</Text>
      </View>
      <View style={styles.centerContent}>
        <View>
          <DropDownPicker
            open={open}
            value={value}
            items={dropDownItems}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setDropDownItems}
            defaultValue={value}
            placeholder="None"
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
              navigation.navigate('Log', { log: value, creating: true })
            }}
            title='Select Routine'
          />
        </View>
      </View>
      <BotNav navigation={navigation}></BotNav>
    </View>
  )
}

const styles = stylesSheet;

export default CreateLogScreen 