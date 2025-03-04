import React, { RefObject, useEffect, useRef } from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert, Image, Keyboard, DeviceEventEmitter } from 'react-native';
import { connect } from 'react-redux';
import {ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import { COLOURS, DEVICE, FONTFAMILY, LISTENERS, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';
import ConfirmDetails from './confirmDetails';
import { useState } from 'react';
import { Formik, FormikProps } from 'formik';
import * as y  from 'yup';
import { MockInput } from '../dashboard/home/components/walletTransfer/preview';
import moment from 'moment';
import Animated, {useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import KeyContactDetailsScreen from './keyContactDetailsScreen';
import UploadDocumentScreen from './uploadDocumentsScreen';
import { BaseModalLoader } from '../../components/baseLoader';
import CreateNewPasswordComponent from './createNewPin';
export interface FormProps {
  cacNumber?:string;
  verified?:boolean,
  affiliates?:string;
  branchAddress?:string;
  city?:string; 
  companyEmail?:string;
  companyName?:string;
  companyType?:string;
  headOfficeAddress?:string;
  lga?:string;
  registrationDate?:string; 
  state?:string; 
  bvn?:string;
  gender?:string;
  dob?:string;
  cacCertificate?:string;
  logo?:string;
  password?:string;
  phoneNumber?:string;
  email?:string;
  pin?:string;
}
const FormSchema = y.object({
  cacNumber:y.string().required('CAC Number is required.')
});
import { getUniqueId, getManufacturer,getBundleId } from 'react-native-device-info';
import publicIP from 'react-native-public-ip';
import SucessScreenComponent from './sucessScreen';
import { ReturnAllNumbers } from '../../includes/functions';

  const BusinessDetailsScreen = ({route,Reducer}:ScreenComponentType) => {
  const {loading,VerifyCACNumber,CreateAccount} = useHttp();
  const [showPassword,setShowPassword] = useState<boolean>(false);
  const [showSuccess,setShowSuccess] = useState<boolean>(false);
  const [successMessage,setSuccessMessage] = useState<string>("");
  const [formData,setFormData] = useState<FormProps>({});
  const thisForm = useRef() as RefObject<FormikProps<FormProps>>;
  const [indexPosition,setIndex] = useState<number>(0);
  const [confirmDetails,setConfirmDetails] = useState<boolean>(false);
  const AnimateView = useSharedValue(0);
  const AnimateViewStyle = useAnimatedStyle(()=>{
    return {
      transform:[
        {translateX:AnimateView.value}
      ]
    }
  })
 
  const HandleNextPage = (position:number)=>{
    AnimateView.value = withTiming(- (DEVICE.width * position),{duration:100})
    setIndex(position)
  }
  const SetFormValues = (props:FormProps)=>{
    setFormData({
      ...formData,
      ...props
    })
  }
  
  useEffect(()=>{
   if(route?.params)
   {
    if(route?.params?.index)
    {
      HandleNextPage(route?.params?.index);
    }
    const formData = route?.params?.formData as FormProps;
    if(formData?.branchAddress)
      {
      thisForm.current?.setFieldValue("cacNumber",formData?.cacNumber);
      thisForm.current?.setFieldValue("verified",true);
      thisForm.current?.setFieldValue("branchAddress",formData.branchAddress);
      thisForm.current?.setFieldValue("city",formData.city);
      thisForm.current?.setFieldValue("companyEmail",formData.companyEmail);
      thisForm.current?.setFieldValue("companyName",formData.companyName);
      thisForm.current?.setFieldValue("companyType",formData.companyType);
      thisForm.current?.setFieldValue("headOfficeAddress",formData.headOfficeAddress);
      thisForm.current?.setFieldValue("lga",formData.lga);
      thisForm.current?.setFieldValue("registrationDate",formData.registrationDate);
      thisForm.current?.setFieldValue("state",formData.state);
    }
    
   }else{
    HandleNextPage(0);
   }
  },[route?.params]);
  const HandleCreateAccount = (data:FormProps)=>{
   
    publicIP().then(ip => { 
    getUniqueId().then((uId)=>{
      getManufacturer().then((manufacturer)=>{
    const fdata = {
      keyContactIdentity:route?.params,
      bvn: data?.bvn,
      businessRegNumber:data.cacNumber, // business regNumber (cac)
      password:data.password,
      deviceId:uId,
      deviceName:manufacturer,
      ipAddress:ip,
      playerId:getBundleId(),
      gender:data.gender,
      dateOfBirth: String(data.dob).replace(/[\/]/g,"-"),
      location:data.branchAddress
      }
      // alert (JSON.stringify(fdata));
      // return ;
    CreateAccount(fdata).then((res)=>{
    if(res.data)
    {
      setSuccessMessage(res.message)
      setShowSuccess(true)
    }
    })
  })
})
})
  }
  return <View 
  style={{width:DEVICE.width,flexDirection:"column",height:DEVICE.height}}
  >
  <AppContainer 
    showNavBar={true}
    goBack={()=>{
    if(route?.params?.index)
    {
      return navigationRef.current?.goBack();
    }
      if(showPassword)
        {
      setShowPassword(false)
        }else if(confirmDetails)
      {
    setConfirmDetails(false)
      }else if(indexPosition !== 0)
    {
      HandleNextPage(indexPosition - 1)
    }else{
    navigationRef.current?.goBack() 
    }
    }}
    title=''
    backgroundColor={COLOURS.defaultWhite}
    disableScrol
    >
  <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20,overflow:"hidden"}}>
  <View style={{flexDirection:"column"}}>
      <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.medium}}>{indexPosition === 0?"Business details":indexPosition === 1?"Key contact details":"Upload Documents"}</Text>
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.normal,paddingHorizontal:50}}>{indexPosition === 0?"Enter your CAC number":indexPosition === 1?"Business contact Information":"To keep your account secure and verified, please upload the required documents"}</Text>
     <View style={{flexDirection:"row"}}>
     {["","",""].map((a,i)=><View key={i} style={{flex:1,height:2,backgroundColor:i <= indexPosition?COLOURS.purple:"transparent"}} />)}
     </View>
     <View 
    style={{width:DEVICE.width * 3,height:DEVICE.height - 240,flexDirection:"row"}}
    >
 <Animated.View 
    style={[{width:DEVICE.width * 3,height:DEVICE.height - 240,flexDirection:"row",position:"absolute",left:0,top:0},AnimateViewStyle]}
    >
 <View 
      style={{width:DEVICE.width,height:DEVICE.height - 240,paddingTop:20}}
      >
      <Formik
      innerRef={thisForm}
      initialValues={{
        cacNumber:"",
        verified:false,
        affiliates: "", 
        branchAddress: "", 
        city: "", 
        companyEmail: "", 
        companyName: "", 
        companyType: "", 
        headOfficeAddress: "", 
        lga: "", 
        registrationDate: "", 
        state: "", 
        status:false
      }}
