import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native"
import { COLOURS, DEVICE, FONTFAMILY, ValidateNigerianMobile } from "../../../../../includes/constants";
import { Formik, FormikProps, FormikValues } from 'formik';
import * as y  from 'yup';
import { useEffect, useState } from "react";
import BaseInput from "../../../../../components/baseInput";
import BaseSelect from "../../../../../components/baseSelect";
import { UserDataModel } from "../../../../../includes/types";
import { ReturnAllNumbers, ReturnComma } from "../../../../../includes/functions";
import BaseButton from "../../../../../components/baseButton";
import styled from "styled-components/native";
import { MockInput } from "../walletTransfer/preview";
import BaseSwitch from "../../../../../components/baseSwitch";
import useHttp from "../../../../../includes/http.hooks";
import { BillersPropItemProp } from ".";

const FSchema = y.object({
   walletId:y.string().required('Wallet is required.'),
   amount:y.string().required('Amount is required.').max(12,'Maximum of 12 characters.'),
   meterNumber:y.string().required('Meter number is required.').max(10,'Maximum of 10 characters.')
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

}
const ElectricityComponent = (props:ElectricityComponentProps)=>{
   const [plans,setPlans] = useState<PlansProps[]>([]);
   const [billers,setBillers] = useState<BillerProps[]>([]);
   const {VerifyBillAccount,loading,ShowMessage,GetBillers} = useHttp();
   
   return <View 
    style={{backgroundColor:"#F2F2F2",justifyContent:"flex-start",flexDirection:"column",padding:24,borderTopRightRadius:20,borderTopLeftRadius:20}}
   >
  <Formik
   initialValues={{
      amount: "",
      walletId: "",
      saveToBeneficiary:false,
      schedulePayment:false,
      meterNumber:""
   }}
   onSubmit={(values:FormikValues, actions:any) => {
      const data = {
      meta: {
       accountNo:String(values.meterNumber).replace(/[:]/g,''),
       phone: props.userData.phone,
       provider:props.network.serviceType
   },
       type: "electricity",
       amount: parseFloat(String(values.amount).replace(/[, ]/g,"")),
       walletId: values.walletId,
      } 
      // alert(JSON.stringify(props.network.serviceType));
      // return ;
      VerifyBillAccount({
         accountNumber:data.meta.accountNo,
         provider:props.network.serviceType
      }).then((res)=>{
         if(res.data?.user)
         {
           props.onValue(data);
         }
      })
   
   }}
   validationSchema={FSchema} 
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
    label="Electricity Biller"
    disabled
    placeholder="Enter electricity Biller"
    value={props.network?.serviceName}
    max={100}
    onChange={()=>{}}
    />
  <BaseInput 
     type="number-pad"
    label="Meter number"
    placeholder="Enter meter number"
    value={values.meterNumber}
    onChange={(data)=>{
      setFieldValue("meterNumber",data);
    }}
    max={10}
    errorMessage={touched.meterNumber && errors.meterNumber}
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
   </Formik>
   </View>
}
export default ElectricityComponent;

const Text1 = styled.Text`
color: #000;
font-family:${FONTFAMILY.INTER.normal};
font-size: 14px;
font-weight: 600;
`;