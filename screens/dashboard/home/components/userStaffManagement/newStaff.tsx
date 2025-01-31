import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, BackHandler, Share, Switch } from "react-native";
import { ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import AppStyles from "../../../../../includes/styles";
import BaseInput from "../../../../../components/baseInput";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import { navigationRef } from "../../../../../App";
import { BtnNavProp } from "../menuComponents";
import BaseSelect from "../../../../../components/baseSelect";
import BaseButton from "../../../../../components/baseButton";
import { ReturnAllNumbers, ReturnComma } from "../../../../../includes/functions";
const FormSchema = y.object({
    fullName:y.string().required('Staff name is required.'),
    email:y.string().required('Staff email is required.').email('A valid email is required.'),
    role:y.string().required('Select staff role.')
});
import styled from "styled-components/native";
import { tabs } from ".";

const NewStaffComponent = ({route,goBack,onSuccess}: ScreenComponentType) => {
const handleBack = ()=>{
    if(goBack)
    {
    goBack();
    }
    return true;
}
    useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress",handleBack);
    return ()=>{
    BackHandler.removeEventListener("hardwareBackPress",handleBack);
    }
    },[])
return <Formik
initialValues={{
  fullName:"",
  email:"",
  role:"",
}}
onSubmit={(values:FormikValues, actions:any) => {
    if(onSuccess)
   {
    const data = values;
    data.fullName = String(data.fullName).trim();
    data.email = String(data.email).toLowerCase().trim();
    data.role = String(data.role).toLowerCase().trim();
    onSuccess({data:data});
   }
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{backgroundColor:"rgba(242, 242, 242, 1)",flexDirection:"column",paddingVertical:16,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{paddingHorizontal:16}}>
<BaseInput 
 type="default"
 label="Staff Name"
 placeholder="John Doe"
 value={values.fullName}
 onChange={(data)=>{
    setFieldValue("fullName",data)
 }}
 max={12}
 errorMessage={touched.fullName && errors.fullName}
 />
 <BaseSelect 
 style={{marginTop:-5}}
 label="Select Role"
 placeholder="Please Select"
 list={tabs.filter((a,i)=>i !== 0).map((a,i)=>{
    return {title:a,value:a}
})}
 onChange={(data)=>{
    setFieldValue("role",data.value)
 }}
 type="custom"
 errorMessage={touched.role && errors.role}
 />
 <BaseInput 
 type="email-address"
 label="Staff Email"
 placeholder="John Doe"
 value={values.email}
 onChange={(data)=>{
    setFieldValue("email",data)
 }}
 max={100}
 errorMessage={touched.email && errors.email}
 />
 <BaseButton 
 title="Invite Staff"
 onPress={handleSubmit}
 />
</View>
</View>)}
 </Formik>
}
export default NewStaffComponent;

const Text1 = styled.Text`
color: rgba(123, 127, 153, 0.50);
text-align: center;
font-family: ${FONTFAMILY.INTER.semiBold};
font-size: 12px;
font-style: normal;
font-weight: 600;
`;
export const ItemView = styled.TouchableOpacity`
border-radius: 12px;
background: #FFF;
display: flex;
height: 72px;
padding: 16px 12px;
justify-content: space-between;
align-items: center;
flex-direction:row;
`;
