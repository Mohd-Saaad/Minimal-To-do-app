# Project Title

Minima (To-do list app): Minimal to do list app with reminder feaature.

## Description

Provide a brief overview of what this project is, what it does, and why it was created. Explain its purpose and main functionalities.

## Features

This application includes the following features. For a detailed breakdown, please refer to the [FEATURES.md](FEATURES.md) file.

*   **Todo Creation:** Users can add new todo tasks with a descriptive name.
*   **Date and Time Assignment:** Tasks can be assigned a specific date and time for completion.
    *   Includes an option to mark a task for "Today" or "Tomorrow."
    *   Provides an interactive time picker for precise time setting.
*   **Task Completion Toggle:** Users can easily mark tasks as completed or incomplete using a checkbox.
*   **Task Listing:** All created tasks are displayed in a clear and organized list on the home screen.
*   **Persistent Data Storage:** Tasks are saved locally on the device using `AsyncStorage`, ensuring that user data persists across app sessions and launches.
*   **Task Notifications/Alerts:** Users have the option to schedule local notifications, receiving a reminder for a task at its set time.



## Installation

Instructions on how to set up and run the project locally.

1.  **Prerequisites:**
    *   [Node.js](https://nodejs.org/) (specify version if necessary)
    *   [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/)
    *   [Expo CLI](https://docs.expo.dev/get-started/installation/) (for React Native/Expo apps)

2.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/your-repo-name.git
    cd your-repo-name
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

How to use the application once it's installed.

### Running the application:

```bash
npm start
# or
yarn start
```
This will typically open a new tab in your browser with Expo Dev Tools. You can then:
*   Scan the QR code with the Expo Go app on your phone.
*   Run on an Android emulator.
*   Run on an iOS simulator.
*   Run in a web browser.

## Contributing

Guidelines for anyone who wants to contribute to this project.

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/your-feature-name`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'feat: Add new feature'`).
5.  Push to the branch (`git push origin feature/your-feature-name`).
6.  Open a Pull Request.

Please ensure your code adheres to the project's coding standards and includes appropriate tests.

## License

This project is licensed under the [MIT License](LICENSE.md) - see the [LICENSE.md](LICENSE.md) file for details.
