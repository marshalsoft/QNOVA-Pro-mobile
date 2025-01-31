import React,{useEffect,useState} from 'react';
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { ForgotPasswordProps, ScreenComponentType, UserLoginProps } from '../../../includes/types';
import AppContainer from '../../../components/appContainer';
import { navigationRef } from '../../../App';
import TopSection from '../../../components/topSection';
import { COLOURS, FONTFAMILY, passwordRules, ROUTES } from '../../../includes/constants';
import BaseButton from '../../../components/baseButton';
import useHttp from '../../../includes/http.hooks';
import BaseInputOTP from '../../../components/baseInputOTP';

const FormSchema = y.object({
  token:y.string().required('Token is required.').min(6,"A 6-digit token is required.").max(6,"A 6-digit token is required.")
});
  const ForgetPasswordScreen = ({route}:ScreenComponentType) => {
  const {SendOTP,UserForgotPassword,loading} = useHttp();
  const [sending,setSending]  = useState<boolean>(true);
  const [counter,setCounter]  = useState<number>(2);
  useEffect(()=>{
    ResendToken();
  },[])
  const ResendToken = ()=>{
    setSending(true);
    SendOTP(route?.params?.phoneNumber).then((res)=>{
      setSending(false);
      if(!res.status)
      {
        // setTimeout(()=>{
        // navigationRef.current?.goBack();
        // },1500)
      }
    })
  }
  return <AppContainer 
    showNavBar={true}
    goBack={()=>{
    navigationRef.current?.goBack() 
    }}
    title=''
    backgroundColor={COLOURS.defaultWhite}
    >
<Formik
initialValues={{
  token:"",
}}
onSubmit={(values:FormikValues, actions:any) => {
// UserForgotPassword(values);
navigationRef.current?.navigate(ROUTES.forgotPassword);
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
    <View style={{flexDirection:"column",padding:30}}>
     {sending && <BaseInnerLoader />}
      <TopSection 
      title='Verification'
      sub='Kindly input the OTP that was sent to the
    phone number attached to this account.'
      />
     <BaseInputOTP 
     onValue={(d)=>{
      setFieldValue("token",d);
     }}
     value=''
     errorMessage={errors.token}
     />
    <View style={{height:120}} ></View>
    <BaseButton 
    disabled={String(values.token).length !== 6}
    loading={loading}
    title='Confirm OTP'
    onPress={handleSubmit}
    />
    <View style={{flexDirection:"row",marginVertical:20,alignItems:"center"}} >
      <ClockIcon />
      <View style={{flexDirection:"column",paddingHorizontal:10}}>
      <View style={{flexDirection:"row"}}>
      <Text style={{color:COLOURS.black,fontFamily:FONTFAMILY.Baloo.medium,fontSize:14}}>Didn't receive code?</Text>
      <TouchableOpacity 
      onPress={()=>ResendToken()}
      >
        <Text style={{color:COLOURS.black,fontFamily:FONTFAMILY.Baloo.medium,fontSize:14,textDecorationLine:"underline",marginLeft:5}}>Try again</Text>
        </TouchableOpacity> 
      </View>
      <Text style={{color:COLOURS.purple,fontFamily:FONTFAMILY.Baloo.medium,fontSize:14}}>{`${(counter*100).toPrecision(3)} secs`}</Text>
      </View>
    </View>
    </View>)}
    </Formik>
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(ForgetPasswordScreen);

import Svg, { Circle, Path } from "react-native-svg"
import BaseLoader from '../../../components/baseLoader';
import BaseInnerLoader from '../../../components/baseLoader';

  export const ClockIcon = ()=>{
    return <Svg 
     width={20} 
     height={20} 
     fill="none">
    <Circle cx={10} cy={10} r={9.5} fill="#fff" stroke="#841743" />
    <Path stroke="#841743" d="M11 4v7H4" />
  </Svg>
  }
  