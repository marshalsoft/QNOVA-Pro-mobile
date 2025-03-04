import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native"
import { COLOURS, CURRENCIES, DEVICE, FONTFAMILY, ValidateNigerianMobile } from "../../../../../includes/constants";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import { useEffect, useRef, useState } from "react";
import BaseInput from "../../../../../components/baseInput";
import BaseSelect from "../../../../../components/baseSelect";
import { ItemProps, UserDataModel } from "../../../../../includes/types";
import { ReturnAllNumbers, ReturnComma } from "../../../../../includes/functions";
import BaseButton from "../../../../../components/baseButton";
import styled from "styled-components/native";
import { MockInput } from "../walletTransfer/preview";
import BaseSwitch from "../../../../../components/baseSwitch";
import useHttp from "../../../../../includes/http.hooks";
import { BillersPropItemProp } from ".";
import BaseInnerLoader from "../../../../../components/baseLoader";

const FSchema = y.object({
   walletId:y.string().required('Wallet is required.'),
   planId:y.string().required('Plan is required.'),
   amount:y.string().required('Amount is required.').max(12,'Maximum of 12 characters.'),
   uicNumber:y.string().required('Smart Card number is required.').max(10,'Maximum of 10 characters.'),
   productMonthsPaidFor:y.string().required('Number of months is required.')
});
interface ElectricityComponentProps {
   userData:UserDataModel;
   network:BillersPropItemProp;
   onValue:(data:any)=>void;
}
interface BillerProps {
   createdAt:string;
   id:string;
   imageUrl:string;
   provider:string;
   serviceCategory:string;
   serviceEnabled:string;
   serviceName:string;
   serviceTyp:string;
   updatedAt:string;
}
interface PlansProps {
   availablePricingOptions: optionProp[];
   code:string;
   name:string;
}
type optionProp = {
   _id:string;
   invoicePeriod:number;
   monthsPaidFor:number;
   price:number;
}
type payloadType = "dstv" | "gotv" | "showmax" | "startimes";
const TvComponent = (props:ElectricityComponentProps)=>{
   const thisForm = useRef<FormikProps<FormikValues>>(null)
   const [plans,setPlans] = useState<ItemProps[]>([]);
   const [billers,setBillers] = useState<BillerProps[]>([]);
   const {VerifyBillAccount,loading,ShowMessage,GetTvPlans,GetBillers} = useHttp();
   const [fetching,setFetching] = useState<boolean>(false)
   const GetPlans = (d:payloadType)=>{
      setFetching(true);
      GetTvPlans(d).then((res)=>{
         setFetching(false);
         if(res.data)
         {
            var list:ItemProps[] = [];
            res.data.forEach((a:PlansProps,_i:number)=>{
               a.availablePricingOptions.forEach((b:optionProp,_o:number)=>{
                  list.push({
                     title:`${String(a.name).replace(/[_]/g,'')} (${CURRENCIES.Naira.Symbol}${ReturnComma(String(b.price))})`,
                     value:a.code,
                     balance:String(b.price)
                  })
               })
               
            }) 
            setPlans(list);
         console.log(list)
            
         }
      })
   }
   useEffect(()=>{
      const type:payloadType = props.network.serviceType as payloadType;
      // if(type === "dstv")
      // {
      GetPlans(type);
      // }
   },[props.network])
   return <View 
    style={{backgroundColor:"#F2F2F2",justifyContent:"flex-start",flexDirection:"column",padding:24,borderTopRightRadius:20,borderTopLeftRadius:20}}
   >
  <Formik
  innerRef={thisForm}
   initialValues={{
      amount: "",
      walletId: "",
      saveToBeneficiary:false,
      schedulePayment:false,
      uicNumber:"",
      planId:"",
      planName:"",
      productMonthsPaidFor:"",
      accountName:""
   }}
   onSubmit={(values:FormikValues, _actions:any) => {
      const data = {
      meta: {
       smartCardNumber:values.uicNumber,
       productCode:values.planId,
       productMonthsPaidFor:parseInt(values.productMonthsPaidFor),
       provider:props.network.serviceType
      },
       type: "cabletv",
       amount: parseFloat(String(values.amount).replace(/[, ]/g,"")),
       walletId: values.walletId,
      } 
      // alert (JSON.stringify(data))
      // return;
      if(values.accountName !== "")
      {
         return props.onValue(data);
      }
      VerifyBillAccount({
         accountNumber:data.meta.smartCardNumber,
         provider:data.meta.provider
      }).then((res)=>{
         if(res.data?.user)
         {
            thisForm.current?.setFieldValue("accountName",res.data?.user?.name)
         }
      })
   
   }}
   validationSchema={FSchema} 
   >
   {({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>{
  const numberOfMonths:ItemProps[] = Array.from({length:12}).map((a:any,i:number)=>{
   return {
    title:`${i+1} Month${i+1 > 1?"s":""}`,
    value:`${i+1}`
   } 
 }) as ItemProps[]
   
   return <View style={{flexDirection:"column"}}>
   <ScrollView 
   showsVerticalScrollIndicator={false}
   >
   <View style={{minHeight:DEVICE.height,flexDirection:"column"}} >
   <BaseSelect 
   style={{marginTop:20}}
    label="Select Account"
    placeholder="Main wallet"
    list={props.userData?.wallets?props.userData?.wallets.map((a,_i)=>{
      return {
       title:a.name,
       value:a.id
      } 
    }):[]}
    onChange={(data)=>{
       setFieldValue("walletId",data.value)
    }}
    type="custom"
    errorMessage={touched.walletId && errors.walletId}
    />
    <BaseInput
    max={38}
    label="TV Service"
    placeholder="Please Select"
    onChange={(_data)=>{
      
    }}
    value={props.network.serviceName}
    />
    {fetching?<View style={{marginBottom:10,marginTop:-10}}>
      <BaseInnerLoader 
    text="Fetching plan..."
    />
    </View>:plans.length !== 0?<BaseSelect 
    searchBar
    label="TV Plan"
    placeholder="Select a plan"
    list={plans}
    onChange={(data)=>{
       setFieldValue("planId",data.value);
       setFieldValue("planName",data.title);
       setFieldValue("amount",data.balance);
    }}
    type="custom"
    errorMessage={touched.planId && errors.planId}
    />:null}
  
  <BaseInput 
    type="number-pad"
    label="Smartcard Number or IUD"
    placeholder="12345678901" 
    value={values.uicNumber}
    onChange={(data)=>{
      setFieldValue("uicNumber",data);
      setFieldValue("accountName","");
    }}
    max={10}
    errorMessage={touched.uicNumber && errors.uicNumber}
    />
     {/* {props.network.serviceType  === "startimes"?<BaseInput 
    type="number-pad"
    label="Amount"
    placeholder="1000" 
    leadingIcon={<Text>{CURRENCIES.Naira.Symbol} </Text>}
    value={values.amount}
    onChange={(data)=>{
      setFieldValue("amount",data);
    }}
    max={10}
    errorMessage={touched.amount && errors.amount}
    />:null} */}
    <BaseSelect 
    label="Number of months"
    placeholder="Please number of months"
    list={numberOfMonths}
    onChange={(data)=>{
       setFieldValue("productMonthsPaidFor",data.value)
    }}
    type="custom"
    errorMessage={touched.productMonthsPaidFor && errors.productMonthsPaidFor}
    />
    {values.accountName !== ""?<MockInput 
    label="Account name"
    value={values.accountName}
    />:null}
    <BaseButton 
    onPress={handleSubmit}
    loading={loading}
    title={values.accountName === ""?"Verify Number":"Continue"}
    />
    <View style={{marginBottom:20,marginTop:20,flexDirection:"row",alignItems:"center"}} >
       <View style={{flex:1,justifyContent:"flex-start"}}>
           <Text1 >Save to Beneficiaries</Text1>
       </View>
       <BaseSwitch
       onValueChange={(d)=>{
         setFieldValue("saveToBeneficiary",d);
       }}
       value={values.saveToBeneficiary}
       />
    </View>
    <View style={{marginBottom:20,flexDirection:"row",alignItems:"center"}} >
       <View style={{flex:1,justifyContent:"flex-start"}}>
           <Text1 >Schedule Payment</Text1>
       </View>
       <BaseSwitch
        onValueChange={(d)=>{
         setFieldValue("schedulePayment",d);
       }}
       value={values.schedulePayment}
       />
    </View>
    </View>
   </ScrollView>
   
   </View>}}
   </Formik>
   </View>
}
export default TvComponent;

const Text1 = styled.Text`
color: #000;
font-family:${FONTFAMILY.INTER.normal};
font-size: 14px;
font-weight: 600;
`;