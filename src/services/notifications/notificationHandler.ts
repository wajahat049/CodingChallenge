import messaging from '@react-native-firebase/messaging';
import {Platform} from 'react-native';
import {PermissionsAndroid} from 'react-native';
import PushNotification from 'react-native-push-notification';
import {initializeApp} from 'firebase/app';

export const registerForPushNotificationsAsync = async (): Promise<
  string | null
> => {
  if (Platform.OS === 'android') {
    // Request permission for Android
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_NOTIFICATION_POLICY,
    );

    if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
      console.log('Notification permission denied');
      return null;
    }
  }

  // Get permission for iOS
  const authorizationStatus = await messaging().requestPermission();
  if (authorizationStatus !== messaging.AuthorizationStatus.AUTHORIZED) {
    console.log('Failed to get push token for push notifications!');
    return null;
  }

  const token = await messaging().getToken();
  console.log('FCM Push Token:', token);

  return token;
};

export const initializeFCM = () => {
  const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  };

  const app = initializeApp(firebaseConfig);

  // // Foreground messages
  // messaging().onMessage(async remoteMessage => {
  //   console.log('FCM Message Data:', remoteMessage);

  //   PushNotification.localNotification({
  //     title: remoteMessage.notification?.title || 'Notification',
  //     message: remoteMessage.notification?.body,
  //     data: remoteMessage.data,
  //   });
  // });

  // // Background or killed state messages
  // messaging().onNotificationOpenedApp(remoteMessage => {
  //   console.log(
  //     'Notification caused app to open from background:',
  //     remoteMessage,
  //   );
  // });

  // messaging()
  //   .getInitialNotification()
  //   .then(remoteMessage => {
  //     if (remoteMessage) {
  //       console.log(
  //         'Notification caused app to open from a killed state:',
  //         remoteMessage,
  //       );
  //     }
  //   });
};
