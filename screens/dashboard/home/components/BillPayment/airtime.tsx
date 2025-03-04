import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native"
import { COLOURS, DEVICE, FONTFAMILY, ValidateNigerianMobile } from "../../../../../includes/constants";
import { useState } from "react";
import BaseInput from "../../../../../components/baseInput";
import BaseSelect from "../../../../../components/baseSelect";
import { UserDataModel } from "../../../../../includes/types";
import { ReturnAllNumbers, ReturnComma } from "../../../../../includes/functions";
import BaseButton from "../../../../../components/baseButton";
import styled from "styled-components/native";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import BaseSwitch from "../../../../../components/baseSwitch";
import { BillersPropItemProp } from ".";
import useHttp from "../../../../../includes/http.hooks";
const FSchema1 = y.object({
    walletId:y.string().required('Wallet is required.'),
    amount:y.string().required('Amount is required.').max(12,'Maximum of 12 characters.'),
});
const FSchema2 = y.object({
   walletId:y.string().required('Wallet is required.'),
   amount:y.string().required('Amount is required.').max(12,'Maximum of 12 characters.'),
   phone:y.string().max(11,"11 digits id required.").required('Phone number is required.').matches(ValidateNigerianMobile, { message: 'A valid mobile number is required.'})
});
interface AirtimeComponentProps {
   userData:UserDataModel;
   network:BillersPropItemProp;
   onValue:(data:any)=>void;
}
const AirtimeComponent = (props:AirtimeComponentProps)=>{
const [selected,setSelected] = useState<number>(0);
const {VerifyAirtimeNumber,loading,ShowMessage} = useHttp();
return <View 
 style={{backgroundColor:"#F2F2F2",justifyContent:"flex-start",flexDirection:"column",padding:24,borderTopRightRadius:20,borderTopLeftRadius:20}}
>
<View style={{flexDirection:"row",height:50,backgroundColor:"#7B7F991A",borderRadius:16,padding:5}}>
            <TouchableOpacity 
            onPress={()=>setSelected(0)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected === 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected === 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>To Myself</Text>
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={()=>setSelected(1)}
            style={{flex:1,justifyContent:"center",alignItems:"center",borderRadius:12,backgroundColor:selected !== 0?COLOURS.white:"transparent"}}
            >
                <Text style={{fontFamily:FONTFAMILY.INTER.normal,color:selected !== 0?COLOURS.purple:COLOURS.gray64,fontSize:14}}>To Other Numbers</Text>
            </TouchableOpacity>
</View>
{selected === 0?<Formik
initialValues={{
   amount: "",
   walletId: "",
   saveToBeneficiary:false,
   schedulePayment:false
}}
onSubmit={(values:FormikValues, actions:any) => {
   const data = {
      meta: {
       phone:props?.userData.phone,
       provider:props.network.serviceType
   },
    type: "airtime",
    amount: parseFloat(String(values.amount).replace(/[, ]/g,"")),
    walletId: values.walletId
   } 
   VerifyAirtimeNumber(props?.userData.phone).then((res)=>{
      if(res.data && res.data?.isValid)
      {
         if(String(props.network.serviceType).toLowerCase().includes(String(res.data?.isp?.provider).toLowerCase()))
         {
            props.onValue(data);
         }else{
            ShowMessage("top").fail(`Mobile number must be ${props.network.serviceType} network number`)
         }
      }
   })

}}
validationSchema={FSchema1}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
<View style={{flexDirection:"column"}}>
<ScrollView 
showsVerticalScrollIndicator={false}
>
<View style={{minHeight:DEVICE.height,flexDirection:"column"}} >
<BaseSelect 
style={{marginTop:20}}
 label="Select Account"
 placeholder="Please Select"
 list={props.userData?.wallets?props.userData?.wallets.map((a,i)=>{
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
 label="Network"
 disabled
 placeholder="Select Network"
 value={props.network?.serviceName}
 max={100}
 onChange={()=>{}}
 />
 <BaseInput 
  type="number-pad"
 label="Phone Number"
 placeholder="08000000000"
 value={props.userData.phone!}
 onChange={(data)=>{
 }}
 disabled
 max={20}
 />
  <BaseInput 
  leadingIcon={<Text style={{fontFamily:FONTFAMILY.INTER.medium}} >₦</Text>}
  type="number-pad"
 label="Amount"
 placeholder="100"
 value={ReturnComma(values.amount)}
 onChange={(data)=>{
   if(data.includes("."))
   {
      return ShowMessage("top").fail(`Whole numbers only`);
   }
   setFieldValue("amount",data);
 }}
 max={12}
 errorMessage={touched.amount && errors.amount}
 />
 <BaseButton 
 onPress={handleSubmit}
 loading={loading}
 title="Continue"
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

</View>)}
</Formik>:null}
{selected === 1?<Formik
initialValues={{
   phone:"",
   amount: "",
   walletId: "",
   saveToBeneficiary:false,
   schedulePayment:false
}}
onSubmit={(values:FormikValues, actions:any) => {
const data = {
   meta: {
    phone: values.phone,
    provider:props.network.serviceType
},
 type: "airtime",
 amount: parseFloat(String(values.amount).replace(/[, ]/g,"")),
 walletId: values.walletId
}
VerifyAirtimeNumber(props?.userData.phone).then((res)=>{
   if(res.data && res.data?.isValid)
   {
      if(String(props.network.serviceType).toLowerCase().includes(String(res.data?.isp?.provider).toLowerCase()))
      {
         props.onValue(data);
      }else{
         ShowMessage("top").fail(`Mobile number must be ${props.network.serviceType} network number`)
      }
   }
})
}}
validationSchema={FSchema2}
>
{({values,handleChange,setFieldValue,handleSubmit,errors,isValid,touched})=>(
<View style={{flexDirection:"column"}}>
<ScrollView 
showsVerticalScrollIndicator={false}
>
<View style={{minHeight:DEVICE.height,flexDirection:"column"}} >
<BaseSelect 
style={{marginTop:20}}
 label="Select Account"
 placeholder="Please Select"
 list={props.userData?.wallets?props.userData?.wallets.map((a,i)=>{
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
 label="Network"
 disabled
 placeholder="Select Network"
 value={props.network?.serviceName}
 max={100}
 onChange={()=>{}}
 />
 <BaseInput 
  type="number-pad"
 label="Phone Number"
 placeholder="08000000000"
 value={values.phone}
 onChange={(data)=>{
   setFieldValue("phone",data);
 }}
 max={11}
 errorMessage={touched.phone && errors.phone}
 />
  <BaseInput 
  leadingIcon={<Text style={{fontFamily:FONTFAMILY.INTER.medium}} >₦</Text>}
  type="number-pad"
 label="Amount"
 placeholder="100"
 value={ReturnComma(values.amount)}
 onChange={(data)=>{
   if(data.includes("."))
   {
      return ShowMessage("top").fail(`Whole numbers only`)
   }
    setFieldValue("amount",data);
 }}
 max={12}
 errorMessage={touched.amount && errors.amount}
 />
 <BaseButton 
 onPress={handleSubmit}
 title="Continue"
 loading={loading}
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

</View>)}
</Formik>:null}
</View>
}
export default AirtimeComponent;
const Text1 = styled.Text`
color: #000;
font-family:${FONTFAMILY.INTER.normal};
font-size: 14px;
font-weight: 600;
`;