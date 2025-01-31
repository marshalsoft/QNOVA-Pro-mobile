/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { View,Text, TouchableOpacity, Platform, StatusBar, ScrollView, Alert } from 'react-native';
import { Formik, FormikValues } from 'formik';
import * as y  from 'yup';
import { connect } from 'react-redux';
import { ForgotPasswordProps, ScreenComponentType, UserLoginProps } from '../../includes/types';
import AppContainer from '../../components/appContainer';
import { navigationRef } from '../../App';
import BaseInput from '../../components/baseInput';
import TopSection from '../../components/topSection';
import Card from '../../components/card';
import { COLOURS, DEVICE, FONTFAMILY, passwordRules, ROUTES } from '../../includes/constants';
import BaseButton from '../../components/baseButton';
import useHttp from '../../includes/http.hooks';
import { useState } from 'react';
import BaseInputMobile from '../../components/baseInputMobile';
import { ReturnMobile } from '../../includes/functions';
import { BaseModalLoader } from '../../components/baseLoader';

const FormSchema = y.object({
  email:y.string().required('Email address is required.').email("A valid email is required.")
});
const FormSchema2 = y.object({
  phoneNumber:y.string().required('Phone number is required.').min(10,"A valid phone number is required.")
});
  const ForgetPasswordScreen = ({route}:ScreenComponentType) => {
  const {UserForgotPassword} = useHttp();
  const [selected,setSelected] = useState<number>(0)
  const [loading,setLoading] = useState<boolean>(false)
    return <AppContainer
    showNavBar
    goBack={()=>navigationRef.current?.goBack()}
    disableScrol
    >
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <View style={{flexDirection:"column"}}>
    <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:20,fontFamily:FONTFAMILY.INTER.bold}}>Forgot your password?</Text>
     <Text style={{alignSelf:"center",color:COLOURS.black,fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>Please provide your {selected == 0?"email address":"phone number"} </Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
    <View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
    </View>
    <View style={{paddingHorizontal:16}} >
    <View style={{flexDirection:"row",height:50,backgroundColor:"#7B7F991A",borderRadius:16,padding:5}}>
            <TouchableOpacity 
             onPress={()=>setSelected(0)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Email Address</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>setSelected(1)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected !== 0?COLOURS.white:"transparent"}}
            >
            <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected !== 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>Phone number</Text>
            </TouchableOpacity>
    </View>
    </View>
{selected === 0?<Formik
initialValues={{
  email:""
}}
onSubmit={(values:any, actions:any) => {
  setLoading(true)
UserForgotPassword({
  channel:"email",
  email:String(values.email).toLowerCase().trim(),
  type:"auth-pin"
}).then((res)=>{
  setLoading(false) 
});
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
    <View style={{flexDirection:"column",padding:30}}>
     <BaseInput 
     label='Email Address'
     placeholder="Enter email address"
     max={80}
     onChange={(d)=>setFieldValue("email",d)}
     value={values.email}
     autoCapitalize='none'
     />
    <BaseButton 
    disabled={!isValid}
    title="Send OTP"
    onPress={handleSubmit}
    />
    </View>)}
    </Formik>:<Formik
initialValues={{
  phoneNumber:"",
  code:""
}}
onSubmit={(values:any, actions:any) => {
UserForgotPassword({
  channel:"phone",
  phone:values.code+parseInt(values.phoneNumber),
  type:"auth-pin"
}).then((res)=>{
});
}}
validationSchema={FormSchema2}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
    <View style={{flexDirection:"column",padding:30}}>
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
    <BaseButton 
    disabled={values.phoneNumber === ""}
    title={'Send OTP'}
    onPress={handleSubmit}
    />
    </View>)}
    </Formik>}
    </View>
    </View>
    {loading && <BaseModalLoader modal />}
    </AppContainer>
}
const MapStateToProps = (state: any) => {
    return state;
  };
  export default connect(MapStateToProps)(ForgetPasswordScreen);
  