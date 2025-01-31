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
    confirmPassword:y.string().min(8,"Password must be minimum of 8 characters.").matches(passwordRules,"Password must contain at least 8 characters, one uppercase, one number and one special case character").required('Password is required.'),
});
import Svg, { Path } from "react-native-svg"
import styled from "styled-components/native";
import BaseButton from "../../../components/baseButton";
import { navigationRef } from "../../../App";
import useHttp from "../../../includes/http.hooks";
import { NavigatePop } from "../../../includes/useNavigation";
import { useDispatch } from "react-redux";

const OpamProtectConfirmPassword = ({route}:ScreenComponentType)=>{
 const thisForm = useRef() as RefObject<FormikProps<FormikValues>>
 const {ShowMessage,OpamProtectCreatePassword,loading} = useHttp();
const dispatch = useDispatch();
 const handleCreatePIN = (password: string) => {
    OpamProtectCreatePassword({
      distress_pin: password
    }).then((res) => {
      if (res.status) {
         dispatch({
      type: "update", payload: {
        creationOfDistressPin: true
      }
    })
    NavigatePop(2);
      }
    })
  }
  
 return <AppContainer
 showNavBar
 white
 goBack={() => {
     navigationRef.current?.goBack()
 }}
>
    <View style={{backgroundColor:"#F2F2F2",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <View style={{flexDirection:"column"}}>
<TitleText  >{"Confirm your"} <Text style={{color:COLOURS.purple,paddingTop:15}}>OPAM Protect</Text> Distress Password</TitleText>
     <Text style={{alignSelf:"center",color:"#7B7F99",fontSize:12,marginTop:10,marginBottom:20,textAlign:"center",fontFamily:FONTFAMILY.INTER.bold,paddingHorizontal:50}}>Your Account's First Line of Defense: Confirm Password</Text>
     <View style={{height:1,backgroundColor:COLOURS.gray100,marginVertical:20}} ></View>
     <Formik
     innerRef={thisForm}
initialValues={{
    confirmPassword:""
}}
onSubmit={(values:FormikValues, actions:any) => {
    if(String(route?.params?.password).trim() !== String(values.confirmPassword).trim())
    {
        return ShowMessage("top").fail("Password mot matched!")
    }
    handleCreatePIN(values.confirmPassword)
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{paddingHorizontal:20,flexDirection:"column",justifyContent:"center",alignItems:"center"}} >
    <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center",marginVertical:10}}>
    <View style={{width:"100%"}}>
   <BaseInput
    type='visible-password'
    onChange={handleChange("confirmPassword")}
    label='Enter Password'
    placeholder={"Confirm your password"}
    max={30}
    value={values.confirmPassword}
    errorMessage={errors.confirmPassword}
    />
    </View>
    </View>
  <BaseButton 
  loading={loading}
  onPress={handleSubmit}
  title="Continue"
  />
    </View>)}
    </Formik>
     </View>
     </View>
     </AppContainer>
}
export default OpamProtectConfirmPassword;

const TitleText = styled.Text`
color: ${COLOURS.black};
text-align: center;
font-family: ${FONTFAMILY.INTER.bold};
font-size: 18px;
font-weight: 600;
`;
