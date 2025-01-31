import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, BackHandler, Share, Switch } from "react-native";
import { ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, CURRENCIES, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
import { RefObject, useEffect, useRef, useState } from "react";
import AppContainer from "../../../../../components/appContainer";
import AppStyles from "../../../../../includes/styles";
import BaseInput from "../../../../../components/baseInput";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import { navigationRef } from "../../../../../App";
import { BtnNavProp } from "../menuComponents";
import BaseSelect from "../../../../../components/baseSelect";
import BaseButton from "../../../../../components/baseButton";
import { ReturnAllNumbers, ReturnComma } from "../../../../../includes/functions";
const FormSchema = y.object({
    accountType:y.string().required('Account type is required.'),
    expiryDate:y.string().required('Expiry Date is required.'),
    amount:y.string().required('Amount is required.').max(12,'Maximum of 12 characters.'),
    narration:y.string().required('Narration is required.')
});
import styled from "styled-components/native";
import BaseSwitch from "../../../../../components/baseSwitch";
import moment from "moment";
import BaseInputDate from "../../../../../components/baseInputDate";
import {connect} from 'react-redux'; 

const NewRequestComponent = ({route,goBack,onSuccess}: ScreenComponentType) => {
const handleBack = ()=>{
    if(goBack)
    {
    goBack();
    }
    return true;
}
    useEffect(()=>{
        // alert(JSON.stringify(route?.params))
    BackHandler.addEventListener("hardwareBackPress",handleBack);
    return ()=>{
    BackHandler.removeEventListener("hardwareBackPress",handleBack);
    }
    },[])
return <Formik
initialValues={{
  accountType:"",
  accountNumber:"",
  accountName:"",
  amount:"",
  expiryDate:moment().format("YYYY-MM-DD"),
  narration:"",
  fixedAmount:false,
  expiryAmount:false
}}
onSubmit={(values:FormikValues, actions:any) => {
   const data = {
    customerId:route?.params.userId!,
    dueDate:values.expiryDate,
    description:values.narration, 
    amount:parseFloat(values.amount)
}
// return alert (JSON.stringify(data));
    if(onSuccess)
   {
    onSuccess({data})
   }
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{backgroundColor:"rgba(242, 242, 242, 1)",flexDirection:"column",paddingVertical:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<View style={{paddingHorizontal:16,flexDirection:"column",gap:10}}>
<Text style={{fontSize:14,marginBottom:30,color:"rgba(123, 127, 153, 1)",textAlign:"center",width:"80%",alignSelf:"center"}}>Accelerate Cash Flow: Professional Payment Requisition</Text>
 <BaseSelect 
 style={{marginBottom:0,marginTop:0}}
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
  style={{marginBottom:0,marginTop:0}}
 label="Recipient Name"
 placeholder="John Doe"
 value={values.accountName}
 onChange={(data)=>{
    setFieldValue("accountName",data)
 }}
 max={12}
 errorMessage={touched.accountName && errors.accountName}

 />
 <View style={{marginBottom:20,flexDirection:"row",alignItems:"center"}} >
    <View style={{flex:1,justifyContent:"flex-start"}}>
        <Text1 style={{color:COLOURS.black,alignSelf:"flex-start",fontSize:14}}>Fixed Amount</Text1>
    </View>
    <BaseSwitch
    onValueChange={(d)=>{
        setFieldValue("fixedAmount",d)
        if(d)
        {
            setFieldValue("amount","1000")
        }else{
            setFieldValue("amount","")
        }
    }}
    value={values.fixedAmount}
    />
 </View>
 {!values.fixedAmount?<BaseInput 
  style={{marginBottom:0,marginTop:0}}
 type="number-pad"
 label="Amount"
 leadingIcon={<Text style={{fontFamily:FONTFAMILY.INTER.medium,marginRight:3}} >{CURRENCIES.Naira.Symbol}</Text>}
 placeholder={`1,000`}
 max={12}
 value={ReturnComma(values.amount)}
 onChange={(data)=>{
    setFieldValue("amount",data)
 }}
 errorMessage={touched.amount && errors.amount}
 />:null}
 <View style={{marginBottom:20,flexDirection:"row",alignItems:"center"}} >
    <View style={{flex:1,justifyContent:"flex-start"}}>
        <Text1 style={{color:COLOURS.black,alignSelf:"flex-start",fontSize:14}}>Expiry Amount</Text1>
    </View>
    <BaseSwitch
    onValueChange={(d)=>{
        setFieldValue("expiryAmount",d);
        setFieldValue("expiryDate",moment().format("YYYY-MM-DD"));
    }}
    value={values.expiryAmount}
    />
 </View>
{values.expiryAmount ?<BaseInputDate 
  style={{marginBottom:0,marginTop:0}}
 label="Expiry Date"
 placeholder="YYYY-MM-DD"
 max={new Date(moment().add(5,"years").toISOString())}
 value={values.expiryDate}
 onChange={(data)=>{
    setFieldValue("expiryDate",data)
 }}
 errorMessage={touched.expiryDate && errors.expiryDate}
 />:null}
  <BaseInput 
   style={{marginBottom:0,marginTop:10}}
 label="Description"
 placeholder="Write here"
 max={50}
 value={values.narration}
 onChange={(data)=>{
    setFieldValue("narration",data)
 }}
 errorMessage={touched.narration && errors.narration}

 />
 <BaseButton 
 title="Create Payment Request"
 onPress={handleSubmit}
 />

</View>
</View>)}
 </Formik>
}

const MapStateToProps = (state: any) => {
    return state;
  };
export default connect(MapStateToProps)(NewRequestComponent);

const SearchContainer = styled.View`
height: 56px;
align-items: center;
flex: 1 0 0;
border-radius: 12px;
background: #FFF;`

const Text1 = styled.Text`
color: rgba(123, 127, 153, 0.50);
text-align: center;
font-family: ${FONTFAMILY.INTER.semiBold};
font-size: 12px;
font-style: normal;
font-weight: 600;
`;
export const ItemView = styled.TouchableOpacity`
border-radius: 12px;
background: #FFF;
display: flex;
height: 72px;
padding: 16px 12px;
justify-content: space-between;
align-items: center;
flex-direction:row;
`;
const Styles = StyleSheet.create({
    smallcard:{
        width:100,
        height:84,
        borderRadius:8,
        backgroundColor:COLOURS.white,
        padding:8
    },
    label:{
        fontSize:10,
        fontFamily:FONTFAMILY.INTER.normal,
        color:"rgba(123, 127, 153, 1)"
    },
    input:{
        fontSize:14,
        fontFamily:FONTFAMILY.INTER.normal,
        color:"rgba(0, 0, 0, 1)"
    },
    divider:{
        height:1,
        backgroundColor:"rgba(123, 127, 153, 0.1)",
        width:"100%"
    }
})

const CopyIcon = ()=>{
        return (
          <Svg
            width={16}
            height={16}
            viewBox="0 0 16 16"
            fill="none"
          >
            <Path
              d="M5 2h4.733c1.494 0 2.24 0 2.811.29.502.256.91.664 1.165 1.166.291.57.291 1.317.291 2.81V11m-9.867 3h5.4c.747 0 1.12 0 1.406-.145.25-.128.454-.332.582-.583.146-.285.146-.659.146-1.405v-5.4c0-.747 0-1.12-.146-1.406a1.333 1.333 0 00-.582-.582c-.286-.146-.659-.146-1.406-.146h-5.4c-.746 0-1.12 0-1.405.146-.25.127-.455.331-.583.582C2 5.347 2 5.72 2 6.467v5.4c0 .746 0 1.12.145 1.405.128.25.332.455.583.583.285.145.659.145 1.405.145z"
              stroke="#7B7F99"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )
}