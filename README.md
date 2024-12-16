This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).

# Loom Videos

1. https://www.loom.com/share/6bf984de642b46958fdd34d50c6f6e8a?sid=7e248e55-af08-471f-aa19-d27e24178a47
2. https://www.loom.com/share/72152dac1d95454aba0029b09d93f580?sid=186cc70a-0bde-4bb2-afe9-d02a76c119b9

# Approach

## Google Authentication

Used Firebase Authentication and @react-native-google-signin/google-signin.
Display user’s name and profile picture on the Home Screen and Authentication Screen if looged in.
Handled login/logout flows.

## API Integration

Use React Query to fetch and paginate Pokémon data from the API.
Implement infinite scrolling with loading/error states.

## Push Notifications

Integrate Firebase Cloud Messaging (FCM) for handling foreground, background, and closed states.
Navigate to Details Screen via notification to display random Pokémon details.

## Navigation

Use React Navigation for three screens:<br/>
Auth Screen: Display Google Auth Button and user details if looged in. <br/>
Home Screen: Display Pokémon list and three buttons (Catch Pokémon, View Team, Settings).<br/>
Details Screen: Show Pokémon details on selection or via notification.

## State Persistence

Use Redux Persist or AsyncStorage to persist button states across app restarts and also user information.

## Bonus Features

1. Search Pokemon.
2. Loading Activity Indicator.
3. Detail Screen Pokemon Image Animation.
4. Error handling for APIs.
5. Redux State for User information.

# Getting Started

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start

# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android

# OR using Yarn
yarn android
```

### For iOS

```bash
# using npm
npm run ios

# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:

### Now what?

- If you want to add this new React Native code to an existing application, check out the [Integration guide](https://reactnative.dev/docs/integration-with-existing-apps).
- If you're curious to learn more about React Native, check out the [Introduction to React Native](https://reactnative.dev/docs/getting-started).

# Troubleshooting

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Learn More

To learn more about React Native, take a look at the following resources:

- [React Native Website](https://reactnative.dev) - learn more about React Native.
- [Getting Started](https://reactnative.dev/docs/environment-setup) - an **overview** of React Native and how setup your environment.
- [Learn the Basics](https://reactnative.dev/docs/getting-started) - a **guided tour** of the React Native **basics**.
- [Blog](https://reactnative.dev/blog) - read the latest official React Native **Blog** posts.
- [`@facebook/react-native`](https://github.com/facebook/react-native) - the Open Source; GitHub **repository** for React Native.