onSubmit={(values:FormProps, actions:any) => {
   if(!values.verified)
 {
  VerifyCACNumber("RC"+values?.cacNumber!).then((res)=>{
    if(res.data)
   {
    const { 
      affiliates, 
      branchAddress, 
      city, 
      companyEmail, 
      companyName, 
      companyType, 
      headOfficeAddress, 
      lga, 
      registrationDate, 
      state, 
    } = res.data.cac;
      thisForm.current?.setFieldValue("verified",true);
      thisForm.current?.setFieldValue("cacNumber",values.cacNumber);
      thisForm.current?.setFieldValue("affiliates", affiliates);
      thisForm.current?.setFieldValue("branchAddress",branchAddress);
      thisForm.current?.setFieldValue("city",city );
      thisForm.current?.setFieldValue("companyEmail",companyEmail); 
      thisForm.current?.setFieldValue("companyName", companyName);
      thisForm.current?.setFieldValue("companyType", companyType);
      thisForm.current?.setFieldValue("headOfficeAddress", headOfficeAddress);
      thisForm.current?.setFieldValue("lga", lga);
      thisForm.current?.setFieldValue("registrationDate", registrationDate);
      thisForm.current?.setFieldValue("state", state);
      thisForm.current?.setFieldValue("status", false);
      SetFormValues({
        cacNumber:"RC"+values.cacNumber,
        affiliates, 
        branchAddress, 
        city, 
        companyEmail, 
        companyName, 
        companyType, 
        headOfficeAddress, 
        lga, 
        registrationDate, 
        state
      })
  }
  })
  DeviceEventEmitter.emit(LISTENERS.createAccountForms,{
    formData,
    createAccountFormList:{
      BusinessDetails:{status:"selected"},
      KeyContactDetails:{status:"invalid"},
      UploadDocuments:{status:"invalid"},
  }});
 }else{
HandleNextPage(1);
DeviceEventEmitter.emit(LISTENERS.createAccountForms,{
  formData,
  createAccountFormList:{
  BusinessDetails:{status:"valid"},
  KeyContactDetails:{status:"selected"},
  UploadDocuments:{status:"invalid"}
  }
}
);
 }
}}
validationSchema={FormSchema}
>
{({values,setValues,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
    <View style={{flexDirection:"column"}}>
      <View style={{flexDirection:"column",paddingHorizontal:24}}>
     <BaseInput 
     type='phone-pad'
     leadingIcon={<Text style={{marginRight:4,fontFamily:FONTFAMILY.INTER.normal,color:"rgba(123, 127, 153, 0.50)"}}>RC</Text>}
     style={{marginBottom:0}}
     label='CAC Number'
     placeholder='CAC'
     max={10}
     onChange={(d)=>{
      setValues({cacNumber:d,verified:false});
     }}
     value={ReturnAllNumbers(values.cacNumber!)}
     errorMessage={touched.cacNumber && errors.cacNumber}
     />
     {values.verified ?<View style={{flexDirection:"column"}}>
      <MockInput 
      label='Business Name'
      value={values.companyName!}
      />
     <BaseInput 
     style={{marginBottom:0}}
     label='Business Address'
     placeholder='Business Address'
     max={80}
     onChange={(d)=>{
     }}
     value={values.headOfficeAddress!}
     errorMessage={touched.headOfficeAddress && errors.headOfficeAddress}
     />
      <MockInput 
      label='Business Name'
      value={values.companyName!}
      />
       <MockInput 
      label='Country of Registration'
      value={values.city!}
      />
       <MockInput 
      label='Type of Business'
      value={values.companyType!}
      />
      <MockInput 
      label='Registration Date'
      value={moment(values.registrationDate!).format("Do, MMM YYYY")}
      />
     </View>:null}
     <BaseButton 
     disabled={values.cacNumber === ""}
     onPress={handleSubmit}
     title={values.verified?"Proceed":'Verify CAC number'}
     />
     </View>
     </View>
     )}
</Formik>
</View>
<KeyContactDetailsScreen 
onValues={(formData)=>{
  SetFormValues(formData)
  HandleNextPage(2);
  DeviceEventEmitter.emit(LISTENERS.createAccountForms,{
    formData,
    createAccountFormList:{
      BusinessDetails:{status:"valid"},
      KeyContactDetails:{status:"valid"},
      UploadDocuments:{status:"selected"}
  }}
  );
}}
index={route?.params?.index}
value={route?.params?.formData}
onSuccess={(message)=>{
  setSuccessMessage(message);
}}
/>
<UploadDocumentScreen
Reducer={Reducer!}
onValues={(form)=>{
  SetFormValues(form);
  setConfirmDetails(true);
  DeviceEventEmitter.emit(LISTENERS.createAccountForms,{
    form,
    createAccountFormList:{
      BusinessDetails:{status:"valid"},
      KeyContactDetails:{status:"valid"},
      UploadDocuments:{status:"valid"}
  }}
  ); 
}}
value={formData}
/>
</Animated.View>
</View>
</View>
{confirmDetails && <ConfirmDetails
data={formData}
Submit={()=>{
  setShowPassword(true)
}}
/>}
{showPassword && <CreateNewPasswordComponent
onClose={()=>{
  setShowPassword(false)
}}
loading={loading}
onValue={(d)=>{
  const data = {
    ...formData,
    password:d
  }
 
  delete data.logo;
  delete data.cacCertificate;
  SetFormValues(data);
  HandleCreateAccount(data)
  DeviceEventEmitter.emit(LISTENERS.createAccountForms,{
    formData:data,
    createAccountFormList:{
      BusinessDetails:{status:"valid"},
      KeyContactDetails:{status:"valid"},
      UploadDocuments:{status:"valid"}
  }});
 // setShowPassword(false);
 
}}
formData={formData}

/>
}
</View>
</AppContainer>
{showSuccess && <SucessScreenComponent 
title={successMessage}
goBack={()=>{
  navigationRef.current?.reset({
    index:0,
    routes:[
      {name:ROUTES.loginScreen}
    ]
  })
}}
/>}
{loading ?<BaseModalLoader modal />:null}
</View>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(BusinessDetailsScreen);
  