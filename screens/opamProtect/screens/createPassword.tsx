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
  password:y.string().required('New password is required.').required('A strong password is required').matches(passwordRules, { message: 'Please create a stronger password.'}),
  confirmPassword:y.string().oneOf([y.ref('password')], 'Passwords must match')
});
import Svg, { Path } from "react-native-svg"
import styled from "styled-components/native";
import BaseButton from "../../../components/baseButton";
import { navigationRef } from "../../../App";
import { useDispatch } from "react-redux";
import { NavigatePop } from "../../../includes/useNavigation";
import useHttp from "../../../includes/http.hooks";
import { BaseModalLoader } from "../../../components/baseLoader";
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
 const {ShowMessage,OpamProtectCreatePassword,loading} = useHttp();
 
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
  password:"",
  confirmPassword:""
}}
onSubmit={(values:FormikValues, actions:any) => {
 OpamProtectCreatePassword({
  distress_pin:values.password
}).then((res) => {
  if (res.data) {
     dispatch({
  type: "update", payload: {
    creationOfDistressPin: true
  }
})
if(res.status === "success" && res.statusCode === 200)
{
navigationRef.current?.goBack()
}
  }
})
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
    <View style={{flexDirection:"column",justifyContent:"center",alignItems:"center",marginVertical:10,width:"100%"}}>
    <View style={{width:"100%"}}>
   <BaseInput
    type='visible-password'
    onChange={handleChange("password")}
    label='Password'
    placeholder={"Enter your password"}
    max={30}
    value={values.password}
    errorMessage={errors.password}
    />
    </View>
    <View style={{width:"100%"}}>
   <BaseInput
    type='visible-password'
    onChange={handleChange("confirmPassword")}
    label='Confirm Password'
    placeholder={"Enter confirm Password"}
    max={30}
    value={values.confirmPassword}
    errorMessage={errors.confirmPassword}
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
  {loading && <BaseModalLoader />}
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
