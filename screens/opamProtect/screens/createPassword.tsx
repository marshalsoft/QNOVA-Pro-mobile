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
import { navigationRef } from "../../../App";
import { useDispatch } from "react-redux";
interface PINScreenProp {
  onValue:(otp:string)=>void;
  status:"pin"|"confirm";
  goBack:()=>void;
  data?:any;
  subTitle?:string;
  title?:string;
  params?:boolean;
}
const OpamProtectCreatePassword = ({onValue,params,status,goBack,title,subTitle}:PINScreenProp)=>{
 const thisForm = useRef() as RefObject<FormikProps<FormikValues>>
 const dispatch = useDispatch();
 useEffect(()=>{
  // dispatch({
  //   type: "update", payload: {
  //     creationOfDistressPin: true
  //   }})
 },[])
    return <AppContainer
    showNavBar
    white
    goBack={() => {
        navigationRef.current?.goBack()
    }}
>
  <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <View style={{flexDirection:"column"}}>
<TitleText  >{"Create your"} <Text style={{color:COLOURS.purple,paddingTop:15}}>OPAM Protect</Text> Distress Password</TitleText>
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>Your Account's First Line of Defense: Choose a Strong PIN</Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
     <Formik
     innerRef={thisForm}
initialValues={{
  password:""
}}
onSubmit={(values:FormikValues, actions:any) => {
 navigationRef.current?.navigate(ROUTES.opamProtectConfirmPasswordScreen,{password:values.password})
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
    placeholder={"Enter your password"}
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
 </AppContainer>
}
export default OpamProtectCreatePassword;

const TitleText = styled.Text`
color: ${COLOURS.black};
text-align: center;
font-family: ${FONTFAMILY.INTER.bold};
font-size: 18px;
font-weight: 600;
`;
