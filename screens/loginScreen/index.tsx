
import React, { RefObject, useEffect, useRef, useState } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect, useDispatch } from 'react-redux';
import { ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import TopSection from '../../components/topSection';
import Card from '../../components/card';
import { COLOURS, DEVICE, FONTFAMILY, LOCALSTORAGE, NigerianFlag, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';
import { BaseModalLoader } from '../../components/baseLoader';
import BaseInputMobile from '../../components/baseInputMobile';
import { ReturnMobile } from '../../includes/functions';
const FormSchemaEmail = y.object({
  data:y.string().required('This field is required.'),
  password:y.string().required('Password is required.')
});

import { getUniqueId, getManufacturer,getBundleId } from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import SplashScreen from 'react-native-splash-screen';
import {OneSignal}  from 'react-native-onesignal'
import { usePushNotificationHook } from '../../includes/pushNotification';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotificationPermission from '../dashboard/home/components/pushNotificationPermission';
import { ChatIcon } from '../../components/svgs/chatIcon';
import { ChatButton } from '../../components/customerSupport/chat';
import TwoFAComponent from '../../components/twoFA';
  const LoginScreen = ({route}:ScreenComponentType) => {
  const dispatch = useDispatch();
  const [selected,setSelected] = useState<number>(0)
  const [selectedValue,setSelectedValue] = useState<string>("")
  const {UserLogin,LoginWithFTA,ShowMessage,loading} = useHttp();
   const [showPermission,setShowPermission] = useState<boolean>(false);
   useEffect(()=>{
    SplashScreen.hide();
    AsyncStorage.getItem(LOCALSTORAGE.fcmToken).then((res)=>{
      setShowPermission(res === null)
      console.log("fcmToken:",res);
    })
  },[])

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
  useEffect(()=>{
 
  },[])
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
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <ScrollView 
    keyboardShouldPersistTaps="always"
    >
    <View style={{flexDirection:"column",paddingHorizontal:16,minHeight:DEVICE.height}}>
    <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.medium}}>User login</Text>
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:14,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,width:"80%"}}>Please provide your phone number or email address and password to login.</Text>
      <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
      <Formik 
    initialValues={{
      data:"",
      password:"",
      code:""
    }}
    onSubmit={(values:FormikValues, actions:any) => {
     AsyncStorage.getItem(LOCALSTORAGE.fcmToken).then((fcmToken)=>{
      publicIP().then(ip => { 
      getUniqueId().then((uId)=>{
      getManufacturer().then((manufacturer)=>{
        let payload:any = {
          email:String(values.data).toLowerCase().trim(),
          password:values.password,
          deviceName:manufacturer,
          deviceId:uId,
          ipAddress:ip,
          playerId:fcmToken,
          location: "Lagos Nigeria"
        }
        if(checkEmailOrMobile(values.data) == "mobile"){
          delete payload.email;
          payload = {...payload,
            phone:"+"+values.code+parseInt(String(values.data)),
          }
          setSelected(0)
        }else{
        setSelected(1)
        }
     UserLogin(payload).then((res)=>{
     console.log("UserLogin:",res)
     if(res.data?.user){
       dispatch({ type: "update", payload: res.data.user });
        AsyncStorage.setItem(LOCALSTORAGE.userData, JSON.stringify(res.data.user));
        AsyncStorage.setItem(LOCALSTORAGE.accessToken, res.data.tokens.accessToken);
        AsyncStorage.setItem(LOCALSTORAGE.refreshToken, res.data.tokens.refreshToken);
       return navigationRef.current?.navigate(ROUTES.dashboard)
      }
      ShowMessage("top").fail(res.message);
      if(res.data?.is2FaEnabled)
      {
        return setSelectedValue(String(values.data).toLowerCase().trim())
      }
      })
    })
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
        value={values.password}
        type='visible-password'
        onChange={(d)=>{
          setFieldValue("password",d);
        }}
        label='Password'
        placeholder='Enter your password'
        max={30}
        errorMessage={touched.password && errors.password}
        />
        <BaseButton
        title="Continue"
        onPress={handleSubmit}
        />
       
    </View>)}
    </Formik>
    <TouchableOpacity
        style={{alignSelf:"center",marginVertical:20}} 
        onPress={()=>navigationRef.current?.navigate(ROUTES.forgotPassword)}
         >
        <Text  style={{fontSize:12,color:COLOURS.purple,fontFamily:FONTFAMILY.INTER.normal}}>Forgot password</Text>  
     </TouchableOpacity>
     <TouchableOpacity
        style={{alignSelf:"center",marginVertical:20}} 
        onPress={()=>navigationRef.current?.navigate(ROUTES.verificationScreen)}
         >
        <Text  style={{fontSize:12,color:COLOURS.purple,fontFamily:FONTFAMILY.INTER.normal}}>I don't have an account?</Text>  
     </TouchableOpacity>
     </View>
     </ScrollView>
     </View>
     <PushNotificationPermission 
      onClose={()=>{
        setShowPermission(false);
      }}
      onDone={()=>{
        setShowPermission(false);
       }}
      show={showPermission}
      />
      {selectedValue !== "" &&<TwoFAComponent 
      handleLogin={(otp)=>{
            LoginWithFTA(selected === 1?{
                email:selectedValue,
                otp,
                type:'email'
            }:{
                phone:selectedValue,
                otp,
                type:'phone'
            }).then((res)=>{
                if(res.data)
                {
                  setSelectedValue("")
                }
            })
      }}
     onClose={()=>setSelectedValue("")}
     />}
     {loading &&<BaseModalLoader
     />}
    <ChatButton />
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(LoginScreen);
  