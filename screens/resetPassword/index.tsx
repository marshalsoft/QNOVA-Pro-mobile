import * as React from "react"
import { Image, Text, StyleSheet, View, TouchableOpacity, ScrollView, DeviceEventEmitter } from "react-native";
import { ItemProps, ScreenComponentType } from "../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, LISTENERS, passwordRules, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../includes/constants";
import { useEffect, useRef, useState } from "react";
import AppContainer from "../../components/appContainer";
import BaseButton from "../../components/baseButton";
import useHttp from "../../includes/http.hooks";
import { navigationRef } from "../../App";
import { connect } from "react-redux";
import { BaseModalLoader } from "../../components/baseLoader";
import OTPTextView from "react-native-otp-textinput";
import BaseInput from "../../components/baseInput";
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import otp from "../verificationScreen/otp";
import AppStyles from "../../includes/styles";
const FormSchema = y.object({
    otp:y.string().required('OTP is required.').min(6).max(6),
    confirmPassword:y.string().oneOf([y.ref('password')], 'Passwords must match'),
    password:y.string().required('New password is required.').required('A strong password is required').matches(passwordRules, { message: 'Please create a stronger password.'})
});
const ResetPasswordScreen = ({Reducer,route}: ScreenComponentType) => {
  const {ResetPassword,ShowMessage,loading} = useHttp()
   return <AppContainer
   showNavBar
   white
   goBack={()=>{
     navigationRef.current?.goBack();
   }}
   title={""}
   disableScrol
   >
 <Formik 
    initialValues={{
      password:"",
      confirmPassword:"",
      otp:"" 
    }}
    onSubmit={(values:FormikValues, actions:any) => {
     const data = {
      type: "auth-pin",
      channel: "phone",
      phone: Reducer?.phone,
      otp:values.otp,
      password: String(values.confirmPassword).trim()
  }
      ResetPassword(data).then((res)=>{
        if(res.data)
        {
          navigationRef.current?.goBack()
        }
      })
    }}
    validationSchema={FormSchema}
    >
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{backgroundColor:"#F2F2F2",flexDirection:"column",padding:24,minHeight:DEVICE.height - 136,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{flexDirection:"column"}}>
<Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>Reset Password</Text>
<Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:10,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,paddingHorizontal:50}}>Enter OTP and your new password</Text>
<OTPTextView
     inputCount={6}
     handleTextChange={(otp)=>{
      setFieldValue("otp",otp) 
        }}
        textInputStyle={{
          height:50,
          width:40,
          backgroundColor:"white",
          borderRadius:8
        }}
        tintColor={COLOURS.purple}
        containerStyle={{alignSelf:"center"}}
     />
  <Text style={[AppStyles.error,{marginBottom:10,alignSelf:"center"}]} >{touched.otp && errors.otp}</Text>
 <BaseInput 
  type="visible-password"
 label="Password"
 placeholder="Qwerty$123"
 value={values.password}
 onChange={(data)=>{
    setFieldValue("password",String(data).replace(/[ ]/g,''))
 }}
 max={30}
 errorMessage={touched.password && errors.password}
 />
    <BaseInput 
  type="visible-password"
 label="Confirm Password"
 placeholder="**********"
 value={values.confirmPassword}
 onChange={(data)=>{
    setFieldValue("confirmPassword",String(data).replace(/[ ]/g,''))
 }}
 max={30}
 errorMessage={touched.confirmPassword && errors.confirmPassword}
 />
 <BaseButton 
title="Proceed"
onPress={handleSubmit}
 />

</View>
</View>)}
</Formik>
{loading && <BaseModalLoader modal/>}
</AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
export default connect(MapStateToProps)(ResetPasswordScreen);
