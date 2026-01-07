# Minimal Todo App Features

This document outlines the key functionalities and technical aspects of the Minimal Todo App.

## Core Features:

*   **Todo Creation:** Users can add new todo tasks with a descriptive name.
*   **Date and Time Assignment:** Tasks can be assigned a specific date and time for completion.
    *   Includes an option to mark a task for "Today" or "Tomorrow."
    *   Provides an interactive time picker for precise time setting.
*   **Task Completion Toggle:** Users can easily mark tasks as completed or incomplete using a checkbox.
*   **Task Listing:** All created tasks are displayed in a clear and organized list on the home screen.
*   **Persistent Data Storage:** Tasks are saved locally on the device using `AsyncStorage`, ensuring that user data persists across app sessions and launches.
*   **Task Notifications/Alerts:** Users have the option to schedule local notifications, receiving a reminder for a task at its set time.

## User Experience Enhancements:

*   **Onboarding Experience:** An initial onboarding screen guides new users through the application.
*   **Keyboard Dismissal:** Tapping outside of input fields automatically dismisses the keyboard, improving user interaction flow.

## Technical Highlights:

*   **Redux State Management:** The application utilizes Redux for centralized and predictable state management of todo items, facilitating efficient data flow and updates.
*   **React Native Framework:** Built using React Native, allowing for a single codebase to target multiple mobile platforms.
*   **Expo Framework:** Leverages the Expo framework for simplified development, access to native device features (like notifications and local storage), and streamlined build processes.
