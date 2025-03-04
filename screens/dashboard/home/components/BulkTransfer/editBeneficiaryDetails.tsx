import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, BackHandler, Share, Switch, Alert } from "react-native";
import { ScreenComponentType } from "../../../../../includes/types";
import { COLOURS, DEVICE, FONTFAMILY, ROUTES, ValidateNigerianMobile, ValidateNigerianMobile2 } from "../../../../../includes/constants";
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
import { CopyText, ReturnAllNumbers, ReturnComma, UploadFile } from "../../../../../includes/functions";
import styled from "styled-components/native";
import { MockInput } from "../walletTransfer/preview";
import Card from "../../../../../components/card";
import useHttp from "../../../../../includes/http.hooks";
import {SaveTemplateFile} from "../../../../../includes/functions"
import DocumentPicker from 'react-native-file-picker';
import BaseSwitch from "../../../../../components/baseSwitch";
import { BankProp } from "../walletTransfer/ListOfBanks";
const FormSchema = y.object({
  bankCode:y.string().required('Bank is required.'),
  accountNumber:y.string().required('Acount number is required.').max(11,'Maximum of 11 digits.'),
  amount:y.string().required('Amount is required.')
});
export type BulkTranferBeneficiary = {
  accountNumber?:string;
  accountName?:string;
  bankName?:string;
  bankCode?:string;
  amount?:number;
  isQNovaAccount?:boolean;
  id?:string;
  groupId?:string;
  groupName?:string;
}
export interface CreateNewBulkTranferProp {
  groupName: string;
  beneficiaries:BulkTranferBeneficiary[],
  totalAmount?:number;
}
interface BeneficiaryDetailsComponentProps {
  goBack:()=>void;
  formData:BulkTranferBeneficiary;
  onSave:(data:any)=>void;
}
const EditBeneficiaryDetailsComponent = ({goBack,formData,onSave}:BeneficiaryDetailsComponentProps) => {
const {GetBanks,loading,ShowMessage} = useHttp();
const [listOfBanks,setListOfBanks] = useState<BankProp[]>([]);
useEffect(()=>{
  GetBanks().then((response)=>{
      if(response.data)
      {
          setListOfBanks(response.data);
      }
  });
},[]);

const handleBack = ()=>{
    if(goBack)
    {
    goBack();
    }
    return true;
}
    useEffect(()=>{
    BackHandler.addEventListener("hardwareBackPress",handleBack);
    return ()=>{
    BackHandler.removeEventListener("hardwareBackPress",handleBack);
    }
    },[])
return <Formik
initialValues={{
  bankCode:"",
  bankName:formData.bankName,
  accountNumber:formData.accountNumber,
  amount:"",
  accountName:"" 
}}
onSubmit={(values:any, actions:any) => {
  onSave({
    accountNumber:values.accountNumber, 
    accountName:formData.accountName,
    bankName:values.bankName,
    amount:parseInt(String(values.amount).replace(/[, ]/g,'')),
    bankCode:values.bankCode,
    isQNovaAccount:formData.isQNovaAccount
  });
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{backgroundColor:"rgba(242, 242, 242, 1)",flexDirection:"column",padding:30,height:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
<BaseSelect 
searchBar
style={{marginTop:20}}
 label="Select Bank"
 placeholder="Please select a bank"
 list={[
  {title:"QNova Wallet",value:"044"},
  ...listOfBanks.map((bank:BankProp,i:number)=>{
    return {title:bank.bank_name,value:bank.bank_code}
 })]}
 onChange={(data)=>{
    setFieldValue("bankName",data.title);
    setFieldValue("bankCode",data.value);
 }}
 type="custom"
 errorMessage={touched.bankName && errors.bankName}
 />
 <BaseInput 
type="number-pad"
 label="Account number"
 placeholder="1234567890"
 value={ReturnAllNumbers(values.accountNumber!)}
 onChange={(data)=>{
    setFieldValue("accountNumber",data);
    setFieldValue("accountName","");
 }}
 max={values.bankName === "QNova Wallet"?11:10}
 errorMessage={touched.accountNumber && errors.accountNumber}
 />
  <BaseInput 
  type="number-pad"
 label="Amount"
 placeholder="1234567890"
 value={ReturnComma(values.amount)}
 onChange={(data)=>{
    setFieldValue("amount",data);
 }}
 max={12}
 leadingIcon={<Text>₦</Text>}
 errorMessage={touched.amount && errors.amount}
 />
<BaseButton 
onPress={handleSubmit}   
title="Save Changes"
/>
</View>)}
</Formik>
}
export default EditBeneficiaryDetailsComponent;

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

export const DownloadIcon = ()=>{
        return (
            <Svg
            width={25}
            height={24}
            viewBox="0 0 25 24"
            fill="none"
          >
            <Path
              d="M21.5 15v1.2c0 1.68 0 2.52-.327 3.162a3 3 0 01-1.311 1.311C19.22 21 18.38 21 16.7 21H8.3c-1.68 0-2.52 0-3.162-.327a3 3 0 01-1.311-1.311C3.5 18.72 3.5 17.88 3.5 16.2V15m14-5l-5 5m0 0l-5-5m5 5V3"
              stroke="#fff"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </Svg>
        )
}
const UploadIcon = ()=>{
    return (
        <Svg
          width={24}
          height={24}
          viewBox="0 0 24 24"
          fill="none"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M10.738 16.627a1.492 1.492 0 01-1.487-1.362 37.116 37.116 0 01-.107-4.845 53.427 53.427 0 01-.253-.017l-1.49-.109a1.26 1.26 0 01-.97-1.935c1.097-1.716 3.106-3.636 4.76-4.824a1.388 1.388 0 011.619 0c1.653 1.188 3.662 3.108 4.758 4.824a1.26 1.26 0 01-.97 1.935l-1.49.109a53.69 53.69 0 01-.252.017c.07 1.616.034 3.234-.107 4.845a1.492 1.492 0 01-1.487 1.362h-2.524zm-.056-6.864a35.624 35.624 0 00.063 5.364h2.51c.156-1.784.177-3.577.064-5.364a.75.75 0 01.711-.797c.324-.016.647-.036.97-.06l1.081-.078a14.556 14.556 0 00-3.55-3.646L12 4.801l-.531.381a14.555 14.555 0 00-3.55 3.646L9 8.907c.323.023.647.043.97.059a.75.75 0 01.711.797z"
            fill="#000"
          />
          <Path
            d="M5.75 17a.75.75 0 00-1.5 0v2c0 .966.784 1.75 1.75 1.75h12A1.75 1.75 0 0019.75 19v-2a.75.75 0 00-1.5 0v2a.25.25 0 01-.25.25H6a.25.25 0 01-.25-.25v-2z"
            fill="#000"
          />
        </Svg>
      )
}
const EmailIcon = ()=>{
    return (
        <Svg
        width={25}
        height={24}
        viewBox="0 0 25 24"
        fill="none"
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3.304 8.353c-.28 2.603-.268 5.605.122 8.197a3.138 3.138 0 002.832 2.66l1.51.131c3.149.274 6.316.274 9.465 0l1.51-.13a3.138 3.138 0 002.832-2.66c.39-2.593.402-5.595.122-8.198a30.68 30.68 0 00-.122-.904 3.138 3.138 0 00-2.832-2.66l-1.51-.13a54.646 54.646 0 00-9.465 0l-1.51.13a3.138 3.138 0 00-2.832 2.66c-.045.301-.086.603-.122.904zm4.594-2.2a53.146 53.146 0 019.205 0l1.51.131c.755.066 1.366.64 1.478 1.389l.034.233-5.56 3.09a4.25 4.25 0 01-4.129 0l-5.56-3.09c.01-.078.022-.156.034-.233a1.638 1.638 0 011.478-1.389l1.51-.131zm12.41 3.367a29.099 29.099 0 01-.217 6.807 1.638 1.638 0 01-1.478 1.389l-1.51.131a53.152 53.152 0 01-9.205 0l-1.51-.131a1.638 1.638 0 01-1.478-1.389 29.1 29.1 0 01-.218-6.807l5.016 2.787a5.75 5.75 0 005.585 0l5.016-2.787z"
          fill="#8B1D41"
        />
      </Svg>
    )
}
const WhatAppIcon = ()=>{
    return (
        <Svg
          width={25}
          height={24}
          viewBox="0 0 25 24"
          fill="none"
        >
          <Path
            d="M9.386 7.17c.183.005.386.015.579.443.128.285.343.81.519 1.238.136.333.249.607.277.663.064.128.104.275.02.448l-.029.058c-.067.14-.115.24-.228.37a9.346 9.346 0 00-.144.17c-.085.104-.17.206-.242.278-.129.128-.262.266-.114.522.148.256.668 1.098 1.435 1.777a6.635 6.635 0 001.903 1.2c.07.03.127.055.17.076.257.128.41.108.558-.064.149-.173.643-.749.816-1.005.169-.256.342-.216.58-.128.237.089 1.503.71 1.76.837l.143.07c.179.085.3.144.352.23.064.109.064.62-.148 1.222-.218.6-1.267 1.176-1.742 1.22l-.136.016c-.435.052-.987.12-2.956-.655-2.425-.954-4.026-3.32-4.35-3.799a2.738 2.738 0 00-.052-.076l-.006-.008c-.147-.197-1.048-1.402-1.048-2.646 0-1.19.586-1.81.854-2.092l.047-.05a.95.95 0 01.687-.32c.173 0 .346 0 .495.005z"
            fill="#8B1D41"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2.684 21.331a.4.4 0 00.487.494l4.607-1.204a10 10 0 004.759 1.207h.005c5.486 0 9.958-4.447 9.958-9.912a9.828 9.828 0 00-2.914-7.011A9.917 9.917 0 0012.542 2c-5.486 0-9.958 4.446-9.958 9.911 0 1.739.458 3.447 1.33 4.954l-1.23 4.466zm2.677-4.068a1.5 1.5 0 00-.148-1.15 8.377 8.377 0 01-1.129-4.202c0-4.63 3.793-8.411 8.458-8.411 2.27 0 4.387.877 5.986 2.468A8.328 8.328 0 0121 11.916c0 4.63-3.793 8.412-8.458 8.412h-.005a8.5 8.5 0 01-4.044-1.026 1.5 1.5 0 00-1.094-.132l-2.762.721.724-2.628z"
            fill="#8B1D41"
          />
        </Svg>
      )
}
const CopyIcon = ()=>{
    return (
        <Svg
          width={25}
          height={24}
          viewBox="0 0 25 24"
          fill="none"
        >
          <Path
            d="M9.5 3.25A5.75 5.75 0 003.75 9v7.107a.75.75 0 001.5 0V9A4.25 4.25 0 019.5 4.75h7.013a.75.75 0 000-1.5H9.5z"
            fill="#8B1D41"
          />
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.903 6.793a44.372 44.372 0 00-9.806 0 2.011 2.011 0 00-1.774 1.76 42.581 42.581 0 000 9.893 2.01 2.01 0 001.774 1.76c3.241.363 6.565.363 9.806 0a2.01 2.01 0 001.774-1.76 42.579 42.579 0 000-9.893 2.011 2.011 0 00-1.774-1.76zM9.264 8.284c3.13-.35 6.342-.35 9.472 0a.51.51 0 01.45.444c.372 3.17.372 6.374 0 9.544a.51.51 0 01-.45.444c-3.13.35-6.342.35-9.472 0a.511.511 0 01-.45-.444c-.372-3.17-.372-6.374 0-9.544a.511.511 0 01.45-.444z"
            fill="#8B1D41"
          />
        </Svg>
      )
}
const ShareIcon = ()=>{
    return (
        <Svg
          width={25}
          height={24}
          viewBox="0 0 25 24"
          fill="none"
        >
          <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.75 5.5a3.25 3.25 0 11.833 2.173l-2.717 1.482-3.04 1.737a3.254 3.254 0 01.31 2.464l5.447 2.971a3.25 3.25 0 11-.719 1.316l-5.447-2.97a3.25 3.25 0 11-.652-4.902l3.37-1.926 2.729-1.489a3.254 3.254 0 01-.114-.856zM18 3.75a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm-11 7a1.75 1.75 0 100 3.5 1.75 1.75 0 000-3.5zm9.25 7.75a1.75 1.75 0 113.5 0 1.75 1.75 0 01-3.5 0z"
            fill="#8B1D41"
          />
        </Svg>
      )
    }