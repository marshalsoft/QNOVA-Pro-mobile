import React,{} from "react"
import Svg, { Rect, Path } from "react-native-svg"
import { ScrollView, Text, StyleSheet, View, TouchableOpacity, Image, TextInput, BackHandler, Share, Switch } from "react-native";
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
import { ReturnAllNumbers, ReturnComma } from "../../../../../includes/functions";
const FormSchema = y.object({
    businessName:y.string().required('Business name is required.'),
    businessCountry:y.string().required('Country is required.'),
    businessAddress:y.string().required('Address is required.'),
    fullName:y.string().required('Full Name is required.'),
    primaryPhoneNumber:y.string().required('Phone number is required.').min(10,"Mobile number must be 10 digits."),
    position:y.string().required('Position is required.'),
    bankName:y.string().required('Bank is required.'),
    accountNumber:y.string().required('Account nmuber is required.'),
    email:y.string().required('Email is required.').email('A valid email is required.')
});
import styled from "styled-components/native";
import { TitleText } from "../../../../settings";
import BaseInputMobile from "../../../../../components/baseInputMobile";
import useHttp from "../../../../../includes/http.hooks";
import { BankProp } from "../walletTransfer/ListOfBanks";
import { MockInput } from "../walletTransfer/preview";
import { BaseModalLoader } from "../../../../../components/baseLoader";
import BaseAddressInput from "../../../../../components/baseAddressInput";

const NewCustomerComponent = ({route,goBack,onSuccess}: ScreenComponentType) => {
    const thisForm = useRef<FormikProps<FormikValues>>(null)
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
    const {GetBanks,loading,ShowMessage,VerifyBankAccount,AddNewAddressBook} = useHttp();
    const [listOfBanks,setListOfBanks] = useState<BankProp[]>([]);
    useEffect(()=>{
      GetBanks().then((response)=>{
          if(response.status)
          {
              setListOfBanks(response.data);
          }
      });
    },[]);
return <Formik
innerRef={thisForm}
initialValues={{
    businessName: "",
    businessCountry: "",
    businessAddress: "",
    fullName: "",
    email: "",
    primaryPhoneNumber: "",
    position:"",
    dailCode:"",
    bankCode: "",
    bankName: "",
    accountNumber: "",
    accountName: ""
}}
onSubmit={(values:FormikValues, actions:any) => {
    if(values.accountName == "")
   {
    VerifyBankAccount({
    accountNumber:values.accountNumber,
    channel:String(values.bankName).toLowerCase().includes("qnova")?"WALLET":"IBAN",
    bankCode:values.bankCode 
    }).then((res)=>{
        if(res.data?.isValid)
        {
        ShowMessage("top").success(res.message)
        thisForm.current?.setFieldValue("accountName",res.data.data.accountName)    
        }else{
        ShowMessage("top").fail("Invalid bank account details.");
        }
    })
   }else{
    const data:any = {
        fullName:values.fullName,
        email:String(values.email).toLowerCase().trim(),
        primaryPhoneNumber:values.primaryPhoneNumber.trim(),
        address: values.businessAddress,
        bankAccountDetails: {
            bankCode:values.bankCode,
            bank:values.bankName,
            accountNumber:values.accountNumber,
            accountName:values.accountName
        }   
    }

    if(onSuccess)
    {
    onSuccess({data:data});
    }
   }
}}
validationSchema={FormSchema}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(<View style={{backgroundColor:"rgba(242, 242, 242, 1)",flexDirection:"column",paddingVertical:30,minHeight:DEVICE.height,borderTopRightRadius:20,borderTopLeftRadius:20}}>
    <View style={{paddingHorizontal:16,flexDirection:"column",gap:10}}>
 <TitleText>Business Details</TitleText>
<BaseInput 
style={{marginBottom:0,marginTop:0}}
 type="default"
 label="Business Name"
 placeholder="Acme Corp."
 value={values.businessName}
 onChange={(data)=>{
    setFieldValue("businessName",data)
 }}
 max={50}
 errorMessage={touched.businessName && errors.businessName}
 />
<BaseSelect 
searchBar
list={[]}
style={{marginBottom:0,marginTop:0}}
 type="country"
 label="Country of Registration"
 placeholder="Please select"
 value={values.businessCountry}
 onChange={(data)=>{
    setFieldValue("businessCountry",data.value)
 }}
 errorMessage={touched.businessCountry && errors.businessCountry}
 />
 <BaseAddressInput 
style={{marginBottom:0,marginTop:0}}
 label="Operating Address"
 placeholder="Please enter address"
 value={values.businessAddress}
 onValueChange={(data)=>{
    setFieldValue("businessAddress",data)
 }}
 errorMessage={touched.businessCountry && errors.businessCountry}
 />
  <TitleText>Key Contact Details</TitleText>
 <BaseInput 
style={{marginBottom:0,marginTop:0}}
 type="default"
 label="Full Name"
 placeholder="John Doe"
 value={values.fullName}
 onChange={(data)=>{
    setFieldValue("fullName",data)
 }}
 max={50}
 errorMessage={touched.fullName && errors.fullName}
 />
 <BaseInput 
 style={{marginBottom:0,marginTop:0}}
 type="default"
 label="Position"
 placeholder="Acme Corp."
 value={values.position}
 onChange={(data)=>{
    setFieldValue("position",data)
 }}
 max={30}
 errorMessage={touched.position && errors.position}
 />
 <BaseInputMobile 
 style={{marginBottom:0,marginTop:0}}
 label="Phone Number"
 placeholder="0800000000"
 onCode={(code)=>{
    setFieldValue("dailCode",code)
 }}
 value={values.primaryPhoneNumber}
 onValueChange={(data)=>{
    setFieldValue("primaryPhoneNumber",data)
 }}
 errorMessage={touched.primaryPhoneNumber && errors.primaryPhoneNumber}
 />
 <BaseInput 
 autoCapitalize='none'
 style={{marginBottom:0,marginTop:-18}}
 type="default"
 label="Email Address"
 placeholder="john@email.com"
 value={values.email}
 onChange={(data)=>{
    setFieldValue("email",data)
 }}
 max={30}
 errorMessage={touched.email && errors.email}
 />
  <TitleText>Payment Details</TitleText>
  <BaseSelect 
searchBar
style={{marginBottom:0,marginTop:0}}
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
 }}
 max={10}
 errorMessage={touched.accountNumber && errors.accountNumber}
 />
  {values.accountName !== "" ?<MockInput
 style={{marginTop:-15}}
label='Account Name'
value={values.accountName}
 />:null}
 <BaseButton 
 title={values.accountName === ""?"Verify account number":"Add new Customer"}
 onPress={handleSubmit}
 />

</View>
{loading && <BaseModalLoader modal />}
</View>)}
 </Formik>
}
export default NewCustomerComponent;
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