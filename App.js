import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';
import React, { useState } from 'react';

const LogRecord = (props) => {
  return (
    <View style={styles.log}>
      <Text>{props.title}</Text>
    </View>
  )
};

export default function App() {
  const [text, setText] = useState('');
  const [logs, setLogs] = useState([]);

  const logElements = logs.map(log => 
    <LogRecord title={log}></LogRecord>
  )

  return (
    <View style={styles.container}>
      <View style={styles.topNav}>
        <Text>Workout Tracker</Text>
      </View>
      <View style={styles.centerContent}>
        <StatusBar style="auto" />
        {logElements}
      </View>
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here to translate!"
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
      <View style={styles.botNav}></View>
      
      
    </View>
  );
}

const styles = StyleSheet.create({
  topNav: {
    flex: 1,
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
