import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, BackHandler } from "react-native";
import { ItemProps, ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
const FormSchema = y.object({
    accountType:y.string().required('Account type is required.'),
    amount:y.string().required('Amount is required.'),
});

import styled from "styled-components/native";
import PINScreen from "../walletTransfer/pin";
import SuccessScreen from "../walletTransfer/success";
import BaseSelect from "../../../../../components/baseSelect";
import { MockInput } from "../walletTransfer/preview";
import BaseButton from "../../../../../components/baseButton";
import useHttp from "../../../../../includes/http.hooks";
import CardInstanceComponent from "./cardInstance";
import { CardsProps } from ".";
import { ReturnAllNumbers, ReturnComma } from "../../../../../includes/functions";
import BaseInput from "../../../../../components/baseInput";
import { BaseModalLoader } from "../../../../../components/baseLoader";
export interface CardTopUpScreenProps {
  dataDetails:CardsProps;
  onClose:()=>void;
  onSuccess:(data?:any)=>void;
}

const CardWithdrawalScreen = ({dataDetails,onSuccess,onClose}:CardTopUpScreenProps ) => {
const {CardWithdrawal,loading} = useHttp();
const [sucessObject,setSucessObject] = useState<{
  message:string;
  raiseIssueBtnText:string;
  shareBtnText:string;
}>({
  message:"",
  raiseIssueBtnText:"",
  shareBtnText:""
})

  const HandleGoBack = ()=>{
    onClose();
    return true;
}
    useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress",HandleGoBack)
    return ()=>{
      BackHandler.removeEventListener("hardwareBackPress",HandleGoBack)
    }
},[])
    return <View 
style={{position:"absolute",width:"100%",height:"100%",left:0,top:0,flexDirection:"column"}}
>
<Formik
initialValues={{
  accountType:"",
  amount:""
}}
onSubmit={(values:FormikValues, actions:any) => {
  onSuccess(values)
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{width:"100%",flexDirection:"column",paddingHorizontal:20}} >
<BaseSelect 
style={{marginTop:20}}
 label="Select Account"
 placeholder="Please Select"
 list={[
    {title:"Wallet",value:"wallet"}
 ]}
 onChange={(data)=>{
    setFieldValue("accountType",data.value)
 }}
 type="custom"
 errorMessage={touched.accountType && errors.accountType}
 />
  <BaseInput 
  leadingIcon={<Text style={{fontFamily:FONTFAMILY.INTER.medium}} >₦</Text>}
  type="number-pad"
 label="Amount"
 placeholder="100"
 value={ReturnComma(values.amount)}
 onChange={(data)=>{
    setFieldValue("amount",data);
 }}
 max={12}
 errorMessage={touched.amount && errors.amount}
 />
 <BaseButton 
 title="Withdraw"
 onPress={handleSubmit}
 />
</View>)}
</Formik>
{loading && <BaseModalLoader />}
</View>
}
export default CardWithdrawalScreen;