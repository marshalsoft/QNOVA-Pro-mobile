/* eslint-disable @typescript-eslint/no-unused-vars */

import notifee, { AuthorizationStatus } from '@notifee/react-native';
import Moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCALSTORAGE } from './constants';
import { useEffect } from 'react';
import {PERMISSIONS,request} from "react-native-permissions"

export interface PushNotificationMessageProps {
  title:string;
  body:string;
  data?:object;
  }
var channel_Id = Moment().format("hhmmss");
export const usePushNotificationHook = () => {
  const GetPermission = async()=>{
    await request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
    var fcmToken = await AsyncStorage.getItem(LOCALSTORAGE.fcmToken);
  if(fcmToken)
  {
    return ;
  }
  // AsyncStorage.setItem(LOCALSTORAGE.fcmToken,fcmToken);
  return ;
}
const LocalNotification = async(props:PushNotificationMessageProps)=>{
  if(await CheckPushNotificationPermission())
      {
        const channelId = await notifee.createChannel({
          id: channel_Id,
          name: 'treepz notification Channel',
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
const CheckPushNotificationPermission = async()=>{
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
const GetNotificationExistingSettings = async()=> {
  const settings = await notifee.getNotificationSettings();
  if (settings.authorizationStatus >= AuthorizationStatus.AUTHORIZED) {
    return true;
  } else {
    return false
  }
}
useEffect(()=>{
  GetPermission();
  notifee.setBadgeCount(100).then(() => console.log("Badge count set!"));
  
},[])
return {
  GetNotificationExistingSettings,
  CheckPushNotificationPermission
}
};




