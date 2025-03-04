import { Image, Text, StyleSheet, View, TouchableOpacity, ScrollView, DeviceEventEmitter } from "react-native";
import { ItemProps, ScreenComponentType } from "../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, LISTENERS, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../includes/constants";
import { useEffect, useRef, useState } from "react";
import AppContainer from "../../components/appContainer";
import BaseButton from "../../components/baseButton";
import useHttp from "../../includes/http.hooks";
import { navigationRef } from "../../App";
import { getUniqueId, getManufacturer,getBundleId } from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { connect } from "react-redux";
import { useStoreHook } from "../../Redux/reducer";
import { FormProps } from "../signUpScreen/businessDetails";
import { BaseModalLoader } from "../../components/baseLoader";
import PINScreen from "../dashboard/home/components/walletTransfer/pin";

const ResetLoginPINScreen = ({Reducer,route}: ScreenComponentType) => {
  const [switchSection,setSwitchSection] = useState<boolean>(false);
  const [pin,setPin] = useState<string>("");
  const [confirmPin,setConfirmPin] = useState<string>("");
  const {CreateTransationPIN,ShowMessage,loading} = useHttp()
   return <AppContainer
   showNavBar
   white
   goBack={()=>{
     if(switchSection)
     {
       setConfirmPin("");
       return setSwitchSection(false);
     }
     navigationRef.current?.goBack();
   }}
   title={""}
   disableScrol
   >
<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,minHeight:DEVICE.height - 136,borderTopRightRadius:20,borderTopLeftRadius:20}}>
{!switchSection?<PINScreen
title='Reset your login PIN'
subTitle="Please enter your new login PIN"
goBack={()=>{}}
onValue={(pin)=>{
 setPin(pin);
 setSwitchSection(true);
}}
status='pin'
value={pin}
/>:<PINScreen
title='Confirm Transaction PIN'
subTitle="This will be use to complete all your transactions."
goBack={()=>{}}
onValue={(cpin)=>{
 setConfirmPin(cpin);
 if(pin !== cpin)
 {
   return ShowMessage("top").fail("Confirm PIN not match!");
 }
 CreateTransationPIN(pin).then((res)=>{
   if(res.data)
   {
     navigationRef.current?.goBack();
   }
 })
}}
status='pin'
value={" "}
/>}
</View>
{loading && <BaseModalLoader modal/>}
</AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
export default connect(MapStateToProps)(ResetLoginPINScreen);
