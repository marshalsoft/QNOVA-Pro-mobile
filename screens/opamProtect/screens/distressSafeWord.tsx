import React, { RefObject, useEffect, useRef } from "react"
import Svg, { Path } from "react-native-svg"
import { Text, TouchableOpacity, View } from "react-native";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../includes/constants";
import { useState } from "react";
import styled from "styled-components/native";
import { connect, useDispatch } from "react-redux";
import AppContainer from "../../../components/appContainer";
import { ItemProps, ScreenComponentType } from "../../../includes/types";
import { navigationRef } from "../../../App";
import BaseButton from "../../../components/baseButton";
import Card from "../../../components/card";
import useHttp, { OpamProtectAddEmergencyContactProps } from "../../../includes/http.hooks";
import { BaseModalLoader } from "../../../components/baseLoader";
import DeactivateAccountModal from "../modals/deactivateAccount";
import { Formik, FormikValues } from "formik";
import { GreenCheckIcon, UnCheckedIcon } from "./nextOfKin";
import * as y  from 'yup';
import BaseInput from "../../../components/baseInput";
import BaseInputMobile from "../../../components/baseInputMobile";
import TitleComponent from "../../../components/svgs/titleComponent";
import Animated,{ useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";
import SafeWordScreen from "../components/safeWord";
import BaseSelect from "../../../components/baseSelect";
import { NavigatePop } from "../../../includes/useNavigation";
const FormSchema = y.object({
  name:y.string().required('Fullname is required.'),
  relationShip:y.string().required('Relationship is required.'),
  phoneNumber:y.string().required('PhoneNumber is required.'),
  email:y.string().required('Email address is required.').email("A valid email is required."),
  address_line1:y.string().required('Address is required.'),
  gender:y.string().required('Gender is required.'),
});
interface listOfChannelsProps {
title:string;
selected:boolean;
value?:"SMS"|"EMAIL"|"PHONE_NUMBER";
}

const OpamProtectSafeWordScreen = ({ route, goBack, Reducer, onSuccess }: ScreenComponentType) => {
  
  const {ShowMessage,loading,OpamProtectAddEmergencyContact,OpamProtectGetUser,OpamProtectUpdateEmergencyContact} = useHttp();
  
  useEffect(()=>{
    
  },[])
  
  return <AppContainer
  showNavBar
  white
  goBack={()=>{
  navigationRef.current?.goBack()
  }}
  >
<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20,gap:8}}>
<View style={{flexDirection:"column"}}>
<TitleText  >Create Safe word</TitleText>
 <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:10}}>Choose a safe word to use in time of distress</Text>
</View>
<SafeWordScreen 
goBack={()=>{}}
Reducer={Reducer!}
/>
</View>
{loading && <BaseModalLoader modal />}
</AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(OpamProtectSafeWordScreen);

const TitleText = styled.Text`
color: ${COLOURS.black};
text-align: center;
font-family: ${FONTFAMILY.INTER.bold};
font-size: 20px;
font-weight: 600;
`;
const SubTitleText = styled.Text`
color: #7B7F99;
text-align: center;
font-family: ${FONTFAMILY.INTER.normal};
font-size: 14px;
font-weight: 500;
`;