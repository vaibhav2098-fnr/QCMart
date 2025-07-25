// // Firebase Push Notification Utility
// // Requires: @react-native-firebase/app, @react-native-firebase/messaging
// // Docs: https://rnfirebase.io/messaging/usage
// /**
//  * Request user permission for push notifications (iOS/Android 13+)
//  * Returns true if permission granted.
//  */
// import messaging from '@react-native-firebase/messaging';
// import { Alert, Platform, PermissionsAndroid } from 'react-native';

// export async function requestUserPermission() {
//   if (Platform.OS === 'ios') {
//     const authStatus = await messaging().requestPermission();
//     const enabled =
//       authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
//       authStatus === messaging.AuthorizationStatus.PROVISIONAL;
//     return enabled;
//   }

//   if (Platform.OS === 'android' && Platform.Version >= 33) {
//     const granted = await PermissionsAndroid.request(
//       PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
//       {
//         title: 'Notification Permission',
//         message: 'App needs permission to send you notifications.',
//         buttonNeutral: 'Ask Me Later',
//         buttonNegative: 'Cancel',
//         buttonPositive: 'OK',
//       }
//     );
//     return granted === PermissionsAndroid.RESULTS.GRANTED;
//   }

//   // For Android < 13
//   return true;
// }


// /**
//  * Get the FCM device token for this device
//  * Returns the token string
//  */
// export async function getDeviceToken() {
//   try {
//     const token = await messaging().getToken();
//     return token;
//   } catch (e) {
//     console.error('Failed to get FCM token', e);
//     return null;
//   }
// }

// /**
//  * Listen for foreground push notifications
//  * Pass a callback to handle the message
//  */
// export function onForegroundNotification(callback) {
//   return messaging().onMessage(async remoteMessage => {
//     callback(remoteMessage);
//   });
// }

// /**
//  * Set up background message handler
//  * Should be called in index.js (not inside a component)
//  */
// export function setBackgroundMessageHandler(handler) {
//   messaging().setBackgroundMessageHandler(async remoteMessage => {
//     handler(remoteMessage);
//   });
// }

// /**
//  * Listen for notification opened events (when user taps notification)
//  * Pass a callback to handle the event
//  */
// export function onNotificationOpenedApp(callback) {
//   // When the app is in background and opened by a notification
//   messaging().onNotificationOpenedApp(callback);
//   // When the app is opened from a quit state
//   messaging()
//     .getInitialNotification()
//     .then(remoteMessage => {
//       if (remoteMessage) {
//         callback(remoteMessage);
//       }
//     });
// }

// /**
//  * Example: Show an alert for a foreground notification
//  */
// export function showAlertForNotification(remoteMessage) {
//   Alert.alert(
//     remoteMessage.notification?.title || 'Notification',
//     remoteMessage.notification?.body || JSON.stringify(remoteMessage)
//   );
// }

// // Usage example (in App.js or a hook):
// // import { requestUserPermission, getDeviceToken, onForegroundNotification, setBackgroundMessageHandler, onNotificationOpenedApp } from '@utils/firebase.config';
// //
// // useEffect(() => {
// //   requestUserPermission().then(granted => {
// //     if (granted) getDeviceToken().then(token => console.log('FCM Token:', token));
// //   });
// //   const unsubscribe = onForegroundNotification(msg => showAlertForNotification(msg));
// //   setBackgroundMessageHandler(msg => console.log('Background message:', msg));
// //   onNotificationOpenedApp(msg => console.log('Notification opened:', msg));
// //   return unsubscribe;
// // }, []); 