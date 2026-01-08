import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Settings, TouchableOpacity, Platform, StatusBar, SectionList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { hideComplitedReducer, setTodosReducer } from '../redux/todosSlice';
import Todo from '../components/Todo'; // Use Todo directly
import { useGetTodos } from '../hooks/useGetTodos';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { useNavigation } from '@react-navigation/native';
import * as Device from 'expo-device';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
})

export default function Home() {

    useGetTodos();
    const todos = useSelector(state => state.todos.todos);
    const [isHidden, setIsHidden] = useState(false);
    const dispatch = useDispatch();
    const navigation = useNavigation();


    useEffect(() => {
        requestNotificationPermissions();
        checkFirstLaunch();
    }, []);

    const checkFirstLaunch = async () => {
        const firstLaunch = await AsyncStorage.getItem('@FirstLaunch');
        if (firstLaunch) {
            return;
        }
        await AsyncStorage.setItem('@FirstLaunch', 'true');
        navigation.navigate('Onboarding');
    }

    const handleHideCompleted = async () => {
        if (isHidden) {
            setIsHidden(false);
            const todos = await AsyncStorage.getItem('Todos');
            if (todos !== null) {
                dispatch(setTodosReducer(JSON.parse(todos)));
            }
            return;
        }
        setIsHidden(!isHidden);
        dispatch(hideComplitedReducer());
    }

    const requestNotificationPermissions = async () => {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get permissions for push notification!');
            return;
        }

        if (Platform.OS === 'android') {
            await Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }
    }

    const todayTodos = todos.filter(todo => todo.isToday === true);
    const tomorrowTodos = todos.filter(todo => todo.isToday === false);

    const sections = [
        {
            title: 'Today',
            data: todayTodos,
            isTodaySection: true
        },
        {
            title: 'Upcoming',
            data: tomorrowTodos,
            isTodaySection: false
        }
    ];

    const renderSectionHeader = ({ section: { title, isTodaySection } }) => {
        if (isTodaySection) {
            return (
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10, marginTop: 10 }}>
                    <Text style={styles.title}>{title}</Text>
                    <TouchableOpacity onPress={handleHideCompleted}>
                        <Text style={{ color: '#3478F6' }}>{isHidden ? "Show Completed" : "Hide Completed"}</Text>
                    </TouchableOpacity>
                </View>
            );
        }
        return (
            <Text style={styles.title}>{title}</Text>
        );
    };

    const renderSectionFooter = ({ section }) => {
        if (section.data.length === 0) {
            if (section.isTodaySection) {
                return (
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontSize: 13, color: '#000', fontWeight: 'bold' }}>CONGRATS!</Text>
                        <Text style={{ fontSize: 13, color: '#737373', fontWeight: '500' }}>You don't have any task, enjoy your day.</Text>
                    </View>
                );
            } else {
                return (
                    <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                        <Text style={{ fontSize: 13, color: '#000', fontWeight: 'bold' }}>NICE!</Text>
                        <Text style={{ fontSize: 13, color: '#737373', fontWeight: '500' }}>Nothing is scheduled for upcoming days..</Text>
                    </View>
                );
            }
        }
        return null;
    };

    // Global empty state if ALL todos are empty (handled by individual sections now, but we can verify)
    // Actually, if both are empty, both footers show, which is fine.
    // But original code had a "Global Empty" view if todos.length === 0.

    if (todos.length === 0) {
        return (
            <View style={styles.container}>
                <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                    <Text style={{ fontSize: 13, color: '#000', fontWeight: 'bold' }}>NICE!</Text>
                    <Text style={{ fontSize: 13, color: '#737373', fontWeight: '500' }}>Nothing is scheduled.</Text>
                </View>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <SectionList
                sections={sections}
                keyExtractor={(item, index) => item.id.toString() + index}
                renderItem={({ item }) => <Todo {...item} />}
                renderSectionHeader={renderSectionHeader}
                renderSectionFooter={renderSectionFooter}
                stickySectionHeadersEnabled={false}
                contentContainerStyle={{ paddingBottom: 50 }}
                showsVerticalScrollIndicator={false}
            />
            <StatusBar style='auto' />
        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontSize: 34,
        fontWeight: 'bold',
        marginBottom: 35,
        marginTop: 10,
    },
    container: {
        flex: 1,
        paddingHorizontal: 15,
        paddingTop: 50
    },
});