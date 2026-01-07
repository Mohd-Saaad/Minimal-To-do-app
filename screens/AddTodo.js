import { View, TouchableOpacity, Text, StyleSheet, TextInput, Switch, TouchableWithoutFeedback, Keyboard, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addTodoReducer } from '../redux/todosSlice';
import * as Notifications from 'expo-notifications';
import React from 'react';

export default function AddTodo() {

    const [name, setName] = React.useState('');
    const [todoTime, setTodoTime] = React.useState(new Date()); // Renamed from 'date' to 'todoTime'
    const [reminderDate, setReminderDate] = React.useState(new Date()); // New state for reminder date
    const [reminderTime, setReminderTime] = React.useState(new Date()); // New state for reminder time
    const [isToday, setIsToday] = React.useState(false);
    const [withAlert, setWithAlert] = React.useState(false);
    const [showTimePicker, setShowTimePicker] = React.useState(false);
    const [showReminderTimePicker, setShowReminderTimePicker] = React.useState(false); // New state for reminder time picker
    const [showDatePicker, setShowDatePicker] = React.useState(false); // New state for date picker visibility
    // const [listTodos, setListTodos] = React.useState([]);
    const listTodos = useSelector(state => state.todos.todos);
    const navigation = useNavigation();
    const dispatch = useDispatch();

    const addTodo = async () => {
        const newTodo = {
            id: Math.floor(Math.random() * 1000000),
            text: name,
            hour: todoTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Use todoTime for the hour display
            isToday: isToday,
            isComplited: false,
            reminderDate: reminderDate.toISOString().split('T')[0], // Format reminderDate as YYYY-MM-DD
            reminderTime: reminderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Use separate reminderTime
        };
        try {
            await AsyncStorage.setItem('Todos', JSON.stringify([...listTodos, newTodo]));
            dispatch(addTodoReducer(newTodo));
            console.log('Todo saved correctly');
            if (withAlert) {
                await scheduleTodoNotification(newTodo);
            }
            navigation.goBack();
        }
        catch (e) {
            console.log(e);
        }
    };

    const scheduleTodoNotification = async (todo) => {
        const triggerDate = new Date(todo.reminderDate);
        const [hours, minutes] = todo.reminderTime.split(':').map(Number);
        triggerDate.setHours(hours);
        triggerDate.setMinutes(minutes);
        triggerDate.setSeconds(0);

        try {
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: 'Alert! You have a task to do!',
                    body: todo.text,
                },
                trigger: triggerDate,
            });
            console.log('Notification scheduled');
        } catch (e) {
            alert('The notification failed to schedule, make sure the hour is valid');
        }
    };

    return (
        <TouchableWithoutFeedback onPress={() => { Keyboard.dismiss(); }}>
            <View style={styles.container}>
                <Text style={styles.title}>Add a Task</Text>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Name</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Task"
                        placeholderTextColor="#00000030"
                        onChangeText={(text) => { setName(text) }}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Hour</Text>
                    <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                        <Text>{todoTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </TouchableOpacity>
                    {showTimePicker && (
                        <DateTimePicker
                            value={todoTime}
                            mode={'time'}
                            is24Hour={true}
                            onChange={(event, selectedDate) => {
                                setShowTimePicker(false);
                                if (selectedDate) {
                                    setTodoTime(selectedDate);
                                }
                            }}
                        />
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Reminder Date</Text>
                    <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                        <Text>{reminderDate.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showDatePicker && (
                        <DateTimePicker
                            value={reminderDate}
                            mode={'date'}
                            display={Platform.OS === 'ios' ? 'spinner' : 'default'} // 'default' for Android, 'spinner' for iOS
                            onChange={(event, selectedDate) => {
                                setShowDatePicker(false);
                                if (selectedDate) {
                                    setReminderDate(selectedDate);
                                }
                            }}
                        />
                    )}
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputTitle}>Reminder Time</Text>
                    <TouchableOpacity onPress={() => setShowReminderTimePicker(true)}>
                        <Text>{reminderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</Text>
                    </TouchableOpacity>
                    {showReminderTimePicker && (
                        <DateTimePicker
                            value={reminderTime}
                            mode={'time'}
                            is24Hour={true}
                            display="default"
                            onChange={(event, selectedDate) => {
                                setShowReminderTimePicker(false);
                                if (selectedDate) {
                                    setReminderTime(selectedDate);
                                }
                            }}
                        />
                    )}
                </View>
                <View style={[styles.inputContainer, { paddingBottom: 0, alignItems: 'center' }]}>
                    <View>
                        <Text style={styles.inputTitle}>Today</Text>
                        <Text style={{ color: '#00000040', fontSize: 12, maxWidth: '84%', paddingBottom: 10 }}>If you disable today, the task will be considered as tomorrow</Text>
                    </View>
                    <Switch
                        value={isToday}
                        onValueChange={(value) => { setIsToday(value) }}
                    />
                </View>
                <View style={[styles.inputContainer, { paddingBottom: 0, alignItems: 'center' }]}>
                    <View>
                        <Text style={styles.inputTitle}>Alert</Text>
                        <Text style={{ color: '#00000040', fontSize: 12, maxWidth: '85%' }}>You will receive an alert at the time you set for this reminder</Text>
                    </View>
                    <Switch
                        value={withAlert}
                        onValueChange={(value) => { setWithAlert(value) }}
                    />
                </View>

                <TouchableOpacity onPress={addTodo} style={styles.button}>
                    <Text style={{ color: 'white' }}>Done</Text>
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    textInput: {
        borderBottomColor: '#00000030',
        borderBottomWidth: 1,
        width: '80%',
    },
    container: {
        flex: 1,
        backgroundColor: '#F7F8FA',
        paddingHorizontal: 30,
    },
    inputTitle: {
        fontSize: 20,
        fontWeight: '600',
        lineHeight: 24
    },
    inputContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        paddingBottom: 30,
    },
    button: {
        marginTop: 30,
        marginBottom: 15,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#000000',
        height: 46,
        borderRadius: 11,
    }
});