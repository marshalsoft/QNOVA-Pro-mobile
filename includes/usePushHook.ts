import notifee, { AuthorizationStatus } from '@notifee/react-native';
import Moment from 'moment';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';
import {PERMISSIONS,request} from "react-native-permissions"
import { Platform } from 'react-native';
import { LOCALSTORAGE } from './constants';
// Note that an async function or a function that returns a Promise 
// is required for both subscribers.

export const usePushNotificationHook = () => {
  const GetPermission = ()=>{
 return new Promise((resolve)=>{
  AsyncStorage.getItem(LOCALSTORAGE.fcmToken).then((fcmToken)=>{
  if(fcmToken)
  {
    resolve(fcmToken);
  }else{
 messaging().registerDeviceForRemoteMessages();
 messaging().getToken().then((fcmToken)=>{
  AsyncStorage.setItem(LOCALSTORAGE.fcmToken,fcmToken);
  resolve(fcmToken);
});
  }
});
})
}
useEffect(()=>{
  notifee.setBadgeCount(100).then(() => console.log("Badge count set!"));
},[])
return {
    GetPermission
}
};
messaging().onMessage(({notification,data}) => {
  const remoteNotification:any = notification;
  const remoteData:any = data;
  LocalNotification(remoteData);
});
// messaging().setBackgroundMessageHandler(({data}) => {
//   const remoteNotification:any = notification;
//   const remoteData:any = data;
//   LocalNotification(remoteData);
// });

export interface PushNotificationMessageProps {
title:string;
body:string;
data?:object;
}
var channel_Id = "QnovaPro";
const LocalNotification = async(props:PushNotificationMessageProps)=>{
  if(await CheckPushNotificationPermission())
      {
        const channelId = await notifee.createChannel({
          id: channel_Id,
          name: 'Qnova-pro notification Channel',
        });
        await notifee.displayNotification({
        title:props.title,
        body: props.body,
        android: {
          channelId,
          pressAction: {
            id: 'default',
          },
        },
      });
      }
}
export default LocalNotification;
export const CheckPushNotificationPermission = async()=>{
  const settings = await notifee.requestPermission({
    sound: true,
    badge:true,
    alert:true,
    announcement: true
  });
  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    return true;
  } else {
    return false
  }
}
export const GetNotificationExistingSettings = async()=> {
  const settings = await notifee.getNotificationSettings();
  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    return true;
  } else {
    return false
  }
}
