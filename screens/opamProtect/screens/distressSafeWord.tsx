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
  const dispatch = useDispatch();
  const listOfTitle:string[] = [
    "Distress Contact Info.",
    "Emergency - Preferred Contact Method",
    "Distress Contact Preference",
    "Create Safe word",
  ]
  const listOfSubTitle:string[] = [
    "Safeguarding Your Account: Give us important details for emergency",
    "Safeguarding Your Account: Give us important details for emergency",
    "Choose a preference that serves you best",
    "Choose a safe word to use in time of distress"
  ]
  const {ShowMessage,loading,OpamProtectAddEmergencyContact,OpamProtectGetUser,OpamProtectUpdateEmergencyContact} = useHttp();
  const [dailCode,setDailCode] = useState<string>("");
  const thisViewContainer = useRef() as RefObject<View>
  const [saveData,setSaveData] = useState<OpamProtectAddEmergencyContactProps>({
    email:"",
    full_name:"",
    phone_number:"",
    preferred_contact_method:"SMS",
    relationship:"",
    address_line1:"",
    gender:"male"
  });
  useEffect(()=>{
    
  },[])
  
  const [switchPIN,setSwitchPIN] = useState<boolean>(false);
  const [selectedTab,setSelectedTab] = useState<number>(0);
  const [listOfChannels,setListOfChannel] = useState<listOfChannelsProps[]>([
    {title:"Phone Call",selected:true,value:"PHONE_NUMBER"},
    {title:"Whatsapp",selected:false,value:"SMS"},
    {title:"Email",selected:false,value:"EMAIL"}
  ])
  const [listOfPreference,setListOfPreference] = useState<listOfChannelsProps[]>([
    {title:"Contact bank to freeze account",selected:true},
    {title:"Contact Emergency Contact",selected:false},
    {title:"Send live location to relevant authorities.",selected:false}
  ])
  const position = useSharedValue(0);
  const animateWidth = useSharedValue(0);
  const handleNext = ()=>{
    HandleAnimation(2)
  }
  const HandleAnimation = (index:number)=>{
    setSelectedTab(index)
    position.value = withTiming(-(DEVICE.width * index),{duration:100})
    animateWidth.value = withTiming(((index + 1) * (100/4)),{duration:100})
  } 
  const AnimStyle = useAnimatedStyle(()=>{
    return {
    left:position.value,
    position:"absolute",
    top:0
    }
  })
  const HandleSubmitForm = ()=>{
    const preferred = listOfPreference.filter((a,i)=>a.selected).map((a,i)=>a.title).join(", ")
    OpamProtectAddEmergencyContact({
      email:String(saveData.email).trim(),
      full_name:saveData.full_name,
      phone_number:String(saveData.phone_number).trim(),
      relationship:saveData.relationship,
      preferred_contact_method:"SMS",
      address_line1:saveData.address_line1,
      gender:saveData.gender,
      emergency_contact_priority:1
    }).then((res)=>{
      if(res.status === "success" && res.statusCode === 200)
      {
        dispatch({type:"update",payload:{
        creationOfDistressPin:true,
        creationOfNextOfKin:true,
        creationOfEmergencyPreference:true
      }})
      // NavigatePop(2);
      navigationRef.current?.goBack()
      }
    })
  }

  useEffect(()=>{
    if(route?.params?.goto)
      {
      return HandleAnimation(parseInt(route?.params?.goto))
      }
  },[route])
  const AnimatedProgress =  useAnimatedStyle(()=>{
    return {
        height:2,
        backgroundColor:"#8B1D41",
        width:`${animateWidth.value}%`
    }
})
  return <AppContainer
  showNavBar
  white
  goBack={()=>{
        if(selectedTab !== 0)
        {
            HandleAnimation(selectedTab - 1)
        }else{
        navigationRef.current?.goBack()
        }
  }}
  >
<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20,gap:8}}>
<View style={{flexDirection:"column"}}>
<TitleText  >Create Safe word</TitleText>
 <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:10}}>Choose a safe word to use in time of distress</Text>
</View>
<SafeWordScreen 
goBack={()=>{}}
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