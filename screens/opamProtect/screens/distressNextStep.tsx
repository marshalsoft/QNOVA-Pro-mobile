import React, { } from "react"
import Svg, { Path } from "react-native-svg"
import { Text, TouchableOpacity, View } from "react-native";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../includes/constants";
import { useState } from "react";
import styled from "styled-components/native";
import { connect } from "react-redux";
import AppContainer from "../../../components/appContainer";
import { ItemProps, ScreenComponentType } from "../../../includes/types";
import { navigationRef } from "../../../App";
import BaseButton from "../../../components/baseButton";
import Card from "../../../components/card";
import useHttp, { OpamProtectAddEmergencyContactProps } from "../../../includes/http.hooks";
import { BaseModalLoader } from "../../../components/baseLoader";
import DeactivateAccountModal from "../modals/deactivateAccount";
import { TitleText } from "../../settings";
import { Formik, FormikValues } from "formik";
import { SubTitleText } from "./nextOfKin";
import * as y  from 'yup';
import BaseInput from "../../../components/baseInput";
import BaseInputMobile from "../../../components/baseInputMobile";
const FormSchema = y.object({
  name:y.string().required('Fullname is required.'),
  relationShip:y.string().required('Relationship is required.'),
  phoneNumber:y.string().required('PhoneNumber is required.'),
  email:y.string().required('Email address is required.').email("A valid email is required."),
});
interface listOfChannelsProps {
title:string;
selected:boolean;
}

const OpamProtectDistressNextStepScreen = ({ route, goBack, Reducer, onSuccess }: ScreenComponentType) => {
  const {ShowMessage,loading,OpamProtectAddEmergencyContact,OpamProtectGetUser,OpamProtectUpdateEmergencyContact} = useHttp();
  const [dailCode,setDailCode] = useState<string>("");
  const [saveData,setSaveData] = useState<OpamProtectAddEmergencyContactProps>({
    email:"",
    full_name:"",
    phone_number:"",
    preferred_contact_method:"SMS",
    relationship:""
  });
  const [switchPIN,setSwitchPIN] = useState<boolean>(false);
  const [selectedTab,setSelectedTab] = useState<number>(0);
  return <AppContainer
  showNavBar
  white
  goBack={()=>{
      navigationRef.current?.goBack()
  }}
  >
<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:24,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20,gap:8}}>
<View >
<View style={{paddingHorizontal:24,flexDirection:"column"}} >
<TitleText  >Distress Contact Info.</TitleText>
<SubTitleText>Safeguarding Your Account: Give us important details for emergency</SubTitleText>
</View>
<View style={{flexDirection:"row",height:DEVICE.height - 150}} >
<View style={{width:DEVICE.width}}>
<Formik
initialValues={{
name:"",
relationShip:"",
phoneNumber:"",
email:""
}}
onSubmit={(values:FormikValues, actions:any) => {
if(!ValidateNigerianMobile.test("0"+values.phoneNumber))
  {
  return ShowMessage("top").fail("A valid phone number is require.")
  }
setSaveData({
  full_name:values.name,
  relationship:values.relationShip,
  phone_number:"+"+dailCode+values.phoneNumber,
  email:values.email,
  preferred_contact_method:"SMS"
});
OpamProtectUpdateEmergencyContact({
  full_name:values.name,
  relationship:values.relationShip,
  phone_number:"+"+dailCode+values.phoneNumber,
  email:values.email
})
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{flexDirection:"column",alignItems:"center",paddingHorizontal:24}}>
<View style={{width:"100%"}}>
<BaseInput 
max={30}
placeholder="Enter full name"
type="default"
value={values.name}
onChange={(d)=>{
  setFieldValue("name",d)
   }}
errorMessage={touched.name && errors.name}
label="Full Name"
/>
</View>
<View style={{width:"100%"}}>
<BaseInput
placeholder="e.g brother"
max={50}
value={values.relationShip}
onChange={(d)=>{
  setFieldValue("relationShip",d)
   }}
errorMessage={touched.relationShip && errors.relationShip}
label="Nature of Relationships"
/>
</View>
<View style={{width:"100%"}}>
<BaseInputMobile 
value={values.phoneNumber}
onCode={(code)=>{
setDailCode(code)
}}
placeholder="08000000000"
onValueChange={(d)=>{
setFieldValue("phoneNumber",d)
}}
errorMessage={touched.phoneNumber && errors.phoneNumber}
label="Phone Number"
/>
</View>
<View style={{width:"100%"}}>
<BaseInput 
max={100}
autoCapitalize="none"
placeholder="Enter email address"
type="email-address"
value={values.email}
onChange={(d)=>{
setFieldValue("email",d)
}}
errorMessage={touched.email && errors.email}
label="Email"
/>
</View>
<BaseButton 
onPress={handleSubmit}
title="Continue"
/>
</View>)}
</Formik>
</View>
</View>
</View>
</View>
{loading && <BaseModalLoader modal />}
</AppContainer>
}
const MapStateToProps = (state: any) => {
  return state;
};
export default connect(MapStateToProps)(OpamProtectDistressNextStepScreen);
