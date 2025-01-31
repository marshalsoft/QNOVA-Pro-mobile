import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { ScreenComponentType } from "../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, passwordRules, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../components/appContainer";
import AppStyles from "../../../includes/styles";
import BaseInput from "../../../components/baseInput";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
const FormSchema = y.object({
  password:y.string().min(8,"Password must be minimum of 8 characters.").matches(passwordRules,"Password must contain at least 8 characters, one uppercase, one number and one special case character").required('Password is required.'),
});
import Svg, { Path } from "react-native-svg"
import styled from "styled-components/native";
import BaseButton from "../../../components/baseButton";
interface PINScreenProp {
  onValue:(otp:string)=>void;
  status:"pin"|"confirm";
  goBack:()=>void;
  data?:any;
  subTitle?:string;
  title?:string;
  params?:boolean;
}
const PasswordScreen = ({onValue,params,status,goBack,title,subTitle}:PINScreenProp)=>{
 const thisForm = useRef() as RefObject<FormikProps<FormikValues>>
  useEffect(()=>{
    if(status === "confirm")
    {
    thisForm.current?.resetForm();
    }
 },[status])
    return <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <View style={{flexDirection:"column"}}>
    {params?<TitleText  >{status === "pin"?"Create new":"Confirm new"} <Text style={{color:COLOURS.purple,paddingTop:15}}>OPAM Protect</Text> Distress Password</TitleText>:<TitleText  >{status === "pin"?"Create your":"Confirm your"} <Text style={{color:COLOURS.purple,paddingTop:15}}>OPAM Protect</Text> Distress Password</TitleText>}
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>{subTitle}</Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
     <Formik
     innerRef={thisForm}
initialValues={{
  password:""
}}
onSubmit={(values:FormikValues, actions:any) => {
  onValue(values.password);
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginVertical:10}}>
    <View style={{width:"100%"}}>
   <BaseInput
    type='visible-password'
    onChange={handleChange("password")}
    label='Enter Password'
    placeholder={status === "pin"?"Enter your password":"Comfirm your password"}
    max={30}
    value={values.password}
    errorMessage={errors.password}
    />
    </View>
    </View>
  <BaseButton 
  onPress={handleSubmit}
  title="Continue"
  />
    </View>)}
    </Formik>
     </View>
     </View>
}
export default PasswordScreen;

const Styles = StyleSheet.create({
   
})
const TitleText = styled.Text`
color: ${COLOURS.black};
text-align: center;
font-family: ${FONTFAMILY.INTER.bold};
font-size: 18px;
font-weight: 600;
`;
const XIcon = ()=> {
    return (
      <Svg
        width={37}
        height={37}
        viewBox="0 0 37 37"
        fill="none"
      >
        <Path
          d="M16.372 13.455c.439-.44 1.151-.44 1.59 0l3.705 3.704 3.704-3.704a1.125 1.125 0 111.591 1.59l-3.704 3.705 3.704 3.705a1.125 1.125 0 01-1.59 1.59l-3.705-3.704-3.705 3.705a1.125 1.125 0 01-1.59-1.591l3.704-3.705-3.704-3.704a1.125 1.125 0 010-1.591z"
          fill="#000"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M13.276 8.175a5.625 5.625 0 00-4.424 2.151L3.51 17.13a2.625 2.625 0 000 3.242l5.342 6.803a5.625 5.625 0 004.424 2.151h15.97A4.125 4.125 0 0033.37 25.2V12.3a4.125 4.125 0 00-4.125-4.125h-15.97zm-2.655 3.54a3.375 3.375 0 012.655-1.29h15.97c1.036 0 1.875.84 1.875 1.875v12.9c0 1.036-.84 1.875-1.875 1.875h-15.97a3.375 3.375 0 01-2.655-1.29L5.28 18.982a.375.375 0 010-.463l5.342-6.803z"
          fill="#000"
        />
      </Svg>
    )
  }