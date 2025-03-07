/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import { COLOURS, DEVICE, FONTFAMILY, passwordRules, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';
import BaseInputOTP from '../../components/baseInputOTP';

const FormSchema = y.object({
  token:y.string().required('Token is required.').min(6,"A 6-digit token is required.").max(6,"A 6-digit token is required."),
  password:y.string().required('New password is required.').required('A strong password is required').matches(passwordRules, { message: 'Please create a stronger password.'}),
  confirmPassword:y.string().oneOf([y.ref('password')], 'Passwords must match')
});
  const ForgetPasswordScreen = ({route}:ScreenComponentType) => {
  const {UserForgotPassword,VerifyOTP} = useHttp();
  const [sending,setResetSending]  = useState<boolean>(false);
  const [loading,setLoading]  = useState<boolean>(false);
  const [counting,setCounting]  = useState<boolean>(true);
  const [counter,setCounter]  = useState<number>(50);
  useEffect(()=>{
    setCounter(50)
    const inv = setInterval(()=>{
      setCounter((counter)=>{
        if(counter == 0)
          {
            clearInterval(inv); 
            return 0
          }
        return counter - 1;
      })
        },1000)
      setCounting(false);
        return ()=>{
          clearInterval(inv);
        }
  },[counting])

  const ResendToken = ()=>{
    setResetSending(true);
    setCounting(true)
    const {channel,phone,email} = route?.params;
    UserForgotPassword(channel === "phone"?{
      channel:"phone",
      phone:phone,
      type:"auth-pin"
    }:{
      channel:"email",
      email:email,
      type:"auth-pin"
    }).then((res)=>{
      setResetSending(false);
      setCounting(false);
    });
  }
  const VerifyForgotOTP = (otp:string,password:string)=>{
    setLoading(true)
    const {channel,phone,email} = route?.params;
    VerifyOTP(channel === "phone"?{
    phone:phone,
    otp,
    type:channel,
    password
    }:{
      email:email,
      otp,
      type:channel,
      password
    }).then((res)=>{
      setLoading(false)
      if(res.status === "success" && res.statusCode === 200)
      {
        navigationRef.current?.navigate(ROUTES.createNewPassword)
      }
    })
  }
  return <AppContainer
    showNavBar
    goBack={()=>navigationRef.current?.goBack()}
    disableScrol
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <View style={{flexDirection:"column"}}>
    <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>OTP Verification</Text>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>{route?.params?.message?route?.params?.message:"Kindly input the OTP that was sent to the phone number attached to this account."}</Text>
<Formik
initialValues={{
  token:"",
  confirmPassword:"",
  password:""
}}
onSubmit={(values:FormikValues, actions:any) => {
 VerifyForgotOTP(values.token,String(values.confirmPassword).trim());
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
    <View style={{flexDirection:"column",padding:30}}>
      <BaseInputOTP 
     onValue={(d)=>{
      setFieldValue("token",d);
     }}
     value=''
     errorMessage={errors.token}
     />
     <BaseInput 
     label='New Password'
     placeholder="Enter your new password"
     max={80}
     onChange={(d)=>setFieldValue("newPassword",d)}
     value={values.password}
     errorMessage={errors.password}
     />
     <BaseInput 
     label='Confirm Password'
     placeholder="Enter your confirm password"
     max={80}
     onChange={(d)=>setFieldValue("confirmPassword",d)}
     value={values.confirmPassword}
     errorMessage={errors.confirmPassword}
     />
    <View style={{height:120}} ></View>
    <BaseButton 
    disabled={String(values.token).length !== 6}
    title='Confirm OTP'
    onPress={handleSubmit}
    />
    <View style={{flexDirection:"row",marginVertical:20,alignItems:"center"}} >
      <ClockIcon />
      <View style={{flexDirection:"column",paddingHorizontal:10}}>
      {counter === 0?<View style={{flexDirection:"row"}}>
      <Text style={{color:COLOURS.black,fontFamily:FONTFAMILY.Baloo.medium,fontSize:14}}>Didn't receive code?</Text>
      <TouchableOpacity 
      onPress={()=>ResendToken()}
      >
        <Text style={{color:COLOURS.black,fontFamily:FONTFAMILY.Baloo.medium,fontSize:14,textDecorationLine:"underline",marginLeft:5}}>Try again</Text>
        </TouchableOpacity> 
      </View>:<Text style={{color:COLOURS.purple,fontFamily:FONTFAMILY.Baloo.medium,fontSize:14}}>{`${ moment().second(counter).format('0:ss')} secs`}</Text>}
      </View>
    </View>
    </View>)}
    </Formik>
    </View>
    </View>
    {sending || loading ?<BaseModalLoader modal />:null}
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(ForgetPasswordScreen);
  import Svg, { Circle, Path } from "react-native-svg"
import AppStyles from '../../includes/styles';
import { useEffect, useState } from 'react';
import BaseLoader, { BaseModalLoader } from '../../components/baseLoader';
import BaseInnerLoader from '../../components/baseLoader';
import moment from 'moment';
import BaseInput from '../../components/baseInput';

  export const ClockIcon = ()=>{
    return <Svg 
     width={20} 
     height={20} 
     fill="none">
    <Circle cx={10} cy={10} r={9.5} fill="#fff" stroke="#841743" />
    <Path stroke="#841743" d="M11 4v7H4" />
  </Svg>
  }
  