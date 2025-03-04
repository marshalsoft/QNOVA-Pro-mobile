
import React, { useEffect, useState } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect } from 'react-redux';
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
  email:y.string().required('Email is required.').email('A valid email address is required.').max(50,"Maximum of 50 characters"),
  password:y.string().required('Password is required.')
});
const FormSchemaPhoneNumber = y.object({
  phoneNumber:y.string().required('Phone number is required.').min(10,"10 digits is required."),
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
  const [selected,setSelected] = useState<number>(0)
  const [selectedValue,setSelectedValue] = useState<string>("")
  const [loading,setLoading] = useState<boolean>(false);
   const {UserLogin} = useHttp();
   const [showPermission,setShowPermission] = useState<boolean>(false);
   useEffect(()=>{
    SplashScreen.hide();
    AsyncStorage.getItem(LOCALSTORAGE.fcmToken).then((res)=>{
      setShowPermission(res === null)
      console.log("fcmToken:",res);
    })
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
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <ScrollView 
    keyboardShouldPersistTaps="always"
    >
    <View style={{flexDirection:"column",paddingHorizontal:16}}>
    <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.medium}}>User login</Text>
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:14,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,width:"80%"}}>Please provide your phone number or email address and password to login.</Text>
      <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
        <View style={{flexDirection:"row",height:50,backgroundColor:"#7B7F991A",borderRadius:16,padding:5}}>
            <TouchableOpacity 
            onPress={()=>setSelected(0)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Phone number</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>setSelected(1)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected !== 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected !== 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Email Address</Text>
            </TouchableOpacity>
        </View>
    {selected === 0?<Formik
          initialValues={{
            phoneNumber:"8161235924",
            password:"Mekene$83",
            code:""
          }}
          onSubmit={(values:FormikValues, actions:any) => {
          setLoading(true);  
          AsyncStorage.getItem(LOCALSTORAGE.fcmToken).then((fcmToken)=>{
            console.log("playerId:",fcmToken," Mb:",values.code+values.phoneNumber);
            publicIP().then(ip => { 
            getUniqueId().then((uId)=>{
            getManufacturer().then((manufacturer)=>{
              UserLogin({
              phone:values.code+values.phoneNumber,
              password:values.password,
              deviceName:manufacturer,
              ipAddress:ip,
              deviceId:uId,
              playerId:fcmToken,
              location: "Lagos Nigeria",
            }).then((res)=>{
              setLoading(false)
              if(res.message.includes("verification") && res.message.includes("code"))
                {
                 setSelectedValue(values.code+values.phoneNumber)
                }
              if(res.data){
                navigationRef.current?.reset({
                  index:0,
                  routes:[
                    {name:ROUTES.dashboard}
                  ]
              })
              }
            })
          })
          })
          })
          })
          }}
        validationSchema={FormSchemaPhoneNumber}
    >
    {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
    <View style={{flexDirection:"column",marginTop:16}} >
        <BaseInputMobile
         style={{marginBottom:0}}
        placeholder="8012345678"
        onValueChange={(d)=>{
          setFieldValue("phoneNumber",d);
        }}
        onCode={(code)=>{
            setFieldValue("code",code);
        }}
        label='Phone   Number'
        value={ReturnMobile(values.phoneNumber!)}
        errorMessage={touched.phoneNumber && errors.phoneNumber}
        />
        <BaseInput
        max={30}
        type='visible-password'
        placeholder="*********"
        onChange={(d)=>{
          setFieldValue("password",d);
        }}
       
        label='Enter your password'
        value={values.password}
        errorMessage={touched.password && errors.password}
        />
        <BaseButton 
        title="Login"
        onPress={handleSubmit}
        />
    </View>)}
    </Formik>:<Formik 
    initialValues={{
      email:"",
      password:"" 
    }}
    onSubmit={(values:FormikValues, actions:any) => {
     setLoading(true);
     AsyncStorage.getItem(LOCALSTORAGE.fcmToken).then((fcmToken)=>{
      console.log("playerId:",fcmToken," Mb:",values.code+values.phoneNumber);
      publicIP().then(ip => { 
      getUniqueId().then((uId)=>{
      getManufacturer().then((manufacturer)=>{
      UserLogin({
        email:String(values.email).toLowerCase().trim(),
        password:values.password,
        deviceName:manufacturer,
        deviceId:uId,
        ipAddress:ip,
        playerId:fcmToken,
        location: "Lagos Nigeria"
      }).then((res)=>{
     setLoading(false);
     if(!res.data)
     {
      setSelectedValue(String(values.email).toLowerCase().trim())
     }else{
          navigationRef.current?.navigate(ROUTES.dashboard)
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
        <BaseInput
        style={{marginBottom:10}}
        autoCapitalize="none"
        value={values.email}
        type='email-address'
        onChange={(d)=>{
          setFieldValue("email",d);
        }}
        label='Email address'
        placeholder='Email address'
        max={50}
        errorMessage={touched.email && errors.email}
        />
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
    </Formik>}
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
     onClose={()=>setSelectedValue("")}
      indentify={selectedValue}
      type={selected === 0?'phone':'email'}
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
  