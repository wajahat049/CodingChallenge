import React, {useEffect, useRef} from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './src/screens/Home';
import DetailsScreen from './src/screens/Details';
import AuthScreen from './src/screens/Auth';
import {
  registerForPushNotificationsAsync,
  initializeFCM,
} from './src/services/notifications/notificationHandler';
import {QueryClient, QueryClientProvider} from 'react-query';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/store';
import PushNotification from 'react-native-push-notification';
import messaging from '@react-native-firebase/messaging';
import {Alert, Platform} from 'react-native';
import RootNavigator from './src/navigation/RootNavigator';

const Stack = createNativeStackNavigator();
const queryClient = new QueryClient();

const App: React.FC = () => {
  // const navigation = useNavigation();
  const navigationContainerRef = useRef();
  useEffect(() => {
    // Initialize FCM and register push notifications
    initializeFCM();
    registerForPushNotificationsAsync();
    messaging()
      .getToken()
      .then(token => console.log('FCM Token:', token));

    // console.log('TOKEN');

    // Foreground message handler
    const unsubscribeOnMessage = messaging().onMessage(async remoteMessage => {
      console.log('FCM Message Data:', remoteMessage);
      if (remoteMessage?.notification?.body == 'New Pokemon is found') {
        Alert.alert('Pokemon', 'New Pokemon is found', [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          {
            text: 'OPEN',
            onPress: () => {
              if (navigationContainerRef?.current) {
                navigationContainerRef?.current?.navigate('Details', {
                  itemId: `https://pokeapi.co/api/v2/pokemon/${Math.floor(
                    Math.random() * 50,
                  )}`,
                });
              }
            },
          },
        ]);
      }
      PushNotification.localNotification({
        title: remoteMessage.notification?.title || 'Notification',
        message: remoteMessage.notification?.body,
        data: remoteMessage.data,
      });
    });

    // Background message handler
    const unsubscribeOnNotificationOpenedApp =
      messaging().onNotificationOpenedApp(remoteMessage => {
        if (remoteMessage)
          console.log(
            'Notification caused app to open from background:',
            remoteMessage,
          );
        if (remoteMessage?.notification?.body == 'New Pokemon is found') {
          if (navigationContainerRef?.current) {
            navigationContainerRef?.current?.navigate('Details', {
              itemId: `https://pokeapi.co/api/v2/pokemon/${Math.floor(
                Math.random() * 50,
              )}`,
            });
          }
        }
      });

    // App was opened by a notification (in a killed state i.e Closed)
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from a killed state:',
            remoteMessage?.notification?.body,
          );
          if (remoteMessage?.notification?.body == 'New Pokemon is found') {
            console.log('IF');
            if (navigationContainerRef?.current) {
              console.log('IFFFFF');
              navigationContainerRef?.current?.navigate('Details', {
                itemId: `https://pokeapi.co/api/v2/pokemon/${Math.floor(
                  Math.random() * 50,
                )}`,
              });
            } else {
              console.log('ELSEEEEEEE');

              setTimeout(() => {
                if (navigationContainerRef?.current) {
                  console.log('ELSEEEEEEE IFFFFFF');
                  navigationContainerRef?.current?.navigate('Details', {
                    itemId: `https://pokeapi.co/api/v2/pokemon/${Math.floor(
                      Math.random() * 10,
                    )}`,
                  });
                }
              }, 2000);
            }
          }
        }
      });

    return () => {
      unsubscribeOnMessage();
      unsubscribeOnNotificationOpenedApp();
    };
  }, []);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <RootNavigator navigationContainerRef={navigationContainerRef} />
        </QueryClientProvider>
      </PersistGate>
    </Provider>
  );
};

export default App;
