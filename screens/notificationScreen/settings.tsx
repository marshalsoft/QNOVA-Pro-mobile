
import React, { useEffect, useState } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect, useDispatch } from 'react-redux';
import { AllowedProps, NotificationsProps, ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import TopSection from '../../components/topSection';
import Card from '../../components/card';
import { COLOURS, DEVICE, FONTFAMILY, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';
import styled from 'styled-components/native';
import { NormalText, TitleText } from '../settings';
import BaseSwitch from '../../components/baseSwitch';
import { CapitalizeFirstLetter } from '../../includes/functions';

const NotificationSettingsScreen = ({route,Reducer}:ScreenComponentType) => {
const {GetCurrentUserDetails,UpdatePreference} = useHttp();
const dispatch = useDispatch();
const [itemIndex,setItemIndex] = useState<string | null>(null)
const GetUser = ()=>{
  GetCurrentUserDetails().then((res)=>{
    if(res.status && res.data?.preferences)
      {
       dispatch({ type: "update", payload:{
        preferences:res.data?.preferences
       }});
      }
  })
}
const HandleSettings = (parentIndex:number,childIndex:number,allowedParams:AllowedProps)=>{
  if(itemIndex === null)
  {
  setItemIndex(`${parentIndex}${childIndex}`);
  const notifications:NotificationsProps[] = [];
  console.log("preferences:",JSON.stringify(allowedParams));
  Reducer?.preferences?.notifications?.forEach((a:NotificationsProps,inx:number)=>{
    var allowed:AllowedProps[] = [];
     a.allowed?.forEach((b,i)=>{
      if(inx == parentIndex)
        {
          if(i == childIndex)
          {
            allowed.push(allowedParams);
            console.log("allowed2:",JSON.stringify(allowedParams));
          }else{
            allowed.push(b);
          }
        }else{
          allowed.push(b);
        }
    })
    notifications.push({
      ...a,
      allowed:allowed
    })
    dispatch({ type: "update", payload:{preferences:{
      notifications:notifications
    }}});
  UpdatePreference({
    language:Reducer.language,
    notifications:notifications,
    theme:Reducer?.theme,
    enableBiometrics:Reducer.isBiometricsEnabled
  }).then((res)=>{
    setItemIndex(null);
  if(res.status)
  {
  
}
})
});
  }
}
useEffect(()=>{
  GetUser(); 
  // alert (JSON.stringify(Reducer.n))
},[])
    return <AppContainer 
    showNavBar={true}
    goBack={()=>{
    navigationRef.current?.goBack() 
    }}
    disableScrol
    title="Notifications"
    white
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    {/* <Text>{JSON.stringify(Reducer?.preferences)}</Text> */}
    <ScrollView
    nestedScrollEnabled
    showsVerticalScrollIndicator={false}
    >
    <View style={{flexDirection:"column",gap:30,paddingBottom:180}}>
    {Reducer?.preferences?.notifications?Reducer?.preferences?.notifications?.map((item:NotificationsProps,index:number)=>{
    return <View key={index} style={{flexDirection:"column",gap:20}}>
    <TitleText style={{}}>{CapitalizeFirstLetter(item?.category!)}</TitleText>
    {item.allowed?.map((a,i)=><View key={i} 
      style={{height:40,flexDirection:"row",alignItems:"center",marginTop:-10}}
      >
        <View style={{flex:1}}>
          <NormalText >{CapitalizeFirstLetter(a.type!)}</NormalText>
        </View>
        <View style={{flexDirection:"row",alignItems:"center",gap:5}}>
          {itemIndex === `${index}${i}`?<ActivityIndicator color={COLOURS.purple} size={"small"} />:null}
        <BaseSwitch
        onValueChange={(d)=>{
          var obj:AllowedProps = {type:`${a.type!}`,enabled:d}
          HandleSettings(index,i,obj);
        }}
        value={a.enabled!}
        />
        </View>
     </View>)}
     </View>}):[]}
    </View>
    </ScrollView>
    </View>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
};
export default connect(MapStateToProps)(NotificationSettingsScreen);


  