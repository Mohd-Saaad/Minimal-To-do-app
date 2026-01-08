import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Checkbox from './Checkbox';
import moment from 'moment';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTodoReducer } from '../redux/todosSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { useNavigation } from '@react-navigation/native';

export default function Todo({
  id,
  text,
  isCompleted,
  isToday,
  hour,
  reminderDate,
  reminderTime,
  description, // Added description prop
}) {
  const todos = useSelector(state => state.todos.todos);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleDeleteTodo = async () => {
    dispatch(deleteTodoReducer(id));
    try {
      await AsyncStorage.setItem('Todos', JSON.stringify(
        todos.filter(todo => todo.id !== id)
      ));
      console.log('Todo deleted correctly');
    } catch (e) {
      console.log(e);
    }
  };

  const handleLongPress = () => {
    navigation.navigate('Add', {
      todo: { id, text, isCompleted, isToday, hour, reminderDate, reminderTime, description }
    });
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}
        onLongPress={handleLongPress}
        delayLongPress={500}
      >
        <Checkbox id={id} text={text} hour={hour} isCompleted={isCompleted} isToday={isToday} />
        <View style={{ flex: 1 }}>
          <Text
            selectable
            style={
              isCompleted
                ? [styles.text, { textDecorationLine: 'line-through', color: '#bbbbbb' }] // Light gray for completed
                : styles.text}
          >{text}</Text>
          <Text style={
            isCompleted
              ? [styles.time, { textDecorationLine: 'line-through', color: '#bbbbbb' }]
              : styles.time}
          >{hour}</Text>
          {reminderDate && reminderTime && (
            <Text style={
              isCompleted
                ? [styles.reminderText, { textDecorationLine: 'line-through', color: '#73737330' }]
                : styles.reminderText}
            >Reminder: {moment(reminderDate).format('MMM Do')} at {reminderTime}</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleDeleteTodo}>
        <MaterialIcons name="delete-outline" size={24} color="#73737340" style={styles.delete} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 15,
    fontWeight: '500',
    color: '#000000', // Black for active tasks
  },
  time: {
    fontSize: 13,
    color: '#555555', // Dark gray for active time
    fontWeight: '500',
  },
  reminderText: {
    fontSize: 12,
    color: '#a3a3a3',
    fontWeight: '400',
    marginTop: 2,
  }
});