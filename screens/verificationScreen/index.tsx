import { ScrollView, Text, StyleSheet, View, TouchableOpacity } from "react-native";
import { ScreenComponentType } from "../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, passwordRules, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../includes/constants";
import { useState } from "react";
import AppContainer from "../../components/appContainer";
import AppStyles from "../../includes/styles";
import BaseInput from "../../components/baseInput";
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import CaretDownIcon from "../../components/svgs/caretDown";
import BaseButton from "../../components/baseButton";
import { ReturnMobile } from "../../includes/functions";
import BaseInputMobile from "../../components/baseInputMobile";
import useHttp from "../../includes/http.hooks";
import { navigationRef } from "../../App";
import { BaseModalLoader } from "../../components/baseLoader";
import { getUniqueId, getManufacturer,getBundleId } from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import AsyncStorage from "@react-native-async-storage/async-storage";
const FormSchemaEmail = y.object({
    // email:y.string().required('Please enter your email address.').email('A valid email address is required.').max(100)
    data:y.string().required('Required email or phone number.').max(100),
    password:y.string().required('New password is required.').required('A strong password is required').matches(passwordRules, { message: 'Please create a stronger password.'}),
    confirmPassword:y.string().oneOf([y.ref('password')], 'Passwords must match')
});

const VerificationScreen = ({ }: ScreenComponentType) => {
   const {VerifyMobileNumber,VerifyEmail,loading,ShowMessage} = useHttp()
   function checkEmailOrMobile(data:string) {
    // Regular expression for a basic email pattern
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Regular expression for a basic mobile number pattern (assuming a 10-digit number)
    const mobileRegex = /^[0-9]{10}$/;
    if (emailRegex.test(data)) {
      return 'email';
    } else if (mobileRegex.test(data)) {
      return 'mobile';
    } else {
      return 'data';
    }
  }
  
   return <AppContainer
    showNavBar
    goBack={()=>{
        navigationRef.current?.reset({
            index:0,
            routes:[
                {name:ROUTES.introScreen}
            ]
        })
    }}
    disableScrol
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <ScrollView 
    keyboardShouldPersistTaps="always"
    >
    <View style={{flexDirection:"column",paddingHorizontal:16}}>
    <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.medium}}>Let's get started</Text>
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:14,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,width:"80%"}}>Please provide your phone number or email address.</Text>
    <Formik 
    initialValues={{
      data:"",
      code:"",
      password:"",
      confirmPassword:""
    }}
    onSubmit={(values:FormikValues, actions:any) => {
      publicIP().then(ip => { 
        getUniqueId().then((uId)=>{
          getManufacturer().then((manufacturer)=>{
        const data = {
          password:values.confirmPassword,
          deviceId:uId,
          deviceName:manufacturer,
          ipAddress:ip,
          playerId:getBundleId(),
          location:"-"
          }
        AsyncStorage.setItem("password",values.confirmPassword);
        if(checkEmailOrMobile(values.data) == "email"){
        VerifyEmail({
          keyContactIdentity:{
            type:"email",
            email:String(values.data).toLowerCase().trim(),
            password:values.confirmPassword
          },
          ...data
        }).then((res)=>{
           if(res.status === "success" && res.statusCode == 200)
           {
            navigationRef.current?.navigate(ROUTES.otpScreen,{
                type: "email",
                email:String(values.data).toLowerCase().trim()
          });
        }
    });
    }
    if(checkEmailOrMobile(values.data) == "mobile"){
        if(String(values.code) == "")
            {
                ShowMessage().fail("Select country code")
                return;
            }
        if(String(values.data).length !== 10)
        {
            ShowMessage().fail("Invalid phone number")
            return;
        }
        VerifyMobileNumber({
          keyContactIdentity:{
                type:"phone",
                phone:values.code+parseInt(values.data),
                password:values.confirmPassword
            },...data}).then((res)=>{
            if(res.errorCode === "USER_ALREADY_EXISTS" || res.message.includes("cannot"))
          {
              navigationRef.current?.reset({
                  index:0,
                  routes:[{
                      name:ROUTES.loginScreen
                  }]
                  })  
          }else  if(res.status === "success" && res.statusCode == 200)
          {
              navigationRef.current?.navigate(ROUTES.otpScreen,{
              type: "phone",
              phone:values.code+parseInt(values.phoneNumber)
              })
          }
          });
    }
  })
})
})
    }}
    validationSchema={FormSchemaEmail}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
    <View style={{flexDirection:"column",marginTop:16}} >
        {checkEmailOrMobile(values.data) == "mobile"?<BaseInputMobile
        placeholder="801 234 5678"
        style={{marginBottom:5}}
        onValueChange={(d)=>{
          setFieldValue("data",d);
        }}
        focus={checkEmailOrMobile(values.data) == "mobile"}
        onCode={(code)=>{
            setFieldValue("code",code);
        }}
        label='Phone Number'
        value={ReturnMobile(values.data!)}
        errorMessage={touched.data && errors.data}
        />:<BaseInput
        autoCapitalize="none"
        style={{marginBottom:5}}
        focus={checkEmailOrMobile(values.data) == "email"}
        value={values.data}
        type={checkEmailOrMobile(values.data) == "mobile"?'mobile':'email-address'}
        onChange={(d)=>{
          setFieldValue("data",d);
        }}
        label='Enter email or phone number'
        placeholder='Email or Phone number'
        max={checkEmailOrMobile(values.data) == "mobile"?10:50}
        errorMessage={touched.data && errors.data}
        />}
        <BaseInput
        style={{marginBottom:5}}
        value={values.password}
        type={'visible-password'}
        onChange={(d)=>{
          setFieldValue("password",d);
        }}
        label='Enter your password'
        placeholder='Enter your password'
        max={50}
        errorMessage={touched.password && errors.password}
        />
        <BaseInput
        style={{marginBottom:5}}
        value={values.confirmPassword}
        type={'visible-password'}
        onChange={(d)=>{
          setFieldValue("confirmPassword",d);
        }}
        label='Confirm your password'
        placeholder='Confirm your password'
        max={50}
        errorMessage={touched.confirmPassword && errors.confirmPassword}
        />
        <BaseButton
        title="Continue"
        onPress={handleSubmit}
        />
    </View>)}
    </Formik>
       <View style={{flexDirection:"row",justifyContent:'center',alignItems:'center',paddingHorizontal:20,flexWrap:"wrap",marginVertical:20}} >
        <Text style={{fontSize:12,color:COLOURS.gray64,fontFamily:FONTFAMILY.INTER.normal}}>By tapping “Continue, you agree to QNOVA PRO's </Text>
        <TouchableOpacity 
        onPress={()=>navigationRef.current?.navigate(ROUTES.policyScreen)}
        >
        <Text  style={{fontSize:12,color:COLOURS.purple,fontFamily:FONTFAMILY.INTER.normal}}>Terms & Conditions</Text> 
        </TouchableOpacity> 
        <Text  style={{fontSize:12,color:COLOURS.gray64,fontFamily:FONTFAMILY.INTER.normal}}> and </Text>  
        <TouchableOpacity 
                onPress={()=>navigationRef.current?.navigate(ROUTES.policyScreen)}
                >
        <Text  style={{fontSize:12,color:COLOURS.purple,fontFamily:FONTFAMILY.INTER.normal}}>Privacy Policy</Text>  
        </TouchableOpacity>
       </View>
       <TouchableOpacity
        style={{alignSelf:"center",marginVertical:20}} 
        onPress={()=>navigationRef.current?.navigate(ROUTES.loginScreen)}
         >
        <Text  style={{fontSize:12,color:COLOURS.purple,fontFamily:FONTFAMILY.INTER.normal}}>Already have an account?</Text>  
     </TouchableOpacity>
     </View>
     </ScrollView>
     </View>
     {loading && <BaseModalLoader />}
    </AppContainer>
}
export default VerificationScreen;

const Style = StyleSheet.create({
    dot:{
        width:8,
        height:8,
        borderRadius:10,
        backgroundColor:COLOURS.gray64
    }
})