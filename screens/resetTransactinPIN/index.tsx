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

const ResetTransPINScreen = ({Reducer,route}: ScreenComponentType) => {
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
title='Reset transaction PIN'
subTitle="Please enter new transaction PIN"
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
export default connect(MapStateToProps)(ResetTransPINScreen);


export const KeyContactIdIcon=()=> {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M4 21.817C4.603 22 5.416 22 6.8 22h10.4c1.384 0 2.197 0 2.8-.183m-16 0a2.18 2.18 0 01-.362-.144 3 3 0 01-1.311-1.311C2 19.72 2 18.88 2 17.2V6.8c0-1.68 0-2.52.327-3.162a3 3 0 011.311-1.311C4.28 2 5.12 2 6.8 2h10.4c1.68 0 2.52 0 3.162.327a3 3 0 011.311 1.311C22 4.28 22 5.12 22 6.8v10.4c0 1.68 0 2.52-.327 3.162a3 3 0 01-1.311 1.311 2.18 2.18 0 01-.362.144m-16 0c0-.809.005-1.237.077-1.597a4 4 0 013.143-3.143C7.606 17 8.07 17 9 17h6c.93 0 1.394 0 1.78.077a4 4 0 013.143 3.143c.072.36.077.788.077 1.597M16 9.5a4 4 0 11-8 0 4 4 0 018 0z"
        stroke="#8B1D41"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
export const KeyContactAddressIcon = ()=>{
return  <Svg
width={24}
height={24}
viewBox="0 0 24 24"
fill="none"
>
<Path
  d="M12.982 2.764c-.351-.273-.527-.41-.72-.462a1 1 0 00-.523 0c-.194.052-.37.189-.721.462L4.235 8.039c-.453.353-.68.53-.843.75a2 2 0 00-.318.65C3 9.704 3 9.991 3 10.565V17.8c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C4.52 21 5.08 21 6.2 21h2c.28 0 .42 0 .527-.055a.5.5 0 00.218-.218C9 20.62 9 20.48 9 20.2v-6.6c0-.56 0-.84.109-1.054a1 1 0 01.437-.437C9.76 12 10.04 12 10.6 12h2.8c.56 0 .84 0 1.054.109a1 1 0 01.437.437C15 12.76 15 13.04 15 13.6v6.6c0 .28 0 .42.055.527a.5.5 0 00.218.218c.107.055.247.055.527.055h2c1.12 0 1.68 0 2.108-.218a2 2 0 00.874-.874C21 19.48 21 18.92 21 17.8v-7.235c0-.574 0-.861-.074-1.126a2.002 2.002 0 00-.318-.65c-.163-.22-.39-.397-.843-.75l-6.783-5.275z"
  stroke="#8B1D41"
  strokeWidth={2}
  strokeLinecap="round"
  strokeLinejoin="round"
/>
</Svg>
}

export const CreateTxnPINIcon = ()=>{
    return (<Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
      >
        <Path
          d="M22 11V8.2c0-1.12 0-1.68-.218-2.108a2 2 0 00-.874-.874C20.48 5 19.92 5 18.8 5H5.2c-1.12 0-1.68 0-2.108.218a2 2 0 00-.874.874C2 6.52 2 7.08 2 8.2v3.6c0 1.12 0 1.68.218 2.108a2 2 0 00.874.874C3.52 15 4.08 15 5.2 15H11m1-5h.005M17 10h.005M7 10h.005m12.245 7v-1.75a1.75 1.75 0 10-3.5 0V17m-3.5-7a.25.25 0 11-.5 0 .25.25 0 01.5 0zm5 0a.25.25 0 11-.5 0 .25.25 0 01.5 0zm-10 0a.25.25 0 11-.5 0 .25.25 0 01.5 0zm8.35 11h3.8c.56 0 .84 0 1.054-.109a1 1 0 00.437-.437C21 20.24 21 19.96 21 19.4v-.8c0-.56 0-.84-.109-1.054a1 1 0 00-.437-.437C20.24 17 19.96 17 19.4 17h-3.8c-.56 0-.84 0-1.054.109a1 1 0 00-.437.437C14 17.76 14 18.04 14 18.6v.8c0 .56 0 .84.109 1.054a1 1 0 00.437.437C14.76 21 15.04 21 15.6 21z"
          stroke="#8B1D41"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </Svg>
    )
  }


